# Generating Payloads

This API uses the [piece detection API](https://github.com/joekav/SlideCaptcha/tree/main/detection) to solve the Datadome captcha's position. Lots of data about the browser such as user agents, languages, screen sizes, hardware etc is collected by the script, so to reverse the captcha we must submit our own data. Some of this data is collected and hardcoded, but other data such as mouse movements has to be generated, as they will not allow us to hardcode such dynamic data without blocking us or throwing an invalid response.

## Signals

The signals are the way Datadome collect and encode all data collected in the script. These signals are encoded every time a new one is added using XOR ciphers and byte shifting. Throught the script, the function call `n.addSignal`, with n being the signals class. The `n.buildPayload()` call is used when everything has been collected, which triggers the GET request to their `/check` endpoint for validation.

## Submitting position

Using our position recieved from the python API, we submit this in the signal value `xUser`. This value is the final x position triggered in the `mousemove` events. Our API returns the coordinate of the very left side of the puzzle piece, which I have found is the way it is calculated in the JS. Along with the position, our mouse events must also line up with it, so we use an ending x value of the position + a random integer between 15 and 30, as the `m_crdR` value is how far the mouse movements went to the right in total, and we are mimicking going too far, then coming back.

## Using the API

Using the `/solve` endpoint is reliant on information gathered from the Datadome captcha page.

Example request body:
```
{
  "background_image":"https://dd.prod.captcha-delivery.com/image/2024-01-31/34f080f0b3acdf23a9c773cdae562dfd.jpg",
  "debug":true,
  "ddm":{
    "hash":"A55FBF4311ED6F1BF9911EB71931D5",
    "ua":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "referer":"https://www.footlocker.co.uk/",
    "cid":"ZAP9NHnF2A6~FjhWpzVDf4orKMUQLkdULT0QnkT70vlMi9nTuMzD~atwHtTCAWVTvsLk3VYPh8Xr_0DMokFo7CS4EqJ~V9LNFOP02GOIoktAj53FV4rOtD8eWam1ueVX"
  }
}
```

1. `background_image` is the image url found in the Datadome captcha block page.
2. `debug` is a boolean which determines whether to write a debug image like [this one](https://github.com/joekav/SlideCaptcha/blob/main/images/debug.jpg).
3. `ddm` is a json object of data found in the Datadome captcha block page.
   1. `hash` is a value which differs on each site Datadome uses the captcha on.
   2. `ua` is the user agent used in the session we are attempting to solve.
   3. `referer` is the page previous to being blocked by Datadome.
   4. `cid` is the value of the `datadome` cookie found in the session.


Example response body:

```
{
    "payload": "VI0Ceik8lExqHUQ0Pd5eHsBN6kEXM-TEHI_kUvueQgCCn159B8vC6n8YkOGgEv53d...",
    "captchaChallenge": 29868996
}
```

1. `payload` is the encoded payload produced by all information sent to the API
2. `captchaChallenge` is a challenge in the html page which is based on the user agent and languages.


## Submitting the results

Submitting the resulting payload and captchaChallenge values are quite simple. Datadome have a /catpcha/check endpoint, and the values are used as query parameters in a GET request.

![submit](https://github.com/joekav/SlideCaptcha/blob/main/images/submit.png?raw=true)

Our payload goes into the `ddCaptchaEncodedPayload` parameter, and the captchaChallenge goes into the `captchaChallenge` parameter.


The other values can be scraped from the `/captcha` url.

![challengeVals](https://github.com/joekav/SlideCaptcha/blob/main/images/challengeVals.png?raw=true)
![submitParams](https://github.com/joekav/SlideCaptcha/blob/main/images/submitParams.png?raw=true)
![ddm](https://github.com/joekav/SlideCaptcha/blob/main/images/ddm.png?raw=true)


## Response from Datadome

With a valid request and payload, Datadome respond with a json object holding a cookie, like this.
```
{
    "cookie":"datadome=s6O74n3eWq5ccdD_y8QpYjTOVy...; Max-Age=31536000; Domain=.footlocker.co.uk; Path=/; Secure; SameSite=None"
}
```

This cookie can then be injected into your session, and you can retry the request you were attempting before the block. If Datadome deem your payload's contents to be human-like, you will not get another block. If they don't, you will receive another captcha.

The response will be a 403 if the format of your request is invalid. This could be anything, like invalid signals encoding, invalid cid, invalid url encoding of the `/check` request URL
