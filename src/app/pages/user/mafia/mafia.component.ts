import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService, HttpService, SocketService } from 'wacom';
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
export class MafiaComponent implements OnInit {
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
		private _core: CoreService,
		private _http: HttpService,
		private _rtc: RtcService,
		private _router: Router
	) {
		if (this.gameId) {
			this.fetch();
		}

		this._socket.on(
			'mafia',
			async ({ offer, user, answer, candidate, to }) => {
				console.log(offer, user, answer);

				if (offer) {
					await this._rtc.createPeer(user);

					const peer = this._rtc.getPeer(user);

					peer!.ontrack = (e) => {
						const [stream] = e.streams;

						const video = document.getElementById(
							'camera_' + user
						) as HTMLVideoElement;

						if (video) video.srcObject = stream;
					};

					peer!.onicecandidate = (e) => {
						if (e.candidate) {
							this._socket.emit('mafia', {
								candidate: e.candidate,
								user: this.userService.user._id,
								to: user
							});
						}
					};

					this._socket.emit('mafia', {
						answer: await this._rtc.createAnswer(user, offer),
						user
					});
				} else if (answer && this.userService.user._id === user) {
					await this._rtc.setRemoteAnswer(user, answer);
				} else if (candidate && this.userService.user._id === to) {
					this._rtc.addIceCandidate(user, candidate);
				}
			}
		);
	}

	async ngOnInit(): Promise<void> {
		this._socket.emit('mafia', {
			offer: await this._rtc.createOffer(this._core.deviceID),
			user: this.userService.user._id
		});
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

						if (video) video.srcObject = stream;
					}
				} else {
					this._router.navigateByUrl('/mafia');
				}
			});
	}
}
