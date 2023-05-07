//Функции инициализации полей.

import { cleanSelect } from "./fields.js";

//Значения взяты из условий задачи.
const towns = ['А', 'B'];
const startFloor = 3;
const lastFloor = 27;
const countOfRooms = 10;
//Сделано предположение, что доступно почасовое бронирование переговорной комнаты. 
const timeIntervals = {
	'07:00 - 08:00': 'свободно',
	'08:00 - 09:00': 'свободно',
	'09:00 - 10:00': 'свободно',
	'10:00 - 11:00': 'свободно',
	'11:00 - 12:00': 'свободно',
	'12:00 - 13:00': 'свободно',
	'13:00 - 14:00': 'свободно',
	'14:00 - 15:00': 'свободно',
	'15:00 - 16:00': 'свободно',
	'16:00 - 17:00': 'свободно',
	'17:00 - 18:00': 'свободно',
	'18:00 - 19:00': 'свободно',
	'19:00 - 20:00': 'свободно',
	'20:00 - 21:00': 'свободно',
	'21:00 - 22:00': 'свободно',
	'22:00 - 23:00': 'свободно',
}

const formatter = new Intl.DateTimeFormat('RU', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
});

let currentDate = new Date();

//Инициализация select'ов с выбором башни, этажа, комнаты, 
//и input'а с выбором даты.
export function init(selectTown, selectFloor, selectRoom, inputDate) {
	initSelectTown(selectTown);
	initSelectFloor(selectFloor);
	initSelectRooms(selectRoom);
	
	setMinMaxDate(inputDate);
}

function initSelectTown(selectTown) {
	for (let i = 0; i < towns.length; i++) {
		const option = document.createElement('option');
		option.innerHTML = `Башня ${towns[i]}`;
		option.value = towns[i];
		selectTown.append(option);
	}
}

function initSelectFloor(selectFloor) {
	for (let i = startFloor; i <= lastFloor; i++) {
		const option = document.createElement('option');
		option.innerHTML = `Этаж ${i}`;
		option.value = i;
		selectFloor.append(option);
	}
}

function initSelectRooms(selectRoom) {
	for (let i = 1; i <= countOfRooms; i++) {
		const option = document.createElement('option');
		option.innerHTML = `Комната ${i}`;
		option.value = i;
		selectRoom.append(option);
	}
}

//Установка допустимого диапазона в input'е с выбором даты.
function setMinMaxDate(inputDate) {
	currentDate = new Date();

	//Сделано допущение, что бронировать переговорную комнату можно не ранее, 
	//чем за 6 месяцев до переговоров.
	const maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 6);

	const dateMin = getFormattedDate(currentDate).slice(0, 3).reverse().join('-');
	inputDate.min = dateMin;

	const dateMax = getFormattedDate(maxDate).slice(0, 3).reverse().join('-');
	inputDate.max = dateMax;
}

//Получение даты в удобном для парсинга формате.
function getFormattedDate(date) {
	const formattedDate = formatter.format(date);
	const arrayDate = formattedDate.replace(/[^0-9]/gi, ' ').split(' ').filter(e => e != '');

	return arrayDate;
}

//Формирование выпадающего списка интервалов в select'е выбора интервалов.
//Происходит после выбора допустимой даты.
export function initTimeInterval(timeInterval, inputDate) {
	cleanSelect(timeInterval);

	const inputDay = Number(inputDate.value.split('-')[2]);
	const inputMonth = Number(inputDate.value.split('-')[1]);
	const inputYear = Number(inputDate.value.split('-')[0]);
	
	currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentHours = currentDate.getHours();
	const currentMinuts = currentDate.getMinutes();

	for (let interval in timeIntervals) {
		//Интервал, который находится в прошлом времени, не отображается в списке доступных интервалов.
		if (pastInterval(interval, inputDay, inputMonth,currentDay, currentMonth, currentHours, currentMinuts)) 
			continue;

		const option = document.createElement('option');

		//Уже забронированные интервалы отображаются в списке как недоступные к выбору.
		if (timeIntervals[interval] === 'занято') {
			option.innerHTML = `${interval} ${timeIntervals[interval]}`;
			option.disabled = true;
		} else
			option.innerHTML = `${interval}`;

		option.value = `${interval}`;

		timeInterval.append(option);
	}

	//После того, как сформирован список доступных интервалов времени на указанную дату,
	//select с выбором интервалов становится доступным.
	timeInterval.removeAttribute('readonly');
	timeInterval.style.pointerEvents = '';
	timeInterval.classList.remove('non-ative_time');
	timeInterval.classList.add('active_time');
}

//Проверка: находится ли интервал времени в прошлом? 
function pastInterval(interval, inputDay, inputMonth, currentDay, currentMonth, currentHours, currentMinuts) {
	const endInterval = Number(interval.split(' ')[2].split(':')[0]);

	if (inputDay === currentDay && inputMonth === currentMonth && currentHours >= endInterval)
		return true;

	//Сделано допущение, что бронировать интервал можно, если до его окончания осталось не менее 10 минут.
	if (inputDay === currentDay && inputMonth === currentMonth && currentHours + 1 === endInterval)
		return currentMinuts > 50;

	return false;
}