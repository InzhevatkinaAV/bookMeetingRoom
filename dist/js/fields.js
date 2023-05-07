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