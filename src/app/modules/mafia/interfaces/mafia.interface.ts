import { CrudDocument } from 'wacom';

export interface Mafia extends CrudDocument {
	name: string;
	description: string;
}
