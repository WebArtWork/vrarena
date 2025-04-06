import { Component, Input } from '@angular/core';
import { Game } from '../mafia.component';

@Component({
	selector: 'app-ended',
	standalone: false,
	templateUrl: './ended.component.html',
	styleUrl: './ended.component.scss'
})
export class EndedComponent {
	@Input() game: Game;
}
