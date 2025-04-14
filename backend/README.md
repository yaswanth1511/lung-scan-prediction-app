
# TB Detection AI Backend

This is a Python Flask backend that uses PyTorch for TB detection from chest X-ray images. The application uses a ResNet18 model trained on tuberculosis X-ray dataset.

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

### GET /api/health

Health check endpoint.

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

This implementation uses a ResNet18 model pre-trained on ImageNet and fine-tuned for tuberculosis detection. The model processes chest X-ray images to identify signs of tuberculosis.

For production use, consider:
1. Adding model checkpointing and versioning
2. Implementing proper logging and monitoring
3. Adding authentication and rate limiting
4. Scaling with a production WSGI server like Gunicorn

