import sqlite3

conn = sqlite3.connect('clients.db')

cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                age INTEGER,
                email TEXT,
                password TEXT,
                type TEXT
                )''')

conn.commit()

conn.close()
