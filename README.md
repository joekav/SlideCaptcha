# SlideCaptcha

A repository with the objective of understanding and reversing exactly how Datadome's slide captcha works.

## Table of contents
1. [Deobfuscator](https://github.com/joekav/SlideCaptcha/tree/main/deobfuscate)
2. [PuzzleAPI](https://github.com/joekav/SlideCaptcha/tree/main/detection)
3. [Payload Generator](https://github.com/joekav/SlideCaptcha/tree/main/api)

## What is a slide captcha?

![example](https://github.com/joekav/SlideCaptcha/blob/main/.github/images/example.png?raw=true)

A slide captcha is a method of detecting bots and web scrapers used by Datadome and Geetest. They work by making the user slide a puzzle piece along a background image into the correct position shown by a darker location.


## How does this prove you aren't a bot?

Datadome collect [`signals`](https://github.com/joekav/SlideCaptcha/tree/main/.github/signals.json) which are device data, mouse events, screen sizes. I assume this is then run against and AI model which has been trained on other real device data to determine whether the user should be allowed to continue browsing the site.


## How can we RE this captcha?

First, we need to deobfuscate the script, to take it from a completely unreadable state, to one we can read and begin to understand. To do this we take the obfuscated code and apply transformations to each obfuscation method used to get as close as possible to the original script. Then, we can start to analyse what the script actually does.

## How does the script run?

[!module](https://github.com/joekav/SlideCaptcha/blob/main/.github/images/module.png?raw=true)

At execution the script begins with a custom module loader, which has a similar function as `require` does in Node.js. This is used throughout the script to access different modules. There is 8 modules inside of the script:

1. The payload generator - how the 'signals' are collected, and encoded for submission.
2. This module seems to be in charge of all event recording (mouse, keyboard, touch).
3. This module starts the collection of device data.
4. This module contains a function used to hash different values during runtime.
5. This moudle just contains a function used for safe base64 encoding.
6. This is the first module to run, definition of the signals class, a checksum of different functions within the script.
7. This module is in charge of canvas fingerprinting.
8. This module loads all of the images used during the captcha into the DOM - the background image and the puzzle fragment.
