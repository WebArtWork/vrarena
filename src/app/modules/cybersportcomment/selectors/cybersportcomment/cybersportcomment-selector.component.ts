import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportcommentService } from '../../services/cybersportcomment.service';
import { Cybersportcomment } from '../../interfaces/cybersportcomment.interface';

@Component({
	selector: 'cybersportcomment-selector',
	templateUrl: './cybersportcomment-selector.component.html',
	styleUrls: ['./cybersportcomment-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportcomment[] {
		return this._cybersportcommentService.cybersportcomments;
	}

	constructor(private _cybersportcommentService: CybersportcommentService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
