import { Injectable } from '@angular/core';
import { Cybersportgame } from '../interfaces/cybersportgame.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportgameService extends CrudService<Cybersportgame> {
	games = this.getDocs();

	constructor() {
		super({
			name: 'cybersportgame'
		});

		this.get();
	}
}
