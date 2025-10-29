from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import pickle
import os
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

ENCODINGS_PATH = "encodings/encodings.pickle"

# Load encodings
if os.path.exists(ENCODINGS_PATH):
    with open(ENCODINGS_PATH, "rb") as f:
        data = pickle.load(f)
else:
    data = {"encodings": [], "studentIds": []}

# Helper: convert base64 to image
def base64_to_image(base64_str):
    img_data = base64.b64decode(base64_str)
    import cv2
    import numpy as np
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

# Register student face
@app.route("/register", methods=["POST"])
def register():
    try:
        student_id = request.json["studentId"]
        image_base64 = request.json["image"]
        img = base64_to_image(image_base64)

        # Encode face
        encodings = face_recognition.face_encodings(img)
        if len(encodings) == 0:
            return jsonify({"message": "No face detected"}), 400

        face_encoding = encodings[0]
        data["encodings"].append(face_encoding)
        data["studentIds"].append(student_id)

        # Save encodings
        with open(ENCODINGS_PATH, "wb") as f:
            pickle.dump(data, f)

        return jsonify({"message": "Face registered successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Recognize face for attendance
@app.route("/recognize", methods=["POST"])
def recognize():
    try:
        image_base64 = request.json["image"]
        img = base64_to_image(image_base64)
        unknown_encodings = face_recognition.face_encodings(img)

        if len(unknown_encodings) == 0:
            return jsonify({"matchedStudentId": None, "message": "No face detected"})

        unknown_encoding = unknown_encodings[0]
        matches = face_recognition.compare_faces(data["encodings"], unknown_encoding)
        student_id = None
        if True in matches:
            match_index = matches.index(True)
            student_id = data["studentIds"][match_index]

        return jsonify({"matchedStudentId": student_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
