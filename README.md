# Youtube module

Module that can be used to fetch data from YouTube, using YouTube Data API

## Downloading captions using official API

### Disclaimer: this method works only to download captions for a video that you own. Google API does not allow you to download captions for any other video's.

To download caption from a video you need to get an OAuth code using your Google account.

1. First, generate an auth url:

`$ CLIENT_ID=<YOUR GOOGLE CLIENT ID> CLIENT_SECRET=<YOUR GOOGLE CLIENT SECRED> npm run test:dev -- generate-oauth-url`

2. Check output for the Auth url. Copy that URL and paste it to your browser.
3. Sign in into the consent form.
4. You will be redirected to a page, that looks like

`http://localhost:3000/google_oauth_callback?code=<YOUR AUTH CODE>`

5. Copy your auth code to your environment (note, that if auth code has %2F sequence next to the beginning of the string, replace it with a slash '/'):

`$ export AUTH_CODE='x/xxxxxxxxxxxxx-xxxxxxxxxxxxxxx'`

6. Exchange auth code for an access token:

`$ CLIENT_ID=<YOUR GOOGLE CLIENT ID> CLIENT_SECRET=<YOUR GOOGLE CLIENT SECRED> npm run test:dev -- exchange-oauth-code`

7. Search command output for a line that contains "export ACCESS_TOKEN=<YOUR ACCESS TOKEN>" and set it in your environment:

`$ export ACCESS_TOKEN='<YOUR ACCESS TOKEN>`
