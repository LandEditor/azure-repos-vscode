/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//
// Access to the OSX keychain - list, add, get password, remove
//
const _ = require("underscore");
const childProcess = require("child_process");
const es = require("event-stream");
const parser = require("./osx-keychain-parser");

const securityPath = "/usr/bin/security";

let targetNamePrefix = "";

//Allow callers to set their own prefix
function setPrefix(prefix) {
	targetNamePrefix = prefix;
}

function ensurePrefix(targetName) {
	if (targetName.slice(targetNamePrefix.length) !== targetNamePrefix) {
		targetName = targetNamePrefix + targetName;
	}
	return targetName;
}

function removePrefix(targetName) {
	return targetName.slice(targetNamePrefix.length);
}

/**
 * List contents of default keychain, no passwords.
 *
 * @return {Stream} object mode stream of parsed results.
 */
function list() {
	const securityProcess = childProcess.spawn(securityPath, ["dump-keychain"]);

	return securityProcess.stdout
		.pipe(es.split())
		.pipe(es.mapSync((line) => line.replace(/\\134/g, "\\")))
		.pipe(new parser.ParsingStream());
}

/**
 * Get the password for a given key from the keychain
 * Assumes it's a generic credential.
 *
 * @param {string} userName user name to look up
 * @param {string} service service identifier
 * @param {Function(err, string)} callback callback receiving
 *                                returned result.
 */
function get(userName, service, callback) {
	const args = [
		"find-generic-password",
		"-a",
		userName,
		"-s",
		ensurePrefix(service),
		"-g",
	];

	childProcess.execFile(securityPath, args, (err, stdout, stderr) => {
		if (err) {
			return callback(err);
		}
		const match = /^password: (?:0x[0-9A-F]+ {2})?"(.*)"$/m.exec(stderr);
		if (match) {
			const password = match[1].replace(/\\134/g, "\\");
			return callback(null, password);
		}
		return callback(new Error("Password in invalid format"));
	});
}

/**
 * Set the password for a given key in the keychain.
 * Will overwrite password if the key already exists.
 *
 * @param {string} userName
 * @param {string} service
 * @param {string} description
 * @param {string} password
 * @param {function(err)} callback called on completion.
 */
function set(userName, service, description, password, callback) {
	const args = [
		"add-generic-password",
		"-a",
		userName,
		"-D",
		description,
		"-s",
		ensurePrefix(service),
		"-w",
		password,
		"-U",
	];

	childProcess.execFile(securityPath, args, (err, stdout, stderr) => {
		if (err) {
			return callback(
				new Error(`Could not add password to keychain: ${stderr}`),
			);
		}
		return callback();
	});
}

/**
 * Remove the given account from the keychain
 *
 * @param {string} userName
 * @param {string} service
 * @param {string} description
 * @param {function (err)} callback called on completion
 */
function remove(userName, service, description, callback) {
	let args = ["delete-generic-password"];
	if (userName) {
		args = args.concat(["-a", userName]);
	}
	if (service) {
		args = args.concat(["-s", ensurePrefix(service)]);
	}
	if (description) {
		args = args.concat(["-D", description]);
	}

	childProcess.execFile(securityPath, args, (err, stdout, stderr) => {
		if (err) {
			return callback(err);
		}
		return callback();
	});
}

_.extend(exports, {
	list: list,
	set: set,
	get: get,
	remove: remove,
	setPrefix: setPrefix,
});
