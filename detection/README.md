# Puzzle Detection

This section of the repository focuses on determining the x,y position of the puzzle piece inside the background image. 


## Installing dependencies

`pip install -r requirements.txt`


## Running detector

Run `python api.py`

This will start the flask API on port 3030


## API Usage

There is only one endpoint, which is `/solve` with a method of `POST`.

Request body:

```
{
    "background_image": "https://dd.prod.captcha-delivery.com/image/2024-01-28/9ddaf44e46e88d029428151370891a5c.jpg",
    "debug": true
}
```

`background_image` which should be the url to the background image provided by datadome.
`debug` (optional) which is a boolean to write an image of the found position surrounded by a box.

Returns:

```
{
    "position": [
        190,
        18
    ]
}
```

`position` is the x and y coordinates of the left side of the puzzle piece.

This value is then used in the [payload generator](https://google.com).



## Debug images

The debug images found if `debug` is true look like this.

![debug](https://github.com/joekav/SlideCaptcha/blob/main/images/debug.png?raw=true)
