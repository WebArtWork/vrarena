import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportsessionService } from '../../services/cybersportsession.service';
import { Cybersportsession } from '../../interfaces/cybersportsession.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportsessionFormComponents } from '../../formcomponents/cybersportsession.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sessions.component.html',
	styleUrls: ['./sessions.component.scss'],
	standalone: false,
})
export class SessionsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportsession', cybersportsessionFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportsessionService.setPerPage.bind(this._cybersportsessionService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportsession>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportsession);

					await firstValueFrom(
						this._cybersportsessionService.create(created as Cybersportsession)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportsession): void => {
			this._form
				.modal<Cybersportsession>(this.form, [], doc)
				.then((updated: Cybersportsession) => {
					this._core.copy(updated, doc);

					this._cybersportsessionService.update(doc);
				});
		},
		delete: (doc: Cybersportsession): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportsession?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportsessionService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportsession): void => {
					this._form.modalUnique<Cybersportsession>('cybersportsession', 'url', doc);
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

	rows: Cybersportsession[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportsessionService: CybersportsessionService,
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
				this._cybersportsessionService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportsession>(create ? [] : this.rows)
				.then(async (cybersportsessions: Cybersportsession[]) => {
					if (create) {
						for (const cybersportsession of cybersportsessions) {
							this._preCreate(cybersportsession);

							await firstValueFrom(
								this._cybersportsessionService.create(cybersportsession)
							);
						}
					} else {
						for (const cybersportsession of this.rows) {
							if (
								!cybersportsessions.find(
									(localCybersportsession) => localCybersportsession._id === cybersportsession._id
								)
							) {
								await firstValueFrom(
									this._cybersportsessionService.delete(cybersportsession)
								);
							}
						}

						for (const cybersportsession of cybersportsessions) {
							const localCybersportsession = this.rows.find(
								(localCybersportsession) => localCybersportsession._id === cybersportsession._id
							);

							if (localCybersportsession) {
								this._core.copy(cybersportsession, localCybersportsession);

								await firstValueFrom(
									this._cybersportsessionService.update(localCybersportsession)
								);
							} else {
								this._preCreate(cybersportsession);

								await firstValueFrom(
									this._cybersportsessionService.create(cybersportsession)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportsession: Cybersportsession): void {
		delete cybersportsession.__created;
	}
}
