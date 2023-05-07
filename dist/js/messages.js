import { Request } from './Request.js';
import { pastInterval } from './fields.js';

const alert = document.querySelector('.alert');

export function showHelpMessage(fields) {
	alert.innerHTML = '* Пожалуйста, заполните все <b>обязательные поля</b>. Помните, что забронировать интервал можно, если до его истечения осталось не менее <b>10 минут</b> :)';
	alert.classList.remove('invisible');

	for (let i = 0; i < fields.length; i++) {
		if (fields[i].value === 'default' || !fields[i].value) {
			highlightField(fields[i]);
		}
		if (i === 3 && pastInterval(fields[3], fields[4])) {
			highlightField(fields[i]);
		}
	}
}

function highlightField(field) {
	field.style.background = '#FEA6C6';
	setTimeout(() => {field.style.background = '#FFFFFF'}, 1000);
}

export function hiddenMessage() {
	if(!alert.classList.contains('invisible'))
		alert.classList.add('invisible');
}

export function showConfirmMessage(request) {
	alert.innerHTML = `Забронирована переговорная комната №${request.getRoomNumber()} 
	на ${request.getFloorNumber()} этаже, башня ${request.getTownName()}. 
	Дата и время: ${request.getDate()}, 
	${request.getTime()}.`;
	
	alert.classList.remove('invisible');
}