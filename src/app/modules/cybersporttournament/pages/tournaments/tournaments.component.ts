import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersporttournamentService } from '../../services/cybersporttournament.service';
import { Cybersporttournament } from '../../interfaces/cybersporttournament.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersporttournamentFormComponents } from '../../formcomponents/cybersporttournament.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.scss'],
	standalone: false,
})
export class TournamentsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersporttournament', cybersporttournamentFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersporttournamentService.setPerPage.bind(this._cybersporttournamentService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersporttournament>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersporttournament);

					await firstValueFrom(
						this._cybersporttournamentService.create(created as Cybersporttournament)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersporttournament): void => {
			this._form
				.modal<Cybersporttournament>(this.form, [], doc)
				.then((updated: Cybersporttournament) => {
					this._core.copy(updated, doc);

					this._cybersporttournamentService.update(doc);
				});
		},
		delete: (doc: Cybersporttournament): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersporttournament?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersporttournamentService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersporttournament): void => {
					this._form.modalUnique<Cybersporttournament>('cybersporttournament', 'url', doc);
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

	rows: Cybersporttournament[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersporttournamentService: CybersporttournamentService,
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
				this._cybersporttournamentService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersporttournament>(create ? [] : this.rows)
				.then(async (cybersporttournaments: Cybersporttournament[]) => {
					if (create) {
						for (const cybersporttournament of cybersporttournaments) {
							this._preCreate(cybersporttournament);

							await firstValueFrom(
								this._cybersporttournamentService.create(cybersporttournament)
							);
						}
					} else {
						for (const cybersporttournament of this.rows) {
							if (
								!cybersporttournaments.find(
									(localCybersporttournament) => localCybersporttournament._id === cybersporttournament._id
								)
							) {
								await firstValueFrom(
									this._cybersporttournamentService.delete(cybersporttournament)
								);
							}
						}

						for (const cybersporttournament of cybersporttournaments) {
							const localCybersporttournament = this.rows.find(
								(localCybersporttournament) => localCybersporttournament._id === cybersporttournament._id
							);

							if (localCybersporttournament) {
								this._core.copy(cybersporttournament, localCybersporttournament);

								await firstValueFrom(
									this._cybersporttournamentService.update(localCybersporttournament)
								);
							} else {
								this._preCreate(cybersporttournament);

								await firstValueFrom(
									this._cybersporttournamentService.create(cybersporttournament)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersporttournament: Cybersporttournament): void {
		delete cybersporttournament.__created;
	}
}
