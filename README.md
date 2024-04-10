# Веб-приложение «SoundScape»

Добро пожаловать в наш проект платформы для поиска и прослушивания музыки! Наша цель - создать передовой музыкальный сервис, который придает приоритет высокому качеству звука и интуитивно понятному пользовательскому интерфейсу. Наша платформа предоставит пользователям возможность легко находить и организовывать музыкальный контент, включая альбомы, синглы и плейлисты.

## Использование

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v8+.

### Установка зависимостей и запуск сервера
Для установки зависимостей, выполните команду:
```sh
npm i
```
Чтобы запустить сервер, выполните команду:
```sh
npm start
```

## Правила коммуникации в команде
- Использование Issues: Все задачи и проблемы должны быть отражены в разделе Issues. Новые задачи выставляются с описанием, приоритетом и необходимыми метками.
- Реакции на issues: Каждый участник команды обязан реагировать на новые Issues, выставляя соответствующие эмодзи
- Прозрачность и открытость: Все обсуждения и принимаемые решения должны быть доступны всей команде через GitHub Issues или другие коммуникационные каналы (телеграмм)
- Уведомления и ответственность: Участники команды должны получать уведомления о новых комментариях и изменениях в Issues, связанных с их областью ответственности, и реагировать на них в течение разумного времени.
- Комментирование и обсуждение: Все обсуждения и решения должны вестись в соответствующих Issues. Важно комментировать и обсуждать задачи, чтобы все участники имели ясное представление о текущем состоянии проекта.
- Фиксация изменений в коде: Соответствующий коммит должен содержать ссылку на Issue, чтобы облегчить отслеживание изменений и связь с конкретными задачами.
- Коммиты:
	- Каждый коммит должен решать только одну задачу или вносить одно логическое изменение.
	- Необходимо использовать осмысленные сообщения коммитов, начиная с глагола в повелительном наклонении. Например, «add classes to all pages».
	- Нужно добавлять комментарии к коммитам, если это необходимо для пояснения изменений.
- Merge и Pull Request:
	- Каждое изменение кода слиянием должно быть представлено в виде Pull Request.
	- Перед слиянием кода в основную ветку необходимо пройти код-ревью, чтобы убедиться в качестве кода и соответствии требованиям проекта.
	- Pull Request должен содержать описание того, что было сделано, а также ссылку на связанное Issue.
	- Все обсуждения и комментарии по коду должны вестись непосредственно в Pull Request для удобства отслеживания.

## Стиль программного кода
### HTML & CSS
1. В качестве отступов используем табуляцию (а не пробелы). Вложенные блоки должны отделяться одним отступом.
2. Запрещено использование таблиц для нетабличных данных
3. Запрещено вкладывать блочные элементы внутрь строчных
4. DOCTYPE по умолчанию: html <!DOCTYPE html>.
5. Кодировка по умолчанию: UTF-8 <meta charset="UTF-8">.
6. Каждое свойство — отдельная строка.
7. Каждый селектор — на отдельной строке.

### JavaScript
1. Используем строгий режим 'use strict'; там, где это возможно.
2. В качестве отступов используем табуляцию, а не пробелы.
3. Уровней вложенности должно быть немного.
4. Имя переменной — существительное.
5. Имена переменных не должны начинаться с подчеркивания.
6. Имя переменной пишем в верблюжей нотации (camelCase).
7. Имя функции — глагол или начинается с глагола.
8. Имя функции должно понятно и чётко отражать, что она делает.
9. Имя функции пишем в верблюжей нотации (camelCase).
10. Функции пишем в конец файла (по фозможности).
11. Функции должны быть небольшими.
12. Если функция большая — желательно разбить её на несколько.
13. Одна функция — одно действие.

