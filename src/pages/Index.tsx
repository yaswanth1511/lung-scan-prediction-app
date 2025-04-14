
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
    
    // Simulate the image processing delay
    setTimeout(() => {
      processTBPrediction(image);
    }, 2000);
  };

  // This function simulates the TB prediction for the demo
  // In a real app, this would call a backend API with the image
  const processTBPrediction = (image: File) => {
    // For this demo, we'll randomly generate a prediction
    // In a real app, this would be the result from a backend ML model
    const isTB = Math.random() > 0.6; // 40% chance of TB detection for demo
    const confidenceScore = 0.7 + (Math.random() * 0.25); // Random confidence between 70-95%
    
    setPrediction(isTB ? 'TB Detected' : 'TB Not Detected');
    setConfidence(confidenceScore);
    setIsLoading(false);
    
    toast({
      title: "Analysis Complete",
      description: "The X-ray has been processed successfully.",
    });
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
