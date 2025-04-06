import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { MafiaService } from '../../services/mafia.service';
import { Mafia } from '../../interfaces/mafia.interface';

@Component({
	selector: 'mafia-selector',
	templateUrl: './mafia-selector.component.html',
	styleUrls: ['./mafia-selector.component.scss'],
	imports: [SelectModule],
})
export class MafiaSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Mafia[] {
		return this._mafiaService.mafias;
	}

	constructor(private _mafiaService: MafiaService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
