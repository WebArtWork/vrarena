import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, SocketService, RtcService } from 'wacom';
import { UserService } from 'src/app/modules/user/services/user.service';

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

		this._socket.on(
			'mafia',
			async ({ userA, userB, offer, answer, candidate }) => {
				if (!userB) {
					console.log('we have new user');

					await this._rtc.createPeer(userA);

					const peer = this._rtc.getPeer(userA)!;

					peer.onicecandidate = (e) => {
						console.log('onicecandidate', e);

						if (e.candidate) {
							this._socket.emit('mafia', {
								candidate: e.candidate,
								userB: this.userService.user._id,
								userA
							});
						}
					};

					peer.ontrack = (e) => {
						const [stream] = e.streams;
						const video = document.getElementById(
							'camera_' + userA
						) as HTMLVideoElement;
						if (video) video.srcObject = stream;
					};

					this._socket.emit('mafia', {
						offer: await _rtc.createOffer(userA),
						userA,
						userB: this.userService.user._id
					});
				} else if (offer && this.userService.user._id === userA) {
					console.log('we have new connection');

					if (!this._rtc.getPeer(userB)) {
						await this._rtc.createPeer(userB);
					}

					const peer = this._rtc.getPeer(userB)!;

					peer.ontrack = (e) => {
						const [stream] = e.streams;
						const video = document.getElementById(
							'camera_' + userB
						) as HTMLVideoElement;
						if (video) video.srcObject = stream;
					};

					this._socket.emit('mafia', {
						answer: await this._rtc.createAnswer(userB, offer),
						userA,
						userB
					});
				} else if (answer && this.userService.user._id === userB) {
					console.log('we approve connection');
					if (!this._rtc.getPeer(userA)) {
						await this._rtc.createPeer(userA);

						// optional: reattach handlers
						const peer = this._rtc.getPeer(userA)!;

						peer.ontrack = (e) => {
							const [stream] = e.streams;

							const video = document.getElementById(
								'camera_' + userA
							) as HTMLVideoElement;

							if (video) video.srcObject = stream;
						};
					}

					await this._rtc.setRemoteAnswer(userA, answer);
				} else if (candidate && this.userService.user._id === userA) {
					console.log('we add ice', candidate);

					this._rtc.addIceCandidate(userB, candidate);
				}
			}
		);
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

						const video = document.getElementById(
							'camera_' + this.userService.user._id
						) as HTMLVideoElement;

						if (video) {
							video.srcObject = await this._rtc.initLocalStream();
						}

						this._socket.emit('mafia', {
							userA: this.userService.user._id
						});
					}
				} else {
					this._router.navigateByUrl('/mafia');
				}
			});
	}
}
