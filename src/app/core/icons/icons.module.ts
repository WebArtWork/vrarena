import { NgModule } from '@angular/core';
/* components */
import { VrglassComponent } from './vrglass/vrglass.component';
import { PlayerComponent } from './player/player.component';
import { SpiderComponent } from './spider/spider.component';

const icons = [
	/* icons */
	VrglassComponent,
	PlayerComponent,
	SpiderComponent
];

@NgModule({
	declarations: icons,
	exports: icons
})
export class IconsModule {}
