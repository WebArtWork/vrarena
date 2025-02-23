import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportbookService } from '../../services/cybersportbook.service';
import { Cybersportbook } from '../../interfaces/cybersportbook.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportbookFormComponents } from '../../formcomponents/cybersportbook.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './bookings.component.html',
	styleUrls: ['./bookings.component.scss'],
	standalone: false,
})
export class BookingsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportbook', cybersportbookFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportbookService.setPerPage.bind(this._cybersportbookService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportbook>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportbook);

					await firstValueFrom(
						this._cybersportbookService.create(created as Cybersportbook)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportbook): void => {
			this._form
				.modal<Cybersportbook>(this.form, [], doc)
				.then((updated: Cybersportbook) => {
					this._core.copy(updated, doc);

					this._cybersportbookService.update(doc);
				});
		},
		delete: (doc: Cybersportbook): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportbook?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportbookService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportbook): void => {
					this._form.modalUnique<Cybersportbook>('cybersportbook', 'url', doc);
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

	rows: Cybersportbook[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportbookService: CybersportbookService,
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
				this._cybersportbookService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportbook>(create ? [] : this.rows)
				.then(async (cybersportbooks: Cybersportbook[]) => {
					if (create) {
						for (const cybersportbook of cybersportbooks) {
							this._preCreate(cybersportbook);

							await firstValueFrom(
								this._cybersportbookService.create(cybersportbook)
							);
						}
					} else {
						for (const cybersportbook of this.rows) {
							if (
								!cybersportbooks.find(
									(localCybersportbook) => localCybersportbook._id === cybersportbook._id
								)
							) {
								await firstValueFrom(
									this._cybersportbookService.delete(cybersportbook)
								);
							}
						}

						for (const cybersportbook of cybersportbooks) {
							const localCybersportbook = this.rows.find(
								(localCybersportbook) => localCybersportbook._id === cybersportbook._id
							);

							if (localCybersportbook) {
								this._core.copy(cybersportbook, localCybersportbook);

								await firstValueFrom(
									this._cybersportbookService.update(localCybersportbook)
								);
							} else {
								this._preCreate(cybersportbook);

								await firstValueFrom(
									this._cybersportbookService.create(cybersportbook)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportbook: Cybersportbook): void {
		delete cybersportbook.__created;
	}
}
