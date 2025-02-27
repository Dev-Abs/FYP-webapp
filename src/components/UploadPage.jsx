// 'use client'
// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'

// export default function UploadPage({ addToHistory }) {
//   const [file, setFile] = useState(null)
//   const [uploadStatus, setUploadStatus] = useState('')
//   const [prediction, setPrediction] = useState(null)
//   const [progress, setProgress] = useState(0)
//   const navigate = useNavigate()

//   const handleFileChange = (event) => {
//     const uploadedFile = event.target.files[0]
//     const validExtension = uploadedFile?.name?.split('.').pop().toLowerCase() === 'edf'

//     if (uploadedFile && validExtension) {
//       setFile(uploadedFile)
//       setUploadStatus('')
//       setPrediction(null)
//     } else {
//       setUploadStatus('Please upload a .edf file')
//       setFile(null)
//       setPrediction(null)
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) {
//       setUploadStatus('No file selected')
//       return
//     }

//     try {
//       setUploadStatus('Uploading and analyzing...')
//       setProgress(50)

//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         body: formData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Analysis failed')
//       }

//       const result = await response.json()
      
//       // Update progress and status
//       setProgress(100)
//       setUploadStatus('Analysis complete! Redirecting to results...')
//       setPrediction(result.prediction)

//       // Add to history
//       // addToHistory({
//       //   date: new Date().toLocaleDateString('en-US', {
//       //     year: 'numeric',
//       //     month: 'long',
//       //     day: 'numeric',
//       //     hour: '2-digit',
//       //     minute: '2-digit'
//       //   }),
//       //   filename: file.name,
//       //   results: result.prediction,
//       //   status: result.prediction.some(p => p > 0.5) ? 'Abnormal' : 'Normal'
//       // })
//       addToHistory({
//         date: new Date().toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         filename: file.name,
//         results: result.prediction,
//         status: result.prediction.some(p => p > 0.5) ? 'Depressed' : 'Normal',
//         modelVersion: '1.0.0' // Add any additional metadata
//       });

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         navigate('/results')
//       }, 2000)

//     } catch (error) {
//       setProgress(0)
//       setUploadStatus(error.message || 'Error processing file')
//       setPrediction(null)
//       console.error('Upload Error:', error)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
//       <motion.div
//         className="text-center mb-8 mr-10"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl font-bold text-primary">
//           EEG Signal Analysis
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Upload your EDF file for seizure detection analysis
//         </p>
//       </motion.div>

//       <motion.div
//         className="w-full max-w-lg bg-white rounded-lg shadow-md p-6"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
//           <input
//             type="file"
//             className="hidden"
//             id="file-upload"
//             accept=".edf"
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer flex flex-col items-center text-gray-600"
//           >
//             <svg
//               className="h-12 w-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <span className="mt-2 text-sm font-medium">
//               Click to upload EDF file
//             </span>
//           </label>
//         </div>

//         {file && (
//           <div className="mt-4 text-center text-green-600">
//             Selected: {file.name}
//           </div>
//         )}

//         {uploadStatus && (
//           <div className={`mt-4 text-center ${
//             uploadStatus.includes('complete') ? 'text-green-600' : 
//             uploadStatus.includes('failed') ? 'text-red-600' : 'text-blue-600'
//           }`}>
//             {uploadStatus}
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={!file}
//           className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition disabled:opacity-50"
//         >
//           {progress < 100 ? 'Analyze EEG Data' : 'View Results'}
//         </button>

//         {progress > 0 && (
//           <motion.div
//             className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="h-full bg-indigo-600" />
//           </motion.div>
//         )}

//         {prediction && (
//           <motion.div
//             className="mt-6 p-4 bg-gray-50 rounded-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <h3 className="text-lg font-semibold mb-2">Preliminary Results:</h3>
//             <div className="space-y-2">
//               {Array.isArray(prediction) ? (
//                 prediction.map((value, index) => (
//                   <div key={index} className="flex justify-between">
//                     <span>Time segment {index + 1}:</span>
//                     <span className={value > 0.5 ? 'text-red-600' : 'text-green-600'}>
//                       {value.toFixed(2)} ({value > 0.5 ? 'Depression Detected' : 'Normal'})
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center">
//                   {typeof prediction === 'object' ? (
//                     Object.entries(prediction).map(([key, value]) => (
//                       <div key={key} className="flex justify-between">
//                         <span>{key}:</span>
//                         <span className={value > 0.5 ? 'text-red-600' : 'text-green-600'}>
//                           {typeof value === 'number' ? value.toFixed(2) : value}
//                         </span>
//                       </div>
//                     ))
//                   ) : prediction}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarDrawer from './NavbarDrawer'

export default function UploadPage({ addToHistory }) {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0]
    const validExtension = uploadedFile?.name?.split('.').pop().toLowerCase() === 'edf'

    if (uploadedFile && validExtension) {
      setFile(uploadedFile)
      setUploadStatus('')
      setPrediction(null)
    } else {
      setUploadStatus('Please upload a .edf file')
      setFile(null)
      setPrediction(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected')
      return
    }
  
    try {
      setUploadStatus('Uploading and analyzing...')
      setProgress(50)
  
      const formData = new FormData()
      formData.append('file', file)
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
      // const response = await fetch(`http://localhost:5000/predict`, {
        method: 'POST',
        body: formData
      })
      
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }
  
      const result = await response.json()
  
      // Update progress and status
      setProgress(100)
      setUploadStatus('Analysis complete! Redirecting to results...')
      setPrediction(result.prediction)
  
      addToHistory({
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        filename: file.name,
        results: result.prediction,
        status: result.prediction.some(p => p > 0.5) ? 'Depressed' : 'Normal',
        modelVersion: '1.0.0'
      })
  
      setTimeout(() => {
        navigate('/results')
      }, 2000)
  
    } catch (error) {
      setProgress(0)
      setUploadStatus(error.name === 'AbortError' 
        ? 'Request timed out. Please try again.' 
        : error.message || 'Error processing file')
      setPrediction(null)
      console.error('Upload Error:', error)
    }
  }
  

  return (
    <div>
      {/* <Navbar /> */}
      <NavbarDrawer />
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-8 px-4 md:flex-row flex-col">
      <motion.div
        className="text-center mb-8 mr-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-indigo-400">
          EEG Signal Analysis
        </h1>
        <p className="text-gray-300 mt-2">
          Upload your EDF file for mental health pattern analysis
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".edf"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center text-gray-300 hover:text-gray-100 transition-colors"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="mt-2 text-sm font-medium">
              Click to upload EDF file
            </span>
          </label>
        </div>

        {file && (
          <div className="mt-4 text-center text-green-400">
            Selected: {file.name}
          </div>
        )}

        {uploadStatus && (
          <div className={`mt-4 text-center ${
            uploadStatus.includes('complete') ? 'text-green-400' : 
            uploadStatus.includes('failed') ? 'text-red-400' : 'text-blue-400'
          }`}>
            {uploadStatus}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file}
          className="mt-6 w-full bg-indigo-600 text-gray-100 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          {progress < 100 ? 'Analyze EEG Data' : 'View Results'}
        </button>

        {progress > 0 && (
          <motion.div
            className="w-full h-2 bg-gray-700 rounded-full mt-4 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full bg-indigo-500" />
          </motion.div>
        )}

        {prediction && (
          <motion.div
            className="mt-6 p-4 bg-gray-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-200">Preliminary Results:</h3>
            <div className="space-y-2">
              {Array.isArray(prediction) ? (
                prediction.map((value, index) => (
                  <div key={index} className="flex justify-between text-gray-300">
                    <span>Time segment {index + 1}:</span>
                    <span className={value > 0.5 ? 'text-red-400' : 'text-green-400'}>
                      {value.toFixed(2)} ({value > 0.5 ? 'Depression Detected' : 'Normal'})
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  {typeof prediction === 'object' ? (
                    Object.entries(prediction).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-gray-300">
                        <span>{key}:</span>
                        <span className={value > 0.5 ? 'text-red-400' : 'text-green-400'}>
                          {typeof value === 'number' ? value.toFixed(2) : value}
                        </span>
                      </div>
                    ))
                  ) : prediction}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
    </div>
  )
}