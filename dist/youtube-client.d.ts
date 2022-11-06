/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { IncomingMessage } from "http";
import { RequestOptions } from "https";
export declare type GetRequestCallback = (res: IncomingMessage) => void;
declare type GetRequest = (options: RequestOptions, callback: GetRequestCallback) => void;
interface YoutubeClientProperties {
    httpClient: {
        get: GetRequest;
    };
    oauthClient: OAuth2Client;
    apiKey: string;
}
interface Caption {
    kind: "youtube#caption";
    id: string;
}
export declare class YoutubeClient {
    private properties;
    constructor(properties: YoutubeClientProperties);
    listCaptions(videoID: string): Promise<Caption[]>;
    downloadCaption(captionID: string): Promise<Buffer>;
}
export {};
