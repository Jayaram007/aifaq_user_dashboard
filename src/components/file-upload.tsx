import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Implement file upload logic
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Upload Files</h2>
      <div
        {...getRootProps()}
        className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <Upload className="mb-4 h-12 w-12 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg text-gray-600">Drop the files here...</p>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Drag and drop files here, or click to select files
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Supported files: PDF, TXT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}