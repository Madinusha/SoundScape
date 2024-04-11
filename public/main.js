// Sample data
const myTracks = [
    { title: "Permission to dance", artist: "BTS", duration: "3:30", cover: "images/cover1.jpg"},
    { title: "DNA", artist: "BTS", duration: "4:15", cover: "images/cover2.jpg"},
    { title: "Лимонад", artist: "ЛСП", duration: "2:50", cover: "images/cover3.jpg"}
];

const playlists = [
    { title: "Permission to dance", author: "BTS", cover: "images/cover1.jpg"},
    { title: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { title: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg"},
    { title: "Permission to dance", author: "BTS", cover: "images/cover1.jpg"},
    { title: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { title: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { title: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg"}
];

const collections = [
    { title: "Плейлист дня 1", author: "BTS", cover: "images/cover1.jpg"},
    { title: "Плейлист дня 2", author: "Барбарики", cover: "images/cover2.jpg"},
    { title: "Для вас", author: "Инстасамка", cover: "images/cover3.jpg"}
];

// Функция отображения Моих треков
function displayMyTracks() {
    const myTracksBlock = document.getElementById('my-tracks');
    myTracksBlock.innerHTML = '';
    myTracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');
        trackElement.innerHTML = `
            <div class="track-info">
                <img src="${track.cover}" alt="Обложка трека" class="cover-image">
                <div class="info">
                    <div class="title">${track.title}</div>
                    <div class="artist">${track.artist}</div>
                </div>
            </div>
            <div class="actions">
                <button class="add-to-queue">+</button>
                <button class="add-to-playlist">Добавить в плейлист</button>
                <button class="settings">...</button>
            </div>
        `;
        myTracksBlock.appendChild(trackElement);
    });
}


// Функция отображения плейлистов
function displayPlaylists() {
    const playlistsBlock = document.getElementById('playlists-container');
    playlistsBlock.innerHTML = '';
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist');
        playlistElement.innerHTML = `
            <div class="playlist">
                <img src="${playlist.cover}" alt="Обложка плейлиста">
                <div class="title">${playlist.title}</div>
                <div class="author">${playlist.author}</div>
            </div>
        `;
        playlistsBlock.appendChild(playlistElement);
    });
}

// Функция отображения Подборок
function displayCollections() {
    const collectionsBlock = document.getElementById('collections');
    collectionsBlock.innerHTML = '';
    collections.forEach(collection => {
        const collectionElement = document.createElement('div');
        collectionElement.classList.add('playlist'); // Используем класс плейлиста
        collectionElement.classList.add('collection'); // Добавляем класс коллекции
        collectionElement.innerHTML = `
            <div class="playlist-info"> <!-- Используем те же стили для содержимого -->
                <img src="${collection.cover}" alt="Обложка коллекции">
                <div class="title">${collection.title}</div>
                <div class="author">${collection.author}</div>
            </div>
        `;
        collectionsBlock.appendChild(collectionElement);
    });
}

function showRegisterPage() {
    window.location.href = '/registration';
}

function showMyTracks() {
    hideAllBlocks();
    displayMyTracks();
    document.getElementById('my-tracks').style.display = 'block';
}

function showPlaylists() {
    hideAllBlocks();
    displayPlaylists();
    document.getElementById('playlists').style.display = 'block';
}

function showCollections() {
    hideAllBlocks();
    displayCollections();
    document.getElementById('collections').style.display = 'block';
    // Implement functionality to show collections
}

function showNewReleases() {
    hideAllBlocks();
    addPlaylistsSection("Новинки недели");
    addPlaylistsSection("Им месяц");
}

function showMainPage() {
    hideAllBlocks();
    addPlaylistsSection("Свежие хиты");
    addPlaylistsSection("Рекомендации для вас");
    addPlaylistsSection("Сегодня в тренде");
}

function hideAllBlocks() {
    const blocks = document.querySelectorAll('.block');
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
            section.style.display = 'none';
        });
    blocks.forEach(block => {
        block.style.display = 'none';
    });
}

function goToProfile() {
  window.location.href = '/profile';
  $.ajax({
    type: 'GET',
    url: '/profile',
    success: function(response) {
        alert(response.message);
    },
    error: function(error) {
        alert(error.message);
    }
});
}

// Функция для выхода из аккаунта
function logout() {
    $.ajax({
        type: 'POST',
        url: '/logout', // URL, на который отправляем запрос на выход из аккаунта
        success: function(response) {
            alert(response.message); // Выводим сообщение об успешном выходе из аккаунта
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Ошибка сервера';
            alert(errorMessage); // Выводим сообщение об ошибке
        }
    });
}

async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(`/search?term=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';

        if (data.length > 0) {
            data.forEach(song => {
                const songElement = document.createElement('div');
                songElement.textContent = `${song.name} - ${song.artist}`;
                songElement.style.marginTop = '10px';
                resultsDiv.appendChild(songElement);
                // Добавляем аудиофайл к найденной песне
                // path = song.path.replace(/\\/g, '/');
                addAudioToPage(song.path); // Путь к аудиофайлу из данных (поле song.path)
            });
        } else {
            resultsDiv.textContent = 'Ничего не найдено.';
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

// Функция для добавления аудиофайла на страницу
function addAudioToPage(songPath) {
    const audioPlayer = document.createElement('audio');
    audioPlayer.controls = true; // Показываем элементы управления
    audioPlayer.src = songPath; // Устанавливаем путь к аудиофайлу
    audioPlayer.style.marginTop = '10px'; // Добавляем немного отступа сверху

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.appendChild(audioPlayer); // Добавляем аудиофайл на страницу в блок с результатами
}

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search();
    }
});

const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
let isCollapsed = false; // Переменная для отслеживания состояния ширины навбара

function toggleSidebar() {
    isCollapsed = !isCollapsed; // Инвертируем текущее состояние

    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        var collapseBtnWidth = document.getElementById('collapseBtn').offsetWidth; // Получаем ширину кнопки collapseBtn
        sidebar.style.width = (collapseBtnWidth/16 + 2) + 'em';

    } else {
        sidebar.classList.remove('collapsed');
        sidebar.style.width = '11em';
    }
}

function handleMenuItemClick(event) {
    // Удаляем выделение у всех элементов меню
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.classList.remove('selected');
    });

    // Выделяем текущий элемент меню
    var menuItem = event.currentTarget;
    menuItem.classList.add('selected');


    var menuItem = event.currentTarget.parentNode;
    var link = menuItem.querySelector('a');
    link.onclick();
}

function addPlaylistsSection(Title) {
    const freshHitsSection = document.createElement('div');
    freshHitsSection.classList.add('section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = Title;
    freshHitsSection.appendChild(sectionTitle);
    sectionTitle.classList.add('section-title');

    const playlistsContainer = document.createElement('div');
    playlistsContainer.classList.add('playlists-container');

    playlists.forEach(function(playlist) {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist');

        const coverImg = document.createElement('img');
        coverImg.src = playlist.cover;
        coverImg.alt = playlist.title;
        playlistItem.appendChild(coverImg);

        const title = document.createElement('p');
        title.textContent = playlist.title;
        playlistItem.appendChild(title);
        title.classList.add('playlist-title')

        const author = document.createElement('p');
        author.textContent = playlist.author;
        playlistItem.appendChild(author);
        author.classList.add('playlist-author')

        playlistsContainer.appendChild(playlistItem);
    });

    freshHitsSection.appendChild(playlistsContainer);

    const mainContent = document.querySelector('.content');
    mainContent.appendChild(freshHitsSection);
}

// Вызываем функцию для добавления раздела "Свежие хиты" при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    showMainPage();
});

