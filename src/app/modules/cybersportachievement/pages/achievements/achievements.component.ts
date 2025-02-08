import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportachievementService } from '../../services/cybersportachievement.service';
import { Cybersportachievement } from '../../interfaces/cybersportachievement.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportachievementFormComponents } from '../../formcomponents/cybersportachievement.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.scss'],
	standalone: false,
})
export class AchievementsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportachievement', cybersportachievementFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportachievementService.setPerPage.bind(this._cybersportachievementService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportachievement>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportachievement);

					await firstValueFrom(
						this._cybersportachievementService.create(created as Cybersportachievement)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportachievement): void => {
			this._form
				.modal<Cybersportachievement>(this.form, [], doc)
				.then((updated: Cybersportachievement) => {
					this._core.copy(updated, doc);

					this._cybersportachievementService.update(doc);
				});
		},
		delete: (doc: Cybersportachievement): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportachievement?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportachievementService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportachievement): void => {
					this._form.modalUnique<Cybersportachievement>('cybersportachievement', 'url', doc);
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

	rows: Cybersportachievement[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportachievementService: CybersportachievementService,
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
				this._cybersportachievementService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportachievement>(create ? [] : this.rows)
				.then(async (cybersportachievements: Cybersportachievement[]) => {
					if (create) {
						for (const cybersportachievement of cybersportachievements) {
							this._preCreate(cybersportachievement);

							await firstValueFrom(
								this._cybersportachievementService.create(cybersportachievement)
							);
						}
					} else {
						for (const cybersportachievement of this.rows) {
							if (
								!cybersportachievements.find(
									(localCybersportachievement) => localCybersportachievement._id === cybersportachievement._id
								)
							) {
								await firstValueFrom(
									this._cybersportachievementService.delete(cybersportachievement)
								);
							}
						}

						for (const cybersportachievement of cybersportachievements) {
							const localCybersportachievement = this.rows.find(
								(localCybersportachievement) => localCybersportachievement._id === cybersportachievement._id
							);

							if (localCybersportachievement) {
								this._core.copy(cybersportachievement, localCybersportachievement);

								await firstValueFrom(
									this._cybersportachievementService.update(localCybersportachievement)
								);
							} else {
								this._preCreate(cybersportachievement);

								await firstValueFrom(
									this._cybersportachievementService.create(cybersportachievement)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportachievement: Cybersportachievement): void {
		delete cybersportachievement.__created;
	}
}
