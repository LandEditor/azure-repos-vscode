/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function GetStatuses(statusText: string): Status[] {
	const result: Status[] = [];
	if (!statusText) {
		return result;
	}

	const statusStrings: string[] = statusText.split(",");
	for (let i = 0; i < statusStrings.length; i++) {
		switch (statusStrings[i].trim().toLowerCase()) {
			case "add":
				result.push(Status.ADD);
				break;
			case "branch":
				result.push(Status.BRANCH);
				break;
			case "delete":
				result.push(Status.DELETE);
				break;
			case "edit":
				result.push(Status.EDIT);
				break;
			case "lock":
				result.push(Status.LOCK);
				break;
			case "merge":
				result.push(Status.MERGE);
				break;
			case "rename":
				result.push(Status.RENAME);
				break;
			case "source rename":
				result.push(Status.RENAME);
				break;
			case "undelete":
				result.push(Status.UNDELETE);
				break;
			default:
				result.push(Status.UNKNOWN);
				break;
		}
	}

	return result;
}

export enum Status {
	ADD = 0,
	RENAME = 1,
	EDIT = 2,
	DELETE = 3,
	UNDELETE = 4,
	LOCK = 5,
	BRANCH = 6,
	MERGE = 7,
	CONFLICT = 8,
	UNKNOWN = 9,
}

export enum ConflictType {
	CONTENT = 0,
	RENAME = 1,
	DELETE = 2,
	DELETE_TARGET = 3,
	NAME_AND_CONTENT = 4,
	MERGE = 5,
	RESOLVED = 6,
}
