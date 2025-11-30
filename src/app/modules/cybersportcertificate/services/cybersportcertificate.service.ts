import { Injectable } from '@angular/core';
import { Cybersportcertificate } from '../interfaces/cybersportcertificate.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CybersportcertificateService extends CrudService<Cybersportcertificate> {
	constructor() {
		super({
			name: 'cybersportcertificate',
		});
	}
}
