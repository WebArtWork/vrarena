import { Injectable } from '@angular/core';
import { Cybersportgame } from '../interfaces/cybersportgame.interface';
import { CoreService, CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CybersportgameService extends CrudService<Cybersportgame> {
	games = this.getDocs();

	constructor(private _core: CoreService) {
		super({
			name: 'cybersportgame'
		});

		this.get();
	}

	getByRrlOrId(urlOrId: string): Cybersportgame {
		const game = this.getDocs().find(
			(g) => g.url === urlOrId || g._id === urlOrId
		);
		if (game) {
			return game;
		} else {
			const fetchedGame = this.new();

			this.fetch({
				url: urlOrId
			}).subscribe((game) => {
				this._core.copy(game, fetchedGame);
			});

			return fetchedGame;
		}
	}
}
