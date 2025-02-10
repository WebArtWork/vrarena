import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'document',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Document'
					}
				},
				loadChildren: () =>
					import('./pages/guest/document/document.module').then(
						(m) => m.DocumentModule
					)
			},
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: 'cybersportmanager',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* cybersportmanager */
			{
				path: 'comments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () => import('./pages/cybersportmanager/comments/comments.module').then(m => m.CommentsModule)
			}, 
			{
				path: 'reservations',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Reservations'
					}
				},
				loadChildren: () => import('./pages/cybersportmanager/reservations/reservations.module').then(m => m.ReservationsModule)
			}, 
			{
				path: 'dashboard',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dashboard'
					}
				},
				loadChildren: () =>
					import(
						'./pages/cybersportmanager/dashboard/dashboard.module'
					).then((m) => m.DashboardModule)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'reservations',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Reservations'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/reservations/reservations.module'
					).then((m) => m.ReservationsModule)
			},
			{
				path: 'sessions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sessions'
					}
				},
				loadChildren: () =>
					import('./pages/user/sessions/sessions.module').then(
						(m) => m.SessionsModule
					)
			},
			{
				path: 'sessions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sessions'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportsession/pages/sessions/sessions.module'
					).then((m) => m.SessionsModule)
			},
			{
				path: 'ranks',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Ranks'
					}
				},
				loadChildren: () =>
					import('./pages/user/ranks/ranks.module').then(
						(m) => m.RanksModule
					)
			},
			{
				path: 'achievements',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Achievements'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/achievements/achievements.module'
					).then((m) => m.AchievementsModule)
			},
			{
				path: 'tournament',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tournament'
					}
				},
				loadChildren: () =>
					import('./pages/user/tournament/tournament.module').then(
						(m) => m.TournamentModule
					)
			},
			{
				path: 'tournaments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tournaments'
					}
				},
				loadChildren: () =>
					import('./pages/user/tournaments/tournaments.module').then(
						(m) => m.TournamentsModule
					)
			},
			{
				path: 'game',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Game'
					}
				},
				loadChildren: () =>
					import('./pages/user/game/game.module').then(
						(m) => m.GameModule
					)
			},
			{
				path: 'games',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Games'
					}
				},
				loadChildren: () =>
					import('./pages/user/games/games.module').then(
						(m) => m.GamesModule
					)
			},
			{
				path: 'dashboard',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dashboard'
					}
				},
				loadChildren: () =>
					import('./pages/user/dashboard/dashboard.module').then(
						(m) => m.DashboardModule
					)
			},
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'ranks',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Ranks'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportrank/pages/ranks/ranks.module'
					).then((m) => m.RanksModule)
			},
			{
				path: 'tournaments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tournaments'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersporttournament/pages/tournaments/tournaments.module'
					).then((m) => m.TournamentsModule)
			},
			{
				path: 'comments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportcomment/pages/comments/comments.module'
					).then((m) => m.CommentsModule)
			},
			{
				path: 'memberships',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Memberships'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportmembership/pages/memberships/memberships.module'
					).then((m) => m.MembershipsModule)
			},
			{
				path: 'achievements',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Achievements'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportachievement/pages/achievements/achievements.module'
					).then((m) => m.AchievementsModule)
			},
			{
				path: 'games',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Games'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportgame/pages/games/games.module'
					).then((m) => m.GamesModule)
			},
			{
				path: 'reservations',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Reservations'
					}
				},
				loadChildren: () =>
					import(
						'./modules/cybersportreservation/pages/reservations/reservations.module'
					).then((m) => m.ReservationsModule)
			},
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
