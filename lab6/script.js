const menu = {
    "Супы": [
        { name: "Томатный суп", price: 350, quantity: "300 мл", image: "img/i (1).webp", kind: "meat" },
        { name: "Рамен", price: 420, quantity: "400 мл", image: "img/i (2).webp", kind: "fish" },
        { name: "Том ям", price: 470, quantity: "400 мл", image: "img/i (3).webp", kind: "fish" },
        { name: "Грибной крем-суп", price: 330, quantity: "300 мл", image: "img/i (6).webp", kind: "veg" },
        { name: "Свекольный суп", price: 300, quantity: "350 мл", image: "img/i (8).webp", kind: "meat" },
        { name: "Гаспачо", price: 310, quantity: "300 мл", image: "img/i (7).webp", kind: "veg" }
    ],

    "Вторые блюда": [
        { name: "Плов", price: 380, quantity: "350 г", image: "img/i (4).webp", kind: "meat" },
        { name: "Пюре с котлетой", price: 340, quantity: "350 г", image: "img/XXL.jpg", kind: "meat" },
        { name: "Макароны по-флотски", price: 360, quantity: "350 г", image: "img/i (5).webp", kind: "fish" },
        { name: "Стейк лосося", price: 520, quantity: "250 г", image: "img/i (2).webp", kind: "fish" },
        { name: "Овощное рагу", price: 300, quantity: "300 г", image: "img/i (6).webp", kind: "veg" },
        { name: "Запеканка из овощей и киноа", price: 310, quantity: "300 г", image: "img/i (7).webp", kind: "veg" }
    ],

    "Салаты и стартеры": [
        { name: "Салат с тунцом", price: 350, quantity: "150 г", image: "img/i (3).webp", kind: "fish" },
        { name: "Карпаччо из говядины", price: 420, quantity: "120 г", image: "img/i (4).webp", kind: "meat" },
        { name: "Овощной салат", price: 260, quantity: "150 г", image: "img/i (6).webp", kind: "veg" },
        { name: "Салат с киноа и авокадо", price: 290, quantity: "150 г", image: "img/i (7).webp", kind: "veg" },
        { name: "Брускетта с помидорами", price: 240, quantity: "120 г", image: "img/i (8).webp", kind: "veg" },
        { name: "Греческий салат", price: 270, quantity: "150 г", image: "img/i (1).webp", kind: "veg" }
    ],

    "Десерты": [
        { name: "Маленький чизкейк", price: 160, quantity: "80 г", image: "img/i (6).webp", kind: "small" },
        { name: "Маленький эклер", price: 140, quantity: "70 г", image: "img/i (7).webp", kind: "small" },
        { name: "Маленькая порция мороженого", price: 150, quantity: "80 г", image: "img/i (8).webp", kind: "small" },
        { name: "Тирамису (среднее)", price: 290, quantity: "150 г", image: "img/i (7).webp", kind: "medium" },
        { name: "Пахлава (среднее)", price: 270, quantity: "150 г", image: "img/i (8).webp", kind: "medium" },
        { name: "Большой торт шоколадный", price: 480, quantity: "300 г", image: "img/i (5).webp", kind: "large" }
    ],

    "Напитки": [
        { name: "Чай", price: 230, quantity: "400 мл", image: "img/15517b7ec5f50d84530dc26e023e0b5e.jpg", kind: "hot" },
        { name: "Капучино", price: 300, quantity: "400 мл", image: "img/ae75829ab45fb6769e277fbf91d79b8f.jpeg", kind: "hot" },
        { name: "Эспрессо", price: 200, quantity: "80 мл", image: "img/ae75829ab45fb6769e277fbf91d79b8f.jpeg", kind: "hot" },
        { name: "Яблочный сок", price: 240, quantity: "400 мл", image: "img/close-up-orange-juice-glass-table_1048944-16132466.jpg", kind: "cold" },
        { name: "Свежевыжатый апельсиновый", price: 260, quantity: "350 мл", image: "img/close-up-orange-juice-glass-table_1048944-16132466.jpg", kind: "cold" },
        { name: "Лимонад", price: 220, quantity: "400 мл", image: "img/15517b7ec5f50d84530dc26e023e0b5e.jpg", kind: "cold" }
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

// === ПРОВЕРКА ФОРМЫ ПРИ ОТПРАВКЕ ===
const form = document.querySelector('#booking_form form');
form.addEventListener('submit', function(event) {
    const requiredCategories = ['Супы', 'Вторые блюда', 'Салаты и стартеры', 'Напитки']; // десерты опциональны
    let missing = [];

    requiredCategories.forEach(cat => {
        const fieldName = cat.toLowerCase().replace(/\s+/g, '_');
        const select = document.querySelector(`select[name="${fieldName}"]`);
        if (select && !select.value) {
            missing.push(cat);
        }
    });

    if (missing.length > 0) {
        event.preventDefault();
        showNotification(missing);
    }
});

// === УВЕДОМЛЕНИЕ ===
function showNotification(missing) {
    const modal = document.createElement('div');
    modal.classList.add('notification');

    // Поскольку указано 5 видов, но деталей нет, используем общее уведомление (можно расширить на разные классы/стили для 5 случаев, если нужно)
    const message = `Пожалуйста, добавьте следующие блюда: ${missing.join(', ')}`;

    modal.innerHTML = `
        <p>${message}</p>
        <button>Окей</button>
    `;

    document.body.appendChild(modal);

    const btn = modal.querySelector('button');
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = 'tomato';
        btn.style.color = 'white';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
    btn.addEventListener('click', () => {
        modal.remove();
    });
}

// === СБРОС ФОРМЫ ===
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