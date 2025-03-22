import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cybersportreservation } from 'src/app/modules/cybersportreservation/interfaces/cybersportreservation.interface';
import { CybersportreservationService } from 'src/app/modules/cybersportreservation/services/cybersportreservation.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { CoreService } from 'wacom';

@Component({
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss'],
	standalone: false
})
export class ReservationsComponent {
	// in case of manager we will see reservations of today and status new
	isManager = this._router.url.includes('manager');

	reservations = this.isManager ? [] : this._reservationService.getDocs();

	constructor(
		public _reservationService: CybersportreservationService,
		public userService: UserService,
		private _core: CoreService,
		private _router: Router
	) {
		if (this.isManager) {
			this._reservationService
				.get(
					{
						query: `yearmonth=${this._reservationService.yearmonth()}`
					},
					{
						name: 'public'
					}
				)
				.subscribe((reservations) => {
					this.reservations = reservations;
				});
		} else {
			this._reservationService.get({
				query: `deviceID=${this._core.deviceID}`
			});
		}
	}

	update(reservation: Cybersportreservation): void {
		this._reservationService.update(reservation);
	}

	back(): void {
		window.history.back();
	}

	cancel(reservation: Cybersportreservation) {
		reservation.status = 'Cancelled';

		this._reservationService.update(
			{
				...reservation,
				deviceID: this._core.deviceID
			},
			{
				name: 'cancel'
			}
		);
	}
}
