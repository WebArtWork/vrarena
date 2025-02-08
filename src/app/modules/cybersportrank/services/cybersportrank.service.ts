import { Injectable } from '@angular/core';
import { Cybersportrank } from '../interfaces/cybersportrank.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportrankService extends CrudService<Cybersportrank> {
	constructor() {
		super({
			name: 'cybersportrank'
		});
	}
}
