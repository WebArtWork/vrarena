import { Component } from '@angular/core';
import { Cybersporttournament } from 'src/app/modules/cybersporttournament/interfaces/cybersporttournament.interface';
import { CybersporttournamentService } from 'src/app/modules/cybersporttournament/services/cybersporttournament.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.scss'],
	standalone: false
})
export class TournamentsComponent {
	isMenuOpen = false;

	tournaments: Cybersporttournament[] = [];

	constructor(
		private _tournamentService: CybersporttournamentService,
		public userService: UserService
	) {
		this._tournamentService
			.get({})
			.subscribe((tournaments) => (this.tournaments = tournaments));
	}

	back(): void {
		window.history.back();
	}
}
