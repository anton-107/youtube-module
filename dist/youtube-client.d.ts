/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage } from "http";
import { RequestOptions } from "https";
export declare type GetRequestCallback = (res: IncomingMessage) => void;
declare type GetRequest = (
  options: RequestOptions,
  callback: GetRequestCallback
) => void;
interface YoutubeClientProperties {
  httpClient: {
    get: GetRequest;
  };
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
}
export {};
