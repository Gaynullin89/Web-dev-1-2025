const menu = {
    "Супы": [
        { name: "Томатный суп", price: 350, quantity: "300 мл", image: "img/13.webp", kind: "meat" },
        { name: "Рамен", price: 420, quantity: "400 мл", image: "img/14.webp", kind: "fish" },
        { name: "Том ям", price: 470, quantity: "400 мл", image: "img/15.webp", kind: "fish" },
        { name: "Грибной крем-суп", price: 330, quantity: "300 мл", image: "img/27.webp", kind: "veg" },
        { name: "Свекольный суп", price: 300, quantity: "350 мл", image: "img/21.webp", kind: "meat" },
        { name: "Гаспачо", price: 310, quantity: "300 мл", image: "img/25.webp", kind: "veg" }
    ],

    "Вторые блюда": [
        { name: "Плов", price: 380, quantity: "350 г", image: "img/16.webp", kind: "meat" },
        { name: "Пюре с котлетой", price: 340, quantity: "350 г", image: "img/30.webp", kind: "meat" },
        { name: "Макароны по-флотски", price: 360, quantity: "350 г", image: "img/17.webp", kind: "fish" },
        { name: "Стейк лосося", price: 520, quantity: "250 г", image: "img/12.webp", kind: "fish" },
        { name: "Овощное рагу", price: 300, quantity: "300 г", image: "img/26.webp", kind: "veg" },
        { name: "Запеканка из овощей", price: 310, quantity: "300 г", image: "img/28.webp", kind: "veg" }
    ],

    "Салаты и стартеры": [
        { name: "Салат с тунцом", price: 350, quantity: "150 г", image: "img/24.webp", kind: "fish" },
        { name: "Греческий салат", price: 420, quantity: "120 г", image: "img/29.webp", kind: "meat" },
        { name: "Овощной салат", price: 260, quantity: "150 г", image: "img/22.webp", kind: "veg" },
        { name: "Салат с авокадо", price: 290, quantity: "150 г", image: "img/4.webp", kind: "veg" },
        { name: "Брускетта с помидорами", price: 240, quantity: "120 г", image: "img/23.webp", kind: "veg" },
        { name: "Цезарь", price: 270, quantity: "150 г", image: "img/31.webp", kind: "veg" }
    ],

    "Десерты": [
        { name: "Медовик", price: 160, quantity: "80 г", image: "img/18.webp", kind: "small" },
        { name: "Маленький эклер", price: 140, quantity: "70 г", image: "img/2.webp", kind: "small" },
        { name: "Порция мороженого", price: 150, quantity: "80 г", image: "img/9.webp", kind: "small" },
        { name: "Тирамису", price: 290, quantity: "150 г", image: "img/19.webp", kind: "medium" },
        { name: "Похлава", price: 270, quantity: "150 г", image: "img/33.webp", kind: "medium" },
        { name: "Шоколадный торт", price: 480, quantity: "300 г", image: "img/3.webp", kind: "large" }
    ],

    "Напитки": [
        { name: "Чай", price: 230, quantity: "400 мл", image: "img/5.webp", kind: "hot" },
        { name: "Капучино", price: 300, quantity: "400 мл", image: "img/7.webp", kind: "hot" },
        { name: "Эспрессо", price: 200, quantity: "80 мл", image: "img/6.webp", kind: "hot" },
        { name: "Яблочный сок", price: 240, quantity: "400 мл", image: "img/8.webp", kind: "cold" },
        { name: "Свежевыжатый апельсиновый", price: 260, quantity: "350 мл", image: "img/11.webp", kind: "cold" },
        { name: "Лимонад", price: 220, quantity: "400 мл", image: "img/1.webp", kind: "cold" }
    ]
};

// === ОПИСАНИЕ ФИЛЬТРОВ ДЛЯ КАЖДОЙ КАТЕГОРИИ ===
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

// === ГЕНЕРАЦИЯ КАРТОЧЕК С ФИЛЬТРАМИ ===
const mainContainer = document.getElementById('dishes_container');
mainContainer.innerHTML = ""; // очищаем старое содержимое

for (const categoryName in menu) {
    const category = menu[categoryName];

    const section = document.createElement('section');
    section.classList.add('dishes_section');
    section.dataset.category = categoryName;

    // Заголовок
    const h2 = document.createElement('h2');
    h2.textContent = categoryName;
    section.appendChild(h2);

    // Блок фильтров
    const filtersDiv = document.createElement('div');
    filtersDiv.classList.add('filters');

    const cfg = filtersConfig[categoryName];
    if (cfg && cfg.length) {
        cfg.forEach(f => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.classList.add('filter-btn');
            btn.textContent = f.label;
            btn.dataset.kind = f.kind; // data-kind = значение фильтра на английском
            btn.addEventListener('click', () => handleFilterClick(section, f.kind, btn));
            filtersDiv.appendChild(btn);
        });
    }

    section.appendChild(filtersDiv);

    // Контейнер карточек
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('dishes_category');
    section.appendChild(categoryContainer);

    // создаём карточки
    category.forEach(dish => {
        const card = document.createElement('div');
        card.classList.add('dish_card');
        card.dataset.kind = dish.kind; // пометка карточки для фильтрации

        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="middle_part">
                <p class="dish_price">${dish.price} &#x20bd;</p>
                <p class="dish_name">${dish.name}</p>
            </div>
            <div class="lower_part">
                <p class="dish_quantity">${dish.quantity}</p>
                <button type="button">Добавить</button>
            </div>
        `;

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => handleAddDish(categoryName, dish.name));

        categoryContainer.appendChild(card);
    });

    mainContainer.appendChild(section);
}

// === ФОРМА (селекты) ===
const formLeftSide = document.querySelector('.left-side');

// создаём селекты
function createFormSelects() {
    formLeftSide.innerHTML = ""; // чистим, если что-то было
    for (const categoryName in menu) {
        const inputItem = document.createElement('div');
        inputItem.classList.add('input-item');

        const fieldName = categoryName.toLowerCase().replace(/\s+/g, '_');
        const label = document.createElement('label');
        label.textContent = categoryName;
        label.setAttribute('for', fieldName);

        const select = document.createElement('select');
        select.name = fieldName;
        select.id = fieldName;

        const placeholder = document.createElement('option');
        placeholder.textContent = "— не выбрано —";
        placeholder.value = "";
        select.appendChild(placeholder);

        // опции из меню
        menu[categoryName].forEach(dish => {
            const option = document.createElement('option');
            option.value = dish.name;
            option.textContent = dish.name;
            select.appendChild(option);
        });

        // при смене выбора — обновляем сумму
        select.addEventListener('change', updateTotalPrice);

        inputItem.appendChild(label);
        inputItem.appendChild(select);
        formLeftSide.appendChild(inputItem);
    }

    // комментарий
    const commentItem = document.createElement('div');
    commentItem.classList.add('input-item');
    commentItem.innerHTML = `
        <label for="comment">Комментарий</label>
        <textarea name="comment" placeholder="место для текста"></textarea>
    `;
    formLeftSide.appendChild(commentItem);

    // добавляем блок для суммы
    const totalDiv = document.createElement('div');
    totalDiv.id = "total_price";
    totalDiv.textContent = "Общая сумма: 0 ₽";
    totalDiv.style.marginTop = "15px";
    totalDiv.style.fontWeight = "bold";
    totalDiv.style.fontSize = "18px";
    formLeftSide.appendChild(totalDiv);
}

createFormSelects();

// === ДОБАВЛЕНИЕ ИЗ КАРТОЧКИ ===
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

// === ПОДСЧЁТ ОБЩЕЙ СУММЫ ===
function updateTotalPrice() {
    let total = 0;

    // проходим по всем категориям
    for (const categoryName in menu) {
        const fieldName = categoryName.toLowerCase().replace(/\s+/g, '_');
        const select = document.querySelector(`select[name="${fieldName}"]`);
        if (!select) continue;
        const chosen = select.value;

        if (chosen) {
            const dish = menu[categoryName].find(d => d.name === chosen);
            if (dish) total += dish.price;
        }
    }

    // обновляем отображение
    const totalDiv = document.getElementById("total_price");
    if (totalDiv) totalDiv.textContent = `Общая сумма: ${total} ₽`;
}

// === ФИЛЬТРАЦИЯ ===
function handleFilterClick(section, kind, clickedBtn) {
    const filtersDiv = section.querySelector('.filters');
    const buttons = Array.from(filtersDiv.querySelectorAll('.filter-btn'));

    const isActive = clickedBtn.classList.contains('active');

    // сбрасываем все активные (мы поддерживаем один активный фильтр в категории)
    buttons.forEach(b => b.classList.remove('active'));

    const categoryContainer = section.querySelector('.dishes_category');
    const cards = Array.from(categoryContainer.querySelectorAll('.dish_card'));

    if (isActive) {
        // если был активен — убираем фильтр и показываем все
        cards.forEach(c => c.style.display = '');
    } else {
        // активируем выбранную кнопку
        clickedBtn.classList.add('active');
        // показываем только соответствующие kind
        cards.forEach(c => {
            if (c.dataset.kind === kind) {
                c.style.display = '';
            } else {
                c.style.display = 'none';
            }
        });
    }
}

// === СБРОС ФОРМЫ ===
const form = document.querySelector('form');
form.addEventListener('reset', () => {
    setTimeout(updateTotalPrice, 100);
});

// === Дополнительно: если динамически нужно сбросить фильтры (например, сброс формы) - не обязателно, но можно:
form.addEventListener('reset', () => {
    // показываем все карточки после сброса формы
    document.querySelectorAll('.dishes_section').forEach(section => {
        section.querySelectorAll('.dish_card').forEach(c => c.style.display = '');
        section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    });
});