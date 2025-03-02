import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CybersportreservationService } from 'src/app/modules/cybersportreservation/services/cybersportreservation.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss'],
	standalone: false
})
export class ReservationsComponent {
	// in case of manager we will see reservations of today and status new
	isManager = this._router.url.includes('manager');

	reservations = this.isManager ? [] : this.reservationService.getDocs();

	constructor(
		public reservationService: CybersportreservationService,
		public userService: UserService,
		private _router: Router
	) {
		if (this.isManager) {
			this.reservationService
				.get(
					{
						query:
							'yearmonth=' + this.reservationService.yearmonth()
					},
					{
						name: 'public'
					}
				)
				.subscribe((reservations) => {
					this.reservations = reservations;
				});
		} else {
			this.reservationService.get();
		}
	}

	back(): void {
		window.history.back();
	}
}
