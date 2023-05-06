import { getCurrentDate } from './getCurrentDate.js';

const towns = ['А', 'B'];
const startFloor = 3;
const lastFloor = 27;
const countOfRooms = 10;

const timeIntervals = {
    '08:00 - 09:00': 'свободно',
    '09:00 - 10:00': 'свободно',
    '10:00 - 11:00': 'свободно',
    '11:00 - 12:00': 'свободно',
    '12:00 - 13:00': 'свободно',
    '13:00 - 14:00': 'свободно',
    '14:00 - 15:00': 'свободно',
    '15:00 - 16:00': 'свободно',
    '16:00 - 17:00': 'свободно',
    '18:00 - 19:00': 'свободно',
    '19:00 - 20:00': 'свободно',
    '21:00 - 22:00': 'свободно',
}

export function init(selectTown, selectFloor, selectRoom, inputDate, timeInterval) {
    initSelectTown(selectTown);
    initSelectFloor(selectFloor);
    initSelectRooms(selectRoom);

    const currentDate = getCurrentDate();
    initTimeInterval(timeInterval);
    setMinMaxDate(inputDate, currentDate);
}

function setMinMaxDate(inputDate, currentDate) {
    const dateMin = currentDate.slice(0, 3).reverse().join('-');
    inputDate.min = dateMin;

    currentDate[2] = (Number(currentDate[2]) + 1).toString();
    const dateMax = currentDate.slice(0, 3).reverse().join('-');
    inputDate.max = dateMax;
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
        option.value =i;
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

function initTimeInterval(timeInterval) {
    for (let interval in timeIntervals) {
        const option = document.createElement('option');

        if (timeIntervals[interval] === 'занято') {
            option.innerHTML = `${interval} ${timeIntervals[interval]}`;
            option.disabled = true;
        } else
            option.innerHTML = `${interval}`;
        option.value = `${interval}`;

        timeInterval.append(option);
    }
}