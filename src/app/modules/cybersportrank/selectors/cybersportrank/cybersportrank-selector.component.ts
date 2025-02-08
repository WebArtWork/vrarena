import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportrankService } from '../../services/cybersportrank.service';
import { Cybersportrank } from '../../interfaces/cybersportrank.interface';

@Component({
	selector: 'cybersportrank-selector',
	templateUrl: './cybersportrank-selector.component.html',
	styleUrls: ['./cybersportrank-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportrank[] {
		return this._cybersportrankService.cybersportranks;
	}

	constructor(private _cybersportrankService: CybersportrankService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
