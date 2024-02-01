# Slide Captcha Deobfuscation

This section of the repository focuses on the deobfuscation of the slide captcha javascript provided by Datadome. Although it isn't the cleanest deobfuscation I was focussing on maintaining the logic of the script, enabling you to put it into your own html page and run the script. This allowed me to gather the signals to give me a better understanding of the data the script collects, and how they encode the signals when they are sent for valdiation to Datadomes servers.


## Installing dependencies

If you are using npm, run the following command:

``npm install``


## Running the deobfuscator

Insert the captcha script found on the Datadome captcha block page to `/assets/in.js`.

Then, simply run 

```npm start```


## Output

The output can be found inside the `assets` folder, where you will find 5 output files, which include a new file after each transformation has been run, and the final file `out_final.js`

`out_hex.js` is the first transformation, which is written after all hexadecimal strings are converted to their normal string values.

`out_string_decode.js` is the second transformation, which evaluates function calls like this `window[ln(nn(A(7, 14), f(127, 73)))][ln(k(x(137, 82), M(6, 8)))]` to this `window["_hsv"]["length"]`

`out_binary_expressions.js` is the third transformation, which takes long binary expressions like this `window["d" + "d" + "R" + "e" + "s" + "O" + "b" + "j"]["o" + "v" + "h" + "t"]` to this `window["ddResObj]["ovht"]`

`out_bracket_dot.js` is the fourth and final transformation, which converts all member expressions using bracket notation like this `document[["querySelector"]](".sliderContainer")` to this `document.querySelector(".sliderContainer")` with dot notation instead.


## Difference in readability

