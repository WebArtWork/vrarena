import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MafiaComponent } from './mafia.component';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { LobbyComponent } from './lobby/lobby.component';
import { DayComponent } from './day/day.component';
import { NightComponent } from './night/night.component';
import { EndedComponent } from './ended/ended.component';

const routes: Routes = [
	{
		path: '',
		component: MafiaComponent
	},
	{
		path: ':gameUrl',
		component: MafiaComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [
		MafiaComponent,
		GamesComponent,
		LobbyComponent,
		DayComponent,
		NightComponent,
		EndedComponent
	]
})
export class MafiaModule {}
