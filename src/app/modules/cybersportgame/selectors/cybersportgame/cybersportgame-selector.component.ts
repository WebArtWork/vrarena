import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportgameService } from '../../services/cybersportgame.service';
import { Cybersportgame } from '../../interfaces/cybersportgame.interface';

@Component({
	selector: 'cybersportgame-selector',
	templateUrl: './cybersportgame-selector.component.html',
	styleUrls: ['./cybersportgame-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportgame[] {
		return this._cybersportgameService.cybersportgames;
	}

	constructor(private _cybersportgameService: CybersportgameService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
