import { Injectable } from '@angular/core';
import { Cybersportbook } from '../interfaces/cybersportbook.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CybersportbookService extends CrudService<Cybersportbook> {
	constructor() {
		super({
			name: 'cybersportbook',
		});
	}
}
