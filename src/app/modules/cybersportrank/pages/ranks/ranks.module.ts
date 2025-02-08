import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RanksComponent } from './ranks.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RanksComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [RanksComponent],
	providers: []
})
export class RanksModule {}
