import { CrudDocument } from 'wacom';

export interface Cybersportreservation extends CrudDocument {
	status: 'New' | 'Confirmed' | 'Denied';
	deviceID?: string;
	yearmonth: string;
	date: string;
	name: string;
	phone: string;
	times: string[];
	data: Object;
	game: string;
	notes: string;
}
