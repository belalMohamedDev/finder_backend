import os
import glob
import cv2
import face_recognition
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import asyncio

class ImageEncoder:
    def __init__(self, frame_resizing=0.25):
        self.known_face_encodings = []
        self.known_face_names = []
        self.frame_resizing = frame_resizing

    def resize_image(self, img_path, size=(800, 800)):
        """
        Resize the image to a smaller size for faster processing.
        :param img_path: Path to the image file
        :param size: New size (width, height)
        :return: Resized image
        """
        with Image.open(img_path) as img:
            img.thumbnail(size)
            img = img.convert("RGB")
            return img

    def process_image(self, img_path):
        """
        Process a single image: resize, read, convert, and encode.
        :param img_path: Path to the image file
        :return: Tuple of image encoding and filename
        """
        try:
            resized_img = self.resize_image(img_path)
            rgb_img = cv2.cvtColor(np.array(resized_img), cv2.COLOR_RGB2BGR)
            
            # Detect faces in the image
            face_locations = face_recognition.face_locations(rgb_img)
            if not face_locations:
                # If no faces are found, skip this image
                return None
            
            # Encode the first detected face
            encodings = face_recognition.face_encodings(rgb_img, known_face_locations=face_locations)
            basename = os.path.basename(img_path)
            filenames = [os.path.splitext(basename)[0] for _ in range(len(encodings))]
            
            return encodings, filenames
        except Exception as e:
            print(f"Error processing {img_path}: {e}")
            return None

    async def load_and_encode_images(self, folder_path):
        """
        Load and encode images from the specified folder.
        :param folder_path: Path to the folder containing images
        """
        image_paths = glob.glob(os.path.join(folder_path, "*.*"))
        print(f"{len(image_paths)} encoding images found.")

        loop = asyncio.get_running_loop()
        with ThreadPoolExecutor() as executor:
            for img_path in image_paths:
                result = await loop.run_in_executor(executor, self.process_image, img_path)
                if result:
                    encodings, filenames = result
                    for encoding, filename in zip(encodings, filenames):
                        # Check if the encoding already exists in the list
                        if not any(np.array_equal(encoding, known_encoding) for known_encoding in self.known_face_encodings):
                            self.known_face_encodings.append(encoding)
                            self.known_face_names.append(filename)

                    # Add a short delay to avoid overwhelming the server
                    await asyncio.sleep(0.1)

        print("Encoding images loaded")

    def add_new_image(self, img_path):
        """
        Add a new image to the existing lists without affecting the current lists.
        :param img_path: Path to the new image file
        """
        result = self.process_image(img_path)
        if result:
            encodings, filenames = result
            for encoding, filename in zip(encodings, filenames):
                # Check if the filename already exists in the list
                if filename not in self.known_face_names:
                    self.known_face_encodings.append(encoding)
                    self.known_face_names.append(filename)
                    print(f"New image {filename} added successfully.")
                    print(len(self.known_face_encodings))
                else:
                    print(f"Face already exists in the list for image {filename}.")
        else:
            print(f"No faces found in the image {img_path}.")

    def detect_known_faces(self, frame):
        """
        Detect known faces in a given frame.
        :param frame: Video frame
        :return: List of detected face names
        """


        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
            name = "Unknown"

            if matches:
                face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = self.known_face_names[best_match_index]
            face_names.append(name)

        return face_names

  