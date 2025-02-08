import { Component } from '@angular/core';
import { CybersportachievementService } from 'src/app/modules/cybersportachievement/services/cybersportachievement.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.scss'],
	standalone: false
})
export class AchievementsComponent {
	isMenuOpen = false;

	constructor(
		public userService: UserService,
		public achievementService: CybersportachievementService
	) {}

	back(): void {
		window.history.back();
	}
}
