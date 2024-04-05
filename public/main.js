// Sample data
const myTracks = [
    { title: "Permission to dance", artist: "BTS", duration: "3:30", cover: "images/cover1.jpg"},
    { title: "DNA", artist: "BTS", duration: "4:15", cover: "images/cover2.jpg"},
    { title: "Лимонад", artist: "ЛСП", duration: "2:50", cover: "images/cover3.jpg"}
];

const playlists = [
    { title: "Плейлист 1", author: "Автор 1", cover: "images/cover1.jpg"},
    { title: "Плейлист 2", author: "Автор 2", cover: "images/cover2.jpg"},
    { title: "Плейлист 3", author: "Автор 3", cover: "images/cover3.jpg"}
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
    const playlistsBlock = document.getElementById('playlists');
    playlistsBlock.innerHTML = '';
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist');
        playlistElement.innerHTML = `
            <div class="playlist-info">
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
    console.log("here");
    window.location.href = '/registration';
}

function showMyTracks() {
    hideAllBlocks();
    displayMyTracks();
    document.getElementById('my-tracks').style.display = 'block';
}

// Function to show playlists
function showPlaylists() {
    hideAllBlocks();
    displayPlaylists();
    document.getElementById('playlists').style.display = 'block';
}

// Function to show collections
function showCollections() {
    hideAllBlocks();
    displayCollections();
    document.getElementById('collections').style.display = 'block';
    // Implement functionality to show collections
}

// Function to show new releases
function showNewReleases() {
    hideAllBlocks();
    // Implement functionality to show new releases
}

// Function to hide all content blocks
function hideAllBlocks() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.style.display = 'none';
    });
}

function goToProfile() {
  window.location.href = '/registration';
}


const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
let isCollapsed = false; // Переменная для отслеживания состояния ширины навбара

function toggleSidebar() {
    isCollapsed = !isCollapsed; // Инвертируем текущее состояние

    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        sidebar.style.width = '1.5em'; // Устанавливаем ширину навбара в 20 пикселей
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.style.width = '15vw'; // Устанавливаем ширину навбара в 0.2vw
    }
}

// Устанавливаем ширину навбара при загрузке страницы
window.onload = function() {
    sidebar.style.width = '15vw';
    checkWidth();
};

// Вызываем функцию при изменении размеров окна
window.addEventListener('resize', checkWidth);


// Initial display
showMyTracks();