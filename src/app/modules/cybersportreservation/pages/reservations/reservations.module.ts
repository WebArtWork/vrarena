import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ReservationsComponent } from './reservations.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ReservationsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ReservationsComponent],
	providers: []
})
export class ReservationsModule {}
