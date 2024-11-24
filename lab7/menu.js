async function loadDishes() {
    try {
        const response = await fetch(
            'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes'
        );
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }
        const menu = await response.json();
        menu.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        console.log(menu);
        return menu;
    } catch (error) {
        console.error('Ошибка при загрузке блюд:', error);
        alert('Не удалось загрузить меню. Попробуйте обновить страницу.');
        return [];
    }
}

window.loadDishes = loadDishes;