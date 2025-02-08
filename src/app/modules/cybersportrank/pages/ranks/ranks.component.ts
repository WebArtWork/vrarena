import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportrankService } from '../../services/cybersportrank.service';
import { Cybersportrank } from '../../interfaces/cybersportrank.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportrankFormComponents } from '../../formcomponents/cybersportrank.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './ranks.component.html',
	styleUrls: ['./ranks.component.scss'],
	standalone: false,
})
export class RanksComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportrank', cybersportrankFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportrankService.setPerPage.bind(this._cybersportrankService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportrank>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportrank);

					await firstValueFrom(
						this._cybersportrankService.create(created as Cybersportrank)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportrank): void => {
			this._form
				.modal<Cybersportrank>(this.form, [], doc)
				.then((updated: Cybersportrank) => {
					this._core.copy(updated, doc);

					this._cybersportrankService.update(doc);
				});
		},
		delete: (doc: Cybersportrank): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportrank?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportrankService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportrank): void => {
					this._form.modalUnique<Cybersportrank>('cybersportrank', 'url', doc);
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

	rows: Cybersportrank[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportrankService: CybersportrankService,
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
				this._cybersportrankService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportrank>(create ? [] : this.rows)
				.then(async (cybersportranks: Cybersportrank[]) => {
					if (create) {
						for (const cybersportrank of cybersportranks) {
							this._preCreate(cybersportrank);

							await firstValueFrom(
								this._cybersportrankService.create(cybersportrank)
							);
						}
					} else {
						for (const cybersportrank of this.rows) {
							if (
								!cybersportranks.find(
									(localCybersportrank) => localCybersportrank._id === cybersportrank._id
								)
							) {
								await firstValueFrom(
									this._cybersportrankService.delete(cybersportrank)
								);
							}
						}

						for (const cybersportrank of cybersportranks) {
							const localCybersportrank = this.rows.find(
								(localCybersportrank) => localCybersportrank._id === cybersportrank._id
							);

							if (localCybersportrank) {
								this._core.copy(cybersportrank, localCybersportrank);

								await firstValueFrom(
									this._cybersportrankService.update(localCybersportrank)
								);
							} else {
								this._preCreate(cybersportrank);

								await firstValueFrom(
									this._cybersportrankService.create(cybersportrank)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportrank: Cybersportrank): void {
		delete cybersportrank.__created;
	}
}
