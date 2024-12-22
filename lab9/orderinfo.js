document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/orders";
    const apiKey = "fc8bfffb-4789-4f2f-9a32-93ccf2d808b1";
    const ordersTable = 
    document.getElementById("orders-table").querySelector("tbody");

    async function fetchOrders() {
        try {
            const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            alert("Не удалось загрузить данные");
            return [];
        }
    }

    async function fetchDishById(dishId) {
        const apiUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/dishes/${dishId}?api_key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Ошибка загрузки блюда');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при загрузке данных о блюде', error);
            return null;
        }
    }

    async function fetchDishesByIds(dishIds) {
        const uniqueIds = [...new Set(dishIds)];
        const dishPromises = uniqueIds.map(fetchDishById);
        const dishes = await Promise.all(dishPromises);
        return dishes.reduce((acc, dish) => {
            if (dish) acc[dish.id] = dish;
            return acc;
        }, {});
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.
            toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
    }

    async function deleteOrder(orderId) {
        try {
            const response = 
            await fetch(`${apiUrl}/${orderId}?api_key=${apiKey}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Ошибка удаления: ${response.statusText}`);
            }
            alert("Заказ успешно удален.");
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
            alert("Не удалось удалить заказ. Попробуйте позже.");
        }
    }

    async function calculateTotalPriceOptimized(order, dishDictionary) {
        const dishIds = [
            order.main_course_id,
            order.drink_id,
            order.salad_id,
            order.soup_id,
            order.dessert_id
        ].filter(Boolean);

        return dishIds.reduce((sum, dishId) => {
            const dish = dishDictionary[dishId];
            return sum + (dish?.price || 0);
        }, 0);
    }

    function getDishNames(order, dishDictionary) {
        const dishTypes = [
            { key: "main_course_id", name: "Основное блюдо" },
            { key: "drink_id", name: "Напиток" },
            { key: "salad_id", name: "Салат" },
            { key: "soup_id", name: "Суп" },
            { key: "dessert_id", name: "Десерт" },
        ];

        return dishTypes
            .filter(type => order[type.key])
            .map(type => {
                const dish = dishDictionary[order[type.key]];
                return dish ? dish.name : `${type.name} (ID: ${order[type.key]})`;
            })
            .join(", ") || "Нет данных";
    }

    
    const modal = document.getElementById("order-details-modal");
    const closeButton = modal.querySelector(".close-button");

    function showModal(content) {
        const detailsContainer = modal.querySelector("#order-details");
        detailsContainer.innerHTML = content;
        modal.style.display = "block";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    closeButton.addEventListener("click", hideModal);
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });


    async function renderOrdersOptimized(orders, dishDictionary) {
        ordersTable.innerHTML = "";

        for (const [index, order] of orders.entries()) {
            const row = document.createElement("tr");

            const dishes = getDishNames(order, dishDictionary);

            const totalPrice = 
            await calculateTotalPriceOptimized(order, dishDictionary);

            const deliveryTime = order.delivery_type === "now"
                ? "Как можно скорее (с 7:00 до 23:00)"
                : order.delivery_time;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDate(order.created_at)}</td>
                <td>${dishes}</td>
                <td>${totalPrice} ₽</td>
                <td>${deliveryTime}</td>
                <td class="actions">
                    <i class="bi bi-eye" title="Подробнее" style="cursor: pointer;"></i>
                    <i class="bi bi-pencil" title="Редактирование" style="cursor: pointer; margin-left: 10px;"></i>
                    <i class="bi bi-trash" title="Удаление" style="cursor: pointer; margin-left: 10px;"></i>
                </td>
            `;

            row.querySelector(".bi-eye").addEventListener("click", async () => {
                const totalPrice = await calculateTotalPriceOptimized(order, dishDictionary);

                const dishTypes = [
                    { key: "main_course_id", label: "Основное блюдо" },
                    { key: "drink_id", label: "Напиток" },
                    { key: "salad_id", label: "Салат" },
                    { key: "soup_id", label: "Суп" },
                    { key: "dessert_id", label: "Десерт" }
                ];
                const dishes = dishTypes
                    .filter(dish => order[dish.key])
                    .map(dish => {
                        const dishInfo = dishDictionary[order[dish.key]];
                        const dishPrice = dishInfo?.price ? `${dishInfo.price} руб.` : "Цена не указана";
                        const dishName = 
                        dishDictionary[order[dish.key]]?.name || "Не указано";
                        return `<p>${dish.label}: ${dishName} (${dishPrice})</p>`;
                    })  
                    .join("");
                const details = `
                <p><strong>Просмотр заказа</strong></p>
                    <p>Дата оформления заказа: ${formatDate(order.created_at)}</p>
                    <p><strong>Доставка</strong></p>
                    <p>Имя получателя: ${order.full_name || "Не указано"}</p>
                    <p>Адрес доставки: ${order.delivery_address || "Не указан"}</p>
                    <p>Время доставки: ${order.delivery_type === "now" 
                        ? "Как можно скорее" 
                        : order.delivery_time || "Не указано"}</p>
                    <p>Телефон:</strong> ${order.phone || "Не указан"}</p>
                    <p>Email:</strong> ${order.email || "Не указан"}</p>
                    <p><strong>Комментарий</strong></p>
                    <p></strong> ${order.comment || "Нет комментариев"}</p>
                    <p><strong>Состав заказа</strong></p>
                     ${dishes}
                    <p><strong>Стоимость заказа: ${totalPrice} ₽</strong></p>
                `;
                showModal(details.trim());
            });

            row.querySelector(".bi-pencil").addEventListener("click", () => {
                const dishTypes = [
                    { key: "main_course_id", label: "Основное блюдо" },
                    { key: "drink_id", label: "Напиток" },
                    { key: "salad_id", label: "Салат" },
                    { key: "soup_id", label: "Суп" },
                    { key: "dessert_id", label: "Десерт" }
                ];
                const dishes = dishTypes
                    .filter(dish => order[dish.key])
                    .map(dish => {
                        const dishInfo = dishDictionary[order[dish.key]];
                        const dishPrice = dishInfo?.price ? `${dishInfo.price} руб.` : "Цена не указана";
                        const dishName = 
                        dishDictionary[order[dish.key]]?.name || "Не указано";
                        return `<p>${dish.label}: ${dishName} (${dishPrice})</p>`;
                    })  
                    .join("");
                const editContent = `
                    <p><strong>Редактирование заказа</strong></p>
                    <form id="edit-order-form">
                    <p>Дата оформления заказа: ${formatDate(order.created_at)}</p>
                    <p><strong>Доставка</strong></p>
                        <label>
                            Имя получателя:
                            <input type="text" name="full_name" value="${order.full_name || ""}">
                        </label>
                        <label>
                            Адрес доставки:
                            <input type="text" name="delivery_address" value="${order.delivery_address || ""}">
                        </label>
                        <fieldset>
                            <legend>Тип доставки</legend>
                            <label>
                                <input type="radio" name="delivery_type" value="now" 
                                    ${order.delivery_type === "now" ? "checked" : ""}> Как можно скорее
                            </label>
                            <label>
                                <input type="radio" name="delivery_type" value="time" 
                                    ${order.delivery_type !== "now" ? "checked" : ""}> Ко времени
                            </label>
                        </fieldset>
                        <label>
                            Время доставки:
                            <input type="datetime-local" name="delivery_time" value="${order.delivery_time || ""}">
                        </label>
                        <label>
                            Телефон:
                            <input type="tel" name="phone" value="${order.phone || ""}">
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value="${order.email || ""}">
                        </label>
                        <label>
                            Комментарий:
                            <textarea name="comment">${order.comment || ""}</textarea>
                        </label>
                        <p><strong>Состав заказа</strong></p>
                        ${dishes}
                        <p><strong>Стоимость заказа: ${totalPrice} ₽</strong></p>
                        <div class="actions">
                            <button type="button" class="save-button">Сохранить</button>
                            <button type="button" class="cancel-btn">Отменить</button>
                        </div>
                    </form>
                `;
            
                showModal(editContent);
            
                const saveButton = modal.querySelector(".save-button");
                const cancelButton = modal.querySelector(".cancel-btn");
            
                cancelButton.addEventListener("click", hideModal);
            
                saveButton.addEventListener("click", async () => {
                    const formData = new FormData(modal.querySelector("#edit-order-form"));
                    const updatedOrder = {
                        full_name: formData.get("full_name"),
                        delivery_address: formData.get("delivery_address"),
                        delivery_type: formData.get("delivery_type"),
                        delivery_time: formData.get("delivery_time"),
                        phone: formData.get("phone"),
                        email: formData.get("email"),
                        comment: formData.get("comment"),
                    };
            
                    try {
                        const response = await fetch(`${apiUrl}/${order.id}?api_key=${apiKey}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedOrder),
                        });
            
                        if (!response.ok) {
                            throw new Error(`Ошибка сохранения: ${response.statusText}`);
                        }
            
                        alert("Заказ успешно обновлен.");
                        hideModal();
                        await loadOrders();
                    } catch (error) {
                        console.error("Ошибка при сохранении заказа:", error);
                        alert("Не удалось сохранить изменения. Попробуйте позже.");
                    }
                });
            });
            
            row.querySelector(".bi-trash")
                .addEventListener("click", async () => {
                    const deleteModal = 
                    document.getElementById("delete-confirm-modal");
                    const confirmDeleteBtn = 
                    document.getElementById("confirm-delete-btn");
                    const cancelDeleteBtn = 
                    document.getElementById("cancel-delete-btn");
                    const closeButton = 
                    deleteModal.querySelector(".close-button");

                    deleteModal.style.display = "block";

                    cancelDeleteBtn.addEventListener("click", () => {
                        deleteModal.style.display = "none";
                    });

                    closeButton.addEventListener("click", () => {
                        deleteModal.style.display = "none";
                    });

                    window.addEventListener("click", (event) => {
                        if (event.target === deleteModal) {
                            deleteModal.style.display = "none";
                        }
                    });
                    confirmDeleteBtn.addEventListener("click", async () => {
                        try {
                            await deleteOrder(order.id);
                            deleteModal.style.display = "none";
                            await loadOrders();
                        } catch (error) {
                            console.error("Ошибка при удалении заказа:", error);
                            alert("Не удалось удалить заказ. Попробуйте позже.");
                        }
                    });
                });

            ordersTable.appendChild(row);
        }
    }

    async function loadOrders() {
        const orders = await fetchOrders();

        const allDishIds = orders.flatMap(order => [
            order.main_course_id,
            order.drink_id,
            order.salad_id,
            order.soup_id,
            order.dessert_id
        ]).filter(Boolean);

        const dishDictionary = await fetchDishesByIds(allDishIds);

        const sortedOrders = orders.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        renderOrdersOptimized(sortedOrders, dishDictionary);
    }

    loadOrders();
});