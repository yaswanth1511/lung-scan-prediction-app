
import { FileImage } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-medical-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileImage className="h-8 w-8" />
          <h1 className="text-2xl font-bold">TB Detection AI</h1>
        </div>
        <div className="text-sm font-medium">
          Tuberculosis Detection from X-Ray Images
        </div>
      </div>
    </header>
  );
};

export default Header;
