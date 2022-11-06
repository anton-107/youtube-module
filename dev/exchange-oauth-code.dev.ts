import { OauthClient } from "../src/oauth-client";
describe("Oauth client: development test", () => {
  it("should generate exchange auth code and get access/refresg tokens", async () => {
    if (!process.env.AUTH_CODE) {
      throw Error("Please specify AUTH_CODE");
    }
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
    const tokens = await client.getTokens(process.env.AUTH_CODE);
    console.log("Tokens: ", tokens);
  });
});
