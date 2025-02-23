import { Component } from '@angular/core';
import { Cybersportgame } from 'src/app/modules/cybersportgame/interfaces/cybersportgame.interface';
import { CybersportgameService } from 'src/app/modules/cybersportgame/services/cybersportgame.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: false
})
export class GamesComponent {
	readonly url = environment.url;

	isMenuOpen = false;

	games: Cybersportgame[] = [];

	constructor(
		private _gameService: CybersportgameService,
		public userService: UserService
	) {
		this._gameService
			.get({}, { name: 'public' })
			.subscribe((games) => (this.games = games));
	}

	openVideo(url: string): void {
		const newWindow = window.open(url, '_blank');

		if (newWindow) {
			newWindow.focus();
		}
	}
}
