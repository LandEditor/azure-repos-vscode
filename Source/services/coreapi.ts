import type { ICoreApi } from "vso-node-api/CoreApi";
import { WebApi } from "vso-node-api/WebApi";
import type {
	TeamProject,
	TeamProjectCollection,
} from "vso-node-api/interfaces/CoreInterfaces";
import { CredentialManager } from "../helpers/credentialmanager";

export class CoreApiService {
	private _coreApi: ICoreApi;

	constructor(remoteUrl: string) {
		this._coreApi = new WebApi(
			remoteUrl,
			CredentialManager.GetCredentialHandler(),
		).getCoreApi();
	}

	//Get the
	public async GetProjectCollection(
		collectionName: string,
	): Promise<TeamProjectCollection> {
		return await this._coreApi.getProjectCollection(collectionName);
	}

	//Get the
	public async GetTeamProject(projectName: string): Promise<TeamProject> {
		return await this._coreApi.getProject(projectName, false, false);
	}
}
