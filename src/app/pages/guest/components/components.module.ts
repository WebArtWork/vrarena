import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsComponent } from './components.component';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from 'src/app/modules/file/components/file/file.component';
import { CollapseModule } from 'src/app/core/modules/collapse/collapse.module';
import { CalendarModule } from 'src/app/core/modules/calendar/calendar.module';
import { FormModule } from 'src/app/core/modules/form/form.module';

const routes: Routes = [
	{
		path: '',
		component: ComponentsComponent
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
	declarations: [ComponentsComponent],
	providers: []
})
export class ComponentsModule {}
