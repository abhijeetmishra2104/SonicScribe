'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon } from 'lucide-react';
import  {MultiStepLoader}  from '@/components/ui/multi-step-loader';
import { IconSquareRoundedX } from '@tabler/icons-react';

const loadingStates = [
  { text: "Preparing file for upload..." },
  { text: "Connecting to the server..." },
  { text: "Uploading to Cloudinary..." },
  { text: "Saving file info to database..." },
  { text: "Finalizing upload..." },
];

export default function UploadPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpload(files: File[]) {
    setShowAlert(false); // hide old alert
    setLoading(true); // show loader

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Upload response:', data);

      if (data.success) {
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false); // hide loader
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 relative">
      <h1 className="text-3xl font-bold mb-10">Upload your Audio File</h1>

      <div className="w-full max-w-2xl">
        <FileUpload onChange={handleUpload} />
      </div>

      {showAlert && (
        <div className="mt-6 w-full max-w-2xl">
          <Alert>
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>Success! Your file has been uploaded.</AlertTitle>
            <AlertDescription>
              It is now stored securely and ready for use.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Loader */}
      <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={1500} />

      {loading && (
        <button
          className="fixed top-4 right-4 text-white z-50"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
