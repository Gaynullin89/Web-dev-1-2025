// === URL API ===
const API_URL =
    "http://lab7-api.std-900.ist.mospolytech.ru/api/dishes";
// Для Netlify / GitHub Pages можно использовать это:
// const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

let dishesData = [];   // все блюда из API
let menu = {};         // блюда, сгруппированные по категориям


// === 1. ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ===
async function loadDishes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Ошибка загрузки данных");

        dishesData = await response.json();

        // группируем блюда по категориям, чтобы структура была как раньше
        menu = {};
        dishesData.forEach(dish => {
            const rusCategory = categoryMap[dish.category] || dish.category;
            if (!menu[rusCategory]) menu[rusCategory] = [];
            menu[rusCategory].push({
                name: dish.name,
                price: dish.price,
                quantity: dish.count,
                image: dish.image,
                kind: dish.kind,
                keyword: dish.keyword
            });
        });

        buildPage(); // строим страницу после загрузки

    } catch (e) {
        console.error("Ошибка:", e);
        document.getElementById("dishes_container").innerHTML =
            "<p style='color:red'>Ошибка загрузки данных с сервера</p>";
    }
}


// соответствие английских категорий API → русские названия
const categoryMap = {
    soup: "Супы",
    main: "Вторые блюда",
    salad: "Салаты и стартеры",
    dessert: "Десерты",
    drink: "Напитки"
};


// ● ● ● ● ● ●  ФИЛЬТРЫ как в твоём коде  ● ● ● ● ● ●
const filtersConfig = {
    "Супы": [
        { label: "рыбный", kind: "fish" },
        { label: "мясной", kind: "meat" },
        { label: "вегетарианский", kind: "veg" }
    ],
    "Вторые блюда": [
        { label: "рыбное", kind: "fish" },
        { label: "мясное", kind: "meat" },
        { label: "вегетарианское", kind: "veg" }
    ],
    "Салаты и стартеры": [
        { label: "рыбный", kind: "fish" },
        { label: "мясной", kind: "meat" },
        { label: "вегетарианский", kind: "veg" }
    ],
    "Напитки": [
        { label: "холодный", kind: "cold" },
        { label: "горячий", kind: "hot" }
    ],
    "Десерты": [
        { label: "маленькая порция", kind: "small" },
        { label: "средняя порция", kind: "medium" },
        { label: "большая порция", kind: "large" }
    ]
};


// === 2. ПОСТРОЕНИЕ ВСЕЙ СТРАНИЦЫ ===
function buildPage() {
    buildCards();
    createFormSelects();
}


// === 3. СОЗДАНИЕ КАРТОЧЕК БЛЮД ===
function buildCards() {
    const mainContainer = document.getElementById('dishes_container');
    mainContainer.innerHTML = "";

    for (const categoryName in menu) {
        const category = menu[categoryName];

        const section = document.createElement('section');
        section.classList.add('dishes_section');
        section.dataset.category = categoryName;

        const h2 = document.createElement('h2');
        h2.textContent = categoryName;
        section.appendChild(h2);

        // фильтры
        const filtersDiv = document.createElement('div');
        filtersDiv.classList.add('filters');

        const cfg = filtersConfig[categoryName];
        if (cfg && cfg.length) {
            cfg.forEach(f => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.classList.add('filter-btn');
                btn.textContent = f.label;
                btn.dataset.kind = f.kind;
                btn.addEventListener('click', () => handleFilterClick(section, f.kind, btn));
                filtersDiv.appendChild(btn);
            });
        }
        section.appendChild(filtersDiv);

        // карточки блюд
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('dishes_category');

        category.forEach(dish => {
            const card = document.createElement('div');
            card.classList.add('dish_card');
            card.dataset.kind = dish.kind;

            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <div class="middle_part">
                    <p class="dish_price">${dish.price} ₽</p>
                    <p class="dish_name">${dish.name}</p>
                </div>
                <div class="lower_part">
                    <p class="dish_quantity">${dish.quantity}</p>
                    <button type="button">Добавить</button>
                </div>
            `;

            card.querySelector('button').addEventListener('click', () =>
                handleAddDish(categoryName, dish.name)
            );

            categoryContainer.appendChild(card);
        });

        section.appendChild(categoryContainer);
        mainContainer.appendChild(section);
    }
}


// === 4. ФОРМА ===
const formLeftSide = document.querySelector('.left-side');

function createFormSelects() {
    formLeftSide.innerHTML = "";

    for (const categoryName in menu) {
        const inputItem = document.createElement('div');
        inputItem.classList.add('input-item');

        const fieldName = categoryName.toLowerCase().replace(/\s+/g, '_');
        const label = document.createElement('label');
        label.textContent = categoryName;

        const select = document.createElement('select');
        select.name = fieldName;

        const placeholder = document.createElement('option');
        placeholder.value = "";
        placeholder.textContent = "— не выбрано —";
        select.appendChild(placeholder);

        menu[categoryName].forEach(dish => {
            const opt = document.createElement('option');
            opt.value = dish.name;
            opt.textContent = dish.name;
            select.appendChild(opt);
        });

        select.addEventListener('change', updateTotalPrice);

        inputItem.appendChild(label);
        inputItem.appendChild(select);
        formLeftSide.appendChild(inputItem);
    }

    // комментарий
    const commentItem = document.createElement('div');
    commentItem.classList.add('input-item');
    commentItem.innerHTML = `
        <label>Комментарий</label>
        <textarea name="comment" placeholder="место для текста"></textarea>
    `;
    formLeftSide.appendChild(commentItem);

    // сумма
    const totalDiv = document.createElement('div');
    totalDiv.id = "total_price";
    totalDiv.textContent = "Общая сумма: 0 ₽";
    formLeftSide.appendChild(totalDiv);
}


// === 5. ДОБАВЛЕНИЕ БЛЮДА ИЗ КАРТОЧКИ ===
function handleAddDish(category, dishName) {
    const select = document.querySelector(
        `select[name="${category.toLowerCase().replace(/\s+/g, '_')}"]`
    );

    if (select) {
        select.value = dishName;
        select.classList.add('highlight');
        setTimeout(() => select.classList.remove('highlight'), 800);
        updateTotalPrice();
    }
}


// === 6. СУММА ===
function updateTotalPrice() {
    let total = 0;

    for (const category in menu) {
        const name = category.toLowerCase().replace(/\s+/g, '_');
        const select = document.querySelector(`select[name="${name}"]`);
        const selected = select?.value;

        if (selected) {
            const dish = menu[category].find(d => d.name === selected);
            if (dish) total += dish.price;
        }
    }

    document.getElementById("total_price").textContent =
        `Общая сумма: ${total} ₽`;
}


// === 7. ФИЛЬТРАЦИЯ ===
function handleFilterClick(section, kind, btn) {
    const allBtns = section.querySelectorAll('.filter-btn');

    const active = btn.classList.contains('active');
    allBtns.forEach(b => b.classList.remove('active'));

    const cards = section.querySelectorAll('.dish_card');

    if (active) {
        cards.forEach(c => c.style.display = "");
        return;
    }

    btn.classList.add('active');

    cards.forEach(c => {
        c.style.display = (c.dataset.kind === kind) ? "" : "none";
    });
}


// === 8. ПРОВЕРКА ФОРМЫ ===
const form = document.querySelector('#booking_form form');

form.addEventListener('submit', function (event) {
    const required = ["Супы", "Вторые блюда", "Салаты и стартеры", "Напитки"];
    let missing = [];

    required.forEach(cat => {
        const name = cat.toLowerCase().replace(/\s+/g, '_');
        const select = document.querySelector(`select[name="${name}"]`);
        if (!select.value) missing.push(cat);
    });

    if (missing.length) {
        event.preventDefault();
        showNotification(missing);
    }
});

function showNotification(missing) {
    const modal = document.createElement('div');
    modal.classList.add('notification');

    modal.innerHTML = `
        <p>Пожалуйста, добавьте: ${missing.join(', ')}</p>
        <button>Окей</button>
    `;

    document.body.appendChild(modal);
    modal.querySelector('button').onclick = () => modal.remove();
}


// === 9. СБРОС ===
form.addEventListener('reset', () => {
    setTimeout(updateTotalPrice, 100);
});


// === 10. СТАРТ: загружаем блюда ===
loadDishes();