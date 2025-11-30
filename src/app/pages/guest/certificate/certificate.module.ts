import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CalendarModule } from 'src/app/core/modules/calendar/calendar.module';
import { CollapseModule } from 'src/app/core/modules/collapse/collapse.module';
import { FormModule } from 'src/app/core/modules/form/form.module';
import { FileComponent } from 'src/app/modules/file/components/file/file.component';
import { CertificateComponent } from './certificate.component';

const routes: Routes = [
	{
		path: '',
		component: CertificateComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		FileComponent,
		CollapseModule,
		CalendarModule,
		FormModule
	],
	declarations: [CertificateComponent],
	providers: []
})
export class CertificateModule {}
