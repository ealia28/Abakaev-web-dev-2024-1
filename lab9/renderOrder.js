document.addEventListener("DOMContentLoaded", async () => {
    const LOCAL_STORAGE_KEY = "selectedDishes";
    const dishesContainer = document.querySelector("main");
    const totalPriceDisplay = document.getElementById("total-price");
    const orderSummarySection = document.getElementById("order-summary");
    const totalCostSection = document.getElementById("total-cost");
    const form = document.querySelector("#order-form");
    const notificationId = "missing-items-notification"; 
    
    let totalPrice = 0;

    function getSelectedDishes() {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        console.log("Данные из localStorage при загрузке:", savedData);
        return savedData ? JSON.parse(savedData) : {};
    }

    function renderOrder() {
        const selectedDishes = getSelectedDishes();
        dishesContainer.innerHTML = "";
        totalPrice = 0;

        if (Object.keys(selectedDishes).length === 0) {
            dishesContainer.innerHTML = 
            `<p style = "margin-left: 15rem;">Ничего не выбрано.</p>`;
            orderSummarySection.style.display = "none";
            totalCostSection.style.display = "none";
            return;
        }

        orderSummarySection.style.display = "block";
        totalCostSection.style.display = "block";

        let dishContentContainer = document.querySelector('.dish-content');
        if (!dishContentContainer) {
            dishContentContainer = document.createElement("div");
            dishContentContainer.className = "dish-content";
            dishesContainer.appendChild(dishContentContainer);
        }

        Object.keys(selectedDishes).forEach((category) => {
            const dish = selectedDishes[category];

            const dishCard = document.createElement("div");
            dishCard.className = "product-card";
            dishCard.setAttribute("data-dish", dish.keyword);
            dishCard.setAttribute("data-kind", dish.kind);
            dishCard.innerHTML = `
                <figure class="product-image">
                    <img src="${dish.image}" alt="${dish.name}">
                </figure>
                <div class="product-details">
                    <p class="price">${dish.price} &#8381;</p>
                    <p class="info">${dish.name}</p>
                    <p class="weigh">${dish.count}</p>
                    <button class="remove-btn" data-category="${category}">Удалить</button>
                </div>
            `;

            totalPrice += parseFloat(dish.price);
            dishCard.querySelector(".remove-btn").
                addEventListener("click", (e) => {
                    const categoryToRemove = 
                    e.target.getAttribute("data-category");
                    removeDish(categoryToRemove);

                    dishCard.remove();
                });

            dishContentContainer.appendChild(dishCard);
            const formField = document.getElementById(`order-${category}`);
            const hiddenInput = document.getElementById(`hidden-${category}`);
            if (formField && hiddenInput) {
                formField.textContent = `${dish.name} ${dish.price} ₽`;
                hiddenInput.value = dish.keyword;
            }
        });

        totalPriceDisplay.textContent = totalPrice;
    }

    function removeDish(category) {
        const defaultTexts = {
            soup: "Суп не выбран",
            'main-course': "Блюдо не выбрано",
            drink: "Напиток не выбран",
            dessert: "Десерт не выбран",
            salad: "Салат не выбран",
        };
        const selectedDishes = getSelectedDishes();
        delete selectedDishes[category];
        localStorage.
            setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedDishes));
        const formField = document.getElementById(`order-${category}`);
        const hiddenInput = document.getElementById(`hidden-${category}`);
        if (formField && hiddenInput) {
            formField.textContent = defaultTexts[category];
            hiddenInput.value = "";
        }

        if (Object.keys(selectedDishes).length > 0) {
            localStorage
                .setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedDishes));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        renderOrder();
    }

    function validateOrder() {
        const selectedDishes = getSelectedDishes();
        const categories = Object.keys(selectedDishes);

        if (categories.length === 0) {
            return "Ничего не выбрано. Выберите блюда для заказа.";
        }

        if (categories.includes("soup") &&
            !categories.some(item => ["main-course", "salad"].includes(item))) {
            return "Выберите главное блюдо, салат или стартер.";
        }

        if (categories.includes("salad") &&
            !categories.some(item => ["soup", "main-course"].includes(item))) {
            return "Выберите суп или главное блюдо.";
        }

        if ((categories.includes("drink") || categories.includes("dessert")) &&
            !categories.includes("main-course") && 
            !categories.includes("salad")) {
            return "Выберите главное блюдо.";
        }

        if (!categories.includes("drink")) {
            return "Выберите напиток.";
        }

        return null;
    }
    function showNotification(message) {
        let notification = document.getElementById(notificationId);

        if (notification) {
            notification.remove();
        }

        notification = document.createElement("div");
        notification.id = notificationId;
        notification.style.position = "fixed";
        notification.style.top = "50%";
        notification.style.left = "50%";
        notification.style.transform = "translate(-50%, -50%)";
        notification.style.backgroundColor = "#FFFFFF";
        notification.style.color = "#000000";
        notification.style.border = "2px solid #000000";
        notification.style.padding = "50px";
        notification.style.borderRadius = "8px";
        notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        notification.style.textAlign = "center";
        notification.style.width = "450px";

        const messageElem = document.createElement("p");
        messageElem.textContent = message;
        notification.appendChild(messageElem);

        const closeButton = document.createElement("button");
        closeButton.textContent = "Окей \u{1F44C}";
        closeButton.style.backgroundColor = "#FFFFFF";
        closeButton.style.color = "#000000";
        closeButton.style.padding = "10px 20px";
        closeButton.style.border = "1px solid #000000";
        closeButton.style.borderRadius = "2px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontFamily = "Mulish, sans-serif";
        closeButton.style.font = "18px";
        closeButton.addEventListener("mouseenter", () => {
            closeButton.style.backgroundColor = "#000000";
            closeButton.style.color = "#ffffff";
        });
        closeButton.addEventListener("mouseleave", () => {
            closeButton.style.backgroundColor = "#FFFFFF";
            closeButton.style.color = "#000000";
        });
        closeButton.addEventListener("click", () => {
            notification.remove();
        });

        notification.appendChild(closeButton);
        document.body.appendChild(notification);
    }
    async function fetchDishes() {
        try {
            const response = 
        await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes");
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных с сервера");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Не удалось загрузить данные. Попробуйте позже.");
            return [];
        }
    }
    async function init() {
        const allDishes = await fetchDishes();
        const selectedDishes = getSelectedDishes();
        Object.keys(selectedDishes).forEach((category) => {
            const dishKeyword = selectedDishes[category];
            const dishData = 
            allDishes.find((dish) => dish.keyword === dishKeyword);
            if (dishData) {
                selectedDishes[category] = dishData;
            } else {
                delete selectedDishes[category];
            }
        });
        if (Object.keys(selectedDishes).length > 0) {
            localStorage
                .setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedDishes));
        }
        renderOrder();
    }
    init();
    
    function getSelectedDishId(category) {
        const selectedDishes = getSelectedDishes();
        return selectedDishes[category]?.id || "";
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const selectedDishes = getSelectedDishes();
        
        const soup = selectedDishes.soup?.id || '';
        const mainDish = selectedDishes['main-course']?.id || '';
        const salads = selectedDishes.salad?.id || '';
        const drink = selectedDishes.drink?.id || '';
        const desserts = selectedDishes.dessert?.id || '';

        const formData = new FormData(event.target);
        formData.append('soup_id', soup || '');
        formData.append('main_course_id', mainDish || '');
        formData.append('salad_id', salads || '');
        formData.append('drink_id', drink || '');
        formData.append('dessert_id', desserts || '');
        formData.append('full_name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        const subscribeCheckbox = document.getElementById('subscribe');
        console.log(subscribeCheckbox);
        formData
            .append('subscribe', subscribeCheckbox.checked ? 1 : 0);
        formData.append(
            'delivery_address', document.getElementById('address').value
        );
        const deliveryType = 
            document.querySelector('input[name="delivery_period"]:checked')
                .value;
        const deliveryTimeInput = 
            document.getElementById('cpec_time').value;
        let deliveryTime;
        if (deliveryType === "now") {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            deliveryTime = `${hours}:${minutes}`;
        } else if (deliveryType === "by_time") {
            deliveryTime = deliveryTimeInput;
            if (!deliveryTime) {
                showNotification("Укажите время для доставки.");
                return;
            }
        }
        formData.append('delivery_type', deliveryType);
        formData.append('delivery_time', deliveryTime);
        formData.append('comment', document.getElementById('comments')
            .value || '');
        formData.append('price', totalPrice);
        const apiKey = "fc8bfffb-4789-4f2f-9a32-93ccf2d808b1";
        const notificationText = validateOrder();

        if (notificationText) {
            showNotification(notificationText);
            return;
        }
        formData.append("selectedDishes", JSON.stringify(selectedDishes));

        try {
            const response = await 
            fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/orders" + 
                    "?api_key=fc8bfffb-4789-4f2f-9a32-93ccf2d808b1", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Ошибка отправки заказа. Попробуйте позже.");
            }

            showNotification("Ваш заказ успешно отправлен!");
            form.reset();
            renderOrder();
        } catch (error) {
            console.error(error);
            showNotification("Не удалось отправить заказ. Попробуйте позже.");
        }
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    });
});