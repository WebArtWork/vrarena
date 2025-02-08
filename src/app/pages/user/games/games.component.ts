import { Component } from '@angular/core';
import { CybersportgameService } from 'src/app/modules/cybersportgame/services/cybersportgame.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: false
})
export class GamesComponent {
	isMenuOpen = false;

	constructor(
		public userService: UserService,
		public gameService: CybersportgameService
	) {}

	back(): void {
		window.history.back();
	}
}
