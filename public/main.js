// Sample data
// var myTracks = [
//     { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/10 - Shot Glass of Tears.mp3"},
//     { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//     { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//     { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//      { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//         { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//         { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//          { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//             { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//             { name: "Permission to dance", artist: "BTS", duration: "3:30", album_img_path: "images/cover1.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//     { name: "DNA", artist: "BTS", duration: "4:15", album_img_path: "images/cover2.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"},
//     { name: "Лимонад", artist: "ЛСП", duration: "2:50", album_img_path: "images/cover3.jpg", path: "music/Jongkook/GOLDEN/01 - 3D (feat. Jack Harlow).mp3"}
// ];
var myTracks = [];


var playlists = [
    { name: "Permission to dance", author: "BTS", cover: "images/cover1.jpg", tracks: myTracks},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg", tracks: myTracks},
    { name: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg", tracks: myTracks},
    { name: "Permission to dance", author: "BTS", cover: "images/cover1.jpg", tracks: myTracks},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg"},
    { name: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg"},
    { name: "Permission to dance", author: "BTS", cover: "images/cover1.jpg", tracks: myTracks},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg", tracks: myTracks},
    { name: "DNA", author: "BTS", cover: "images/cover2.jpg", tracks: myTracks},
    { name: "Лимонад", author: "ЛСП", cover: "images/cover3.jpg", tracks: myTracks}
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
//    showUserTracks();
    //  addTracksSection("Мои треки", getUserTracks());
}


async function showPlaylists() {
    hideAllBlocks();
    try {
        var playlists = [];
        const response = await fetch(`/playlists`);
        const data = await response.json();

        console.log(data);
        console.log(data.length);
        if (data) {
           // Проверяем, что data не является пустым и является объектом
            if (typeof data === 'object' && !Array.isArray(data)) {
                // Создаем плейлист на основе единственного объекта
                playlists.push({
                    name: data.title,
                    author: data.title,
                    cover: "images/cover1.jpg",
                    id: row.id
                });
            } else if (Array.isArray(data)) {
                // Если data является массивом, то выполняем преобразование данных
                data.forEach(row => {
                    playlists.push({
                        name: row.title,
                        author: row.title,
                        cover: "images/cover1.jpg",
                        id: row.id
                    });
                });
            }
            addPlaylistsSection("Мои плейлисты", playlists, true);
        } else {
            console.log("here");
            addPlaylistsSection("Нет плейлистов", playlists);
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
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
    addTracksSection("Рекомендации");
    addPlaylistsSection("Свежие хиты");
    addPlaylistsSection("Рекомендации для вас");
    addPlaylistsSection("Сегодня в тренде");
}

function hideAllBlocks() {
    const mainContent = document.querySelector('.content');
    mainContent.innerHTML = ``;


//    const blocks = document.querySelectorAll('.block');
//    const sections = document.querySelectorAll('.section');
//    sections.forEach(section => {
//            section.style.display = 'none';
//        });
//    blocks.forEach(block => {
//        block.style.display = 'none';
//    });
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

async function random() {
    try {
        const response = await fetch(`/random?count=5`); // Запрос на получение случайных треков
        const data = await response.json();

        if (data.length > 0) {
            var formattedTracks = data.map(track => ({
                name: track.name,
                artist: track.artist,
                duration: track.duration,
                album_img_path: track.album_img_path,
                path: track.path
            }));

            myTracks = formattedTracks; // Записываем полученные случайные треки в массив myTracks
            showMainPage();
        } 
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

// document.addEventListener('DOMContentLoaded', function() {
//     // Вызываем функцию random() при загрузке страницы
//     random();
//     showMainPage();
// });

// Глобальные переменные
let currentTrackIndex = -1;
let playlistTracks = [];
let trackContainers = [];

// Функция установки текущего трека
function setCurrentTrack(index) {
    if (index >= 0 && index < trackContainers.length) {
        currentTrackIndex = index;
        const playButton = trackContainers[currentTrackIndex].querySelector(".play-pause-button");
        if (playButton) {
            playButton.click(); // Нажимаем кнопку воспроизведения текущего трека
        }
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
            // Обновление текущего индекса трека
            currentTrackIndex = trackContainers.indexOf(trackElement);

            // Удаление предыдущего плеера из хедера, если он есть
            const headerAudioPlayer = document.getElementById('headerAudioPlayer');
            const audio = headerAudioPlayer.querySelector("audio");
            if ((audio !== null && track.path !== audio.src) || (audio === null)) {
                headerAudioPlayer.innerHTML = ''; // Очищаем содержимое
                // Создание нового плеера для текущего трека
                const audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                audioPlayer.controlsList = "nodownload";
                audioPlayer.src = track.path;
                audioPlayer.style.display = 'none';
                audioPlayer.artist = track.artist;
                audioPlayer.title = track.name;

                createHeaderPlayer(audioPlayer, headerAudioPlayer, track);

                // Добавление плеера в хедер
                headerAudioPlayer.appendChild(audioPlayer);
                playOrPause(headerAudioPlayer, trackElement); // Передаем элемент трека в функцию playOrPause
            } else {
                console.log("трек тот же!!");
                playOrPause(headerAudioPlayer, trackElement); // Передаем элемент трека в функцию playOrPause
            }
        });
    } else {
        console.error('Кнопка воспроизведения не найдена в элементе трека');
    }

    // Добавляем элемент трека в массив контейнеров
    trackContainers.push(trackElement);
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


function createHeaderPlayer(audioPlayer, headerAudioPlayer, track){
    console.log("audioPlayer.title - " + audioPlayer.title);
    headerAudioPlayer.innerHTML = `
        <button class="prev-button"></button>
        <div id="player">
            <div class="play-button">
                <button class="play-pause-button"></button>
            </div>
            <img src="${track.album_img_path}" alt="Track Cover" class="header-cover-image">
            <div id="player-track">

                  <div class="scrolling-text-container">
                      <div id="track-name">${audioPlayer.title}</div>
                  </div>
                  <div class="scrolling-text-container">
                      <div id="track-artist">${audioPlayer.artist}</div>
                  </div>

                  <div id="track-time">
                        <div id="current-time">0:00</div>
                        <div id="track-length"></div>
                  </div>
                  <div id="s-area">
                        <div id="ins-time"></div>
                        <div id="s-hover"></div>
                        <div id="seek-bar"></div>
                  </div>
            </div>
        </div>
        <button class="next-button"></button>
    `;
    document.querySelector('.next-button').addEventListener('click', () => {
        if (currentTrackIndex < trackContainers.length - 1) {
            setCurrentTrack(currentTrackIndex + 1);
        }
    });

    document.querySelector('.prev-button').addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            setCurrentTrack(currentTrackIndex - 1);
        }
    });


    var sBar = document.getElementById('seek-bar');
    var sArea = document.getElementById('s-area');
    var currentTimeDisplay = document.getElementById('current-time');
    var trackLength = document.getElementById('track-length');

    sArea.addEventListener('click', function(event) {
        console.log("я в click у sArea");
        // Получаем координаты клика относительно sArea
        var clickX = event.clientX - sArea.getBoundingClientRect().left;
        // Вычисляем процентное значение ширины sBar относительно sArea
        var percentage = (clickX / sArea.offsetWidth) * 100;
        sBar.style.width = percentage + "%";
        audioPlayer.currentTime = (percentage / 100) * audioPlayer.duration;
    });


    // Обновление текущего времени воспроизведения аудио
    audioPlayer.addEventListener('timeupdate', function() {
        var currentTime = audioPlayer.currentTime;
        var minutes = Math.floor(currentTime / 60);
        var seconds = Math.floor(currentTime - minutes * 60);
        currentTimeDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        sBar.style.width = ((currentTime / audioPlayer.duration) * 100) + "%";
    });
    audioPlayer.addEventListener('loadedmetadata', function() {
        trackLength.innerText = (audioPlayer.duration / 60).toFixed(2);
    });
    const playPauseButton = headerAudioPlayer.querySelector('.play-pause-button');
        playPauseButton.style.opacity = '0.4';
        playPauseButton.style.backgroundImage = 'url("images/pause.png")';
        playPauseButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
//                updateCurrentTrackIndex();
                playPauseButton.style.backgroundImage = 'url("images/pause.png")'; // Показываем изображение паузы
            } else {
                audioPlayer.pause();
                playPauseButton.style.backgroundImage = 'url("images/play.png")'; // Показываем изображение проигрывания
            }
        });
}

function updateCurrentTrackIndex() {
    console.log("currentTrackIndex : ", currentTrackIndex);
    const currentTrackName = document.getElementById('track-name').textContent;
    currentTrackIndex = playlistTracks.findIndex(track => track.name === currentTrackName);
}

function playTrackByIndex(index) {
    console.log(playlistTracks);
    console.log(playlistTracks.length);
    if (index >= 0 && index < playlistTracks.length) {


        const track = playlistTracks[index];

        // Ваш код для воспроизведения трека, например:
        // audioPlayer.src = track.path;
        // audioPlayer.play();

        currentTrackIndex = index;
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
// Функция для добавления трека в плейлист
function addTrackToPlaylist(button) {
    // Получаем значение атрибута "data-track-id" кнопки, на которую был клик
    const trackId = button.dataset.trackId;

    // Выводим значение trackId в консоль
    console.log(`Вы кликнули на кнопку с data-track-id: ${trackId}`);

    $.ajax({
       url: '/addToPlaylist', // URL для отправки запроса
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
}

function addTracksSection(Title, trackList = myTracks, before = false, remove = false) {
    const tracksSection = document.createElement('div');
    tracksSection.classList.add('section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = Title;
    tracksSection.appendChild(sectionTitle);
    sectionTitle.classList.add('section-title');

    const tracksContainer = document.createElement('div');
    tracksContainer.classList.add('tracks-container');

    if (trackList !== null) {
        trackList.forEach(track => {
            var song = createTrackElement(track);
            if (remove) activateButton(song);
            tracksContainer.appendChild(song);
        });
    }

    tracksSection.appendChild(tracksContainer);
    const mainContent = document.querySelector('.content');
    if (before) mainContent.insertBefore(tracksSection, mainContent.firstChild);
    else mainContent.appendChild(tracksSection);
}
async function getUserTracks() {
    try {
        const response = await fetch(`/tracks`);
        const data = await response.json();

        return data;
    } catch (error) {
        return null;
        console.error('Ошибка поиска:', error);
    }
}

async function showUserTracks() {

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

    hideAllBlocks();
    try {
        const response = await fetch(`/tracks`);
        const data = await response.json();

        if (data.length > 0) {
            addTracksSection("Мои треки", data, false, true);
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

    playlistList = shuffleArray(playlistList);

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

        coverImg.addEventListener('click', function(event) {
            hideAllBlocks();
            addTracksFromPlaylist(playlist);
        });
    });

    freshHitsSection.appendChild(playlistsContainer);

    const mainContent = document.querySelector('.content');
    mainContent.appendChild(freshHitsSection);
}

function addTracksFromPlaylist(playlistElement) {
    const tracksFromPlaylistSection = document.createElement('div');
    tracksFromPlaylistSection.classList.add('tracksFromPlaylistSection');

    tracksFromPlaylistSection.innerHTML = `
        <div id="bigPlaylist">
            <img src="${playlistElement.cover}" alt="Playlist Cover" class="big_playlist_image">
            <div class="big_playlist_title">${playlistElement.name}</div>
            <div class="big_playlist_artist">${playlistElement.author}</div>
        </div>
        <div id="tracksFromBigPlaylist"></div>
    `;

    console.log("name - " + playlistElement.name);
    console.log("author - " + playlistElement.author);

    const mainContent = document.querySelector('.content');
    mainContent.appendChild(tracksFromPlaylistSection);

    const tracksFromBigPlaylist = document.getElementById('tracksFromBigPlaylist');

    var data = getTracksFromPlaylist(1, "BTS");
    data.then(tracks => {
        playlistTracks = tracks; // Сохраняем треки в глобальную переменную
        trackContainers = []; // Очищаем массив контейнеров

        tracks.forEach(track => {
            const trackElement = createTrackElement(track);
            tracksFromBigPlaylist.appendChild(trackElement);
        });

//        updateCurrentTrackIndex(); // Обновляем текущий индекс трека
    }).catch(error => {
        console.error("Error fetching tracks:", error);
    });

    mainContent.appendChild(tracksFromPlaylistSection);
}



async function showTracksFromPlaylist(id, title) {
    hideAllBlocks();
    try {
        const response = await fetch(`/tracksFromPlaylist?term=${id}`);
        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
            addTracksSection("Треки из плейлиста", data);
        } else {
            addTracksSection("Нет добавленных треков", data);
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

async function getTracksFromPlaylist(id, title) {
    hideAllBlocks();
    try {
        const response = await fetch(`/tracksFromPlaylist?term=${id}`);
        const data = await response.json();
        if (data.length > 0) {
            return data;
        } else {
            console.log("нет добавленных треков");
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    random();
    // showMainPage();
});

