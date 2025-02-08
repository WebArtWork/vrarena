import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MembershipsComponent } from './memberships.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MembershipsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MembershipsComponent],
	providers: []
})
export class MembershipsModule {}
