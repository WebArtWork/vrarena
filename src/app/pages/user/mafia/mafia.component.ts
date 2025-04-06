import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, SocketService } from 'wacom';
import { RtcService } from './rtc.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';

export interface GamePlayer {
	user: {
		_id: string;
		name: string;
		email: string;
	};
	role: string;
	alive: boolean;
}

export interface Game {
	author: {
		_id: string;
		name: string;
		email: string;
	};
	state: 'lobby' | 'day' | 'night' | 'ended';
	players: GamePlayer[];
}

@Component({
	templateUrl: './mafia.component.html',
	styleUrls: ['./mafia.component.scss'],
	standalone: false
})
export class MafiaComponent {
	state: 'games' | 'lobby' | 'day' | 'night' | 'ended' =
		this._router.url.includes('mafia/') ? 'lobby' : 'games';

	gameId = this._router.url.includes('mafia/')
		? this._router.url.replace('/mafia/', '')
		: '';

	game: Game;

	players: GamePlayer[];

	constructor(
		public userService: UserService,
		private _socket: SocketService,
		private _http: HttpService,
		private _rtc: RtcService,
		private _router: Router
	) {
		if (this.gameId) {
			this.fetch();
		}

		setTimeout(() => {
			this._socket.on('mafia', (data) => {
				console.log(data);
			});

			setTimeout(() => {
				console.log('emitting');

				this._socket.emit('mafia', {
					test: 'test'
				});
			}, 5000);
		}, 5000);
	}

	fetch(): void {
		this._http
			.post('/api/mafia/fetch', {
				url: this.gameId
			})
			.subscribe(async (game: Game | null) => {
				if (game) {
					this.game = game;

					this.state = game.state;

					if (
						!this.players ||
						this.players.length !== game.players.length
					) {
						this.players = game.players;

						const stream = await this._rtc.initLocalStream();

						const video = document.getElementById(
							'camera_' + this.userService.user._id
						) as HTMLVideoElement;

						console.log(stream);

						if (video) video.srcObject = stream;
					}
				} else {
					this._router.navigateByUrl('/mafia');
				}
			});
	}
}
