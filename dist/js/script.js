import {init, initTimeInterval} from './initial.js';
import { Request } from './Request.js';
import {checkFields, blokFields, unblokFields, cleanFields} from './fields.js';
import {showHelpMessage, hiddenMessage, showConfirmMessage} from './messages.js';

const selectTown = document.getElementById('town');
const selectFloor = document.getElementById('floor');
const selectRoom = document.getElementById('room');

const inputDate = document.getElementById('date');
const timeInterval = document.getElementById('time');

const textareaComment = document.getElementById('comment_text');

const buttonSubmit = document.getElementById('submit');
const buttonClean = document.getElementById('clean');


init(selectTown, selectFloor, selectRoom, inputDate, timeInterval);

inputDate.addEventListener('change', function() {
    initTimeInterval(timeInterval, inputDate);
});

buttonSubmit.addEventListener('click', function() {
    if (checkFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval)) {
        const request = new Request(selectTown.value, selectFloor.value, selectRoom.value, inputDate.value, timeInterval.value, textareaComment.value);
        Request.show(request);

        blokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);

        showConfirmMessage(request);

        changeButtonSubmit('active_btn', 'non-active_btn', true);
    } else {
        showHelpMessage([selectTown, selectFloor, selectRoom, inputDate, timeInterval]);
    }
});

buttonClean.addEventListener('click', function() {
    cleanFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);
    unblokFields(selectTown, selectFloor, selectRoom, inputDate, timeInterval, textareaComment);

    hiddenMessage();

    changeButtonSubmit('non-active_btn', 'active_btn', false);

    init(selectTown, selectFloor, selectRoom, inputDate, timeInterval);
});

function changeButtonSubmit(removeClass, addClass, disabled) {
    buttonSubmit.disabled = disabled;
    buttonSubmit.classList.remove(removeClass);
    buttonSubmit.classList.add(addClass);
}

