import { NgModule } from '@angular/core';
/* components */
import { PlayerComponent } from './player/player.component';
import { SpiderComponent } from './spider/spider.component';

const icons = [
	/* icons */
	PlayerComponent,
	SpiderComponent
];

@NgModule({
	declarations: icons,
	exports: icons
})
export class IconsModule {}
