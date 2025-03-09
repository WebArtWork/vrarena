import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportgameService } from '../../services/cybersportgame.service';
import { Cybersportgame } from '../../interfaces/cybersportgame.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportgameFormComponents } from '../../formcomponents/cybersportgame.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: false
})
export class GamesComponent {
	columns = ['name'];

	form: FormInterface = this._form.getForm(
		'cybersportgame',
		cybersportgameFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportgameService.setPerPage.bind(
			this._cybersportgameService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportgame>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportgame);

					await firstValueFrom(
						this._cybersportgameService.create(
							created as Cybersportgame
						)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Cybersportgame): void => {
			this._form
				.modal<Cybersportgame>(this.form, [], doc)
				.then((updated: Cybersportgame) => {
					this._core.copy(updated, doc);

					this._cybersportgameService.update(doc);
				});
		},
		delete: (doc: Cybersportgame): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportgame?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._cybersportgameService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportgame): void => {
					this._form.modalUnique<Cybersportgame>(
						'cybersportgame',
						'url',
						doc
					);
				}
			},
			{
				icon: 'arrow_upward',
				click: (doc: Cybersportgame): void => {
					const index = this.rows.findIndex((d) => d._id === doc._id);

					if (index) {
						this.rows.splice(index, 1);

						this.rows.splice(index - 1, 0, doc);
					}

					for (let i = 0; i < this.rows.length; i++) {
						if (this.rows[i].order !== i) {
							this.rows[i].order = i;

							this._cybersportgameService.update(this.rows[i]);
						}
					}
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Cybersportgame[] = [];

	constructor(
		private _cybersportgameService: CybersportgameService,
		private _translate: TranslateService,
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
				this._cybersportgameService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportgame>(create ? [] : this.rows)
				.then(async (cybersportgames: Cybersportgame[]) => {
					if (create) {
						for (const cybersportgame of cybersportgames) {
							this._preCreate(cybersportgame);

							await firstValueFrom(
								this._cybersportgameService.create(
									cybersportgame
								)
							);
						}
					} else {
						for (const cybersportgame of this.rows) {
							if (
								!cybersportgames.find(
									(localCybersportgame) =>
										localCybersportgame._id ===
										cybersportgame._id
								)
							) {
								await firstValueFrom(
									this._cybersportgameService.delete(
										cybersportgame
									)
								);
							}
						}

						for (const cybersportgame of cybersportgames) {
							const localCybersportgame = this.rows.find(
								(localCybersportgame) =>
									localCybersportgame._id ===
									cybersportgame._id
							);

							if (localCybersportgame) {
								this._core.copy(
									cybersportgame,
									localCybersportgame
								);

								await firstValueFrom(
									this._cybersportgameService.update(
										localCybersportgame
									)
								);
							} else {
								this._preCreate(cybersportgame);

								await firstValueFrom(
									this._cybersportgameService.create(
										cybersportgame
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportgame: Cybersportgame): void {
		delete cybersportgame.__created;
	}
}
