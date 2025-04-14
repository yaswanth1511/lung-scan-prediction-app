
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import ImagePreview from '@/components/ImagePreview';
import InfoSection from '@/components/InfoSection';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const { toast } = useToast();

  // API endpoint
  const API_URL = 'http://localhost:5000/api/predict';

  useEffect(() => {
    if (uploadedImage) {
      const url = URL.createObjectURL(uploadedImage);
      setImageUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [uploadedImage]);

  const handleImageUpload = (image: File) => {
    setUploadedImage(image);
    setIsLoading(true);
    setPrediction(null);
    
    // Process the image with the PyTorch backend
    processImageWithBackend(image);
  };

  const processImageWithBackend = async (image: File) => {
    try {
      // Convert the image to base64
      const base64Image = await fileToBase64(image);
      
      // Send the image to the backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update the UI with the results
      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "The X-ray has been processed by the AI model.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to the simulated prediction for development
      fallbackToPredictionSimulation(image);
    }
  };
  
  // Utility function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  // Fallback simulation for development when backend is not available
  const fallbackToPredictionSimulation = (image: File) => {
    console.warn('Using fallback prediction simulation');
    
    setTimeout(() => {
      // Get a somewhat consistent result based on the image name
      const nameSum = image.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const isTB = (nameSum % 10) > 6; // Use filename to get consistent results
      const confidenceScore = 0.7 + ((nameSum % 100) / 400); // 70-95% confidence
      
      setPrediction(isTB ? 'TB Detected' : 'TB Not Detected');
      setConfidence(confidenceScore);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete (Simulated)",
        description: "The X-ray has been processed with the fallback simulation.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-medical-900 mb-6">Tuberculosis AI Detection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
              <ResultsDisplay 
                prediction={prediction} 
                confidence={confidence} 
                isLoading={isLoading} 
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-medical-700">X-Ray Image</h3>
              <ImagePreview imageUrl={imageUrl} isLoading={isLoading} />
            </div>
          </div>
          
          <InfoSection />
        </div>
      </main>
      
      <footer className="bg-medical-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Tuberculosis Detection AI Demo &copy; {new Date().getFullYear()} - For educational purposes only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
