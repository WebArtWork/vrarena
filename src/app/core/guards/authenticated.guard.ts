import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Router,
	RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthenticatedGuard {
	constructor(private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (localStorage.getItem('waw_user')) {
			return true;
		} else {
			localStorage.setItem('waw_redirect', state.url);

			this.router.navigateByUrl('/sign');

			return false;
		}
	}
}
