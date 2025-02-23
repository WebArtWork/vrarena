import { CrudDocument } from 'wacom';

export interface Cybersportbook extends CrudDocument {
	yearmonth: string;
	date: string;
	name: string;
	phone: string;
	times: string[];
}
