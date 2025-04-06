import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { MafiaService } from '../../services/mafia.service';
import { Mafia } from '../../interfaces/mafia.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { mafiaFormComponents } from '../../formcomponents/mafia.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: false,
})
export class GamesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('mafia', mafiaFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._mafiaService.setPerPage.bind(this._mafiaService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Mafia>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Mafia);

					await firstValueFrom(
						this._mafiaService.create(created as Mafia)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Mafia): void => {
			this._form
				.modal<Mafia>(this.form, [], doc)
				.then((updated: Mafia) => {
					this._core.copy(updated, doc);

					this._mafiaService.update(doc);
				});
		},
		delete: (doc: Mafia): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this mafia?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._mafiaService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Mafia): void => {
					this._form.modalUnique<Mafia>('mafia', 'url', doc);
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

	rows: Mafia[] = [];

	constructor(
		private _translate: TranslateService,
		private _mafiaService: MafiaService,
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
				this._mafiaService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Mafia>(create ? [] : this.rows)
				.then(async (mafias: Mafia[]) => {
					if (create) {
						for (const mafia of mafias) {
							this._preCreate(mafia);

							await firstValueFrom(
								this._mafiaService.create(mafia)
							);
						}
					} else {
						for (const mafia of this.rows) {
							if (
								!mafias.find(
									(localMafia) => localMafia._id === mafia._id
								)
							) {
								await firstValueFrom(
									this._mafiaService.delete(mafia)
								);
							}
						}

						for (const mafia of mafias) {
							const localMafia = this.rows.find(
								(localMafia) => localMafia._id === mafia._id
							);

							if (localMafia) {
								this._core.copy(mafia, localMafia);

								await firstValueFrom(
									this._mafiaService.update(localMafia)
								);
							} else {
								this._preCreate(mafia);

								await firstValueFrom(
									this._mafiaService.create(mafia)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(mafia: Mafia): void {
		delete mafia.__created;
	}
}
