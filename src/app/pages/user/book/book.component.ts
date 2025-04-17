import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDate } from 'src/app/core/modules/calendar/calendar.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { CybersportgameService } from 'src/app/modules/cybersportgame/services/cybersportgame.service';
import { Cybersportreservation } from 'src/app/modules/cybersportreservation/interfaces/cybersportreservation.interface';
import { CybersportreservationService } from 'src/app/modules/cybersportreservation/services/cybersportreservation.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService, StoreService } from 'wacom';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	formSubmitted = false;

	game = this._router.url.includes('/book/')
		? this._gameService.getByRrlOrId(this._router.url.replace('/book/', ''))
		: null;

	reservation: Cybersportreservation = this._reservationService.new();

	show: 'calendar' | 'date' | 'booked' = 'date';

	times = [
		'10:00 - 11:00',
		'11:15 - 12:15',
		'12:30 - 13:30',
		'13:45 - 14:45',
		'14:00 - 15:00',
		'15:15 - 16:15',
		'16:30 - 17:30',
		'17:45 - 18:45',
		'18:00 - 19:00',
		'19:15 - 20:15',
		'20:30 - 21:30',
		'21:45 - 22:45'
	];

	reservations: Cybersportreservation[] = [];

	reservationsByDateTime: Record<string, Cybersportreservation> = {};

	constructor(
		private _reservationService: CybersportreservationService,
		private _gameService: CybersportgameService,
		public userService: UserService,
		private _store: StoreService,
		private _alert: AlertService,
		private _core: CoreService,
		private _router: Router
	) {
		if (this.userService.user.email) {
			this.reservation.date = this._reservationService.date();

			this.reservation.yearmonth = this._reservationService.yearmonth();

			this.reservation.times = [];

			this.reservation.name = this.userService.user.name;

			this.reservation.phone = this.userService.user.phone;

			this.load();
		} else {
			this._store.getJson('reservation', (reservation) => {
				this.reservation = reservation || {
					...this.reservation,
					yearmonth: this._reservationService.yearmonth(),
					date: this._reservationService.date(),
					times: []
				};

				this.load();
			});
		}
	}

	update(): void {
		if (!this.userService.user.email) {
			this._store.setJson('reservation', this.reservation);
		}

		if (!this.reservation.name || !this.reservation.phone) {
			// Якщо хочеш, можеш ще вивести повідомлення
			console.warn('Заповніть обов’язкові поля!');
			return;
		}

		// Вся логіка тут
		// ...
	}

	load(): void {
		const date = this.reservation.date.split('.');

		date.pop();

		if (this.reservation.yearmonth === date.join('.')) {
			return;
		}

		this.reservation.yearmonth = date.join('.');

		this._reservationService
			.get(
				{
					query: `yearmonth=${this.reservation.yearmonth}`
				},
				{
					name: 'public'
				}
			)
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
		this.formSubmitted = true;

		if (!this.reservation.times?.length) {
			return this._alert.error({
				unique: 'book',
				text: 'Вкажіть час резервації'
			});
		}

		if (
			!this.reservation.phone?.length ||
			this.reservation.phone?.length < 8
		) {
			return this._alert.error({
				unique: 'book',
				text: 'Вкажіть свій номер телефону'
			});
		}

		if (
			this.userService.user.email &&
			(!this.userService.user.name || !this.userService.user.phone)
		) {
			this.userService.user.name =
				this.userService.user.name || this.reservation.name;

			this.userService.user.phone =
				this.userService.user.phone || this.reservation.phone;

			this.userService.updateMe();
		}

		this._store.remove('reservation');

		this.reservation.deviceID = this._core.deviceID;

		this._reservationService.create(this.reservation).subscribe(() => {
			this.show = 'booked';
		});
	}

	back(): void {
		window.history.back();
	}

	setDate(date: string): void {
		if (this._reservationService.isPastDate(date)) {
			return;
		}

		this.show = 'date';

		this.reservation.date = date;

		const yearmonth = date.split('.');

		yearmonth.unshift();

		this.reservation.yearmonth = yearmonth.join('.');

		this.load();

		this.update();
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

		this.update();
	}

	disabled(date: string, time: string): boolean {
		return (
			this.reservationsByDateTime[date + time]?.status === 'Confirmed' ||
			(date === this._reservationService.date() &&
				time.split(':').map(Number)[0] < new Date().getHours() - 1)
		);
	}
}
