import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportachievementService } from '../../services/cybersportachievement.service';
import { Cybersportachievement } from '../../interfaces/cybersportachievement.interface';

@Component({
	selector: 'cybersportachievement-selector',
	templateUrl: './cybersportachievement-selector.component.html',
	styleUrls: ['./cybersportachievement-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportachievement[] {
		return this._cybersportachievementService.cybersportachievements;
	}

	constructor(private _cybersportachievementService: CybersportachievementService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
