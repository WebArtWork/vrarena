import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { GamesComponent } from './games.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: GamesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [GamesComponent]
})
export class GamesModule {}
