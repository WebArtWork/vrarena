import { Component } from '@angular/core';
import { CalendarDate } from 'src/app/core/modules/calendar/calendar.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { Cybersportbook } from 'src/app/modules/cybersportbook/interfaces/cybersportbook.interface';
import { CybersportbookService } from 'src/app/modules/cybersportbook/services/cybersportbook.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	show: 'calendar' | 'date' | 'booked' = 'calendar';

	date = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`;

	yearmonth: string;

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

	bookings: Cybersportbook[] = [];

	bookingByDateTime: Record<string, Cybersportbook> = {};

	constructor(
		private _bookService: CybersportbookService,
		public userService: UserService
	) {
		this.load();
	}

	load(): void {
		const date = this.date.split('.');

		date.pop();

		if (this.yearmonth === date.join('.')) {
			return;
		}

		this.yearmonth = date.join('.');

		this._bookService
			.get({ query: 'yearmonth=' + this.yearmonth })
			.subscribe((bookings) => {
				this.bookings = bookings;

				this.bookingByDateTime = {};

				for (const booking of bookings) {
					for (const time of booking.times) {
						this.bookingByDateTime[booking.date + time] = booking;
					}
				}
			});
	}

	book(): void {
		// this._bookService.create({
		// 	times: this.selectedTimes
		// });
	}

	back(): void {
		window.history.back();
	}

	setDate(date: string): void {
		this.show = 'date';

		this.date = date;

		this.load();
	}

	setTime(time: string, value: Value): void {
		if (value) {
			this.selectedTimes.push(time);
		} else {
			this.selectedTimes = this.selectedTimes.filter((t) => t !== time);
		}
	}

	selectedTimes: string[] = [];
}
