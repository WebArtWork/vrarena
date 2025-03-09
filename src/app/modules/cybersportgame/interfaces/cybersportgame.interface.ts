import { CrudDocument } from 'wacom';

export interface Cybersportgame extends CrudDocument {
	url: string;
	name: string;
	order: number;
	description: string;
	shortDescription: string;
	image: string;
	trailer: string;
	isMultiplayer: boolean;
	isStanding: boolean;
	isSitting: boolean;
	afterAge: number;
	maxPlayers: number;
}
