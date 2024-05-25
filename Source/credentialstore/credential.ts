//TODO: Add an interface that represents a Credential?

export class Credential {
	private _service: string;
	private _username: string;
	private _password: string;

	constructor(service: string, username: string, password: string) {
		this._service = service;
		this._username = username;
		this._password = password;
	}

	public get Service(): string {
		return this._service;
	}
	public get Username(): string {
		return this._username;
	}
	public get Password(): string {
		return this._password;
	}
}
