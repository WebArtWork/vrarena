import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportreservationService } from '../../services/cybersportreservation.service';
import { Cybersportreservation } from '../../interfaces/cybersportreservation.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportreservationFormComponents } from '../../formcomponents/cybersportreservation.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss'],
	standalone: false,
})
export class ReservationsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportreservation', cybersportreservationFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportreservationService.setPerPage.bind(this._cybersportreservationService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportreservation>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportreservation);

					await firstValueFrom(
						this._cybersportreservationService.create(created as Cybersportreservation)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportreservation): void => {
			this._form
				.modal<Cybersportreservation>(this.form, [], doc)
				.then((updated: Cybersportreservation) => {
					this._core.copy(updated, doc);

					this._cybersportreservationService.update(doc);
				});
		},
		delete: (doc: Cybersportreservation): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportreservation?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportreservationService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportreservation): void => {
					this._form.modalUnique<Cybersportreservation>('cybersportreservation', 'url', doc);
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

	rows: Cybersportreservation[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportreservationService: CybersportreservationService,
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
				this._cybersportreservationService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportreservation>(create ? [] : this.rows)
				.then(async (cybersportreservations: Cybersportreservation[]) => {
					if (create) {
						for (const cybersportreservation of cybersportreservations) {
							this._preCreate(cybersportreservation);

							await firstValueFrom(
								this._cybersportreservationService.create(cybersportreservation)
							);
						}
					} else {
						for (const cybersportreservation of this.rows) {
							if (
								!cybersportreservations.find(
									(localCybersportreservation) => localCybersportreservation._id === cybersportreservation._id
								)
							) {
								await firstValueFrom(
									this._cybersportreservationService.delete(cybersportreservation)
								);
							}
						}

						for (const cybersportreservation of cybersportreservations) {
							const localCybersportreservation = this.rows.find(
								(localCybersportreservation) => localCybersportreservation._id === cybersportreservation._id
							);

							if (localCybersportreservation) {
								this._core.copy(cybersportreservation, localCybersportreservation);

								await firstValueFrom(
									this._cybersportreservationService.update(localCybersportreservation)
								);
							} else {
								this._preCreate(cybersportreservation);

								await firstValueFrom(
									this._cybersportreservationService.create(cybersportreservation)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportreservation: Cybersportreservation): void {
		delete cybersportreservation.__created;
	}
}
