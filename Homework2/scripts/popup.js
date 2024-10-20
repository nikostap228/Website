// Функция для отображения плашки
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex'; // Показываем плашку
}

// Функция для скрытия плашки
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Скрываем плашку
}

// Функция для валидации номера телефона
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneInput');
    const errorMessage = document.getElementById('errorMessage');

    if (phoneInput.value.length < 11) {
        errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
    } else {
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
        closePopup(); // Закрываем плашку, если номер корректен
    }
}

// Показ плашки при загрузке страницы с задержкой
window.onload = function() {
    // Задержка перед показом плашки (например, 1 секунда)
    setTimeout(function() {
        showPopup();
    }, 100); // Показ плашки через 100 мс

    // Добавляем обработчик события на кнопку закрытия
    document.getElementById('closePopup').addEventListener('click', validatePhoneNumber);
};
