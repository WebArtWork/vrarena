import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { CrudComponent } from 'wacom';
import { cybersportcertificateFormComponents } from '../../formcomponents/cybersportcertificate.formcomponents';
import { Cybersportcertificate } from '../../interfaces/cybersportcertificate.interface';
import { CybersportcertificateService } from '../../services/cybersportcertificate.service';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent extends CrudComponent<
	CybersportcertificateService,
	Cybersportcertificate,
	FormInterface
> {
	columns = ['_id', 'title', 'code', 'issueDate', 'location', 'status'];

	config = this.getConfig();

	constructor(
		_cybersportcertificateService: CybersportcertificateService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(
			cybersportcertificateFormComponents,
			_form,
			_translate,
			_cybersportcertificateService
		);

		this.setDocuments();
	}
}
