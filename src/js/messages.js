//Функции для вывода сообщений.

import { Request } from './Request.js';
import { isPastTime, isFarFutureTime } from './fields.js';

const alert = document.querySelector('.alert');

//Вывод сообщения с подсказкой появляется, если пользователь
//нажимает кнопку "Отправить" при наличии некорректно заполненных полях заявки на бронирование.
export function showHelpMessage(fields) {
	alert.innerHTML = '* Пожалуйста, заполните <b>обязательные поля</b>.<br>Помните, что забронировать интервал можно, если он завершиться не менее чем через <b>10 минут</b> :)';
	alert.classList.remove('invisible');

	for (let i = 0; i < fields.length; i++) {
		//Если в поле выбрано значение по-умолчанию или в поле не имеется значения,
		//то поле подсвечивается малиновым цветом на 1 секунду.
		if (fields[i].value === 'default' || !fields[i].value) {
			highlightField(fields[i]);
		}
		//Если в поле выбора даты имеется значение, но оно не попадает в допустимый диапазон,
		//то поле подсвечивается малиновым цветом на 1 секунду.
		//(Сделано допущение, что бронировать комнату можно не ранее, чем за 6 месяцев.)
		if (i === 3 && (isPastTime(fields[3]) || isFarFutureTime(fields[3]))) {
			highlightField(fields[i]);
		}
	}
}

//Функция для осуществления посветки некорректно заполненного поля.
function highlightField(field) {
	field.style.background = '#FEA6C6';
	setTimeout(() => {field.style.background = '#FFFFFF'}, 1000);
}

//Функция скрывает сообщение с подсказкой.
export function hiddenMessage() {
	if(!alert.classList.contains('invisible'))
		alert.classList.add('invisible');
}

//Демонстрация сообщения с данными о бронировании выводится в случае,
//если все поля заявки заполненны корректно и нажата кнопка "Отправить".
export function showConfirmMessage(request) {
	alert.innerHTML = `Забронирована переговорная комната №${request.getRoomNumber()} 
	на ${request.getFloorNumber()} этаже, башня ${request.getTownName()}. 
	Дата и время: ${request.getDate()}, 
	${request.getTime()}.`;
	
	alert.classList.remove('invisible');
}