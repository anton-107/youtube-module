import { youtube } from "@googleapis/youtube";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { IncomingMessage } from "http";
import { RequestOptions } from "https";

export type GetRequestCallback = (res: IncomingMessage) => void;
type GetRequest = (
  options: RequestOptions,
  callback: GetRequestCallback
) => void;

async function getJsonResponse<T>(
  getMethod: GetRequest,
  options: RequestOptions
): Promise<T> {
  return new Promise((resolve, reject) => {
    let data = "";
    getMethod(options, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("error", (error) => {
        console.log("request error", error);
        reject(error);
      });
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

interface YoutubeClientProperties {
  httpClient: { get: GetRequest };
  oauthClient: OAuth2Client;
  apiKey: string;
}

interface CaptionsResponse {
  items: Caption[];
}
interface Caption {
  kind: "youtube#caption";
  id: string;
}

export class YoutubeClient {
  constructor(private properties: YoutubeClientProperties) {}
  public async listCaptions(videoID: string): Promise<Caption[]> {
    console.log("Fetching list of captions for video id: ", videoID);
    const json = await getJsonResponse<CaptionsResponse>(
      this.properties.httpClient.get,
      {
        hostname: "www.googleapis.com",
        path: `/youtube/v3/captions?videoId=${videoID}&key=${this.properties.apiKey}`,
      }
    );
    return json.items;
  }
  public async downloadCaption(captionID: string): Promise<Buffer> {
    console.log("Downloading caption with id: ", captionID);
    try {
      const data = await youtube("v3").captions.download(
        {
          id: captionID,
          auth: this.properties.oauthClient,
        },
        { responseType: "stream" }
      );

      const buffers = [];
      // node.js readable streams implement the async iterator protocol
      for await (const chunk of data.data) {
        buffers.push(chunk);
      }
      return Buffer.concat(buffers);
    } catch (err) {
      console.error("Error downloading caption: ", err);
      throw err;
    }
  }
}
