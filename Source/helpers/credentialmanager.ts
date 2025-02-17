/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import * as Q from "q";
import { IRequestHandler } from "vso-node-api/interfaces/common/VsoBaseInterfaces";

import { TeamServerContext } from "../contexts/servercontext";
import { CredentialStore } from "../credentialstore/credentialstore";
import { CredentialInfo } from "../info/credentialinfo";
import { RepoUtils } from "./repoutils";

export class CredentialManager {
	private static _credentialHandler: IRequestHandler;

	private _credentialStore: CredentialStore;

	constructor() {
		// Specify the prefix for use on Windows and Mac.
		// On Linux, create a custom folder and file.
		this._credentialStore = new CredentialStore(
			"team:",
			".team",
			"team-secrets.json",
		);
	}

	public static GetCredentialHandler(): IRequestHandler {
		return CredentialManager._credentialHandler;
	}

	public GetCredentials(
		context: TeamServerContext,
	): Q.Promise<CredentialInfo> {
		const deferred: Q.Deferred<CredentialInfo> = Q.defer<CredentialInfo>();

		this.getCredentials(context)
			.then((credInfo: CredentialInfo) => {
				if (credInfo !== undefined) {
					CredentialManager._credentialHandler =
						credInfo.CredentialHandler;

					deferred.resolve(credInfo);
				} else {
					deferred.resolve(undefined);
				}
			})
			.catch((reason) => {
				deferred.reject(reason);
			});

		return deferred.promise;
	}

	public RemoveCredentials(context: TeamServerContext): Q.Promise<void> {
		const deferred: Q.Deferred<void> = Q.defer<void>();

		this._credentialStore
			.RemoveCredential(CredentialManager.getKeyFromContext(context))
			.then(() => {
				deferred.resolve(undefined);
			})
			.catch((reason) => {
				deferred.reject(reason);
			});

		return deferred.promise;
	}

	public StoreCredentials(
		context: TeamServerContext,
		username: string,
		password: string,
	): Q.Promise<void> {
		const deferred: Q.Deferred<void> = Q.defer<void>();

		this._credentialStore
			.SetCredential(
				CredentialManager.getKeyFromContext(context),
				username,
				password,
			)
			.then(() => {
				deferred.resolve(undefined);
			})
			.catch((reason) => {
				deferred.reject(reason);
			});

		return deferred.promise;
	}

	private getCredentials(
		context: TeamServerContext,
	): Q.Promise<CredentialInfo> {
		const deferred: Q.Deferred<CredentialInfo> = Q.defer<CredentialInfo>();

		this._credentialStore
			.GetCredential(CredentialManager.getKeyFromContext(context))
			.then((cred) => {
				if (cred !== undefined) {
					if (context.RepoInfo.IsTeamServices) {
						deferred.resolve(new CredentialInfo(cred.Password));
					} else if (context.RepoInfo.IsTeamFoundationServer) {
						let domain: string;

						let user: string = cred.Username;

						const pair: string[] = user.split("\\");

						if (pair.length > 1) {
							domain = pair[0];

							user = pair[pair.length - 1];
						}

						deferred.resolve(
							new CredentialInfo(
								user,
								cred.Password,
								domain,
								/*workstation*/ undefined,
							),
						);
					}
				} else {
					deferred.resolve(undefined);
				}
			})
			.catch((reason) => {
				deferred.reject(reason);
			});

		return deferred.promise;
	}

	private static getKeyFromContext(context: TeamServerContext): string {
		if (
			RepoUtils.IsTeamFoundationServicesAzureRepo(
				context.RepoInfo.AccountUrl,
			)
		) {
			return context.RepoInfo.Host + "/" + context.RepoInfo.Account;
		}

		return context.RepoInfo.Host;
	}
}
