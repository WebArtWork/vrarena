import { Injectable } from '@angular/core';
import { Cybersportmembership } from '../interfaces/cybersportmembership.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportmembershipService extends CrudService<Cybersportmembership> {
	constructor() {
		super({
			name: 'cybersportmembership'
		});
	}
}
