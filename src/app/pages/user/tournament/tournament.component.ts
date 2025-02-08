import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.scss'],
	standalone: false,
})
export class TournamentComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
