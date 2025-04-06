import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'wacom';

interface Game {
	author: {
		name: string;
		email: string;
	};
}

@Component({
	templateUrl: './games.component.html',
	styleUrl: './games.component.scss',
	selector: 'app-games',
	standalone: false
})
export class GamesComponent {
	games: Game[] = [];

	constructor(private _http: HttpService, private _router: Router) {
		this._http
			.get('/api/mafia/get')
			.subscribe((games: Game[]) => (this.games = games));
	}

	create(): void {
		this._http.post('/api/mafia/create', {}).subscribe((resp) => {
			this._router.navigateByUrl('/mafia/' + resp.url);
		});
	}
}
