import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './sessions.component.html',
	styleUrls: ['./sessions.component.scss'],
	standalone: false,
})
export class SessionsComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
