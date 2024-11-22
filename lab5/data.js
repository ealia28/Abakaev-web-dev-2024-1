const dishesData = [
    { name: "Гаспачо", price: 195, weight: "350 г", 
        image: "products/soups/gazpacho.jpg", category: "soup",
        keyword: "gaspacho", kind: "veg" },
    { name: "Грибной суп-пюре", price: 185, weight: "330 г",
        image: "products/soups/mushroom_soup.jpg", category: "soup",
        keyword: "mushroom_soup", kind: "veg" },
    { name: "Норвежский суп", price: 270, weight: "330 г",
        image: "products/soups/norwegian_soup.jpg", category: "soup", 
        keyword: "norwegian_soup", kind: "fish" },
    { name: "Рамен", price: 375, weight: "425 г",
        image: "products/soups/ramen.jpg",
        category: "soup", keyword: "ramen_soup", kind: "meat"},
    { name: "Куринный суп", price: 330, weight: "350 г", 
        image: "products/soups/chicken.jpg", category: "soup",
        keyword: "chicken", kind: "meat" },
    { name: "Том ям с креветками", price: 650, weight: "500 г", 
        image: "products/soups/tomyum.jpg", category: "soup",
        keyword: "tomyum", kind: "fish" },
    { name: "Жареная картошка с грибами", price: 150, weight: "250 г",
        image: "products/main_course/friedpotatoeswithmushrooms1.jpg",
        category: "mainDish", keyword: "fried_potatoes", kind: "veg" },
    { name: "Лазанья", price: 385, weight: "310 г",
        image: "products/main_course/lasagna.jpg", 
        category: "mainDish", keyword: "lasagna", kind: "meat" },
    { name: "Котлеты из курицы с пюре", price: 225, weight: "280 г",
        image: "products/main_course/chickencutletsandmashedpotatoes.jpg", 
        category: "mainDish", keyword: "chicken_cutlets", kind: "meat" },
    { name: "Рыбная котлета с рисом и спаржей", price: 320, weight: "270 г",
        image: "products/main_course/fishrice.jpg", 
        category: "mainDish", keyword: "ricefish", kind: "fish"},
    { name: "Пицца Маргарита", price: 450, weight: "470 г",
        image: "products/main_course/pizza.jpg", 
        category: "mainDish", keyword: "pizza", kind: "veg"},
    { name: "Паста с креветками", price: 340, weight: "280 г",
        image: "products/main_course/shrimppasta.jpg", category: "mainDish",
        keyword: "shrimppasta", kind: "fish"},
    { name: "Апельсиновый сок", price: 120, weight: "300 мл",
        image: "products/beverages/orangejuice.jpg", 
        category: "drink", keyword: "orange_juice", kind: "cold" },
    { name: "Яблочный сок", price: 90, weight: "300 мл", 
        image: "products/beverages/applejuice.jpg",
        category: "drink", keyword: "apple_juice", kind: "cold" },
    { name: "Морковный сок", price: 110, weight: "300 мл", 
        image: "products/beverages/carrotjuice.jpg", 
        category: "drink", keyword: "carrot_juice", kind: "cold" },
    { name: "Капучино", price: 180, weight: "300 мл",
        image: "products/beverages/cappuccino.jpg", 
        category: "drink", keyword: "cappuccino", kind: "hot" },
    { name: "Зеленый чай", price: 100, weight: "300 мл",
        image: "products/beverages/greentea.jpg", 
        category: "drink", keyword: "greentea", kind: "hot" },
    { name: "Черный чай", price: 90, weight: "300 мл",
        image: "products/beverages/tea.jpg", 
        category: "drink", keyword: "black_tea", kind: "hot" },
    { name: "Корейский салат с овощами и яйцом", price: 330, weight: "250 г", 
        image: "products/salads_starters/saladwithegg.jpg", 
        category: "salad", keyword: "saladwithegg", kind: "veg" },
    { name: "Цезарь с цыпленком", price: 370, weight: "220 г", 
        image: "products/salads_starters/caesar.jpg", 
        category: "salad", keyword: "caesar", kind: "meat" },
    { name: "Капрезе с моцареллой", price: 350, weight: "235 г", 
        image: "products/salads_starters/caprese.jpg", 
        category: "salad", keyword: "caprese", kind: "veg" },
    { name: "Салат с тунцом", price: 480, weight: "250 г", 
        image: "products/salads_starters/tunasalad.jpg", 
        category: "salad", keyword: "tunasalad", kind: "fish" },
    { name: "Картофель фри с соусом Цезарь", price: 280, weight: "235 г", 
        image: "products/salads_starters/frenchfries1.jpg", 
        category: "salad", keyword: "frenchfries1", kind: "veg" },
    { name: "Картофель фри с кетчупом", price: 260, weight: "235 г", 
        image: "products/salads_starters/frenchfries2.jpg", 
        category: "salad", keyword: "frenchfries2", kind: "veg" },
    { name: "Пахлава", price: 220, weight: "125 г",
        image: "products/desserts/baklava.jpg",
        category: "dessert", keyword: "baklava", kind: "small"},
    { name: "Чизкейк", price: 240, weight: "125 г",
        image: "products/desserts/checheesecake.jpg",
        category: "dessert", keyword: "checheesecake", kind: "small"},
    { name: "Шоколадный чизкейк", price: 260, weight: "125 г",
        image: "products/desserts/chocolatecheesecake.jpg",
        category: "dessert", keyword: "chocolatecheesecake", kind: "small"},
    { name: "Шоколадный торт", price: 270, weight: "140 г",
        image: "products/desserts/chocolatecake.jpg",
        category: "dessert", keyword: "chocolatecake", kind: "medium"},
    { name: "Пончики (3 штуки)", price: 410, weight: "350 г",
        image: "products/desserts/donuts2.jpg",
        category: "dessert", keyword: "donuts2", kind: "meduim"},
    { name: "Пончики (6 штук)", price: 650, weight: "700 г",
        image: "products/desserts/donuts.jpg",
        category: "dessert", keyword: "donuts", kind: "big"}
];