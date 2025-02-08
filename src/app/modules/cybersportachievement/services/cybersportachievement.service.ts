import { Injectable } from '@angular/core';
import { Cybersportachievement } from '../interfaces/cybersportachievement.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportachievementService extends CrudService<Cybersportachievement> {
	achievementsByAuthor: Record<string, Cybersportachievement[]> = {};

	constructor() {
		super({
			name: 'cybersportachievement'
		});

		this.filteredDocuments(this.achievementsByAuthor);
	}
}
