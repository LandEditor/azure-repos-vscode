/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//
// Parser for the output of the creds.exe helper program.
//

const _ = require("underscore");
const es = require("event-stream");
const stream = require("readable-stream");
const util = require("node:util");

const Transform = stream.Transform;

//
// Regular expression to match the various fields in the input.
//

const fieldRe = /^([^:]+):\s(.*)$/;

//
// Convert space separated pascal caps ("Target Type")
// to camel case no spaces ("targetType"). Used to Convert
// field names to property names.
//
function fieldNameToPropertyName(fieldName) {
	const parts = fieldName.split(" ");
	parts[0] = parts[0].toLowerCase();
	return parts.join("");
}

//
// Simple streaming parser. It's in one of two states:
// 0 - Waiting for an entry
// 1 - in an entry
//
// At the ending blank line (each entry has one) we output
// the accumulated object.
//

function WinCredStoreParsingStream() {
	Transform.call(this, {
		objectMode: true,
	});

	this.currentEntry = null;
}

util.inherits(WinCredStoreParsingStream, Transform);

_.extend(WinCredStoreParsingStream.prototype, {
	_transform: function (chunk, encoding, callback) {
		let match;
		let line = chunk.toString();
		let count = 0;

		while (line !== null) {
			++count;
			if (count > 2) {
				return callback(
					new Error(
						util.format(
							"Multiple passes attempting to parse line [%s]. Possible bug in parser and infinite loop",
							line,
						),
					),
				);
			}

			if (this.currentEntry === null) {
				if (line !== "") {
					this.currentEntry = {};
					// Loop back around to process this line.
					continue;
				}
				// Skip blank lines between items.
				line = null;
			}

			if (this.currentEntry) {
				if (line !== "") {
					match = fieldRe.exec(line);
					const key = fieldNameToPropertyName(match[1]);
					const value = match[2];
					this.currentEntry[key] = value;
					line = null;
				} else {
					// Blank line ends an entry
					this.push(this.currentEntry);
					this.currentEntry = null;
					line = null;
				}
			}
		}

		callback();
	},

	_flush: function (callback) {
		if (this.currentEntry) {
			this.push(this.currentEntry);
			this.currentEntry = null;
		}
		callback();
	},
});

function createParsingStream() {
	return es.pipeline(es.split(), new WinCredStoreParsingStream());
}

createParsingStream.ParsingStream = WinCredStoreParsingStream;

module.exports = createParsingStream;
