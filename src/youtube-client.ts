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
// async function getBinaryResponse(getMethod: GetRequest, options): Promise<Buffer> {
//   return new Promise((resolve) => {
//     let data: Buffer[] = [];
//     getMethod(options, (res) => {
//       res.on("data", (chunk) => {
//         data.push(chunk);
//       });
//       res.on("error", (error) => {
//         console.log('request error', error);
//       });
//       res.on("end", () => {
//         const response = Buffer.concat(data);
//         console.log("response", res.statusCode);
//         console.log("data", response);
//         resolve(response);
//       });
//     });
//   });
// }

interface YoutubeClientProperties {
  httpClient: { get: GetRequest };
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
  // public async downloadCaption(captionID: string): Promise<Buffer> {
  //   console.log("Downloading caption with id: ", captionID);
  //   const data = await getBinaryResponse(this.properties.httpClient.get, {
  //     hostname: "www.googleapis.com",
  //     path: `/youtube/v3/captions/${captionID}?tfmt=srt&key=${this.properties.apiKey}`,
  //   });
  //   return data;
  // }
}
