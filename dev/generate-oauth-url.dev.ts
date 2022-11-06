import { OauthClient } from "../src/oauth-client";
describe("Oauth client: development test", () => {
  it("should generate auth url", async () => {
    if (!process.env.CLIENT_ID) {
      throw Error("Please specify CLIENT_ID in the environment variables");
    }
    if (!process.env.CLIENT_SECRET) {
      throw Error("Please specify CLIENT_ID in the environment variables");
    }
    const client = new OauthClient({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectURL: "http://localhost:3000/google_oauth_callback",
    });
    const url = client.generateAuthURL();
    console.log("Auth url: ", url);
  });
});
