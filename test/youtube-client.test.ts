import { IncomingMessage } from "http";
import { RequestOptions } from "https";
import { instance, mock, when, anything } from "ts-mockito";
import { GetRequestCallback, YoutubeClient } from "../src/youtube-client";

describe("Youtube client", () => {
  let lastOptions: RequestOptions | undefined = undefined;
  let responseMock = mock<IncomingMessage>();
  let callbacks: Record<string, (eventData?: string) => void> = {};
  let client: YoutubeClient;

  beforeEach(() => {
    lastOptions = undefined;
    responseMock = mock<IncomingMessage>();
    callbacks = {};
    when(responseMock.on(anything(), anything())).thenCall(
      (dataType, callback) => {
        callbacks[dataType] = callback;
      }
    );

    client = new YoutubeClient({
      httpClient: {
        get: (options: RequestOptions, callback: GetRequestCallback): void => {
          lastOptions = options;
          const responseInstance = instance(responseMock);
          console.log("responseMock", responseMock);
          console.log("responseInstance", responseInstance);
          console.log("responseInstance on", responseInstance.on);
          callback(responseInstance);
        },
      },
      oauthClient: instance(mock()),
      apiKey: "my-api-key",
    });
  });
  it("should download list of captions", async () => {
    const promise = client.listCaptions("my-video");
    callbacks["data"](JSON.stringify({ items: [{ id: "test-caption" }] }));
    callbacks["end"]();
    const response = await promise;
    if (!lastOptions) {
      throw Error("Expected last options to be defined");
    }
    expect(lastOptions.path).toBe(
      "/youtube/v3/captions?videoId=my-video&key=my-api-key"
    );
    expect(response.length).toBe(1);
    expect(response[0].id).toBe("test-caption");
  });
  it("should throw on error", async () => {
    await expect(async () => {
      let error;
      const promise = client.listCaptions("my-video").catch((err) => {
        console.log("catch", err);
        error = err;
      });
      callbacks["error"]("fake-error");
      await promise;
      expect(error).toBe("fake-error");
    }).not.toThrow();
  });
});
