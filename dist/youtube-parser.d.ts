import { GetRequestCallback } from "./youtube-client";
declare type GetRequest = (url: string, callback: GetRequestCallback) => void;
interface YoutubeParserProperties {
    httpClient: {
        get: GetRequest;
    };
}
export declare class YoutubeParser {
    private properties;
    constructor(properties: YoutubeParserProperties);
    parseCaptionsURL(videoID: string): Promise<string[] | undefined>;
    downloadCaptions(captionURL: string): Promise<string>;
}
export {};
