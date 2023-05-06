import { Request } from './Request.js';

const alert = document.querySelector('.alert');

export function showAlert(fields) {
	alert.innerHTML = '* Пожалуйста, заполните все обязательные поля :)';
	alert.classList.remove('invisible');

	for (let i = 0; i < fields.length; i++) 
		if (fields[i].value === 'default' || !fields[i].value) {
			highlightField(fields[i]);
		}
}

function highlightField(field) {
	field.style.background = '#FEA6C6';
	setTimeout(() => {field.style.background = '#FFFFFF'}, 1000);
}

export function hiddenAlert() {
	if(!alert.classList.contains('invisible'))
		alert.classList.add('invisible');
}

export function showConfirm(request) {
   alert.innerHTML = `Забронирована переговорная 
   комната №${request.getRoomNumber()} 
   на ${request.getFloorNumber()} этаже, 
   башня ${request.getTownName()}. 
   Дата и время: ${request.getDate()}, 
   ${request.getTime()}.`;
   
   alert.classList.remove('invisible');
}