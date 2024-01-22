/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//
// Wrapper module around Windows credential store.
// Uses the creds.exe program.
//

const _ = require("underscore");
const childProcess = require("node:child_process");
const es = require("event-stream");
const path = require("node:path");

const parser = require("./win-credstore-parser");

const credExePath = path.join(__dirname, "../bin/win32/creds.exe");

let targetNamePrefix = "";

// Allow callers to set their own prefix
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
 * list the contents of the credential store, parsing each value.
 *
 * We ignore everything that wasn't put there by us, we look
 * for target names starting with the target name prefix.
 *
 *
 * @return {Stream} object mode stream of credentials.
 */
function list() {
	const credsProcess = childProcess.spawn(credExePath, [
		"-s",
		"-g",
		"-t",
		`${targetNamePrefix}*`,
	]);
	return credsProcess.stdout.pipe(parser()).pipe(
		es.mapSync((cred) => {
			cred.targetName = removePrefix(cred.targetName);
			return cred;
		}),
	);
}

/**
 * Get details for a specific credential. Assumes generic credential.
 *
 * @param {string} targetName target name for credential
 * @param {function (err, credential)} callback callback function that receives
 *                                              returned credential.
 */
function get(targetName, callback) {
	const args = ["-s", "-t", ensurePrefix(targetName)];

	const credsProcess = childProcess.spawn(credExePath, args);
	let result = null;
	const errors = [];

	credsProcess.stdout.pipe(parser()).on("data", (credential) => {
		result = credential;
		result.targetName = removePrefix(result.targetName);
	});

	credsProcess.stderr.pipe(es.split()).on("data", (line) => {
		errors.push(line);
	});

	credsProcess.on("exit", (code) => {
		if (code === 0) {
			callback(null, result);
		} else {
			callback(
				new Error(
					`Getting credential failed, exit code ${code}: ${errors.join(
						", ",
					)}`,
				),
			);
		}
	});
}

/**
 * Set the credential for a given key in the credential store.
 * Creates or updates, assumes generic credential.
 * If credential is buffer, stores buffer contents as binary directly.
 * If credential is string, stores UTF-8 encoded binary.
 *
 * @param {String} targetName target name for entry
 * @param {Buffer|String} credential the credential
 * @param {Function(err)} callback completion callback
 */
function set(targetName, credential, callback) {
	if (_.isString(credential)) {
		credential = new Buffer(credential, "utf8");
	}
	const args = [
		"-a",
		"-t",
		ensurePrefix(targetName),
		"-p",
		credential.toString("hex"),
	];

	childProcess.execFile(credExePath, args, (err) => {
		callback(err);
	});
}

/**
 * Remove the given key from the credential store.
 *
 * @param {string} targetName target name to remove.
 *                            if ends with "*" character,
 *                            will delete all targets
 *                            starting with that prefix
 * @param {Function(err)} callback completion callback
 */
function remove(targetName, callback) {
	const args = ["-d", "-t", ensurePrefix(targetName)];

	if (targetName.slice(-1) === "*") {
		args.push("-g");
	}

	childProcess.execFile(credExePath, args, (err) => {
		callback(err);
	});
}

_.extend(exports, {
	list: list,
	set: set,
	get: get,
	remove: remove,
	setPrefix: setPrefix,
});
