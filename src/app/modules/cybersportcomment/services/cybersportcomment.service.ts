import { Injectable } from '@angular/core';
import { Cybersportcomment } from '../interfaces/cybersportcomment.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportcommentService extends CrudService<Cybersportcomment> {
	constructor() {
		super({
			name: 'cybersportcomment'
		});
	}
}
