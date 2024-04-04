const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const port = 3002; // Порт, на котором хотиv запустить сервер

const db = new sqlite3.Database('./clients.db');

// Установка пути к статическим файлам (html, css, js)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Маршрут для отображения основной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для отображения страницы регистрации
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.post('/registration', (req, res) => {
  console.log("HERE");
  const { email, password } = req.body;
  console.log("Содержимое объекта req:", req.body);

  // Проверка наличия обязательных полей
  if (!email || !password) {
    return res.status(400).json({ error: 'Необходимо заполнить все поля' });
  }

  // Хэширование пароля
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Проверка наличия пользователя с таким email в базе данных
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    console.log("Результат запроса:", row);

    if (row) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Добавление нового пользователя в базу данных
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }

      return res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
    });
  });
});

// Слушаем порт 3000
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});