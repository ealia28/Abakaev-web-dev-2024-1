document.addEventListener("DOMContentLoaded", () => {
    const sections = {
        soup: 
        document.querySelector("section[data-category='soup'] .dish-content"),
        mainDish: 
        document.querySelector(
            "section[data-category='mainDish'] .dish-content"
        ),
        drink: 
        document.querySelector("section[data-category='drink'] .dish-content"),
    };

    const orderSummary = {
        soup: document.getElementById("order-soup"),
        mainDish: document.getElementById("order-mainDish"),
        drink: document.getElementById("order-drink"),
    };

    // Скрытые поля для отправки keyword
    const hiddenInputs = {
        soup: document.getElementById("hidden-soup"),
        mainDish: document.getElementById("hidden-mainDish"),
        drink: document.getElementById("hidden-drink"),
    };

    const noSelectionText = document.getElementById("no-selection");
    const orderSummarySection = document.getElementById("order-summary");
    const totalCostSection = document.getElementById("total-cost");
    const totalPriceDisplay = document.getElementById("total-price");

    let totalPrice = 0;
    function addDishToOrder(dish) {
        orderSummary[dish.category].textContent = `${dish.name} ${dish.price}₽`;
        
        // Обновляем скрытое поле для отправки названия блюда (keyword)
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
            item.textContent !== "Напиток не выбран"
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

        card.innerHTML = `
            <figure class="product-image">
                <img src="${dish.image}" alt="${dish.name}">
            </figure>
            <div class="product-details">
                <p class="price">${dish.price} &#8381;</p>
                <p class="info">${dish.name}</p>
                <p class="weigh">${dish.weight}</p>
                <button class="btn">Добавить</button>
            </div>
        `;

        // Обработчик клика для добавления блюда в заказ
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
        orderSummary.mainDish.textContent = "Блюдо не выбрано";
        orderSummary.drink.textContent = "Напиток не выбран";
    }

    setDefaultText();
    updateOrderVisibility();

    const sortedDishes
    = dishesData.sort((a, b) => a.name.localeCompare(b.name));
    sortedDishes.forEach((dish) => {
        const section = sections[dish.category];
        if (section) {
            const dishCard = createDishCard(dish);
            section.appendChild(dishCard);
        }
    });
});
