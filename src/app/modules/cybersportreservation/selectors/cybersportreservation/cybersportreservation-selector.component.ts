import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportreservationService } from '../../services/cybersportreservation.service';
import { Cybersportreservation } from '../../interfaces/cybersportreservation.interface';

@Component({
	selector: 'cybersportreservation-selector',
	templateUrl: './cybersportreservation-selector.component.html',
	styleUrls: ['./cybersportreservation-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportreservation[] {
		return this._cybersportreservationService.cybersportreservations;
	}

	constructor(private _cybersportreservationService: CybersportreservationService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
