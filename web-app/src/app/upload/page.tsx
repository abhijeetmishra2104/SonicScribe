'use client';

import React from 'react';
import { FileUpload } from '../../components/ui/FileUpload'; 

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-10">Upload your Audio File</h1>

      <div className="w-full max-w-2xl">
        <FileUpload
          onChange={(files) => {
            console.log("Selected files:", files);
          }}
        />
      </div>
    </div>
  );
}
