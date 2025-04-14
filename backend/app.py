
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

# Load the pre-trained model (ResNet50)
def get_model():
    model = models.resnet50(pretrained=True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 2)  # 2 classes: TB or No TB
    
    # In a real implementation, you would load your trained model weights here
    # model.load_state_dict(torch.load('tb_detection_model.pth'))
    
    model.eval()
    return model

# Image preprocessing
def preprocess_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return transform(image).unsqueeze(0)

# For demo purposes, simulate predictions with some randomness
# but based on image features to maintain consistency
def predict_tb(image_tensor):
    # In a real implementation, you would use your model for prediction
    # with torch.no_grad():
    #     outputs = model(image_tensor)
    #     _, predicted = torch.max(outputs, 1)
    #     return bool(predicted.item()), float(torch.nn.functional.softmax(outputs, dim=1)[0][predicted.item()].item())
    
    # For demo: analyze image brightness as a simple feature
    # to give somewhat consistent results for the same image
    avg_pixel = torch.mean(image_tensor).item()
    # Use the average pixel value to seed a somewhat deterministic result
    import random
    random.seed(int(avg_pixel * 1000))
    
    is_tb = random.random() > 0.6  # 40% chance of TB detection
    confidence = 0.7 + (random.random() * 0.25)  # 70-95% confidence
    
    return is_tb, confidence

model = get_model()

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.json:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Get base64 image data
        image_data = request.json['image']
        # Remove the base64 prefix if present
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        image_bytes = base64.b64decode(image_data)
        image_tensor = preprocess_image(image_bytes)
        
        # Get prediction
        is_tb, confidence = predict_tb(image_tensor)
        
        return jsonify({
            'prediction': 'TB Detected' if is_tb else 'TB Not Detected',
            'confidence': confidence
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
