
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onImageUpload: (image: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUploadImage(file);
    }
  };

  const validateAndUploadImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    onImageUpload(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUploadImage(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`w-full p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
        dragActive ? 'border-medical-500 bg-medical-100' : 'border-gray-300 bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      
      <Upload className="h-12 w-12 text-medical-500 mb-4" />
      
      <h3 className="text-lg font-medium mb-2">Upload Chest X-Ray Image</h3>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Drag and drop your chest X-ray image here, or click to browse
      </p>
      
      <Button 
        onClick={handleButtonClick}
        className="bg-medical-500 hover:bg-medical-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>Select File</>
        )}
      </Button>
    </div>
  );
};

export default ImageUpload;
