import { Component, Input } from '@angular/core';

@Component({
	selector: 'vrglass-icon',
	templateUrl: './vrglass.component.html',
	styleUrls: ['./vrglass.component.scss'],
	standalone: false
})
export class VrglassComponent {
	@Input() color = 'black';
}
