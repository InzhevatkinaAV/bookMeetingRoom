import {init, initTimeInterval} from './initial.js';
import { Request } from './Request.js';
import {checkFields, 
	blokFields, blokTimeInterval, unblokFields, 
	cleanFields, switchTitles, 
	isPastTime, isFarFutureTime} from './fields.js';
import {showHelpMessage, hiddenMessage, showConfirmMessage} from './messages.js';

const selectTown = document.getElementById('town');
const selectFloor = document.getElementById('floor');
const selectRoom = document.getElementById('room');

const inputDate = document.getElementById('date');
const timeInterval = document.getElementById('time');

const textareaComment = document.getElementById('comment_text');

const buttonSubmit = document.getElementById('submit');
const buttonClean = document.getElementById('clean');

//Инициализация select'ов и input'а.
init(selectTown, selectFloor, selectRoom, inputDate);

//Переговорную комнату можно бронировать не ранее, чем за 6 месяцев,
//нельзя бронировать переговорную комнату на прошедшие даты.
//Если условия выбора даты соблюдены, инициализируется select с доступными интервалами времени,
//иначе поле выбора интервала времени недоступно.
inputDate.addEventListener('change', function() {
	if (!isPastTime(inputDate, timeInterval) && !isFarFutureTime(inputDate))
		initTimeInterval(timeInterval, inputDate);
	else 
		blokTimeInterval(timeInterval);	
});

//При нажатии на кнопку "Отправить" проверяется корректность заполнения обязательных полей.
//Если проверка НЕ пройдена, некорректно заполненные поля подсвечиваются, заявка не формируется.
buttonSubmit.addEventListener('click', function() {
	if (checkFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval)) {
		switchTitles(true);

		//Формируется заявка на бронирование переговорной комнаты и выводится в консоль в JSON-формате. 
		const request = new Request(selectTown.value, selectFloor.value, selectRoom.value, inputDate.value, timeInterval.value, textareaComment.value);
		Request.getJSON(request);

		//Все поля становятся недоступными для изменений.
		blokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
		//Появляется сообщение, подтверждающее, что бронирование переговорной комнаты прошло успешно.
		showConfirmMessage(request);

		//Кнопка "Отправить" становится недоступной.
		changeButtonSubmit('active_btn', 'non-active_btn', true);
	} else {
		showHelpMessage([selectTown, selectFloor, selectRoom, inputDate, timeInterval]);
	}
});

//При нажатии на кнопку "Очистить", все элементы возвращаются к первоначальному виду.
buttonClean.addEventListener('click', function() {
	switchTitles(false);

	//Все поля выставляются в значение по-умолчанию, инициализируются и становятся доступными для заполнения.
	//Недоступен для заполнения только select с выбором интервала времени (см. строку 26).
	cleanFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
	init(selectTown, selectFloor, selectRoom, inputDate);
	unblokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);

	//Все ранее выведенные сообщения скрываются.
	hiddenMessage();

	//Кнопка "Отправить" становится кликабельной.
	changeButtonSubmit('non-active_btn', 'active_btn', false);
});

function changeButtonSubmit(removeClass, addClass, disabled) {
	buttonSubmit.disabled = disabled;
	buttonSubmit.classList.remove(removeClass);
	buttonSubmit.classList.add(addClass);
}