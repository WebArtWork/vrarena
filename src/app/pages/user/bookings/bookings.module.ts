import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BookingsComponent } from './bookings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: BookingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [BookingsComponent]
})
export class BookingsModule {}
