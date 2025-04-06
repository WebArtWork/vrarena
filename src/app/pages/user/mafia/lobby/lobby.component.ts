import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { Game } from '../mafia.component';
import { HttpService } from 'wacom';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	selector: 'app-lobby',
	standalone: false,
	templateUrl: './lobby.component.html',
	styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnChanges {
	get joined(): boolean {
		return this.game?.players
			.map((p) => p.user._id)
			.includes(this._userService.user._id);
	}

	get author(): boolean {
		return this.game?.author._id === this._userService.user._id;
	}

	@Input() game: Game;

	@Output() fetch = new EventEmitter();

	constructor(
		private _http: HttpService,
		private _userService: UserService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['game']) {
			this.game = changes['game'].currentValue;
		}
	}

	join(): void {
		this._http.post('/api/mafia/join', this.game).subscribe(() => {
			this.fetch.emit();
		});
	}

	leave(): void {
		this._http.post('/api/mafia/leave', this.game).subscribe(() => {
			this.fetch.emit();
		});
	}

	start(): void {
		this._http.post('/api/mafia/start', this.game).subscribe(() => {
			this.fetch.emit();
		});
	}
}
