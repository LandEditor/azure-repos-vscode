/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as os from "os";
import { Constants } from "../helpers/constants";

export class UserAgentProvider {
	private static _vsCodeVersion = "0.0.0";

	public static get UserAgent(): string {
		// Example: VSTSVSCode/1.115.1 (VSCode/10.1.0; Windows_NT/10.0.10586; Node/6.5.0)
		const userAgent: string = `${Constants.ExtensionUserAgentName}/${
			Constants.ExtensionVersion
		} (VSCode ${
			UserAgentProvider._vsCodeVersion
		}; ${os.type()} ${os.release()}; Node ${process.versions["node"]})`;
		return userAgent;
	}

	//Allow the VS Code version to be set (but only retrieved via UserAgent string)
	public static set VSCodeVersion(vsCodeVersion: string) {
		UserAgentProvider._vsCodeVersion = vsCodeVersion;
	}
}
