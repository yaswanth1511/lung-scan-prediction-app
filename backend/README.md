
# TB Detection AI Backend

This is a Python Flask backend that uses PyTorch for TB detection from chest X-ray images.

## Setup

1. Install the dependencies:
```
pip install -r requirements.txt
```

2. Run the server:
```
python app.py
```

The server will be available at http://localhost:5000.

## Docker

To run the server in a Docker container:

```
docker build -t tb-detection-backend .
docker run -p 5000:5000 tb-detection-backend
```

## API

### POST /api/predict

Processes an X-ray image and returns a TB prediction.

#### Request:
```json
{
  "image": "base64_encoded_image_data"
}
```

#### Response:
```json
{
  "prediction": "TB Detected",
  "confidence": 0.85
}
```

## Notes

This implementation uses a pre-trained ResNet50 model. In a production environment, you would:
1. Fine-tune the model on a TB X-ray dataset
2. Load the trained weights
3. Implement proper validation and error handling
