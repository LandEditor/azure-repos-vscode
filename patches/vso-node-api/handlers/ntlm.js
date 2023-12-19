// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
const http = require("http");
const https = require("https");
const _ = require("underscore");
const ntlm = require("../opensource/node-http-ntlm/ntlm");
const NtlmCredentialHandler = (() => {
	function NtlmCredentialHandler(username, password, domain, workstation) {
		this.username = username;
		this.password = password;
		if (domain !== undefined) {
			this.domain = domain;
		}
		if (workstation !== undefined) {
			this.workstation = workstation;
		}
	}
	NtlmCredentialHandler.prototype.prepareRequest = (options) => {
		// No headers or options need to be set.  We keep the credentials on the handler itself.
		// If a (proxy) agent is set, remove it as we don't support proxy for NTLM at this time
		if (options.agent) {
			options.agent = undefined;
		}
	};
	NtlmCredentialHandler.prototype.canHandleAuthentication = (res) => {
		if (res && res.statusCode === 401) {
			// Ensure that we're talking NTLM here
			// Once we have the www-authenticate header, split it so we can ensure we can talk NTLM
			const wwwAuthenticate = res.headers["www-authenticate"];
			if (wwwAuthenticate !== undefined) {
				const mechanisms = wwwAuthenticate.split(", ");
				const idx = mechanisms.indexOf("NTLM");
				if (idx >= 0) {
					// Check specifically for 'NTLM' since www-authenticate header can also contain
					// the Authorization value to use in the form of 'NTLM TlRMTVNT....AAAADw=='
					if (mechanisms[idx].length === 4) {
						return true;
					}
				}
			}
		}
		return false;
	};
	// The following method is an adaptation of code found at https://github.com/SamDecrock/node-http-ntlm/blob/master/httpntlm.js
	NtlmCredentialHandler.prototype.handleAuthentication = function (
		httpClient,
		protocol,
		options,
		objs,
		finalCallback,
	) {
		// Set up the headers for NTLM authentication
		const ntlmOptions = _.extend(options, {
			username: this.username,
			password: this.password,
			domain: this.domain || "",
			workstation: this.workstation || "",
		});
		let keepaliveAgent;
		if (httpClient.isSsl === true) {
			keepaliveAgent = new https.Agent({ keepAlive: true });
		} else {
			keepaliveAgent = new http.Agent({ keepAlive: true });
		}
		// The following pattern of sending the type1 message following immediately (in a setImmediate) is
		// critical for the NTLM exchange to happen.  If we removed setImmediate (or call in a different manner)
		// the NTLM exchange will always fail with a 401.
		this.sendType1Message(
			httpClient,
			protocol,
			ntlmOptions,
			objs,
			keepaliveAgent,
			(err, res) => {
				if (err) {
					return finalCallback(err, null, null);
				}
				setImmediate(() => {
					this.sendType3Message(
						httpClient,
						protocol,
						ntlmOptions,
						objs,
						keepaliveAgent,
						res,
						finalCallback,
					);
				});
			},
		);
	};
	// The following method is an adaptation of code found at https://github.com/SamDecrock/node-http-ntlm/blob/master/httpntlm.js
	NtlmCredentialHandler.prototype.sendType1Message = (
		httpClient,
		protocol,
		options,
		objs,
		keepaliveAgent,
		callback,
	) => {
		const type1msg = ntlm.createType1Message(options);
		let type1options = {
			headers: {
				Connection: "keep-alive",
				Authorization: type1msg,
			},
			timeout: options.timeout || 0,
			agent: keepaliveAgent,
			// don't redirect because http could change to https which means we need to change the keepaliveAgent
			allowRedirects: false,
		};
		type1options = _.extend(type1options, _.omit(options, "headers"));
		httpClient.requestInternal(protocol, type1options, objs, callback);
	};
	// The following method is an adaptation of code found at https://github.com/SamDecrock/node-http-ntlm/blob/master/httpntlm.js
	NtlmCredentialHandler.prototype.sendType3Message = (
		httpClient,
		protocol,
		options,
		objs,
		keepaliveAgent,
		res,
		callback,
	) => {
		if (!res.headers["www-authenticate"]) {
			return callback(
				new Error(
					"www-authenticate not found on response of second request",
				),
			);
		}
		// parse type2 message from server:
		const type2msg = ntlm.parseType2Message(
			res.headers["www-authenticate"],
		);
		// create type3 message:
		const type3msg = ntlm.createType3Message(type2msg, options);
		// build type3 request:
		let type3options = {
			headers: {
				Authorization: type3msg,
			},
			allowRedirects: false,
			agent: keepaliveAgent,
		};
		// pass along other options:
		type3options.headers = _.extend(type3options.headers, options.headers);
		type3options = _.extend(type3options, _.omit(options, "headers"));
		// send type3 message to server:
		httpClient.requestInternal(protocol, type3options, objs, callback);
	};
	return NtlmCredentialHandler;
})();
exports.NtlmCredentialHandler = NtlmCredentialHandler;
