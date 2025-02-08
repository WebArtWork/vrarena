import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportmembershipService } from '../../services/cybersportmembership.service';
import { Cybersportmembership } from '../../interfaces/cybersportmembership.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportmembershipFormComponents } from '../../formcomponents/cybersportmembership.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './memberships.component.html',
	styleUrls: ['./memberships.component.scss'],
	standalone: false,
})
export class MembershipsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportmembership', cybersportmembershipFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportmembershipService.setPerPage.bind(this._cybersportmembershipService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportmembership>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportmembership);

					await firstValueFrom(
						this._cybersportmembershipService.create(created as Cybersportmembership)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportmembership): void => {
			this._form
				.modal<Cybersportmembership>(this.form, [], doc)
				.then((updated: Cybersportmembership) => {
					this._core.copy(updated, doc);

					this._cybersportmembershipService.update(doc);
				});
		},
		delete: (doc: Cybersportmembership): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportmembership?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportmembershipService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportmembership): void => {
					this._form.modalUnique<Cybersportmembership>('cybersportmembership', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Cybersportmembership[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportmembershipService: CybersportmembershipService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._cybersportmembershipService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Cybersportmembership>(create ? [] : this.rows)
				.then(async (cybersportmemberships: Cybersportmembership[]) => {
					if (create) {
						for (const cybersportmembership of cybersportmemberships) {
							this._preCreate(cybersportmembership);

							await firstValueFrom(
								this._cybersportmembershipService.create(cybersportmembership)
							);
						}
					} else {
						for (const cybersportmembership of this.rows) {
							if (
								!cybersportmemberships.find(
									(localCybersportmembership) => localCybersportmembership._id === cybersportmembership._id
								)
							) {
								await firstValueFrom(
									this._cybersportmembershipService.delete(cybersportmembership)
								);
							}
						}

						for (const cybersportmembership of cybersportmemberships) {
							const localCybersportmembership = this.rows.find(
								(localCybersportmembership) => localCybersportmembership._id === cybersportmembership._id
							);

							if (localCybersportmembership) {
								this._core.copy(cybersportmembership, localCybersportmembership);

								await firstValueFrom(
									this._cybersportmembershipService.update(localCybersportmembership)
								);
							} else {
								this._preCreate(cybersportmembership);

								await firstValueFrom(
									this._cybersportmembershipService.create(cybersportmembership)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportmembership: Cybersportmembership): void {
		delete cybersportmembership.__created;
	}
}
