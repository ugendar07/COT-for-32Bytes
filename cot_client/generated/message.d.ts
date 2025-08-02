import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a ClientCOTRequest. */
export interface IClientCOTRequest {

    /** ClientCOTRequest Rs */
    Rs?: (Uint8Array[]|null);

    /** ClientCOTRequest y */
    y: Uint8Array;
}

/** Represents a ClientCOTRequest. */
export class ClientCOTRequest implements IClientCOTRequest {

    /**
     * Constructs a new ClientCOTRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientCOTRequest);

    /** ClientCOTRequest Rs. */
    public Rs: Uint8Array[];

    /** ClientCOTRequest y. */
    public y: Uint8Array;

    /**
     * Creates a new ClientCOTRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientCOTRequest instance
     */
    public static create(properties?: IClientCOTRequest): ClientCOTRequest;

    /**
     * Encodes the specified ClientCOTRequest message. Does not implicitly {@link ClientCOTRequest.verify|verify} messages.
     * @param message ClientCOTRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientCOTRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientCOTRequest message, length delimited. Does not implicitly {@link ClientCOTRequest.verify|verify} messages.
     * @param message ClientCOTRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientCOTRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientCOTRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientCOTRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientCOTRequest;

    /**
     * Decodes a ClientCOTRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientCOTRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientCOTRequest;

    /**
     * Verifies a ClientCOTRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClientCOTRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClientCOTRequest
     */
    public static fromObject(object: { [k: string]: any }): ClientCOTRequest;

    /**
     * Creates a plain object from a ClientCOTRequest message. Also converts values to other types if specified.
     * @param message ClientCOTRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientCOTRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientCOTRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ClientCOTRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a ServerCOTResponse. */
export interface IServerCOTResponse {

    /** ServerCOTResponse c0s */
    c0s?: (Uint8Array[]|null);

    /** ServerCOTResponse c1s */
    c1s?: (Uint8Array[]|null);
}

/** Represents a ServerCOTResponse. */
export class ServerCOTResponse implements IServerCOTResponse {

    /**
     * Constructs a new ServerCOTResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerCOTResponse);

    /** ServerCOTResponse c0s. */
    public c0s: Uint8Array[];

    /** ServerCOTResponse c1s. */
    public c1s: Uint8Array[];

    /**
     * Creates a new ServerCOTResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerCOTResponse instance
     */
    public static create(properties?: IServerCOTResponse): ServerCOTResponse;

    /**
     * Encodes the specified ServerCOTResponse message. Does not implicitly {@link ServerCOTResponse.verify|verify} messages.
     * @param message ServerCOTResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerCOTResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerCOTResponse message, length delimited. Does not implicitly {@link ServerCOTResponse.verify|verify} messages.
     * @param message ServerCOTResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerCOTResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerCOTResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerCOTResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerCOTResponse;

    /**
     * Decodes a ServerCOTResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerCOTResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerCOTResponse;

    /**
     * Verifies a ServerCOTResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ServerCOTResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ServerCOTResponse
     */
    public static fromObject(object: { [k: string]: any }): ServerCOTResponse;

    /**
     * Creates a plain object from a ServerCOTResponse message. Also converts values to other types if specified.
     * @param message ServerCOTResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerCOTResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerCOTResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ServerCOTResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
