import { Component } from '@angular/core';
import { CalendarDate } from 'src/app/core/modules/calendar/calendar.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { Cybersportreservation } from 'src/app/modules/cybersportreservation/interfaces/cybersportreservation.interface';
import { CybersportreservationService } from 'src/app/modules/cybersportreservation/services/cybersportreservation.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	reservation: Cybersportreservation = this._reservationService.new();

	show: 'calendar' | 'date' | 'booked' = 'date';

	times = [
		'08:00 - 09:00',
		'09:00 - 10:00',
		'10:00 - 11:00',
		'11:00 - 12:00',
		'12:00 - 13:00',
		'13:00 - 14:00',
		'14:00 - 15:00',
		'15:00 - 16:00',
		'16:00 - 17:00',
		'17:00 - 18:00',
		'18:00 - 19:00',
		'19:00 - 20:00',
		'20:00 - 21:00',
		'21:00 - 22:00'
	];

	reservations: Cybersportreservation[] = [];

	reservationsByDateTime: Record<string, Cybersportreservation> = {};

	constructor(
		private _reservationService: CybersportreservationService,
		public userService: UserService
	) {
		this.reservation.date = this._reservationService.date();

		this.reservation.yearmonth = this._reservationService.yearmonth();

		this.reservation.times = [];

		this.load();

		this.reservation.name = this.userService.user.name;

		this.reservation.phone = this.userService.user.phone;
	}

	load(): void {
		const date = this.reservation.date.split('.');

		date.pop();

		if (this.reservation.yearmonth === date.join('.')) {
			return;
		}

		this.reservation.yearmonth = date.join('.');

		this._reservationService
			.get({ query: 'yearmonth=' + this.reservation.yearmonth })
			.subscribe((reservations) => {
				this.reservations = reservations;

				this.reservationsByDateTime = {};

				for (const booking of reservations) {
					for (const time of booking.times) {
						this.reservationsByDateTime[booking.date + time] =
							booking;
					}
				}
			});
	}

	book(): void {
		if (!this.userService.user.name || !this.userService.user.phone) {
			this.userService.user.name =
				this.userService.user.name || this.reservation.name;

			this.userService.user.phone =
				this.userService.user.phone || this.reservation.phone;

			this.userService.updateMe();
		}

		this._reservationService.create(this.reservation).subscribe(() => {
			this.show = 'booked';
		});
	}

	back(): void {
		window.history.back();
	}

	setDate(date: string): void {
		this.show = 'date';

		this.reservation.date = date;

		const yearmonth = date.split('.');

		yearmonth.unshift();

		this.reservation.yearmonth = yearmonth.join('.');

		this.load();
	}

	setTime(time: string, value: Value): void {
		this.reservation.times = this.reservation.times || [];

		if (value) {
			this.reservation.times.push(time);
		} else {
			this.reservation.times = this.reservation.times.filter(
				(t) => t !== time
			);
		}
	}
}
