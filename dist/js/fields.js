export function checkFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval) {
    return (selectTown.value !== 'default' && 
        selectFloor.value !== 'default' &&
        selectRoom.value !== 'default' &&
        inputDate.value &&
        timeInterval.value != 'default');
}

export function clearFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment) {
    selectTown.value = 'default';
    selectFloor.value = 'default';
    selectRoom.value = 'default';
    inputDate.value = '';
    timeInterval.value = 'default';
    textareaComment.value = '';
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