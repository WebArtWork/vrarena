import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CybersportcertificateService } from 'src/app/modules/cybersportcertificate/services/cybersportcertificate.service';

interface CertificateDetails {
	title: string;
	code: string; // 6-digit code
	issueDate: string;
	location: string;
	status: string;
}

@Component({
	templateUrl: './certificate.component.html',
	styleUrls: ['./certificate.component.scss'],
	standalone: false
})
export class CertificateComponent {
	private _certificateService = inject(CybersportcertificateService);
	private _router = inject(Router);
	certificate: CertificateDetails;

	constructor() {
		this._certificateService
			.fetch({
				_id: this._router.url.replace('/certificate/', '')
			})
			.subscribe((resp) => {
				if (resp) {
					this.certificate = resp as unknown as CertificateDetails;
				} else {
					this._router.navigateByUrl('/');
				}
			});
	}
}
