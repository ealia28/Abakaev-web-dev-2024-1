document.addEventListener("DOMContentLoaded", async () => {
    const sections = {
        soup: 
        document.querySelector("section[data-category='soup'] .dish-content"),
        "main-course": 
        document.querySelector("section[data-category='main-course'] \
            .dish-content"),
        drink:
        document.querySelector("section[data-category='drink'] .dish-content"),
        dessert: 
        document.querySelector("section[data-category='dessert'] .dish-content"
        ),
        salad: 
        document.querySelector("section[data-category='salad'] .dish-content"),
    };

    const orderSummary = {
        soup: document.getElementById("order-soup"),
        mainCourse: document.getElementById("order-main-course"),
        drink: document.getElementById("order-drink"),
        dessert: document.getElementById("order-dessert"),
        salad: document.getElementById("order-salad"),
    };

    const hiddenInputs = {
        soup: document.getElementById("hidden-soup"),
        mainCourse: document.getElementById("hidden-main-course"),
        drink: document.getElementById("hidden-drink"),
        dessert: document.getElementById("hidden-dessert"),
        salad: document.getElementById("hidden-salad"),
    };

    const noSelectionText = document.getElementById("no-selection");
    const orderSummarySection = document.getElementById("order-summary");
    const totalCostSection = document.getElementById("total-cost");
    const totalPriceDisplay = document.getElementById("total-price");
    
    const form = document.querySelector("#order-form"); // Форма отправки заказа
    const notificationId = "missing-items-notification"; // ID уведомления

    let totalPrice = 0;
    function addDishToOrder(dish) {
        orderSummary[dish.category].textContent = `${dish.name} ${dish.price}₽`;
        
        hiddenInputs[dish.category].value = dish.keyword;
    }

    function highlightSelectedDish(category, selectedCard) {
        const sectionCards =
        sections[category].querySelectorAll(".product-card");

        sectionCards.forEach((card) => {
            card.classList.remove("selected");
        });
        selectedCard.classList.add("selected");
    }

    function updateOrderVisibility() {
        const isAnyDishSelected = Object.values(orderSummary).some(item => 
            item.textContent !== "Суп не выбран" && 
            item.textContent !== "Блюдо не выбрано" && 
            item.textContent !== "Напиток не выбран" &&
            item.textContent !== "Десерт не выбран" &&
            item.textContent !== "Салат не выбран"
        );

        noSelectionText.style.display = isAnyDishSelected ? "none" : "block";
        orderSummarySection.style.display =
        isAnyDishSelected ? "block" : "none";
        totalCostSection.style.display = isAnyDishSelected ? "block" : "none";
    }

    function updateTotalCost() {
        totalPrice =
        Array.from(Object.values(orderSummary)).reduce((total, item) => {
            const match = item.textContent.match(/(\d+)\s*₽/);
            return match ? total + parseFloat(match[1]) : total;
        }, 0);

        totalPriceDisplay.textContent = totalPrice;
    }
    function createDishCard(dish) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-dish", dish.keyword);
        card.setAttribute("data-kind", dish.kind);

        card.innerHTML = `
            <figure class="product-image">
                <img src="${dish.image}" alt="${dish.name}">
            </figure>
            <div class="product-details">
                <p class="price">${dish.price} &#8381;</p>
                <p class="info">${dish.name}</p>
                <p class="weigh">${dish.count}</p>
                <button class="btn">Добавить</button>
            </div>
        `;

        card.querySelector(".btn").addEventListener("click", () => {
            addDishToOrder(dish);
            highlightSelectedDish(dish.category, card);
            updateOrderVisibility();
            updateTotalCost();
        });

        return card;
    }

    function setDefaultText() {
        orderSummary.soup.textContent = "Суп не выбран";
        orderSummary.mainCourse.textContent = "Блюдо не выбрано";
        orderSummary.drink.textContent = "Напиток не выбран";
        orderSummary.dessert.textContent = "Десерт не выбран";
        orderSummary.salad.textContent = "Салат не выбран";
    }

    setDefaultText();
    updateOrderVisibility();
    try {
        // Загружаем данные о блюдах через API
        const dishesData = await window.loadDishes();

        // Сортируем и рендерим блюда
        const sortedDishes 
        = dishesData.sort((a, b) => a.name.localeCompare(b.name));
        sortedDishes.forEach((dish) => {
            const section = sections[dish.category];
            if (section) {
                const dishCard = createDishCard(dish);
                section.appendChild(dishCard);
            }
        });
    } catch (error) {
        console.error("Ошибка при загрузке данных о блюдах:", error);
        alert("Не удалось загрузить данные о блюдах. Попробуйте позже.");
    }
    const filterButtons = document.querySelectorAll('.filter-button');

    function filterDishes(kind, category) {
        const section = sections[category];
        const dishCards = section.querySelectorAll('.product-card');

        dishCards.forEach(card => {
            const cardKind = card.getAttribute('data-kind');
            if (cardKind === kind || kind === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const category = 
            button.closest('section').getAttribute('data-category');
    
            const currentSectionButtons = 
            button.closest('section').querySelectorAll('.filter-button');
    
            const isActive = button.classList.contains('active');
    
            currentSectionButtons.forEach(
                btn => btn.classList.remove('active'));
    
            if (!isActive) {
                button.classList.add('active');
                filterDishes(kind, category);
            } else {
                filterDishes('', category);
            }
        });
    });

    function getNotificationText() {
        const selectedItems = Object.keys(orderSummary).filter(
            category => orderSummary[category].textContent 
            !== `Суп не выбран` &&
            orderSummary[category].textContent 
            !== `Блюдо не выбрано` &&
            orderSummary[category].textContent 
            !== `Напиток не выбран` &&
            orderSummary[category].textContent 
            !== `Десерт не выбран` &&
            orderSummary[category].textContent !== `Салат не выбран`
        );

        if (selectedItems.length === 0) {
            return "Ничего не выбрано. Выберите блюда для заказа";
        }

        if (selectedItems.includes("soup") 
            && !selectedItems.some(item => 
                ["main-course", "salad"].includes(item))) {
            return "Выберите главное блюдо/салат/стартер";
        }

        if (selectedItems.includes("salad") 
            && !selectedItems.some(item => 
                ["soup", "main-course"].includes(item))) {
            return "Выберите суп или главное блюдо";
        }

        if ((selectedItems.includes("drink") 
            || selectedItems.includes("dessert")) 
            && !selectedItems.includes("main-course") 
            && !selectedItems.includes("salad")) {
            return "Выберите главное блюдо";
        }
        
        if (!selectedItems.includes("drink")) {
            return "Выберите напиток";
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

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        const notificationText = getNotificationText();
        if (notificationText) {
            event.preventDefault();
            showNotification(notificationText);
        }
    });
});
