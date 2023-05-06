import {init} from './initial.js';
import { Request } from './Request.js';
import {checkFields, blokFields, unblokFields, clearFields} from './fields.js';
import {showAlert, hiddenAlert, showConfirm} from './alert.js';

const selectTown = document.getElementById('town');
const selectFloor = document.getElementById('floor');
const selectRoom = document.getElementById('room');

const inputDate = document.getElementById('date');
const timeInterval = document.getElementById('time');

const textareaComment = document.getElementById('comment_text');

const buttonSubmit = document.getElementById('submit');
const buttonClear = document.getElementById('clear');

init(selectTown, selectFloor, selectRoom, inputDate, timeInterval);

buttonSubmit.addEventListener('click', function() {
    if (checkFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval)) {
        const request = new Request(selectTown.value, selectFloor.value, selectRoom.value, inputDate.value, timeInterval.value, textareaComment.value);
        console.log(JSON.stringify(request));

        blokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
        showConfirm(request);
    } else {
        showAlert([selectTown, selectFloor, selectRoom, inputDate, timeInterval]);
    }
});

buttonClear.addEventListener('click', function() {
    clearFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
    unblokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
});

