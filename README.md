# Форма бронирования переговорной комнаты
Форма содержит:
- выпадающий список с выбором башни (А или Б),
- выпадающий список с выбором этажа (с 3 по 27),
- выпадающий список с выбором переговорки. На каждом этаже 10 переговорок,
- выбор даты и интервала времени*,
- поле ввода комментария,
- кнопка "Отправить" (по нажатию происходит вывод в консоль данных формы в виде JSON),
- кнопка "Очистить" (по нажатию очищает форму).

*Бронировать переговорную комнату можно не ранее, чем за полгода до переговоров.

Доступно почасовое бронирование комнат в период с 7 до 23 часов. Бронирование интервала возможно, если до его истечения осталось не менее 10 минут.

## Как начать использовать
Чтобы начать, перейдите по ссылке:  [github page](https://inzhevatkinaav.github.io/meeting_rooms/meeting_rooms.html).

Или соберите проект на своем компьютере. Для этого необходимо:
- клонировать репозиторий или скачать его как архив;
- выполнить команду "npm i";
- выполнить команду "gulp".

## Preview

![Preview](https://github.com/InzhevatkinaAV/bookMeetingRoom/blob/main/preview.jpg)
