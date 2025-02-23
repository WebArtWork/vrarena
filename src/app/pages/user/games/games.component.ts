import { Component } from '@angular/core';
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

	constructor(
		public gameService: CybersportgameService,
		public userService: UserService
	) {}

	back(): void {
		window.history.back();
	}

	openVideo(url: string): void {
		const newWindow = window.open(url, '_blank');

		if (newWindow) {
			newWindow.focus();
		}
	}
}
