
import React from 'react';
import { CircleCheck, CircleX, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsDisplayProps {
  prediction: string | null;
  confidence: number;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  prediction,
  confidence,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Processing Image...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-md">
            <Progress value={50} className="h-2" />
          </div>
          <p className="text-sm text-gray-500">
            The AI model is analyzing the X-ray image. This may take a few moments.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Awaiting X-Ray Upload</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <AlertCircle className="h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-500 text-center">
            Upload a chest X-ray image to get a tuberculosis prediction.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isTBDetected = prediction === 'TB Detected';
  const confidencePercent = Math.round(confidence * 100);

  return (
    <Card className={`w-full ${isTBDetected ? 'border-alert-red' : 'border-alert-green'}`}>
      <CardHeader className={`${isTBDetected ? 'bg-red-50' : 'bg-green-50'} rounded-t-lg`}>
        <CardTitle className="flex items-center justify-center space-x-2">
          {isTBDetected ? (
            <>
              <CircleX className="h-6 w-6 text-alert-red" />
              <span className="text-alert-red">TB Detected</span>
            </>
          ) : (
            <>
              <CircleCheck className="h-6 w-6 text-alert-green" />
              <span className="text-alert-green">TB Not Detected</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm font-medium">{confidencePercent}%</span>
            </div>
            <Progress 
              value={confidencePercent} 
              className={`h-2 ${isTBDetected ? 'bg-red-100' : 'bg-green-100'}`}
              indicatorClassName={isTBDetected ? 'bg-alert-red' : 'bg-alert-green'} 
            />
          </div>
          
          <p className="text-sm text-gray-500 italic mt-4 text-center">
            This is an AI prediction and should not be used as the sole basis for medical decisions.
            Please consult a healthcare professional.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
