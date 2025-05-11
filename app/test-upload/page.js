'use client';

import { useState } from 'react';

export default function TestUploadPage() {
  const [testResult, setTestResult] = useState(null);
  const [mainResult, setMainResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTestResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const response = await fetch('/api/test-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleMainUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMainResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMainResult(data);
    } catch (error) {
      setMainResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Test Upload Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Upload Endpoint</h2>
          <input
            type="file"
            onChange={handleTestUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {loading && <p className="mt-4">Loading...</p>}
          {testResult && (
            <div className="mt-4">
              <h3 className="font-semibold">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Main Upload Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Main Upload Endpoint</h2>
          <input
            type="file"
            onChange={handleMainUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {loading && <p className="mt-4">Loading...</p>}
          {mainResult && (
            <div className="mt-4">
              <h3 className="font-semibold">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                {JSON.stringify(mainResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 