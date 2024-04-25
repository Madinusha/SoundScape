import sqlite3

def create_clients_db():
    conn = sqlite3.connect('clients.db')

    cur = conn.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    nickname TEXT,
                    email TEXT,
                    password TEXT,
                    type TEXT,
                    isBlocked BOOLEAN
                    )''')

    conn.commit()

    conn.close()

def block_user(email):
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("UPDATE users SET isBlocked = 1 WHERE email = ?", (email,))
        rows_updated = cursor.rowcount
        conn.commit()
        if rows_updated > 0:
            print(f"Пользователь с email {email} успешно заблокирован.")
        else:
            print(f"Пользователь с email {email} не найден.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


if __name__ == '__main__':
    # create_clients_db()
    block_user('email@1')