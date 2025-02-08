import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportmembershipService } from '../../services/cybersportmembership.service';
import { Cybersportmembership } from '../../interfaces/cybersportmembership.interface';

@Component({
	selector: 'cybersportmembership-selector',
	templateUrl: './cybersportmembership-selector.component.html',
	styleUrls: ['./cybersportmembership-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportmembership[] {
		return this._cybersportmembershipService.cybersportmemberships;
	}

	constructor(private _cybersportmembershipService: CybersportmembershipService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
