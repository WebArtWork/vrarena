import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CybersportcommentService } from '../../services/cybersportcomment.service';
import { Cybersportcomment } from '../../interfaces/cybersportcomment.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cybersportcommentFormComponents } from '../../formcomponents/cybersportcomment.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	standalone: false,
})
export class CommentsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cybersportcomment', cybersportcommentFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cybersportcommentService.setPerPage.bind(this._cybersportcommentService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Cybersportcomment>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Cybersportcomment);

					await firstValueFrom(
						this._cybersportcommentService.create(created as Cybersportcomment)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Cybersportcomment): void => {
			this._form
				.modal<Cybersportcomment>(this.form, [], doc)
				.then((updated: Cybersportcomment) => {
					this._core.copy(updated, doc);

					this._cybersportcommentService.update(doc);
				});
		},
		delete: (doc: Cybersportcomment): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cybersportcomment?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cybersportcommentService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cybersportcomment): void => {
					this._form.modalUnique<Cybersportcomment>('cybersportcomment', 'url', doc);
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

	rows: Cybersportcomment[] = [];

	constructor(
		private _translate: TranslateService,
		private _cybersportcommentService: CybersportcommentService,
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
				this._cybersportcommentService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Cybersportcomment>(create ? [] : this.rows)
				.then(async (cybersportcomments: Cybersportcomment[]) => {
					if (create) {
						for (const cybersportcomment of cybersportcomments) {
							this._preCreate(cybersportcomment);

							await firstValueFrom(
								this._cybersportcommentService.create(cybersportcomment)
							);
						}
					} else {
						for (const cybersportcomment of this.rows) {
							if (
								!cybersportcomments.find(
									(localCybersportcomment) => localCybersportcomment._id === cybersportcomment._id
								)
							) {
								await firstValueFrom(
									this._cybersportcommentService.delete(cybersportcomment)
								);
							}
						}

						for (const cybersportcomment of cybersportcomments) {
							const localCybersportcomment = this.rows.find(
								(localCybersportcomment) => localCybersportcomment._id === cybersportcomment._id
							);

							if (localCybersportcomment) {
								this._core.copy(cybersportcomment, localCybersportcomment);

								await firstValueFrom(
									this._cybersportcommentService.update(localCybersportcomment)
								);
							} else {
								this._preCreate(cybersportcomment);

								await firstValueFrom(
									this._cybersportcommentService.create(cybersportcomment)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cybersportcomment: Cybersportcomment): void {
		delete cybersportcomment.__created;
	}
}
