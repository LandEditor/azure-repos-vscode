import type { ISettings } from "../helpers/settings";

export enum RepositoryType {
	GIT = 0,
	TFVC = 1,
	ANY = 2,
	EXTERNAL = 3,
}

export interface IRepositoryContext {
	Type: RepositoryType;

	//Added Initialize() so TFVC could call tf.cmd async
	Initialize(settings?: ISettings): Promise<boolean>;

	IsSsh: boolean;
	IsTeamFoundation: boolean;
	IsTeamServices: boolean;
	RemoteUrl: string;
	RepoFolder: string;
	RepositoryParentFolder: string;

	//Git-specific values
	CurrentBranch: string;
	CurrentRef: string;

	//TFVC-specific values
	TeamProjectName: string;
}
