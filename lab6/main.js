const menuEl = document.getElementById("menu");
const navBtns = document.querySelectorAll("#nav button");
const slots = document.querySelectorAll(".slot");
const priceEl = document.getElementById("price");
const submitBtn = document.getElementById("submit");

let activeSlot = null;

dishes.sort((a, b) => a.name.localeCompare(b.name));
//  УВЕДОМЛЕНИЕ
function showNotify(message) {
  const notify = document.getElementById("notify");
  const text = document.getElementById("notify-text");
  const ok = document.getElementById("notify-ok");

  text.textContent = message;
  notify.classList.remove("hidden");

  const close = () => {
    notify.classList.add("hidden");
    ok.removeEventListener("click", close);
  };

  ok.addEventListener("click", close);
}

// создаём карточку
function createCard(dish) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <h3>${dish.name}</h3>
    <p>${dish.price} ₽</p>
    <button type="button">Выбрать</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    if (!activeSlot) {
      showNotify("Сначала выберите слот в комбо!");
      return;
    }

    if (activeSlot.dataset.type !== dish.category) {
      showNotify("Это блюдо нельзя поместить в этот раздел!");
      return;
    }

    activeSlot.dataset.item = dish.keyword;
    activeSlot.textContent = `${activeSlot.dataset.type}: ${dish.name}`;
    activeSlot.classList.add("filled");

    updatePrice();
  });

  return card;
}

// отображение меню
function renderMenu() {
  menuEl.innerHTML = "";
  const cats = ["Суп", "Главное", "Салат", "Напиток"];
  cats.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "menu-section";
    section.dataset.cat = cat;
    if (cat !== "Суп") section.classList.add("hidden");

    const row = document.createElement("div");
    row.className = "cards-row";

    dishes
      .filter((d) => d.category === cat)
      .forEach((d) => row.append(createCard(d)));

    section.append(row);
    menuEl.append(section);
  });
}

renderMenu();

// навигация
navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;

    document.querySelectorAll(".menu-section").forEach((sec) => {
      if (sec.dataset.cat === cat) sec.classList.remove("hidden");
      else sec.classList.add("hidden");
    });
  });
});

// выбор слота
slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    slots.forEach((s) => s.classList.remove("selected"));
    slot.classList.add("selected");
    activeSlot = slot;
  });
});

// пересчет цены
function updatePrice() {
  let total = 0;

  slots.forEach((slot) => {
    if (slot.dataset.item) {
      const dish = dishes.find((d) => d.keyword === slot.dataset.item);
      total += dish.price;
    }
  });

  priceEl.textContent = total;
}

// отправка
document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const filled = [...slots].every((s) => s.dataset.item);
  if (!filled) {
    showNotify("Выберите все позиции комбо!");
    return;
  }

  const order = {
    name: e.target.username.value,
    phone: e.target.phone.value,
    combo: [...slots].map((s) => s.textContent),
    total: priceEl.textContent,
  };

  console.log(order);
  showNotify("Комбо оформлено! Свой заказ вы можете просмотреть в консоли.");
});
