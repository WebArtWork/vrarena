import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BookComponent } from './book.component';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule } from 'src/app/core/modules/calendar/calendar.module';

const routes: Routes = [
	{
		path: '',
		component: BookComponent
	},
	{
		path: ':urlOrID',
		component: BookComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, CalendarModule],
	declarations: [BookComponent]
})
export class BookModule {}
