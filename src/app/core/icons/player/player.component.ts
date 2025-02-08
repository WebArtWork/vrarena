import { Component, Input } from '@angular/core';

@Component({
	selector: 'player-icon',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
	standalone: false
})
export class PlayerComponent {
	@Input() color = 'black';
}
