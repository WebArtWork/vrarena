import { Injectable } from '@angular/core';
import { Cybersportreservation } from '../interfaces/cybersportreservation.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportreservationService extends CrudService<Cybersportreservation> {
	constructor() {
		super({
			name: 'cybersportreservation',
			replace: (doc) => {
				doc.status = doc.status || 'New';
			}
		});
	}

	yearmonth(): string {
		return `${new Date().getFullYear()}.${new Date().getMonth()}`;
	}

	date(): string {
		return `${new Date().getFullYear()}.${
			new Date().getMonth() + 1
		}.${new Date().getDate()}`;
	}

	isPastDate(dateStr: string) {
		// Get today's date with no time (midnight)
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Reset time to midnight

		// Parse the given date string in YYYY.M.D format
		const [year, month, day] = dateStr.split('.').map(Number);
		const givenDate = new Date(year, month - 1, day); // months are 0-indexed in JavaScript

		// Compare the two dates
		return givenDate < today;
	}
}
