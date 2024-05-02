const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const port = 3002; // Порт, на котором хотиv запустить сервер

const dbСlients = new sqlite3.Database('./clients.db');
const dbMusic = new sqlite3.Database('./music.db');

// Установка пути к статическим файлам (html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для обслуживания аудиофайлов из папки music
app.use('/music', express.static(path.join(__dirname, 'music')));

app.use(express.json());

// Настройка сессий
app.use(session({
  secret: 'secret-key', // Замените на свой секретный ключ
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // В реальном приложении установите secure: true для HTTPS
}));

// Middleware для проверки аутентификации пользователя
function requireAuth(req, res, next) {
  if (req.session.userId) {
      // Пользователь аутентифицирован, продолжаем выполнение запроса
      next();
  } else {
      // Пользователь не аутентифицирован, перенаправляем на страницу входа или возвращаем ошибку
      res.status(401).json({ error: 'Требуется аутентификация.' });
  }
}

// Маршрут для выхода из аккаунта
app.post('/logout', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при завершении сессии.' });
        }
        res.clearCookie('sessionId'); // Очистить cookie с идентификатором сессии
        res.status(200).json({ message: 'Выход из аккаунта прошел успешно.' });
    });
  } 
  else {
      res.status(401).json({ error: 'Пользователь не авторизован.' });
  }
});

// Маршрут для отображения основной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для отображения страницы регистрации
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Защищенный маршрут, доступный только аутентифицированным пользователям
app.get('/profile', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profileInfo.html'));
});

app.get('/profileInfo', requireAuth, (req, res) => {
  const userId = req.session.userId;

  dbСlients.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных.' });
    }

    if (!row) {
        return res.status(400).json({ error: 'Неверный id.' });
    }

    // res.sendFile(path.join(__dirname, 'public', 'profileInfo.html'), {
    //   id: row.id,
    //   nickname: row.name,
    //   email: row.email,
    //   type: row.type
    // });
    res.status(200).json(row);
  });
});

// Обработка POST-запроса на авторизацию
app.post('/authorization', (req, res) => {
  const { email, password } = req.body;

  // Проверка наличия обязательных полей
  if (!email || !password) {
    return res.status(400).json({ error: 'Необходимо заполнить все поля' });
  }

  // Проверка наличия пользователя с таким email и password в базе данных
  dbСlients.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных.' });
      }

      if (!row) {
          return res.status(400).json({ error: 'Неверный email или пароль.' });
      }

      // Сравнение хэша пароля из базы данных с предоставленным паролем
      bcrypt.compare(password, row.password, (compareErr, isMatch) => {
        if (compareErr) {
            return res.status(500).json({ error: 'Ошибка при сравнении паролей.' });
        }

        if (!isMatch) {
            return res.status(400).json({ error: 'Неверный email или пароль.' });
        }

        if (row.isBlocked === 1) {
            return res.status(400).json({ error: 'Ваш аккаунт заблокирован.' });
        }

        // Если пароли совпадают, сохраняем идентификатор пользователя в сессии
        req.session.userId = row.id;
        return res.status(200).json({ message: 'Аутентификация прошла успешно.' });
    });
  });
});

// Обработка POST-запроса на регистрацию
app.post('/registration', (req, res) => {
  console.log(req.body)
  const { nickname, email, password } = req.body;

  // Проверка наличия обязательных полей
  if (!nickname || !email || !password) {
    return res.status(400).json({ error: 'Необходимо заполнить все поля' });
  }

  // Хэширование пароля
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Проверка наличия пользователя с таким email в базе данных
  dbСlients.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    console.log("Результат запроса:", row);

    if (row) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Добавление нового пользователя в базу данных
    // dbClients.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    dbСlients.run('INSERT INTO users (nickname, email, password, type, isBlocked) VALUES (?, ?, ?, ?, ?)', [nickname, email, hashedPassword, 'user', 0], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }

      return res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
    });
  });
});

// Маршрут для обработки запросов на поиск песен
app.get('/search', (req, res) => {
  const searchTerm = req.query.term; // Получаем текст поискового запроса из параметра запроса

  if (!searchTerm) {
      res.status(400).json({ error: 'Ошибка поиска' });
  }

  // Используем параметризированный SQL-запрос для поиска песен
  const sql = `SELECT * FROM tracks WHERE name LIKE ?`;
  const query = `%${searchTerm}%`; // Поиск частичного совпадения

  dbMusic.all(sql, [query], (err, rows) => {
      if (err) {
          res.status(500).json({ error: 'Ошибка запроса' });
      } else {
          if (rows.length > 0) {
              // Если найдены песни, отправляем их клиенту
              res.status(400).json(rows);
          } else {
              // Если ничего не найдено, отправляем сообщение
              res.status(400).json({ error: 'Ничего не найдено.' });
          }
      }
  });
});

// Маршрут для обработки запросов на добавление песни в "Мои треки"
app.post('/add', requireAuth, (req, res) => {
  const { trackId } = req.body;
  const userId = req.session.userId;
 
  console.log(`Пользователь запросил добавление трека с ID ${trackId}`);

  dbMusic.run('INSERT INTO user_tracks (user_id, track_id) VALUES (?, ?)', [userId, trackId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Трек уже добавлен' });
    }

    return res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
  });
});

// Маршрут для обработки запросов на удаление песни из "Мои треки"
app.post('/delete', requireAuth, (req, res) => {
  const { trackId } = req.body;
  const userId = req.session.userId;
 
  console.log(`Пользователь запросил удаление трека с ID ${trackId}`);

  dbMusic.run('DELETE FROM user_tracks WHERE user_id = ? AND track_id = ?', [userId, trackId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Произошла ошибка при удалении трека' });
    }

    return res.status(200).json({ message: 'Трек успешно удален из "Моих треков"' });
  });
});

// Маршрут для обработки запросов на получение плейлистов пользователя
app.get('/playlists', requireAuth, (req, res) => {
  const userId = req.session.userId;

  dbMusic.get('SELECT * FROM playlists WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных.' });
    }

    if (!row) {
        return res.status(400).json({ error: 'У пользователя нет плейлистов.' });
    }
    console.log(row);
    res.status(200).json(row);
  });
});

// Маршрут для обработки запросов на добавление песни в плейлист
app.post('/addToPlaylist', requireAuth, (req, res) => {
  const { trackId } = req.body;
  const userId = req.session.userId;
  var playlistID = 1;

  dbMusic.get('SELECT * FROM playlists WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных.' });
    }

    if (!row) {
        return res.status(400).json({ error: 'У пользователя нет плейлистов.' });
    }

    playlistID = row.id;
  });
 
  console.log(`Пользователь запросил добавление трека с ID ${trackId} в плейлист`);

  dbMusic.run('INSERT INTO playlist_tracks (playlist_id, track_id) VALUES (?, ?)', [playlistID, trackId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Трек уже добавлен' });
    }

    return res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
  });
});

// Маршрут для получения треков пользователя по userId
app.get('/tracks', requireAuth, (req, res) => {
  const userId = req.session.userId;
  const sql = 'SELECT tracks.* FROM user_tracks JOIN tracks ON tracks.id = user_tracks.track_id WHERE user_tracks.user_id = ?';

  dbMusic.all(sql, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка запроса' });
    } else {
      if (rows.length > 0) {
          // Если найдены песни, отправляем их клиенту
          res.status(200).json(rows);
      } else {
          // Если ничего не найдено, отправляем сообщение
          res.status(400).json({ error: 'Ничего не найдено.' });
      }
    }
  });
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});