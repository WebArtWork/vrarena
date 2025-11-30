import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CybersportcertificateService } from '../../services/cybersportcertificate.service';
import { Cybersportcertificate } from '../../interfaces/cybersportcertificate.interface';

@Component({
	selector: 'cybersportcertificate-selector',
	templateUrl: './cybersportcertificate-selector.component.html',
	styleUrls: ['./cybersportcertificate-selector.component.scss'],
	imports: [SelectModule],
})
export class CybersportcertificateSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cybersportcertificate[] {
		return this._cybersportcertificateService.cybersportcertificates;
	}

	constructor(private _cybersportcertificateService: CybersportcertificateService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
