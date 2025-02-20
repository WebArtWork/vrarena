import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

	game = this._gameService.doc(this._router.url.replace('/game/', ''));

	isMenuOpen = false;

	constructor(
		private _gameService: CybersportgameService,
		public userService: UserService,
		private _router: Router
	) {}

	back(): void {
		window.history.back();
	}
}
