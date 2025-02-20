import { UserService } from 'src/app/modules/user/services/user.service';
import { coreAnimation } from '../../animations/core.animations';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	animations: [coreAnimation],
	standalone: false
})
export class PublicComponent {
	constructor(public us: UserService, private _platform: Platform) {}
}
