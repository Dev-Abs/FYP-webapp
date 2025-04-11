import React, { useState } from 'react';
import * as JSZip from 'jszip';

const ImageDownloader = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [zipProgress, setZipProgress] = useState(0);

  // Your image data
  const squareData = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1553002401-c0945c2ff0b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/reserve/dPfjQTyJSJ2LpM7D9Yr0_Photo%2015-02-2014.jpg?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1601363645678-0cbae97abb2c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1557426575-6e9ea75ef57a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1552081845-de328afbf66d?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1531260796528-ae45a644fb20?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1609110995302-572b9641c0d1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      src: "https://plus.unsplash.com/premium_photo-1661627668944-a65d4f54ab27?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { 
      id: 9,
      src: "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      src: "https://plus.unsplash.com/premium_photo-1661310066866-45a714706cdc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1715866170788-cbde4a47a742?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 15,
      src: "https://plus.unsplash.com/premium_photo-1729867698245-c14c57fc7f47?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1607827448452-6fda561309d0?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Function to download a single image
  const downloadSingleImage = async (image) => {
    try {
      setDownloadProgress(prev => ({ ...prev, [image.id]: 'downloading' }));
      
      const response = await fetch(image.src);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Extract filename from URL or use ID
      const urlObj = new URL(image.src);
      const pathParts = urlObj.pathname.split('/');
      let filename = pathParts[pathParts.length - 1].split('?')[0];
      
      // If no valid filename, use the ID
      if (!filename || filename === '') {
        filename = `image_${image.id}.jpg`;
      }
      
      // Create download link and click it
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      setDownloadProgress(prev => ({ ...prev, [image.id]: 'completed' }));
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadProgress(prev => {
          const newState = { ...prev };
          delete newState[image.id];
          return newState;
        });
      }, 3000);
      
    } catch (error) {
      console.error(`Error downloading image ${image.id}:`, error);
      setDownloadProgress(prev => ({ ...prev, [image.id]: 'error' }));
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setDownloadProgress(prev => {
          const newState = { ...prev };
          delete newState[image.id];
          return newState;
        });
      }, 3000);
    }
  };

  // Function to download all images as a ZIP
  const downloadAllAsZip = async () => {
    try {
      setDownloading(true);
      setZipProgress(0);
      
      const zip = new JSZip();
      const imagesFolder = zip.folder('unsplash_images');
      
      let completedCount = 0;
      
      // Create an array of fetch promises
      const downloadPromises = squareData.map(async (image, index) => {
        try {
          const response = await fetch(image.src);
          if (!response.ok) {
            throw new Error(`Failed to fetch image ${image.id}`);
          }
          
          const blob = await response.blob();
          
          // Extract filename or use ID
          const urlObj = new URL(image.src);
          const pathParts = urlObj.pathname.split('/');
          let filename = pathParts[pathParts.length - 1].split('?')[0];
          
          // If no valid filename, use the ID
          if (!filename || filename === '') {
            const extension = blob.type.split('/')[1] || 'jpg';
            filename = `image_${image.id}.${extension}`;
          } else if (!filename.includes('.')) {
            // Add extension if missing
            const extension = blob.type.split('/')[1] || 'jpg';
            filename = `${filename}.${extension}`;
          }
          
          // Add to zip
          imagesFolder.file(filename, blob);
          
          // Update progress
          completedCount++;
          const progress = Math.round((completedCount / squareData.length) * 100);
          setZipProgress(progress);
          
          return true;
        } catch (error) {
          console.error(`Failed to add image ${image.id} to ZIP:`, error);
          
          // Still increment counter for progress calculation
          completedCount++;
          const progress = Math.round((completedCount / squareData.length) * 100);
          setZipProgress(progress);
          
          return false;
        }
      });
      
      // Wait for all downloads to complete
      await Promise.all(downloadPromises);
      
      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      }, (metadata) => {
        // Update compression progress
        if (metadata.percent) {
          setZipProgress(Math.round(metadata.percent));
        }
      });
      
      // Create download link for ZIP
      const zipUrl = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = 'unsplash_images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(zipUrl);
      
      // Reset state after a short delay
      setTimeout(() => {
        setDownloading(false);
        setZipProgress(0);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      setDownloading(false);
      setZipProgress(0);
    }
  };
  
  // Function to get status icon/text for image download
  const getStatusIndicator = (id) => {
    const status = downloadProgress[id];
    if (!status) return null;
    
    switch (status) {
      case 'downloading':
        return <span className="text-blue-500 ml-2">⏳</span>;
      case 'completed':
        return <span className="text-green-500 ml-2">✅</span>;
      case 'error':
        return <span className="text-red-500 ml-2">❌</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Unsplash Image Downloader</h1>
      
      <div className="mb-6">
        <button 
          onClick={downloadAllAsZip}
          disabled={downloading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
        >
          {downloading ? `Creating ZIP (${zipProgress}%)` : 'Download All Images as ZIP'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {squareData.map((image) => (
          <div key={image.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-100">
              <img 
                src={image.src} 
                alt={`Image ${image.id}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm font-medium">Image {image.id}</span>
              <div className="flex items-center">
                <button
                  onClick={() => downloadSingleImage(image)}
                  disabled={downloadProgress[image.id] === 'downloading'}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Download
                </button>
                {getStatusIndicator(image.id)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDownloader;