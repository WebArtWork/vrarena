import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ReservationsComponent } from './reservations.component';
import { Routes, RouterModule } from '@angular/router';
import { TimesPipe } from './times.pipe';

const routes: Routes = [
	{
		path: '',
		component: ReservationsComponent
	},
	{
		path: 'manager',
		component: ReservationsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, TimesPipe],
	declarations: [ReservationsComponent]
})
export class ReservationsModule {}
