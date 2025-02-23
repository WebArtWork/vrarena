import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from 'src/app/modules/file/components/file/file.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, FileComponent],
	declarations: [ProfileComponent],
	providers: []
})
export class ProfileModule {}
