import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsComponent } from './reservations/reservations.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DashboardComponent, ReservationsComponent, CommentsComponent]
})
export class DashboardModule {}
