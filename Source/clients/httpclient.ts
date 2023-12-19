/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//jeyou: Brought over from vso-node-api (v5.1.2), added support for sending SOAP and handling gzip compression
/* tslint:disable */
import url = require("url");

import http = require("http");
import zlib = require("zlib");
import https = require("https");
import tunnel = require("tunnel");
import ifm = require("vso-node-api/interfaces/common/VsoBaseInterfaces");

http.globalAgent.maxSockets = 100;

export class HttpClient {
	userAgent: string;
	handlers: ifm.IRequestHandler[];
	socketTimeout: number;
	isSsl: boolean;

	constructor(
		userAgent: string,
		handlers?: ifm.IRequestHandler[],
		socketTimeout?: number,
	) {
		this.userAgent = userAgent;
		this.handlers = handlers;
		if (socketTimeout) {
			this.socketTimeout = socketTimeout;
		} else {
			// Default 3 minutes
			this.socketTimeout = 3 * 60000;
		}
	}

	// POST, PATCH, PUT
	send(
		verb: string,
		requestUrl: string,
		objs: any,
		headers: ifm.IHeaders,
		onResult: (
			err: any,
			res: http.ClientResponse,
			contents: string,
		) => void,
	): void {
		const options = this._getOptions(verb, requestUrl, headers);
		this.request(options.protocol, options.options, objs, onResult);
	}

	_getOptions(method: string, requestUrl: string, headers: any): any {
		const parsedUrl: url.Url = url.parse(requestUrl);
		const usingSsl = parsedUrl.protocol === "https:";
		const prot: any = usingSsl ? https : http;
		const defaultPort = usingSsl ? 443 : 80;
		this.isSsl = usingSsl;

		let proxyUrl: url.Url;
		if (process.env.HTTPS_PROXY && usingSsl) {
			proxyUrl = url.parse(process.env.HTTPS_PROXY);
		} else if (process.env.HTTP_PROXY) {
			proxyUrl = url.parse(process.env.HTTP_PROXY);
		}

		const options: any = {
			host: parsedUrl.hostname,
			port: parsedUrl.port || defaultPort,
			path: (parsedUrl.pathname || "") + (parsedUrl.search || ""),
			method: method,
			headers: headers || {},
		};

		//options.headers["Accept"] = contentType;
		options.headers["User-Agent"] = this.userAgent;

		const useProxy = proxyUrl?.hostname;
		if (useProxy) {
			const agentOptions: tunnel.TunnelOptions = {
				maxSockets: http.globalAgent.maxSockets,
				proxy: {
					// TODO: support proxy-authorization
					//proxyAuth: "user:password",
					host: proxyUrl.hostname,
					port: proxyUrl.port,
				},
			};

			let tunnelAgent: Function;
			const overHttps = proxyUrl.protocol === "https:";
			if (usingSsl) {
				tunnelAgent = overHttps
					? tunnel.httpsOverHttps
					: tunnel.httpsOverHttp;
			} else {
				tunnelAgent = overHttps
					? tunnel.httpOverHttps
					: tunnel.httpOverHttp;
			}

			options.agent = tunnelAgent(agentOptions);
		}

		if (this.handlers) {
			this.handlers.forEach((handler) => {
				handler.prepareRequest(options);
			});
		}

		return {
			protocol: prot,
			options: options,
		};
	}

	request(
		protocol: any,
		options: any,
		objs: any,
		onResult: (
			err: any,
			res: http.ClientResponse,
			contents: string,
		) => void,
	): void {
		// Set up a callback to pass off 401s to an authentication handler that can deal with it
		const callback = (
			err: any,
			res: http.ClientResponse,
			contents: string,
		) => {
			let authHandler;
			if (this.handlers) {
				this.handlers.some((handler /*, index, handlers*/) => {
					// Find the first one that can handle the auth based on the response
					if (handler.canHandleAuthentication(res)) {
						authHandler = handler;
						return true;
					}
					return false;
				});
			}
			if (authHandler !== undefined) {
				authHandler.handleAuthentication(
					this,
					protocol,
					options,
					objs,
					onResult,
				);
			} else {
				// No auth handler found, call onResult normally
				onResult(err, res, contents);
			}
		};

		this.requestInternal(protocol, options, objs, callback);
	}

	requestInternal(
		protocol: any,
		options: any,
		objs: any,
		onResult: (
			err: any,
			res: http.ClientResponse,
			contents: string,
		) => void,
	): void {
		let reqData;
		let socket;

		if (objs) {
			reqData = objs;
		}

		let callbackCalled = false;
		const handleResult = (
			err: any,
			res: http.ClientResponse,
			contents: string,
		) => {
			if (!callbackCalled) {
				callbackCalled = true;
				onResult(err, res, contents);
			}
		};

		const req = protocol.request(options, (res) => {
			const buffer = [];
			let output = "";

			// If we're handling gzip compression, don't set the encoding to utf8
			if (
				res.headers["content-encoding"] &&
				res.headers["content-encoding"] === "gzip"
			) {
				const gunzip = zlib.createGunzip();
				res.pipe(gunzip);

				gunzip
					.on("data", (data) => {
						buffer.push(data.toString());
					})
					.on("end", () => {
						handleResult(null, res, buffer.join(""));
					})
					.on("error", (err) => {
						handleResult(err, null, null);
					});
			} else {
				res.setEncoding("utf8"); //Do this only if we expect we're getting a string back
				res.on("data", (chunk) => {
					output += chunk;
				});
				res.on("end", () => {
					// res has statusCode and headers
					handleResult(null, res, output);
				});
			}
		});

		req.on("socket", (sock) => {
			socket = sock;
		});

		// If we ever get disconnected, we want the socket to timeout eventually
		req.setTimeout(this.socketTimeout, () => {
			if (socket) {
				socket.end();
			}
			handleResult(
				new Error(`Request timeout: ${options.path}`),
				null,
				null,
			);
		});

		req.on("error", (err) => {
			// err has statusCode property
			// res should have headers
			handleResult(err, null, null);
		});

		if (reqData) {
			req.write(reqData, "utf8");
		}

		req.end();
	}
}
/* tslint:enable */
