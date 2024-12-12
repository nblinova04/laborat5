const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(1);

// При клике на иконку hamb вызываем ф-ию hambHandler
hamb.addEventListener("click", hambHandler);

// Выполняем действия при клике ..
function hambHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

// Здесь мы рендерим элементы в наш попап
function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

const events = [
  { id: 1, name: "Очень [данные удалены] квест", category: "Универ", description: "Крутой, наполненный самыми разными эмоциями квест.", rating: 0, feedback: [] },
  { id: 2, name: "Городское фестиваль молодежи", category: "Город", description: "Творческие работы студентов.", rating: 0, feedback: [] },
  { id: 2, name: "Форум Айда на урал", category: "Округ", description: "Три незабываемых дня в Магнитогорске", rating: 0, feedback: [] },

];

function filterEvents() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;

  const filteredEvents = events.filter(event => {
      const matchesName = event.name.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
      return matchesName && matchesCategory;
  });

  displayEvents(filteredEvents);
}

function displayEvents(eventsToDisplay) {
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = ''; // Очистить предыдущий вывод

  eventsToDisplay.forEach(event => {
      const eventContainer = document.createElement('div');
      eventContainer.className = 'event';
      eventContainer.innerHTML = `
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <p>Рейтинг: ${event.rating.toFixed(1)}</p>
          <button onclick="addFeedback(${event.id}, prompt('Ваш отзыв:'), parseInt(prompt('Сколько звезд (1-5)?')))" style="background-color: #9900FF; border-radius: 50px; padding: 7px 15px; color: white; border: none;">Оставить отзыв</button>
      `;
      eventsList.appendChild(eventContainer);
  });
}

function addFeedback(eventId, feedback, stars) {
  if (feedback && stars >= 1 && stars <= 5) {
      const event = events.find(e => e.id === eventId);
      if (event) {
          event.feedback.push(feedback);
          event.rating = (event.rating * event.feedback.length + stars) / (event.feedback.length + 1);
          saveEventsToLocalStorage();
          displayEvents(events);
      }
  } else {
      alert("Некорректные данные.");
  }
}

function saveEventsToLocalStorage() {
  localStorage.setItem('events', JSON.stringify(events));
}

function loadEventsFromLocalStorage() {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events = JSON.parse(storedEvents);
  }
}



// Инициализация отображения событий
displayEvents(events);
loadEventsFromLocalStorage();