import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { Credentials } from "google-auth-library/build/src/auth/credentials";
interface OauthClientProperties {
    clientID: string;
    clientSecret: string;
    redirectURL: string;
}
export declare class OauthClient {
    private properties;
    private oauth2Client;
    constructor(properties: OauthClientProperties);
    generateAuthURL(): string;
    getTokens(code: string): Promise<Credentials | undefined>;
    setAccessToken(accessToken: string): void;
    get client(): OAuth2Client;
}
export {};
