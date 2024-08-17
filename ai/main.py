import asyncio
import multiprocessing
import os
import cv2
from flask import Flask, request, jsonify
import numpy as np
from ai_model import ImageEncoder
from concurrent.futures import ThreadPoolExecutor



app = Flask(__name__)


folder_path="src/uploads/missing"

num_workers = multiprocessing.cpu_count()  
executor = ThreadPoolExecutor(max_workers=num_workers)

encoder = ImageEncoder()
asyncio.run(encoder.load_and_encode_images(folder_path))





@app.route('/v1/api/ai/AddNewItem', methods=['POST'])
def add_new_item():
    image_path=  os.path.join(folder_path,request.json["image"])  
    encoder.add_new_image(image_path)
    return jsonify({"status": "success"}),200,

    




@app.route('/v1/api/ai', methods=['POST'])

def recognize_faces():
    if 'image' not in request.files:
        return jsonify({"status": False, "statusCode": 400, "message": "No image uploaded"}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"status": False, "statusCode": 400, "message": "No image uploaded"}), 400

    image_stream = image_file.read()
    try:
        frame = cv2.imdecode(np.frombuffer(image_stream, np.uint8), cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({"status": False, "statusCode": 400, "message": "Invalid image format"}), 400

        future = executor.submit(encoder.detect_known_faces, frame)
        face_names = future.result()

       
        if any(name != "Unknown" for name in face_names):
            return jsonify({"status": True, "message": "There is a report with a photo of this person"}), 200
        

        elif  not face_names :
            return jsonify({"status": False, "statusCode": 400, "message": "There is no face in the picture"}), 200
        
        else:
            return jsonify({"status": False, "statusCode": 200, "message": "There are no reports for this person"}), 200

    except Exception as e:
         return jsonify({"status": False, "statusCode": 400, "message": str(e)}), 400












if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4050)

