import { YoutubeClient } from "./../src/youtube-client";
import { get } from "https";

describe("Youtube client: development test", () => {
  it("should list captions", async () => {
    if (!process.env.API_KEY) {
      throw Error("Please specify API_KEY in your env variables");
    }
    const client = new YoutubeClient({
      httpClient: { get },
      apiKey: process.env.API_KEY,
    });
    if (!process.env.VIDEO_ID) {
      throw Error("Please specify VIDEO_ID in your env variables");
    }
    const captions = await client.listCaptions(process.env.VIDEO_ID);
    expect(captions.length).toBeGreaterThan(0);
    console.log("captions response", captions);

    // const caption = captions[0];
    // const content = await client.downloadCaption(caption.id);
    // console.log("caption content", content.toString('utf8'));
  });
});
