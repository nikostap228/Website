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
    const phoneNumber = phoneInput.value.trim();

    // Проверяем, что номер телефона соответствует маске
    const phonePattern = /^\+7 \(9\d{2}\) \d{3} \d{2} \d{2}$/;

    if (!phonePattern.test(phoneNumber)) {
        errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
        errorMessage.textContent = 'Введите корректный номер телефона в формате +7 (9__) ___ __ __';
    } else {
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
        closePopup(); // Закрываем плашку, если номер корректен
        sendPhoneNumber(phoneNumber); // Отправляем номер телефона на сервер
    }
}

// Функция для отправки номера телефона на сервер
function sendPhoneNumber(phoneNumber) {
    $.ajax({
        url: 'https://superrestik.onrender.com', // URL вашего API
        type: 'POST',
        data: { phone: phoneNumber }, // Данные для отправки
        success: function(response) {
            // Обработка успешного ответа сервера
            console.log('Ответ от сервера:', response);
            if (response.valid) {
                alert('Номер телефона успешно зарегистрирован!');
            } else {
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
                errorMessage.textContent = response.message;
            }
        },
        error: function(error) {
            console.error('Ошибка при отправке номера:', error);
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage.textContent = 'Ошибка при обработке запроса. Попробуйте позже.';
        }
    });
}

// Функция для применения маски при вводе
function applyPhoneMask(input) {
    let value = input.value.replace(/\D/g, ''); // Убираем все, кроме цифр
    let formattedValue = '+7 ';
    
    // Если первая цифра не 9, пользователь начал вводить не мобильный номер
    if (value.length > 1 && value[1] !== '9') {
        input.value = ''; // Очищаем поле
        return;
    }

    if (value.length > 1) {
        formattedValue += '(' + value.substring(1, 4);
    }
    if (value.length >= 5) {
        formattedValue += ') ' + value.substring(4, 7);
    }
    if (value.length >= 8) {
        formattedValue += ' ' + value.substring(7, 9);
    }
    if (value.length >= 10) {
        formattedValue += ' ' + value.substring(9, 11);
    }

    input.value = formattedValue;
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

    // Добавляем маску для ввода телефона
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('input', function () {
        applyPhoneMask(phoneInput);
    });
};
