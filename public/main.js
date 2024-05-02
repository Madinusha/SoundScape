// Sample data
const myTracks = [
    { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/10 - Shot Glass of Tears.mp3"},
    { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
    { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
    { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
    { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
    { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"}
];


const playlists = [
    { name: "Permission to dance", author: "BTS", cover: "images/cover1.jpg"},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { name: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg"},
    { name: "Permission to dance", author: "BTS", cover: "images/cover1.jpg"},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { name: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg"}
];

const collections = [
    { name: "Плейлист дня 1", author: "BTS", cover: "images/cover1.jpg"},
    { name: "Плейлист дня 2", author: "Барбарики", cover: "images/cover2.jpg"},
    { name: "Для вас", author: "Инстасамка", cover: "images/cover3.jpg"}
];

// Функция отображения Моих треков
function displayMyTracks() {
    const myTracksBlock = document.getElementById('my-tracks');
    myTracksBlock.innerHTML = '';
    myTracks.forEach(track => {

        myTracksBlock.appendChild(createTrackElement(track));
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
    addTracksSection("Мои треки")
}


function showPlaylists() {
    hideAllBlocks();
    addPlaylistsSection("Мои плейлисты", playlists);
}

function showAlbums() {
    hideAllBlocks();
    addPlaylistsSection("Мои альбомы", playlists);
}

function showCollections() {
    hideAllBlocks();
    addPlaylistsSection("Подобрали для вас");
}

function showNewReleases() {
    hideAllBlocks();
    addPlaylistsSection("Новинки недели");
    addPlaylistsSection("Им месяц");
}

function showMainPage() {
    hideAllBlocks();
    addTracksSection("Мои треки");
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
  $.ajax({
    type: 'GET',
    url: '/profile',
    success: function(response) {
        window.location.href = '/profile';
    },
    error: function(xhr, status, error) {
        const errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Ошибка сервера';
        alert(errorMessage); // Выводим сообщение об ошибке
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

        if (data.length > 0) {
            addTracksSection("Результаты поиска", data, true);
        } else {
            addTracksSection("Ничего не найдено.", null, true);
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

function createTrackElement(track) {
    const trackElement = document.createElement('div');
    trackElement.classList.add('track');
    trackElement.innerHTML = `
        <div class="track-info">
            <div class="play-button">
                <button class="play-pause-button"></button>
            </div>
            <img src="${track.album_img_path}" alt="Обложка трека" class="cover-image">
            <div class="info">
                <div class="title">${track.name}</div>
                <div class="artist">${track.artist}</div>
            </div>
        </div>
        <div class="actions">
            <button class="add-to-queue" data-track-id="${track.id}" onclick="addTrackToUser(this)">+</button>
            <button class="delete-button" data-track-id="${track.id}" style="display: none;" onclick="deleteTrackFromUser(this)">-</button>
            <button class="add-to-playlist">Добавить в плейлист</button>
            <button class="settings">...</button>
        </div>
    `;

    // Добавляем обработчик события к кнопке внутри элемента трека
    const playButton = trackElement.querySelector(".play-pause-button");
    if (playButton) {
        playButton.addEventListener('click', function() {

            // Удаление предыдущего плеера из хедера, если он есть
            const headerAudioPlayer = document.getElementById('headerAudioPlayer');
            const audio = headerAudioPlayer.querySelector("audio");
            if ((audio !== null && track.path !== audio.src) || (audio === null)){
                headerAudioPlayer.innerHTML = ''; // Очищаем содержимое
                // Создание нового плеера для текущего трека
                const audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                audioPlayer.controlsList = "nodownload";
                audioPlayer.src = track.path;
                audioPlayer.style.display = 'none';


                createHeaderPlayer(audioPlayer, headerAudioPlayer);


                // Добавление плеера в хедер
                headerAudioPlayer.appendChild(audioPlayer);
                playOrPause(headerAudioPlayer, trackElement); // Передаем элемент трека в функцию playOrPause
            } else {
                console.log("трек тот же!!")
                playOrPause(headerAudioPlayer, trackElement); // Передаем элемент трека в функцию playOrPause
            }

        });
    } else {
        console.error('Кнопка воспроизведения не найдена в элементе трека');
    }
    return trackElement;
}


let currentAudio = null; // Глобальная переменная для отслеживания текущего проигрывателя
let currentAudioSrc = null;
function playOrPause(headerAudioElement, trackElement) {
    const audio = headerAudioElement.querySelector("audio");
    if (!audio) {
        console.error('Аудиофайл не найден в элементе трека');
        return;
    }

    if (currentAudioSrc === audio.src) {
        // Текущий трек нажат еще раз, переключаем проигрывание / паузу
        if (audio.paused) {
            audio.play();
            trackElement.classList.add('playing'); // Добавляем класс при воспроизведении
        } else {
            const currentTime = audio.currentTime; // Сохраняем текущее время воспроизведения
            audio.pause();
            audio.currentTime = currentTime; // Устанавливаем время воспроизведения обратно
            trackElement.classList.remove('playing'); // Удаляем класс при паузе
        }
    } else {
        // Новый трек
        if (currentAudio) {
            // Если есть текущий трек, останавливаем его воспроизведение
            currentAudio.pause();
            // Удаляем класс "playing" у предыдущего трека
            const firstPlayingElement = document.querySelector('.playing');
            firstPlayingElement.classList.remove('playing');
        }
        // Обновляем текущий трек и начинаем воспроизведение нового трека
        currentAudio = audio;
        currentAudioSrc = audio.src;
        audio.play();
        trackElement.classList.add('playing'); // Добавляем класс при воспроизведении
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll(".play-pause-button");
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackElement = button.closest('.track');
            playOrPause(trackElement);
        });
    });
});


function createHeaderPlayer(audioPlayer, headerAudioPlayer){
    createProgressBar(audioPlayer, headerAudioPlayer);
}


function createProgressBar(audioPlayer, headerAudioPlayer) {
    const playPauseButton = document.createElement('button');
    playPauseButton.classList.add('playPauseButton');
    playPauseButton.style.backgroundImage = 'url("images/pause.png")';
    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.style.backgroundImage = 'url("images/pause.png")';
        } else {
            audioPlayer.pause();
            playPauseButton.style.backgroundImage = 'url("images/play.png")';
        }
    });

    const progressBar = document.createElement('input');
    progressBar.classList.add('progress-bar');
    progressBar.type = 'range';
    progressBar.min = 0;
    progressBar.value = 0;
    progressBar.step = 1;

    progressBar.addEventListener('input', function() {
        audioPlayer.currentTime = progressBar.value;
    });

    audioPlayer.addEventListener('timeupdate', function() {
        progressBar.value = audioPlayer.currentTime;
    });

    audioPlayer.addEventListener('loadedmetadata', function() {
        progressBar.max = audioPlayer.duration;
    });

    headerAudioPlayer.appendChild(playPauseButton);
    headerAudioPlayer.appendChild(progressBar);
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

// Функция для добавления трека в "Мои треки"
function addTrackToUser(button) {
     // Получаем значение атрибута "data-track-id" кнопки, на которую был клик
     const trackId = button.dataset.trackId;

     // Выводим значение trackId в консоль
     console.log(`Вы кликнули на кнопку с data-track-id: ${trackId}`);

     $.ajax({
        url: '/add', // URL для отправки запроса
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ trackId: trackId }), // Отправляем данные в формате JSON
        success: function(response) {
            console.log('Трек успешно добавлен к пользователю!');
        },
        error: function(xhr, status, error) {
            console.log('Ошибка при добавлении трека к пользователю:', xhr.responseJSON.error);
        }
    });
}

// Функция для удаления трека из "Мои треки"
function deleteTrackFromUser(button) {
    // Получаем значение атрибута "data-track-id" кнопки, на которую был клик
    const trackId = button.dataset.trackId;

    $.ajax({
       url: '/delete', // URL для отправки запроса
       method: 'POST',
       contentType: 'application/json',
       data: JSON.stringify({ trackId: trackId }), // Отправляем данные в формате JSON
       success: function(response) {
           console.log('Трек успешно удален!');
       },
       error: function(xhr, status, error) {
           console.log('Ошибка при удалении трека', xhr.responseJSON.error);
       }
   });

   showUserTracks();
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

function addTracksSection(Title, trackList = myTracks, before = false) {
    const tracksSection = document.createElement('div');
    tracksSection.classList.add('section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = Title;
    tracksSection.appendChild(sectionTitle);
    sectionTitle.classList.add('section-title');

    const tracksContainer = document.createElement('div');
    tracksContainer.classList.add('tracks-container');

    if (trackList !== null) {
        trackList.forEach(function(track) {
            tracksContainer.appendChild(createTrackElement(track));
        });
    }

    tracksSection.appendChild(tracksContainer);
    const mainContent = document.querySelector('.content');
    if (before) mainContent.insertBefore(tracksSection, mainContent.firstChild);
    else mainContent.appendChild(tracksSection);
}

async function showUserTracks() {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    // $.ajax({
    //     url: '/tracks',
    //     method: 'POST',
    //     dataType: 'json', // Ожидаемый тип данных в ответе (JSON)
    //     success: function(data) {
    //         console.log('Треки пользователя', response);
    //         if (data.length > 0) {
    //             data.forEach(song => {
    //                 const songElement = createTrackElement(song);
    //                 songElement.style.marginTop = '10px';
    //                 resultsDiv.appendChild(songElement);
    //                 // Добавляем аудиофайл к найденной песне
    //                 addAudioToPage(song.path); // Путь к аудиофайлу из данных (поле song.path)
    //             });
    //         } else {
    //             resultsDiv.textContent = 'Ничего не найдено.';
    //         }
    //     },
    //     error: function(xhr, status, error) {
    //         console.error('Произошла ошибка при выполнении запроса:', error);
    //         resultsDiv.textContent = error;
    //     }
    // });

    try {
        const response = await fetch(`/tracks`);
        const data = await response.json();

        if (data.length > 0) {
            addTracksSection("Мои треки", data);
        } else {
            addTracksSection("Нет добавленных треков", data);
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

// Активируем невидимую кнопку
function activateButton(track) {
    var button = track.querySelector('.delete-button');
    button.style.display = 'block'; // делаем кнопку видимой
    button.disabled = false; // делаем кнопку активной
}

function addPlaylistsSection(Title, playlistList = playlists) {
    const freshHitsSection = document.createElement('div');
    freshHitsSection.classList.add('section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = Title;
    freshHitsSection.appendChild(sectionTitle);
    sectionTitle.classList.add('section-title');

    const playlistsContainer = document.createElement('div');
    playlistsContainer.classList.add('playlists-container');

    playlistList.forEach(function(playlist) {
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

document.addEventListener('DOMContentLoaded', function() {
    showMainPage();
});