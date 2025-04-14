
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full h-64 flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-medical-500 animate-spin" />
      </Card>
    );
  }

  if (!imageUrl) {
    return (
      <Card className="w-full h-64 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">No image uploaded</p>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
          <img 
            src={imageUrl} 
            alt="Uploaded X-Ray" 
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
