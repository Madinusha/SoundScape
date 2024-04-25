import sqlite3

def create_clients_db():
    '''Создать БД «clients.db» с таблицей users'''
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
    '''Заблокировать пользователя в «clients.db» по email'''
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT isBlocked FROM users WHERE email = ?", (email,))
        result = cursor.fetchone()
        if result is None:
            print(f"Пользователь с email {email} не найден.")
            return

        is_blocked = result[0]
        if is_blocked == 1:
            print(f"Пользователь с email {email} уже заблокирован.")
            return

        cursor.execute("UPDATE users SET isBlocked = 1 WHERE email = ?", (email,))
        conn.commit()
        print(f"Пользователь с email {email} успешно заблокирован.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


def unblock_user(email):
    '''Разблокировать пользователя в «clients.db» по email'''
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT isBlocked FROM users WHERE email = ?", (email,))
        result = cursor.fetchone()
        if result is None:
            print(f"Пользователь с email {email} не найден.")
            return

        is_blocked = result[0]
        if is_blocked == 0:
            print(f"Пользователь с email {email} не был заблокирован.")
            return

        cursor.execute("UPDATE users SET isBlocked = 0 WHERE email = ?", (email,))
        conn.commit()
        print(f"Пользователь с email {email} успешно разблокирован.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


def set_admin(email):
    '''Установить значение поля type на "admin" для указанного email'''
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if user is None:
            print(f"Пользователь с email {email} не найден.")
            return

        user_type = user[4]
        if user_type == 'admin':
            print(f"Пользователь с email {email} уже является администратором.")
            return

        is_blocked = user[5]
        if is_blocked == 1:
            print(f"Невозможно назначить администратором заблокированного пользователя.")
            return

        # Устанавливаем тип пользователя на "admin"
        cursor.execute("UPDATE users SET type = 'admin' WHERE email = ?", (email,))
        conn.commit()
        print(f"Пользователь с email {email} успешно назначен администратором.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


def set_user(email):
    '''Установить значение поля type на "user" для указанного email'''
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if user is None:
            print(f"Пользователь с email {email} не найден.")
            return

        user_type = user[4]
        if user_type == 'user':
            print(f"Пользователь с email {email} уже является обычным пользователем.")
            return

        # Устанавливаем тип пользователя на "user"
        cursor.execute("UPDATE users SET type = 'user' WHERE email = ?", (email,))
        conn.commit()
        print(f"Пользователь с email {email} успешно назначен обычным пользователем.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


def set_musician(email):
    '''Установить значение поля type на "musician" для указанного email'''
    conn = sqlite3.connect('clients.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if user is None:
            print(f"Пользователь с email {email} не найден.")
            return

        user_type = user[4]
        if user_type == 'musician':
            print(f"Пользователь с email {email} уже является музыкантом.")
            return

        is_blocked = user[5]
        if is_blocked == 1:
            print(f"Невозможно назначить музыкантом заблокированного пользователя.")
            return

        # Устанавливаем тип пользователя на "musician"
        cursor.execute("UPDATE users SET type = 'musician' WHERE email = ?", (email,))
        conn.commit()
        print(f"Пользователь с email {email} успешно назначен музыкантом.")
    except sqlite3.Error as e:
        print("Произошла ошибка при обновлении записи:", e)
    finally:
        conn.close()


if __name__ == '__main__':
    # create_clients_db()
    block_user('new@new')
    # unblock_user('3@3')
    # set_admin('3@3')
    # set_musician('3@3')