const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

$(document).ready(function() {
	$('#registrationForm').submit(function(event) {
	  event.preventDefault(); // Предотвращаем стандартное поведение формы

      const nickname = $('#regLogin').val();
	  const email = $('#regEmail').val();
	  const password = $('#regPassword').val();
  
	  $.ajax({
		type: 'POST',
		url: '/registration', // URL, на который отправляем запрос
		contentType: 'application/json',
		data: JSON.stringify({ nickname: nickname, email: email, password: password }), // Данные для отправки
		success: function(response) {
		  alert(response.message); // Выводим сообщение об успешной регистрации
		  // Можно перенаправить пользователя на другую страницу или выполнить другие действия
		},
		error: function(xhr, status, error) {
		  const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Ошибка сервера';
		  console.log("nickname:", nickname);
		  console.log("mail:", email);
	  	  console.log("password:", password);
		  alert(errorMessage); // Выводим сообщение об ошибке
		}
	  });
	});
  });

  $(document).ready(function() {
	$('#authorizationForm').submit(function(event) {
	  event.preventDefault(); // Предотвращаем стандартное поведение формы
  
	  const email = $('#authEmail').val();
	  const password = $('#authPassword').val();
  
	  $.ajax({
		type: 'POST',
		url: '/authorization', // URL, на который отправляем запрос
		contentType: 'application/json',
		data: JSON.stringify({ email: email, password: password }), // Данные для отправки
		success: function(response) {
		  alert(response.message); // Выводим сообщение об успешной регистрации
		  window.location.href = '/';
		},
		error: function(xhr, status, error) {
		  const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Ошибка сервера';
		  console.log("mail:", email);
	  	  console.log("password:", password);
		  alert(errorMessage); // Выводим сообщение об ошибке
		}
	  });
	});
  });
  