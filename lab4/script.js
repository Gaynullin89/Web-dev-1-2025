// === ДАННЫЕ МЕНЮ ===
const menu = {
    "Супы": [
        { name: "Томатный суп", price: 350, quantity: "300 мл", image: "img/i (1).webp" },
        { name: "Рамен", price: 420, quantity: "400 мл", image: "img/i (2).webp" },
        { name: "Том ям", price: 470, quantity: "400 мл", image: "img/i (3).webp" }
    ],
    "Вторые блюда": [
        { name: "Плов", price: 380, quantity: "350 г", image: "img/i (4).webp" },
        { name: "Пюре с котлетой", price: 340, quantity: "350 г", image: "img/XXL.jpg" },
        { name: "Макароны по-флотски", price: 360, quantity: "350 г", image: "img/i (5).webp" }
    ],
    "Десерты": [
        { name: "Медовик", price: 260, quantity: "150 г", image: "img/i (6).webp" },
        { name: "Тирамису", price: 290, quantity: "150 г", image: "img/i (7).webp" },
        { name: "Пахлава", price: 270, quantity: "150 г", image: "img/i (8).webp" }
    ],
    "Напитки": [
        { name: "Чай", price: 230, quantity: "400 мл", image: "img/15517b7ec5f50d84530dc26e023e0b5e.jpg" },
        { name: "Яблочный сок", price: 240, quantity: "400 мл", image: "img/close-up-orange-juice-glass-table_1048944-16132466.jpg" },
        { name: "Капучино", price: 300, quantity: "400 мл", image: "img/ae75829ab45fb6769e277fbf91d79b8f.jpeg" }
    ]
};

// === ГЕНЕРАЦИЯ КАРТОЧЕК ===
const mainContainer = document.getElementById('dishes_container');
mainContainer.innerHTML = ""; // очищаем старое содержимое

for (const categoryName in menu) {
    const category = menu[categoryName];

    const section = document.createElement('div');
    section.classList.add('dishes_section');
    section.innerHTML = `
        <h2>${categoryName}</h2>
        <div class="dishes_category"></div>
    `;

    const categoryContainer = section.querySelector('.dishes_category');

    category.forEach(dish => {
        const card = document.createElement('div');
        card.classList.add('dish_card');
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

// === ФОРМА ===
const formLeftSide = document.querySelector('.left-side');

// создаём селекты
function createFormSelects() {
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
        const chosen = select.value;

        if (chosen) {
            const dish = menu[categoryName].find(d => d.name === chosen);
            if (dish) total += dish.price;
        }
    }

    // обновляем отображение
    const totalDiv = document.getElementById("total_price");
    totalDiv.textContent = `Общая сумма: ${total} ₽`;
}

// === СБРОС ФОРМЫ ===
const form = document.querySelector('form');
form.addEventListener('reset', () => {
    setTimeout(updateTotalPrice, 100);
});
