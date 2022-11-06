import { auth } from "@googleapis/oauth2";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { Credentials } from "google-auth-library/build/src/auth/credentials";

interface OauthClientProperties {
  clientID: string;
  clientSecret: string;
  redirectURL: string;
}

export class OauthClient {
  private oauth2Client: OAuth2Client;
  constructor(private properties: OauthClientProperties) {
    this.oauth2Client = new auth.OAuth2(
      this.properties.clientID,
      this.properties.clientSecret,
      this.properties.redirectURL
    );
  }
  public generateAuthURL(): string {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    });
    return url;
  }
  public async getTokens(code: string): Promise<Credentials | undefined> {
    this.oauth2Client.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        console.log(`export REFRESH_TOKEN='${tokens.refresh_token}'`);
        this.oauth2Client.setCredentials({
          refresh_token: tokens.refresh_token,
        });
      }
    });
    try {
      const resp = await this.oauth2Client.getToken(code);
      console.log("resp", resp);
      if (resp.tokens && resp.tokens.access_token) {
        console.log(`export ACCESS_TOKEN='${resp.tokens.access_token}'`);
      }
      return resp.tokens;
    } catch (err) {
      console.log("Error getting tokens:", err);
    }
  }
  public setAccessToken(accessToken: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
    });
  }
  public get client() {
    return this.oauth2Client;
  }
}
