'use client';

import { useState } from 'react';
import { createWordFromStructuredJson } from '../utils/createWordDoc';

export default function WordGenerator() {
  const [headerText, setHeaderText] = useState('Page Header');
  const [footerText, setFooterText] = useState('Page Footer');
  const [bodyJson, setBodyJson] = useState(`[
  {
    "page": 1,
    "content": [
      {
        "paragraph": [
          { "text": "Introduction", "bullet": false },
          { "text": "Key point 1", "bullet": true },
          { "text": "Key point 2", "bullet": true }
        ]
      }
    ]
  },
  {
    "page": 2,
    "content": [
      {
        "paragraph": [
          { "text": "Second Page Header", "bullet": false },
          { "text": "Another point", "bullet": true }
        ]
      }
    ]
  }
]`);
  const [logoFile, setLogoFile] = useState(null);

  const handleDownload = async () => {
    try {
      const parsedJson = JSON.parse(bodyJson);
      const logoBuffer = logoFile ? await logoFile.arrayBuffer() : undefined;
      const blob = await createWordFromStructuredJson(parsedJson, headerText, footerText, logoBuffer);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'jsondownload.docx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Invalid JSON or error generating document.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-bold text-center">JSON to Word Download</h2>

      <div>
        <label className="block font-medium mb-1">Header Text</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Footer Text</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Body JSON</label>
        <textarea
          rows={12}
          className="w-full border border-gray-300 rounded px-3 py-2 font-mono text-sm"
          value={bodyJson}
          onChange={(e) => setBodyJson(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Logo (optional)</label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-500"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Word Document
        </button>
      </div>
    </div>
  );
}
