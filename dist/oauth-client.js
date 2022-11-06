"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthClient = void 0;
const oauth2_1 = require("@googleapis/oauth2");
class OauthClient {
    constructor(properties) {
        this.properties = properties;
        this.oauth2Client = new oauth2_1.auth.OAuth2(this.properties.clientID, this.properties.clientSecret, this.properties.redirectURL);
    }
    generateAuthURL() {
        const url = this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/youtube.force-ssl",
        });
        return url;
    }
    async getTokens(code) {
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
        }
        catch (err) {
            console.log("Error getting tokens:", err);
        }
    }
    setAccessToken(accessToken) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
        });
    }
    get client() {
        return this.oauth2Client;
    }
}
exports.OauthClient = OauthClient;
