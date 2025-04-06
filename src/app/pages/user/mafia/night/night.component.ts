import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../mafia.component';
import { HttpService } from 'wacom';

@Component({
	selector: 'app-night',
	standalone: false,
	templateUrl: './night.component.html',
	styleUrl: './night.component.scss'
})
export class NightComponent {
	@Input() game: Game;

	@Output() fetch = new EventEmitter();

	constructor(private _http: HttpService) {}

	day(): void {
		this._http.post('/api/mafia/day', this.game).subscribe(() => {
			this.fetch.emit();
		});
	}
}
