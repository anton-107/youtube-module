import { getInfo } from "ytdl-core";
import { GetRequestCallback } from "./youtube-client";

type GetRequest = (url: string, callback: GetRequestCallback) => void;

async function getResponse(
  getMethod: GetRequest,
  url: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    getMethod(url, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("error", (error) => {
        console.log("response error", error);
        reject(error);
      });
      res.on("end", () => {
        resolve(data);
      });
    });
  });
}

interface YoutubeParserProperties {
  httpClient: { get: GetRequest };
}

export class YoutubeParser {
  constructor(private properties: YoutubeParserProperties) {}
  public async parseCaptionsURL(
    videoID: string
  ): Promise<string[] | undefined> {
    const info = await getInfo(videoID);
    return info.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks.map(
      (x) => x.baseUrl
    );
  }
  public async downloadCaptions(captionURL: string): Promise<string> {
    return await getResponse(this.properties.httpClient.get, captionURL);
  }
}
