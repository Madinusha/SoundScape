import sqlite3, os

from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC

def create_mp3_table():
    '''Создаёт таблицу музыки и тэгов в базе данных'''
    conn = sqlite3.connect('music.db')

    cur = conn.cursor()

    cur.execute('''CREATE TABLE tracks (
                    id INTEGER PRIMARY KEY,
                    path TEXT,
                    album_img_path TEXT,
                    name TEXT,
                    artist TEXT,
                    album TEXT,
                    genre TEXT,
                    duration INTEGER,
                    year INEGER
                    
                    )''')

    conn.commit()

    conn.close()


def get_album_art(mp3):
    '''Возвращает картинку альбома (если такая существует у mp3 файла)'''
    audio = MP3(mp3, ID3=ID3)
    for tag in audio.tags.values():
        if isinstance(tag, APIC):
            return tag.data


def find_mp3_files(directory):
    '''Возвращает список mp3 файлов, которые находятся в директории directory'''
    mp3_files = []

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".mp3"):
                mp3_files.append(os.path.join(root, file))

    return mp3_files

def get_mp3_tags(mp3):
    '''Возвращает mp3-тэги файла, которые используются в нашем проекте'''
    audio = MP3(mp3, ID3=ID3)
    tags = {}

    if 'TIT2' in audio:
        tags['title'] = audio['TIT2'].text[0] # Название трека
    if 'TPE1' in audio:
        tags['artist'] = audio['TPE1'].text[0] # Имя исполнителя (группы)
    if 'TALB' in audio:
        tags['album'] = audio['TALB'].text[0] # Название альбома
    if 'TCON' in audio:
        tags['genre'] = audio['TCON'].text[0] # Жанр
    if 'TDRC' in audio:
        tags['year'] = int(str(audio['TDRC'].text[0])[0:4]) # Год выпуска
    if 'TLEN' in audio:
        tags['duration'] = int(audio.info.length) # Продолжительность трека

    return tags


def add_track_to_db(mp3):
    '''Добавляет mp3-трек в базу данных'''
    connection = sqlite3.connect('music.db')

    cursor = connection.cursor()

    path_array = mp3.split('\\')
    path_array[-1] = 'cover.jpg'
    album_img_path = ('\\').join(path_array)

    tags_values = list(get_mp3_tags(mp3).values())
    name, artist, album, genre, year, duration = tags_values

    cursor.execute('''INSERT INTO tracks (path, album_img_path, name, artist, genre, album, duration, year) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', (mp3, album_img_path, name, artist, genre, album, duration, year))
    connection.commit()

def add_tracks_to_db(dir):
    '''Добавляет mp3-треки в базу данных из выбранной дериктории'''
    mp3_list = find_mp3_files(dir)
    for track in mp3_list:
        add_track_to_db(track)



if __name__ == '__main__':
    create_mp3_table()
    album_path1 = 'music\\Jongkook\\GOLDEN'
    add_tracks_to_db(album_path1)