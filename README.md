# SlideCaptcha


A repository with the objective of understanding and reversing exactly how Datadome's slide captcha works. This code should not be used in production, it is more of a PoC.

This repository is intended solely for educational purposes. Please use this information responsibly and ethically. Any misuse or unauthorized use of this knowledge is strongly discouraged.

# Table of contents
- [SlideCaptcha](#slidecaptcha)
- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
  - [What is a slide captcha?](#what-is-a-slide-captcha)
  - [How do they distinguish between humans and bots?](#how-do-they-distinguish-between-humans-and-bots)
- [Reversal](#reversal)
  - [Deobfuscation](#deobfuscation)
  - [Analysing the script](#analysing-the-script)
  - [Determining the correct puzzle position](#determining-the-correct-puzzle-position)
  - [Generating our payload](#generating-our-payload)
    - [Signals](#signals)
      - [Events](#events)
      - [Canvas fingerprints](#canvas-fingerprints)
      - [Timestamps](#timestamps)

# Introduction

Slide captchas are used by antibot companies such as Datadome and Geetest. They are used to prevent web scraping and automation by distinguishing between real human users, and automated bots.

## What is a slide captcha?

A slide captcha is a method of detecting bots and web scrapers. They work by making the user slide a puzzle piece along a background image into the correct position shown by a darker location.

![example](https://github.com/joekav/SlideCaptcha/blob/main/.github/images/example.png?raw=true)



## How do they distinguish between humans and bots?

Datadome collect [`signals`](https://github.com/joekav/SlideCaptcha/tree/main/.github/signals.json) which are device data, mouse events, screen sizes. I assume this is then run against and AI model which has been trained on other real device data to determine whether the user should be allowed to continue browsing the site.

# Reversal

## Deobfuscation

The script is given to us in an obfuscated state, which is a process which many antibot companies use to try and pretect their code from being understood. We can reverse this using a process called deobfuscation, which is simply analysing the script, determining which obfsucation methods are used and reversing them. We can do this in Node.js using babel.

This process can be found [here](https://github.com/joekav/SlideCaptcha/tree/main/deobfuscate).


## Analysing the script 

![module](https://github.com/joekav/SlideCaptcha/blob/main/.github/images/module.png?raw=true)

With our now deobfuscated version of the script, we can begin to determine how the script runs. At execution the script begins with a custom module loader, which has a similar function as `require` does in Node.js. This is used throughout the script to access different modules. There is 8 modules inside of the script:

1. `payload-js/exports/payload.js` - The payload generator - how the 'signals' are collected, and encoded for submission.
2. `./bean` - This module seems to be in charge of all event recording (mouse, keyboard, touch).
3. `./es5_code/obf` - This module starts the collection of device data.
4. `./hash` - This module contains a function used to hash different values during runtime.
5. `./helpers` - This moudle just contains a function used for safe base64 encoding.
6. `initial` - This is the first module to run, definition of the signals class, a checksum of different functions within the script.
7. `./picasso` - This module is in charge of canvas fingerprinting.
8. `./slidercaptcha` - This module loads all of the images used during the captcha into the DOM - the background image and the puzzle fragment.


## Determining the correct puzzle position

The main feature of the slide captcha is having the puzzle piece in the correct position. This is the first benchmark in determining whether the user is a human or a bot. To do this, we can use python's cv2 library to perform template matching. I found this approach to be 88-90% accurate, which isn't ideal, but considering it takes on average 0.02 seconds per detection, I believe where we sacrifice in accuracy we gain in speed and efficiency.


This process can be found [here](https://github.com/joekav/SlideCaptcha/tree/main/detection).

## Generating our payload

Using our understanding of the script, and our puzzle piece provided by the detection API, we can begin to build our own solutions to Datadome.

This process can be found [here](https://github.com/joekav/SlideCaptcha/tree/main/api).

### Signals
First, we can begin to add our own hardcoded values which we have collected from our own browser. Values such as screen sizes, user agents, device and device memory can all just be thrown straight into our payloads, as they are very generic and hard to fingerprint, as millions of devices will have similar values.

#### Events
Events are a bit different from the other values we will use, as we cannot hard code these since Datadome deem these an important piece of our fingerprint. I went with mouse events, as they seemed the easiest to replicate. Datadome collect the x and y pixels of the cursor, along with the timestamps at which each movement happens. I wrote a basic function to emulate these events, which focus on the cursor moving from a starting x value, to an x value determined by the location of the puzzle piece, as the mouse events stop recording upon a `mouseup` event. These coordinates and timestamps are then used to calculate many different values included in the signals. A standard deviation of both the x and y values and an average speed of x and y are two of them.


#### Canvas fingerprints
Canvas fingerprinting is a technique used by numerous antibot companies, and it involves shapes being drawn in the html canvas. Each browser will render the canvas in a slightly different way than other browsers, so they most likely use it as a benchmark against the other signals being submitted. I found that we can hardcode these as long as the other signals match up with the device the canvas fingerprint was collected from

#### Timestamps
Timestamps are used frequently during the script, as Datadome will try and fingerprint these sessions by comparing our fake timestamps with those that are real. I have found it sufficient to randomly generate these timestamps within ranges of those found in real browsers.
