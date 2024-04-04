import sqlite3

conn = sqlite3.connect('music.db')

cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS tracks (
                id INTEGER PRIMARY KEY,
                name TEXT,
                artist TEXT,
                path TEXT,
                genre TEXT
                )''')

conn.commit()

conn.close()
