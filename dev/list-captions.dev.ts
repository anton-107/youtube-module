import { YoutubeClient } from "./../src/youtube-client";
import { OauthClient } from "../src/oauth-client";
import { get } from "https";

describe("Youtube client: development test", () => {
  it("should list captions and download first caption", async () => {
    if (!process.env.API_KEY) {
      throw Error("Please specify API_KEY in your env variables");
    }
    if (!process.env.CLIENT_ID) {
      throw Error("Please specify CLIENT_ID in the environment variables");
    }
    if (!process.env.CLIENT_SECRET) {
      throw Error("Please specify CLIENT_ID in the environment variables");
    }
    if (!process.env.ACCESS_TOKEN) {
      throw Error("Please specify ACCESS_TOKEN in the environment variables");
    }

    const oauthClient = new OauthClient({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectURL: "http://localhost:3000/google_oauth_callback",
    });
    oauthClient.setAccessToken(process.env.ACCESS_TOKEN);
    const youtubeClient = new YoutubeClient({
      httpClient: { get },
      apiKey: process.env.API_KEY,
      oauthClient: oauthClient.client,
    });
    if (!process.env.VIDEO_ID) {
      throw Error("Please specify VIDEO_ID in your env variables");
    }
    const captions = await youtubeClient.listCaptions(process.env.VIDEO_ID);
    expect(captions.length).toBeGreaterThan(0);
    console.log("captions response", captions);

    const caption = captions[0];
    const content = await youtubeClient.downloadCaption(caption.id);
    console.log("caption content", content.toString("utf8"));
  });
});
