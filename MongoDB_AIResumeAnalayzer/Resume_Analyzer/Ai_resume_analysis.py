import os
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types
from flask_cors import CORS
import logging
import traceback
from datetime import datetime

# Set up logging with more details
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"]
    }
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze_resume():
    if request.method == 'OPTIONS':
        return '', 204

    temp_file_path = None
    try:
        logger.info("=== New Analysis Request ===")
        logger.info(f"Request Method: {request.method}")
        logger.info(f"Request Headers: {dict(request.headers)}")
        logger.debug(f"Files in request: {request.files}")
        logger.debug(f"Form data: {request.form}")
        
        if 'resume' not in request.files:
            logger.error("No resume file in request")
            return jsonify({"error": "No resume file provided"}), 400

        resume_file = request.files['resume']
        if resume_file.filename == '':
            logger.error("Empty filename")
            return jsonify({"error": "No file selected"}), 400

        logger.info(f"Processing file: {resume_file.filename}")
        logger.debug(f"File content type: {resume_file.content_type}")

        # Create unique filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_filename = f"{timestamp}_{resume_file.filename}"
        
        # Save the uploaded file temporarily
        uploads_dir = "uploads"
        os.makedirs(uploads_dir, exist_ok=True)
        temp_file_path = os.path.join(uploads_dir, safe_filename)
        resume_file.save(temp_file_path)
        logger.info(f"File saved to: {temp_file_path}")
        logger.debug(f"File size: {os.path.getsize(temp_file_path)} bytes")

        try:
            logger.info("Initializing Gemini client")
            client = genai.Client(api_key="AIzaSyDsJoGTYCQUJdfv7MQlYO5TXfau96N5Qcs")
            
            logger.info("Uploading file to Gemini")
            file_response = client.files.upload(file=temp_file_path)
            logger.info("File uploaded successfully to Gemini")

            model = "gemini-2.0-pro-exp-02-05"
            logger.info(f"Using model: {model}")

            generate_content_config = types.GenerateContentConfig(
                temperature=1,
                top_p=0.95,
                top_k=64,
                max_output_tokens=8192,
            )

            logger.info("Starting content generation")
            output_text = ""
            for chunk in client.models.generate_content_stream(
                model=model,
                contents=contents,
                config=generate_content_config,
            ):
                output_text += chunk.text
                logger.debug("Received content chunk")

            logger.info("Analysis completed successfully")
            logger.debug(f"Output length: {len(output_text)} characters")
            return jsonify({"feedback": output_text})

        except Exception as e:
            logger.error("Gemini API Error", exc_info=True)
            logger.error(f"Error details: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            return jsonify({"error": f"AI Analysis error: {str(e)}"}), 500

    except Exception as e:
        logger.error("Server Error", exc_info=True)
        logger.error(f"Error details: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
                logger.info(f"Temporary file removed: {temp_file_path}")
            except Exception as e:
                logger.error(f"Error removing temporary file: {str(e)}")

if __name__ == '__main__':
    logger.info("=== Starting Flask Server ===")
    app.run(debug=True, port=5500)
