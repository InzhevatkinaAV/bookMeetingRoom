export function checkFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval) {
	return (selectTown.value !== 'default' && selectFloor.value !== 'default' &&
		selectRoom.value !== 'default' && inputDate.value && timeInterval.value != 'default');
}

export function cleanFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment) {
	selectTown.value = 'default';
	cleanSelect(selectTown);

	selectFloor.value = 'default';
	cleanSelect(selectFloor);

	selectRoom.value = 'default';
	cleanSelect(selectRoom);

	inputDate.value = '';
	timeInterval.value = 'default';
	cleanSelect(timeInterval);

	timeInterval.disabled = true;
	timeInterval.classList.remove('active_time');
	timeInterval.classList.add('non-ative_time');

	textareaComment.value = '';
}

export function cleanSelect(select) {
	while (select.childNodes.length > 1)
		select.removeChild(select.lastChild);

	const option = select.getElementsByTagName('option');
	option[0].selected = true;
}

export function blokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment) {
	selectTown.setAttribute("readonly", true);
	selectTown.style.pointerEvents = 'none';

	selectFloor.setAttribute("readonly", true);
	selectFloor.style.pointerEvents = 'none';

	selectRoom.setAttribute("readonly", true);
	selectRoom.style.pointerEvents = 'none';

	inputDate.setAttribute("readonly", true);
	inputDate.style.cursor = 'auto';

	timeInterval.setAttribute("readonly", true);
	timeInterval.style.pointerEvents = 'none';

	textareaComment.setAttribute("readonly", true);   
}

export function unblokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment) {
	selectTown.removeAttribute('readonly');
	selectTown.style.pointerEvents = '';

	selectFloor.removeAttribute('readonly');
	selectFloor.style.pointerEvents = '';

	selectRoom.removeAttribute('readonly');
	selectRoom.style.pointerEvents = '';

	inputDate.removeAttribute('readonly');
	inputDate.style.cursor = 'pointer';

	timeInterval.removeAttribute('readonly');
	timeInterval.style.pointerEvents = '';

	textareaComment.removeAttribute('readonly');
}

export function switchTitles(flag) {
	const placeTitle = document.querySelector('.place_title');
	const dateAndTimeTitle = document.querySelector('.date_and_time_title');

	if (flag) {
		placeTitle.innerHTML = 'Выбранное место:';
		dateAndTimeTitle.innerHTML = 'Выбранное время:';
		placeTitle.style.marginRight = '0px';
		dateAndTimeTitle.style.marginRight = '0px';
	} else {
		placeTitle.innerHTML = '*Выберете место:';
		dateAndTimeTitle.innerHTML = '*Выберете время:';
		placeTitle.style.marginRight = '5px';
		dateAndTimeTitle.style.marginRight = '5px';
	}
}

export function pastInterval(inputDate, timeInterval) {
	const inputDay = Number(inputDate.value.split('-')[2]);
	const inputMonth = Number(inputDate.value.split('-')[1]);
	const inputYear = Number(inputDate.value.split('-')[0]);

	let currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();
	const currentHours = currentDate.getHours();
	const currentMinuts = currentDate.getMinutes();

	if (timeInterval.value != 'default') {
		const endInterval = Number(timeInterval.value.split(' ')[2].split(':')[0]);

		if (inputDay === currentDay && inputMonth === currentMonth && currentHours >= endInterval)
			return true;

		if (inputDay === currentDay && inputMonth === currentMonth && currentHours + 1 === endInterval)
			return currentMinuts > 50;

		if ((inputDay < currentDay && inputMonth === currentMonth) ||
		(inputMonth < currentMonth && inputYear === currentYear) || (inputYear < currentYear))
			return true;

		return false;
	}
}