import { Injectable } from '@angular/core';
import { Mafia } from '../interfaces/mafia.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class MafiaService extends CrudService<Mafia> {
	constructor() {
		super({
			name: 'mafia',
		});
	}
}
