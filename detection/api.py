from flask import Flask, request
from slide import SlidePosition

app = Flask(__name__)

@app.route('/position', methods=['POST'])
def solve():
    data = request.json

    if "background_image" not in data or data["background_image"] == "":
        return {"message": "background_image is required"}, 400, {'Content-Type': 'application/json'}
    
    position = SlidePosition(data["background_image"], True)

    return {"position": position.slide_position}, 200, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run(port=3030)
