import { CrudDocument } from 'wacom';

export interface Cybersportreservation extends CrudDocument {
	yearmonth: string;
	date: string;
	name: string;
	phone: string;
	times: string[];
	data: Object;
	game: string;
	notes: string;
}
