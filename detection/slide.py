import cv2 as cv
import numpy as np
from io import BytesIO
import time, requests

class SlidePosition:
    # fragment_image: url to the fragment image from dd
    # background_image: url to the background image from dd
    # debug: if true, will save the image with the rectangle and coordinates

    def __init__(self, background_image="", debug=True):
        start = time.time()
        self.background_image = background_image
        self.debug = debug

        # Load images to class
        self.get_images()

        # Finds top left corner of puzzle piece
        self.find_puzzle_piece_left()

        # Draws a rectangle around the puzzle piece and save to disk
        self.draw_rectangle_around_piece()

        end = time.time()
        self.time_taken = end - start

    def get_images(self):
        """
        Gets the images from the datadome url and saves them to the class.
        """
        background_raw = BytesIO(requests.get(self.background_image).content)
        background_array = np.asarray(bytearray(background_raw.read()), dtype=np.uint8)
        self.background = cv.imdecode(background_array, cv.IMREAD_UNCHANGED)
        
        fragment_raw = BytesIO(requests.get(self.background_image.replace(".jpg", ".frag.png")).content)
        fragment_array = np.asarray(bytearray(fragment_raw.read()), dtype=np.uint8)
        
        self.fragment = cv.imdecode(fragment_array, cv.IMREAD_UNCHANGED)


    def find_puzzle_piece_left(self):
        """
        This function is used to find a puzzle piece in a background image and returns the top left corner of the piece's coordinates
        """

        # Check if the fragment and background images are loaded
        if self.fragment is None or self.background is None:
            return "Error: Could not load the images. Check the file paths."

        # Convert images to grayscale
        gray_piece = cv.cvtColor(self.fragment, cv.COLOR_BGRA2GRAY)
        full_image_gray = cv.cvtColor(self.background, cv.COLOR_BGRA2GRAY)

        # Apply threshold to the grayscale image of the puzzle piece
        _, mask = cv.threshold(gray_piece, 1, 255, cv.THRESH_BINARY)

        # Find contours in the mask
        contours, _ = cv.findContours(mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

        # Get the contour with the maximum area
        piece_contour = max(contours, key=cv.contourArea)

        # Get the bounding rectangle for the largest contour
        x, y, w, h = cv.boundingRect(piece_contour)

        # Crop the fragment image to the bounding rectangle
        self.fragment_cropped = self.fragment[y:y+h, x:x+w]

        # Convert the cropped image to grayscale
        cropped_piece_gray = cv.cvtColor(self.fragment_cropped, cv.COLOR_BGRA2GRAY)

        # Apply Canny edge detection to the grayscale images
        cropped_piece_edges = cv.Canny(cropped_piece_gray, 50, 150)
        full_image_edges = cv.Canny(full_image_gray, 50, 150)

        # Match the template (cropped piece edges) in the full image edges
        res = cv.matchTemplate(full_image_edges, cropped_piece_edges, cv.TM_CCOEFF_NORMED)

        # Find the location of the best match
        _, _, _, max_loc = cv.minMaxLoc(res)

        # Store the position of the slide
        self.slide_position = max_loc

    def draw_rectangle_around_piece(self):
        """
        Draws a rectangle around the found puzzle piece on the background image for debugging.
        """

        # Check if the slide position attribute exists
        if not hasattr(self, 'slide_position'):
            return "Error: Puzzle piece position not found."

        # Get the top left coordinates of the slide position
        top_left_x, top_left_y = self.slide_position

        # Get the height and width of the cropped fragment
        piece_height, piece_width = self.fragment_cropped.shape[:2]

        # Calculate the bottom right coordinates of the rectangle
        bottom_right_x = top_left_x + piece_width
        bottom_right_y = top_left_y + piece_height

        # Draw a rectangle on the background image around the puzzle piece
        cv.rectangle(self.background, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (0, 255, 0), 2)

        # If debugging is enabled, write the image with the rectangle to a file
        if self.debug:
            cv.imwrite(f'tests/test.jpg', self.background)

        # Return the background image
        return self.background