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
		return `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`;
	}
}
