import { YoutubeParser } from "../src/youtube-parser";
import { get, globalAgent } from "https";

globalAgent.options.minVersion = "TLSv1.3";

describe("Youtube parser", () => {
  it("should parse captions url for a video id", async () => {
    if (!process.env.VIDEO_ID) {
      throw Error("Please specify VIDEO_ID in your env variables");
    }
    const parser = new YoutubeParser({
      httpClient: { get },
    });
    const urls = await parser.parseCaptionsURL(process.env.VIDEO_ID);
    console.log("urls", urls);
    if (!urls) {
      throw Error("Could not find any captions track");
    }
    const captions = await parser.downloadCaptions(urls[0]);
    console.log("Captions", captions);
  });
});
