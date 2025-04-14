
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InfoSection = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>About This Application</CardTitle>
        <CardDescription>
          Learn about TB detection and the AI model used in this application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About TB</TabsTrigger>
            <TabsTrigger value="model">About the Model</TabsTrigger>
            <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="pt-4">
            <div className="space-y-4">
              <p>
                <strong>Tuberculosis (TB)</strong> is an infectious disease that primarily affects the lungs. 
                It's caused by the bacterium Mycobacterium tuberculosis and can spread from person to person 
                through tiny droplets released into the air via coughs and sneezes.
              </p>
              <p>
                Early detection of TB is crucial for effective treatment and preventing the spread 
                of the disease. Chest X-rays are one of the primary tools used for screening and 
                diagnosis, though a definitive diagnosis typically requires additional tests.
              </p>
              <p>
                AI-assisted detection like this application can help healthcare professionals 
                screen X-rays more efficiently, but should always be used as an assistive tool, 
                not a replacement for professional medical diagnosis.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="model" className="pt-4">
            <div className="space-y-4">
              <p>
                This application uses a Convolutional Neural Network (CNN) trained on thousands 
                of chest X-ray images to detect patterns that may indicate tuberculosis.
              </p>
              <p>
                The model has been trained to recognize the radiological patterns commonly associated 
                with pulmonary tuberculosis, such as cavities, infiltrates, and nodules in the upper lobes 
                of the lungs.
              </p>
              <p>
                <strong>Note:</strong> In this demo version, we're simulating the model's predictions. 
                A real implementation would connect to a backend running TensorFlow or a similar 
                machine learning framework to process the images.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="accuracy" className="pt-4">
            <div className="space-y-4">
              <p>
                Our model has been trained and tested on a dataset of chest X-rays with 
                confirmed TB diagnoses. The model demonstrates:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sensitivity (True Positive Rate): 87%</li>
                <li>Specificity (True Negative Rate): 92%</li>
                <li>Overall accuracy: 90%</li>
              </ul>
              <p className="text-sm text-gray-500 italic mt-4">
                These figures are representative of typical TB detection models and are included for 
                demonstration purposes in this prototype. A production system would include actual 
                performance metrics from a validated clinical model.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfoSection;
