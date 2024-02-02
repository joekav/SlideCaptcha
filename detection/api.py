from flask import Flask, request
from slide import SlidePosition

app = Flask(__name__)

@app.route('/position', methods=['POST'])
def solve():
    debug = request.json.get("debug", False)
    background_image = request.json.get("background_image", "")


    # Check if the background_image is in the request
    if request.json.get("background_image", "") == "":
        return {"message": "background_image is required"}, 400, {'Content-Type': 'application/json'}
    
    # Get the slide position from the slide class
    position = SlidePosition(background_image, debug)

    if not hasattr(position, "slide_position"):
        return {"message": "Error: Could not load the images. Check the image url."}, 400, {'Content-Type': 'application/json'}

    return {"position": position.slide_position}, 200, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run(port=3030)
