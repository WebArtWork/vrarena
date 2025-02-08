import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss'],
	standalone: false,
})
export class ReservationsComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
