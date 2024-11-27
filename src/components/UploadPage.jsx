'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0]
    const validFormats = ['text/csv', 'application/matlab']

    if (uploadedFile && validFormats.includes(uploadedFile.type)) {
      setFile(uploadedFile)
      setUploadStatus('')
    } else {
      setUploadStatus('Unsupported file format. Please upload .csv or .mat files.')
      setFile(null)
    }
  }

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('No file selected. Please upload a file.')
      return
    }

    setUploadStatus('Uploading...')
    setProgress(50)

    setTimeout(() => {
      setUploadStatus('Upload successful! File ready for analysis.')
      setProgress(100)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-primary">
          Upload Your EEG Data for Analysis
        </h1>
        <p className="text-gray-600 mt-2">
          Drag & Drop or Click to Upload (.csv, .mat)
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-lg bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center text-gray-600"
          >
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-4-4V8a4 4 0 014-4h10a4 4 0 014 4v4a4 4 0 01-4 4H7z"
              />
            </svg>
            <span className="mt-2 text-sm font-medium">
              Drag & Drop or Click to Upload
            </span>
          </label>
        </div>

        {file && (
          <div className="mt-4 text-center text-green-600">
            File selected: {file.name}
          </div>
        )}

        {uploadStatus && (
          <div
            className={`mt-4 text-center ${
              uploadStatus.includes('successful')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {uploadStatus}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          {progress < 100 ? 'Upload' : 'Process File'}
        </button>

        {progress > 0 && (
          <motion.div
            className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full bg-indigo-600" />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
