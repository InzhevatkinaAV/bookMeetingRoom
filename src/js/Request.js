export class Request {
	town;
	floor;
	room;
	date;
	time;
	comment = '';

	constructor(town, floor, room, date, time, comment) {
		this.town = town;
		this.floor = floor;
		this.room = room;
		this.date = date;
		this.time = time;
		this.comment = comment;
	}

	getTownName() {
		return this.town;
	}

	getFloorNumber() { 
		return this.floor;
	}

	getRoomNumber() {
		return this.room;
	}

	getDate() {
		const formatter = new Intl.DateTimeFormat('RU', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		});

		const date = new Date(this.date);
		return formatter.format(date);
	}

	getTime() {
		return this.time;
	}

	static getJSON(request) {
		console.log(JSON.stringify(request));
	}
}