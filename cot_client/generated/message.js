/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ClientCOTRequest = (function() {

    /**
     * Properties of a ClientCOTRequest.
     * @exports IClientCOTRequest
     * @interface IClientCOTRequest
     * @property {Array.<Uint8Array>|null} [Rs] ClientCOTRequest Rs
     * @property {Uint8Array} y ClientCOTRequest y
     */

    /**
     * Constructs a new ClientCOTRequest.
     * @exports ClientCOTRequest
     * @classdesc Represents a ClientCOTRequest.
     * @implements IClientCOTRequest
     * @constructor
     * @param {IClientCOTRequest=} [properties] Properties to set
     */
    function ClientCOTRequest(properties) {
        this.Rs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientCOTRequest Rs.
     * @member {Array.<Uint8Array>} Rs
     * @memberof ClientCOTRequest
     * @instance
     */
    ClientCOTRequest.prototype.Rs = $util.emptyArray;

    /**
     * ClientCOTRequest y.
     * @member {Uint8Array} y
     * @memberof ClientCOTRequest
     * @instance
     */
    ClientCOTRequest.prototype.y = $util.newBuffer([]);

    /**
     * Creates a new ClientCOTRequest instance using the specified properties.
     * @function create
     * @memberof ClientCOTRequest
     * @static
     * @param {IClientCOTRequest=} [properties] Properties to set
     * @returns {ClientCOTRequest} ClientCOTRequest instance
     */
    ClientCOTRequest.create = function create(properties) {
        return new ClientCOTRequest(properties);
    };

    /**
     * Encodes the specified ClientCOTRequest message. Does not implicitly {@link ClientCOTRequest.verify|verify} messages.
     * @function encode
     * @memberof ClientCOTRequest
     * @static
     * @param {IClientCOTRequest} message ClientCOTRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientCOTRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.Rs != null && message.Rs.length)
            for (var i = 0; i < message.Rs.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Rs[i]);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.y);
        return writer;
    };

    /**
     * Encodes the specified ClientCOTRequest message, length delimited. Does not implicitly {@link ClientCOTRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientCOTRequest
     * @static
     * @param {IClientCOTRequest} message ClientCOTRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientCOTRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientCOTRequest message from the specified reader or buffer.
     * @function decode
     * @memberof ClientCOTRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientCOTRequest} ClientCOTRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientCOTRequest.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientCOTRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.Rs && message.Rs.length))
                        message.Rs = [];
                    message.Rs.push(reader.bytes());
                    break;
                }
            case 2: {
                    message.y = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        return message;
    };

    /**
     * Decodes a ClientCOTRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientCOTRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientCOTRequest} ClientCOTRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientCOTRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientCOTRequest message.
     * @function verify
     * @memberof ClientCOTRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientCOTRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.Rs != null && message.hasOwnProperty("Rs")) {
            if (!Array.isArray(message.Rs))
                return "Rs: array expected";
            for (var i = 0; i < message.Rs.length; ++i)
                if (!(message.Rs[i] && typeof message.Rs[i].length === "number" || $util.isString(message.Rs[i])))
                    return "Rs: buffer[] expected";
        }
        if (!(message.y && typeof message.y.length === "number" || $util.isString(message.y)))
            return "y: buffer expected";
        return null;
    };

    /**
     * Creates a ClientCOTRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientCOTRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientCOTRequest} ClientCOTRequest
     */
    ClientCOTRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientCOTRequest)
            return object;
        var message = new $root.ClientCOTRequest();
        if (object.Rs) {
            if (!Array.isArray(object.Rs))
                throw TypeError(".ClientCOTRequest.Rs: array expected");
            message.Rs = [];
            for (var i = 0; i < object.Rs.length; ++i)
                if (typeof object.Rs[i] === "string")
                    $util.base64.decode(object.Rs[i], message.Rs[i] = $util.newBuffer($util.base64.length(object.Rs[i])), 0);
                else if (object.Rs[i].length >= 0)
                    message.Rs[i] = object.Rs[i];
        }
        if (object.y != null)
            if (typeof object.y === "string")
                $util.base64.decode(object.y, message.y = $util.newBuffer($util.base64.length(object.y)), 0);
            else if (object.y.length >= 0)
                message.y = object.y;
        return message;
    };

    /**
     * Creates a plain object from a ClientCOTRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientCOTRequest
     * @static
     * @param {ClientCOTRequest} message ClientCOTRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientCOTRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.Rs = [];
        if (options.defaults)
            if (options.bytes === String)
                object.y = "";
            else {
                object.y = [];
                if (options.bytes !== Array)
                    object.y = $util.newBuffer(object.y);
            }
        if (message.Rs && message.Rs.length) {
            object.Rs = [];
            for (var j = 0; j < message.Rs.length; ++j)
                object.Rs[j] = options.bytes === String ? $util.base64.encode(message.Rs[j], 0, message.Rs[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.Rs[j]) : message.Rs[j];
        }
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.bytes === String ? $util.base64.encode(message.y, 0, message.y.length) : options.bytes === Array ? Array.prototype.slice.call(message.y) : message.y;
        return object;
    };

    /**
     * Converts this ClientCOTRequest to JSON.
     * @function toJSON
     * @memberof ClientCOTRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientCOTRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ClientCOTRequest
     * @function getTypeUrl
     * @memberof ClientCOTRequest
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ClientCOTRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ClientCOTRequest";
    };

    return ClientCOTRequest;
})();

$root.ServerCOTResponse = (function() {

    /**
     * Properties of a ServerCOTResponse.
     * @exports IServerCOTResponse
     * @interface IServerCOTResponse
     * @property {Array.<Uint8Array>|null} [c0s] ServerCOTResponse c0s
     * @property {Array.<Uint8Array>|null} [c1s] ServerCOTResponse c1s
     */

    /**
     * Constructs a new ServerCOTResponse.
     * @exports ServerCOTResponse
     * @classdesc Represents a ServerCOTResponse.
     * @implements IServerCOTResponse
     * @constructor
     * @param {IServerCOTResponse=} [properties] Properties to set
     */
    function ServerCOTResponse(properties) {
        this.c0s = [];
        this.c1s = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServerCOTResponse c0s.
     * @member {Array.<Uint8Array>} c0s
     * @memberof ServerCOTResponse
     * @instance
     */
    ServerCOTResponse.prototype.c0s = $util.emptyArray;

    /**
     * ServerCOTResponse c1s.
     * @member {Array.<Uint8Array>} c1s
     * @memberof ServerCOTResponse
     * @instance
     */
    ServerCOTResponse.prototype.c1s = $util.emptyArray;

    /**
     * Creates a new ServerCOTResponse instance using the specified properties.
     * @function create
     * @memberof ServerCOTResponse
     * @static
     * @param {IServerCOTResponse=} [properties] Properties to set
     * @returns {ServerCOTResponse} ServerCOTResponse instance
     */
    ServerCOTResponse.create = function create(properties) {
        return new ServerCOTResponse(properties);
    };

    /**
     * Encodes the specified ServerCOTResponse message. Does not implicitly {@link ServerCOTResponse.verify|verify} messages.
     * @function encode
     * @memberof ServerCOTResponse
     * @static
     * @param {IServerCOTResponse} message ServerCOTResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerCOTResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.c0s != null && message.c0s.length)
            for (var i = 0; i < message.c0s.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.c0s[i]);
        if (message.c1s != null && message.c1s.length)
            for (var i = 0; i < message.c1s.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.c1s[i]);
        return writer;
    };

    /**
     * Encodes the specified ServerCOTResponse message, length delimited. Does not implicitly {@link ServerCOTResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServerCOTResponse
     * @static
     * @param {IServerCOTResponse} message ServerCOTResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerCOTResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServerCOTResponse message from the specified reader or buffer.
     * @function decode
     * @memberof ServerCOTResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServerCOTResponse} ServerCOTResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerCOTResponse.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServerCOTResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.c0s && message.c0s.length))
                        message.c0s = [];
                    message.c0s.push(reader.bytes());
                    break;
                }
            case 2: {
                    if (!(message.c1s && message.c1s.length))
                        message.c1s = [];
                    message.c1s.push(reader.bytes());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ServerCOTResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServerCOTResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServerCOTResponse} ServerCOTResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerCOTResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServerCOTResponse message.
     * @function verify
     * @memberof ServerCOTResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServerCOTResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.c0s != null && message.hasOwnProperty("c0s")) {
            if (!Array.isArray(message.c0s))
                return "c0s: array expected";
            for (var i = 0; i < message.c0s.length; ++i)
                if (!(message.c0s[i] && typeof message.c0s[i].length === "number" || $util.isString(message.c0s[i])))
                    return "c0s: buffer[] expected";
        }
        if (message.c1s != null && message.hasOwnProperty("c1s")) {
            if (!Array.isArray(message.c1s))
                return "c1s: array expected";
            for (var i = 0; i < message.c1s.length; ++i)
                if (!(message.c1s[i] && typeof message.c1s[i].length === "number" || $util.isString(message.c1s[i])))
                    return "c1s: buffer[] expected";
        }
        return null;
    };

    /**
     * Creates a ServerCOTResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServerCOTResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServerCOTResponse} ServerCOTResponse
     */
    ServerCOTResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.ServerCOTResponse)
            return object;
        var message = new $root.ServerCOTResponse();
        if (object.c0s) {
            if (!Array.isArray(object.c0s))
                throw TypeError(".ServerCOTResponse.c0s: array expected");
            message.c0s = [];
            for (var i = 0; i < object.c0s.length; ++i)
                if (typeof object.c0s[i] === "string")
                    $util.base64.decode(object.c0s[i], message.c0s[i] = $util.newBuffer($util.base64.length(object.c0s[i])), 0);
                else if (object.c0s[i].length >= 0)
                    message.c0s[i] = object.c0s[i];
        }
        if (object.c1s) {
            if (!Array.isArray(object.c1s))
                throw TypeError(".ServerCOTResponse.c1s: array expected");
            message.c1s = [];
            for (var i = 0; i < object.c1s.length; ++i)
                if (typeof object.c1s[i] === "string")
                    $util.base64.decode(object.c1s[i], message.c1s[i] = $util.newBuffer($util.base64.length(object.c1s[i])), 0);
                else if (object.c1s[i].length >= 0)
                    message.c1s[i] = object.c1s[i];
        }
        return message;
    };

    /**
     * Creates a plain object from a ServerCOTResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServerCOTResponse
     * @static
     * @param {ServerCOTResponse} message ServerCOTResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServerCOTResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.c0s = [];
            object.c1s = [];
        }
        if (message.c0s && message.c0s.length) {
            object.c0s = [];
            for (var j = 0; j < message.c0s.length; ++j)
                object.c0s[j] = options.bytes === String ? $util.base64.encode(message.c0s[j], 0, message.c0s[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.c0s[j]) : message.c0s[j];
        }
        if (message.c1s && message.c1s.length) {
            object.c1s = [];
            for (var j = 0; j < message.c1s.length; ++j)
                object.c1s[j] = options.bytes === String ? $util.base64.encode(message.c1s[j], 0, message.c1s[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.c1s[j]) : message.c1s[j];
        }
        return object;
    };

    /**
     * Converts this ServerCOTResponse to JSON.
     * @function toJSON
     * @memberof ServerCOTResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServerCOTResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ServerCOTResponse
     * @function getTypeUrl
     * @memberof ServerCOTResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ServerCOTResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ServerCOTResponse";
    };

    return ServerCOTResponse;
})();

module.exports = $root;
