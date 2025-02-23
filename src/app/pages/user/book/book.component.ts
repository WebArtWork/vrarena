import { Component } from '@angular/core';
import { CalendarDate } from 'src/app/core/modules/calendar/calendar.interface';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	show: 'calendar' | 'day' | 'booked' = 'calendar';

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}

	createEvent(event: CalendarDate): void {
		console.log(event);
	}
}
