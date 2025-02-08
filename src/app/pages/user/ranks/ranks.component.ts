import { Component } from '@angular/core';
import { Cybersportrank } from 'src/app/modules/cybersportrank/interfaces/cybersportrank.interface';
import { CybersportrankService } from 'src/app/modules/cybersportrank/services/cybersportrank.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './ranks.component.html',
	styleUrls: ['./ranks.component.scss'],
	standalone: false
})
export class RanksComponent {
	isMenuOpen = false;

	ranks: Cybersportrank[] = [];

	constructor(
		private _rankService: CybersportrankService,
		public userService: UserService
	) {
		this._rankService.get({}).subscribe((ranks) => (this.ranks = ranks));
	}

	back(): void {
		window.history.back();
	}
}
