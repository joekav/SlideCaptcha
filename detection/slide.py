import cv2 as cv
import numpy as np
from io import BytesIO
import time, requests

class SlidePosition:
    # fragment_image: url to the fragment image from dd
    # background_image: url to the backgrounf image from dd
    # debug: if true, will save the image with the rectangle and coordinates

    def __init__(self, background_image="", debug=True):
        start = time.time()
        self.background_image = background_image
        self.debug = debug

        self.client = requests.Session()


        # Load images to class
        self.get_images()

        # Finds top left corner of puzzle piece
        self.find_puzzle_piece_left()

        # Draws a rectangle around the puzzle piece and save to disk
        image = self.draw_rectangle_around_piece()



        end = time.time()
        self.time_taken = end - start



    def get_images(self):
        """
        Gets the images from the dd url or the local images and saves them to the class.
        """
        background_raw = BytesIO(self.client.get(self.background_image).content)
        background_array = np.asarray(bytearray(background_raw.read()), dtype=np.uint8)
        self.background = cv.imdecode(background_array, cv.IMREAD_UNCHANGED)
        
        # cv.imwrite(f'tests/backgrounds/{self.i}.jpg', self.background)
    
        
        fragment_raw = BytesIO(self.client.get(self.background_image.replace(".jpg", ".frag.png")).content)
        fragment_array = np.asarray(bytearray(fragment_raw.read()), dtype=np.uint8)
        
        self.fragment = cv.imdecode(fragment_array, cv.IMREAD_UNCHANGED)


        # cv.imwrite(f'tests/fragments/{self.i}.png', self.fragment)

    def find_puzzle_piece_left(self):
        """
        Draws a rectangle around the found puzzle piece on the background image for debugging.
        """
        if self.fragment is None or self.background is None:
            return "Error: Could not load the images. Check the file paths."

        # Convert images to grayscale
        gray_piece = cv.cvtColor(self.fragment, cv.COLOR_BGRA2GRAY)
        full_image_gray = cv.cvtColor(self.background, cv.COLOR_BGRA2GRAY)

        _, mask = cv.threshold(gray_piece, 1, 255, cv.THRESH_BINARY)
        contours, _ = cv.findContours(mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        piece_contour = max(contours, key=cv.contourArea)

        x, y, w, h = cv.boundingRect(piece_contour)
        self.fragment_cropped = self.fragment[y:y+h, x:x+w]

        cropped_piece_gray = cv.cvtColor(self.fragment_cropped, cv.COLOR_BGRA2GRAY)


        # Adjustable Canny thresholds
        lower_threshold = 50  # Experiment with this value
        upper_threshold = 150  # Experiment with this value

        cropped_piece_edges = cv.Canny(cropped_piece_gray, lower_threshold, upper_threshold)
        full_image_edges = cv.Canny(full_image_gray, lower_threshold, upper_threshold)

        res = cv.matchTemplate(full_image_edges, cropped_piece_edges, cv.TM_CCOEFF_NORMED)
        _, _, _, max_loc = cv.minMaxLoc(res)

        self.slide_position = max_loc

    def draw_rectangle_around_piece(self):
            """
            Draws a rectangle around the found puzzle piece on the background image.
            """
            if not hasattr(self, 'slide_position'):
                return "Error: Puzzle piece position not found."

            top_left_x, top_left_y = self.slide_position

            piece_height, piece_width = self.fragment_cropped.shape[:2]

            bottom_right_x = top_left_x + piece_width
            bottom_right_y = top_left_y + piece_height

            cv.rectangle(self.background, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (0, 255, 0), 2)

            if self.debug:
                cv.imwrite(f'tests/test.jpg', self.background)

            return self.background  
