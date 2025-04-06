import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../mafia.component';
import { HttpService } from 'wacom';

@Component({
	selector: 'app-day',
	standalone: false,
	templateUrl: './day.component.html',
	styleUrl: './day.component.scss'
})
export class DayComponent {
	@Input() game: Game;

	@Output() fetch = new EventEmitter();

	constructor(private _http: HttpService) {}

	night(): void {
		this._http.post('/api/mafia/night', this.game).subscribe(() => {
			this.fetch.emit();
		});
	}
}
