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
    const phoneNumber = phoneInput.value.trim(); // Убираем пробелы в начале и конце

    // Проверяем, что строка содержит только цифры
    const isNumeric = /^[0-9]+$/.test(phoneNumber);

    if (phoneNumber.length < 11 || !isNumeric) {
        errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
        errorMessage.textContent = 'Введите корректный номер телефона (11 цифр)';
    } else {
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
        // Закрываем плашку, если номер корректен
        sendPhoneNumber(phoneNumber); // Отправляем номер телефона на сервер
    }
}

// Функция для отправки номера телефона на сервер
function sendPhoneNumber(phoneNumber) {
    $.ajax({
        url: 'https://superrestik.onrender.com/index.html',
        type: 'POST',
        data: { phone: phoneNumber }, // Данные для отправки
        success: function(response) {
            // Обработка успешного ответа сервера
            console.log('Ответ от сервера:', response);
            if (response.valid) {
                closePopup(); // Закрываем плашку, если номер корректен
                alert('Номер телефона успешно зарегистрирован!'); // Можете изменить это на свой текст
            } else {
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
                errorMessage.textContent = response.message; // Показываем сообщение от сервера
            }
        },
        error: function(error) {
            console.error('Ошибка при отправке номера:', error);
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage.textContent = 'Ошибка при обработке запроса. Попробуйте позже.'; // Сообщение об ошибке
        }
    });
}

// Показ плашки при загрузке страницы с задержкой
window.onload = function() {
    // Задержка перед показом плашки
    setTimeout(function() {
        showPopup();
    }, 10); // Показ плашки через 10 мс

    // Добавляем обработчик события на кнопку закрытия
    document.getElementById('closePopup').addEventListener('click', validatePhoneNumber);

    // Добавляем обработчик на крестик, чтобы просто закрывать плашку
    document.getElementById('closeIcon').addEventListener('click', closePopup);
};
