import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	standalone: false,
})
export class GameComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
