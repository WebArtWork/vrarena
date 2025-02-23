import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './bookings.component.html',
	styleUrls: ['./bookings.component.scss'],
	standalone: false,
})
export class BookingsComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
