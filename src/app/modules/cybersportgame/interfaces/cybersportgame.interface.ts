import { CrudDocument } from 'wacom';

export interface Cybersportgame extends CrudDocument {
	name: string;
	description: string;
	shortDescription: string;
	image: string;
	trailer: string;
}
