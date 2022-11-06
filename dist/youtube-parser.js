"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeParser = void 0;
const ytdl_core_1 = require("ytdl-core");
async function getResponse(getMethod, url) {
    return new Promise((resolve, reject) => {
        let data = "";
        getMethod(url, (res) => {
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("error", (error) => {
                console.log("response error", error);
                reject(error);
            });
            res.on("end", () => {
                resolve(data);
            });
        });
    });
}
class YoutubeParser {
    constructor(properties) {
        this.properties = properties;
    }
    async parseCaptionsURL(videoID) {
        const info = await (0, ytdl_core_1.getInfo)(videoID);
        return info.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks.map((x) => x.baseUrl);
    }
    async downloadCaptions(captionURL) {
        return await getResponse(this.properties.httpClient.get, captionURL);
    }
}
exports.YoutubeParser = YoutubeParser;
