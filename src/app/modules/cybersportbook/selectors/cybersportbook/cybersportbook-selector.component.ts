import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportbookService } from '../../services/cybersportbook.service';
import { Cybersportbook } from '../../interfaces/cybersportbook.interface';

@Component({
	selector: 'cybersportbook-selector',
	templateUrl: './cybersportbook-selector.component.html',
	styleUrls: ['./cybersportbook-selector.component.scss'],
	imports: [SelectModule],
})
export class CybersportbookSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportbook[] {
		return this._cybersportbookService.cybersportbooks;
	}

	constructor(private _cybersportbookService: CybersportbookService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
