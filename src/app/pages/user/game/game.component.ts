import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cybersportgame } from 'src/app/modules/cybersportgame/interfaces/cybersportgame.interface';
import { CybersportgameService } from 'src/app/modules/cybersportgame/services/cybersportgame.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	standalone: false
})
export class GameComponent {
	readonly url = environment.url;

	get description(): string {
		return (
			this.game.description
				?.split('https://webart.work')
				.join('https://api.webart.work') || ''
		);
	}

	game = this._gameService.getByRrlOrId(
		this._router.url.replace('/game/', '')
	);

	isMenuOpen = false;
	games: Cybersportgame[] = [];
	constructor(
		private _gameService: CybersportgameService,
		public userService: UserService,
		private _router: Router
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
	back(): void {
		window.history.back();
	}
}
