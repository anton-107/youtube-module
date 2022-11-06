"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeClient = void 0;
const youtube_1 = require("@googleapis/youtube");
async function getJsonResponse(getMethod, options) {
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
class YoutubeClient {
    constructor(properties) {
        this.properties = properties;
    }
    async listCaptions(videoID) {
        console.log("Fetching list of captions for video id: ", videoID);
        const json = await getJsonResponse(this.properties.httpClient.get, {
            hostname: "www.googleapis.com",
            path: `/youtube/v3/captions?videoId=${videoID}&key=${this.properties.apiKey}`,
        });
        return json.items;
    }
    async downloadCaption(captionID) {
        console.log("Downloading caption with id: ", captionID);
        try {
            const data = await (0, youtube_1.youtube)("v3").captions.download({
                id: captionID,
                auth: this.properties.oauthClient,
            }, { responseType: "stream" });
            const buffers = [];
            // node.js readable streams implement the async iterator protocol
            for await (const chunk of data.data) {
                buffers.push(chunk);
            }
            return Buffer.concat(buffers);
        }
        catch (err) {
            console.error("Error downloading caption: ", err);
            throw err;
        }
    }
}
exports.YoutubeClient = YoutubeClient;
