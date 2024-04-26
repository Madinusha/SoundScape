const id = document.getElementById('userNumber');
const nickname = document.getElementById('nickname');
const email = document.getElementById('email');
const type = document.getElementById('type');

$(document).ready(function() {
    // Отправляем AJAX запрос на сервер для получения данных
    $.ajax({
        url: '/profileInfo',
        method: 'GET',
        success: function(data) {
            id.innerText = data.id;
            nickname.innerText = data.nickname;
            type.innerText = data.type;
            email.innerText = data.email;
        },
        error: function(err) {
            console.error('Ошибка при получении данных пользователя:', err);
        }
    });
});