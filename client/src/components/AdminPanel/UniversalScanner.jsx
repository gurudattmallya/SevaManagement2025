
// import React, { useState, useRef, useEffect } from 'react';
// import { QrCode, Camera, Upload, History, X } from 'lucide-react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const UniversalScanner = () => {
//   // State for scanning results and history
//   const [scanResult, setScanResult] = useState('');
//   const [scanHistory, setScanHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [inputMethod, setInputMethod] = useState('keyboard');
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [selectedScanner, setSelectedScanner] = useState('hardware');
//   const [currentSeva, setCurrentSeva] = useState(null);

//   // Refs for managing scan buffer and timing
//   const scanBuffer = useRef('');
//   const lastKeyTime = useRef(0);
//   const qrScanner = useRef(null);



//   // Effect for handling keyboard input
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (selectedScanner !== 'hardware') return;
      
//       const currentTime = new Date().getTime();
//       if (currentTime - lastKeyTime.current > 100) {
//         scanBuffer.current = '';
//       }
//       lastKeyTime.current = currentTime;
      
//       if (e.key === 'Enter') {
//         if (scanBuffer.current) {
//           processScannedCode(scanBuffer.current);
//           scanBuffer.current = '';
//         }
//         return;
//       }
//       scanBuffer.current += e.key;
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//       if (qrScanner.current) {
//         qrScanner.current.clear();
//       }
//     };
//   }, [selectedScanner]);

//   const startCamera = () => {
//     setSelectedScanner('camera');
//     setIsCameraActive(true);
//     qrScanner.current = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: { width: 250, height: 250 } },
//       false
//     );
    
//     qrScanner.current.render(
//       (decodedText) => {
//         processScannedCode(decodedText);
//         stopCamera();
//       },
//       (error) => {
//         console.warn(error);
//       }
//     );
//   };

//   const stopCamera = () => {
//     if (qrScanner.current) {
//       qrScanner.current.clear();
//       setIsCameraActive(false);
//     }
//   };

//   const showNotification = (title, message, type) => {
//     const notificationColors = {
//       success: 'bg-green-100 border-green-500 text-green-700',
//       warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
//       error: 'bg-red-100 border-red-500 text-red-700'
//     };

//     const notification = document.createElement('div');
//     notification.className = `fixed top-4 right-4 p-4 rounded-lg border ${notificationColors[type]} shadow-lg z-50 animate-fade-in`;
//     notification.innerHTML = `
//       <h4 class="font-bold">${title}</h4>
//       <p>${message}</p>
//     `;
//     document.body.appendChild(notification);
//     setTimeout(() => notification.remove(), 3000);
//   };

//   const processScannedCode = async (code) => {
//     const [entityCode, finYear, receiptNumber] = code.split('/');

//     try {
//       const response = await fetch('http://localhost:2002/api/scanner/verify-receipt', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           entityCode,
//           finYear: parseInt(finYear),
//           receiptNumber: parseInt(receiptNumber)
//         })
//       });

//       const data = await response.json();
      
//       // Create currentSeva object from both scanned data and API response
//       const currentScanData = {
//         ENTITY_CODE: entityCode,
//         FIN_YEAR: finYear,
//         REC_NO: receiptNumber,
//         STATUS: data.success ? 'Ready for Delivery' : 'Already Delivered',
//         DELIVERY_DATE: data.details?.deliveryDate || '',
//         MESSAGE: data.message
//       };

//       setCurrentSeva(currentScanData);
//       console.log('Setting Current Scan:', currentScanData);

//       const newScan = {
//         code,
//         entityCode,
//         finYear,
//         receiptNumber,
//         timestamp: new Date().toLocaleString(),
//         source: selectedScanner,
//         status: data.success ? 'Ready for Delivery' : 'Already Delivered',
//         details: currentScanData
//       };

//       setScanHistory(prev => [newScan, ...prev].slice(0, 10));
//       setScanResult(data.message);
//       showNotification(data.success ? "Success" : "Notice", data.message, data.success ? "success" : "warning");

//     } catch (error) {
//       setCurrentSeva(null);
//       setError(error.message);
//     }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-orange-600 mb-3">Universal Code Scanner</h1>
//           <p className="text-gray-600">Scan QR codes or use hardware scanner to verify and deliver prasad</p>
//         </div>
//         {/* Current Scan Display */}
// <div className="mb-6">
//   <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
//     <div className="flex items-center gap-3 mb-6">
//       <QrCode className="w-6 h-6 text-orange-500" />
//       <h2 className="text-xl font-semibold text-gray-800">Current Scan</h2>
//     </div>
    

    
//     {currentSeva && Object.keys(currentSeva).length > 0 ? (
//       <div className="bg-orange-50 rounded-lg p-4">
//         <div className="grid grid-cols-3 gap-8 mb-3">
//           <div>
//             <h3 className="text-orange-600 font-medium mb-1">Entity</h3>
//             <p className="text-lg font-semibold text-gray-900">{currentSeva.ENTITY_CODE}</p>
//           </div>
//           <div>
//             <h3 className="text-orange-600 font-medium mb-1">Year</h3>
//             <p className="text-lg font-semibold text-gray-900">{currentSeva.FIN_YEAR}</p>
//           </div>
//           <div>
//             <h3 className="text-orange-600 font-medium mb-1">Receipt</h3>
//             <p className="text-lg font-semibold text-gray-900">{currentSeva.REC_NO}</p>
//           </div>
//         </div>
        
        
        
//       </div>
//     ) : (
//       <div className="text-center text-gray-500 py-12">
//         <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
//         <p className="text-lg">Scan a code to view details</p>
//       </div>
//     )}
//   </div>
// </div>

        

//         {/* Scanner and History Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Scanner Options */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <QrCode className="w-6 h-6 text-orange-500" />
//                   <h2 className="text-xl font-semibold text-gray-800">Scanner Options</h2>
//                 </div>
//                 {isCameraActive && (
//                   <button
//                     onClick={stopCamera}
//                     className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <button
//                   onClick={() => {
//                     setSelectedScanner('hardware');
//                     stopCamera();
//                   }}
//                   className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
//                     selectedScanner === 'hardware' 
//                       ? 'bg-orange-100 text-orange-700 border-2 border-orange-200' 
//                       : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
//                   }`}
//                 >
//                   <Upload className="w-8 h-8" />
//                   <div className="text-left">
//                     <p className="font-medium">Hardware Scanner</p>
//                     <p className="text-sm opacity-75">Ready to scan</p>
//                   </div>
//                 </button>

//                 <button
//                   onClick={isCameraActive ? stopCamera : startCamera}
//                   className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
//                     selectedScanner === 'camera' 
//                       ? 'bg-orange-100 text-orange-700 border-2 border-orange-200' 
//                       : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
//                   }`}
//                 >
//                   <Camera className="w-8 h-8" />
//                   <div className="text-left">
//                     <p className="font-medium">Mobile Camera</p>
//                     <p className="text-sm opacity-75">{isCameraActive ? 'Scanner active' : 'Click to start'}</p>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {isCameraActive && (
//               <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
//                 <div id="reader" className="w-full"></div>
//               </div>
//             )}
//           </div>

//           {/* Scan History */}
//           <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
//             <div className="flex items-center gap-3 mb-6">
//               <History className="w-6 h-6 text-orange-500" />
//               <h2 className="text-xl font-semibold text-gray-800">Scan History</h2>
//             </div>
            
//             <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//               {scanHistory.map((scan, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-orange-50 rounded-lg p-4"
//                 >
//                   <div className="grid grid-cols-3 gap-8 mb-3">
//                     <div>
//                       <h3 className="text-orange-600 font-medium mb-1">Entity</h3>
//                       <p className="text-lg font-semibold text-gray-900">{scan.entityCode}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-orange-600 font-medium mb-1">Year</h3>
//                       <p className="text-lg font-semibold text-gray-900">{scan.finYear}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-orange-600 font-medium mb-1">Receipt</h3>
//                       <p className="text-lg font-semibold text-gray-900">{scan.receiptNumber}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm">
//                       {scan.timestamp} - via {scan.source}
//                     </span>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       scan.status === 'Verified & Delivered' 
//                         ? 'bg-green-100 text-green-700' 
//                         : scan.status === 'Already Delivered'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-red-100 text-red-700'
//                     }`}>
//                       {scan.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
              
//               {scanHistory.length === 0 && (
//                 <div className="text-center text-gray-500 py-12">
//                   <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                   <p className="text-lg">No scans yet</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default UniversalScanner;

import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, Upload, History, X, ChevronLeft } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';

const UniversalScanner = () => {
  // State for scanning results and history
  const [scanResult, setScanResult] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const [error, setError] = useState('');
  const [inputMethod, setInputMethod] = useState('keyboard');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedScanner, setSelectedScanner] = useState('hardware');
  const [currentSeva, setCurrentSeva] = useState(null);

  // Refs for managing scan buffer and timing
  const scanBuffer = useRef('');
  const lastKeyTime = useRef(0);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  // Effect for handling keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedScanner !== 'hardware') return;
      
      const currentTime = new Date().getTime();
      if (currentTime - lastKeyTime.current > 100) {
        scanBuffer.current = '';
      }
      lastKeyTime.current = currentTime;
      
      if (e.key === 'Enter') {
        if (scanBuffer.current) {
          processScannedCode(scanBuffer.current);
          scanBuffer.current = '';
        }
        return;
      }
      scanBuffer.current += e.key;
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      stopCamera();
    };
  }, [selectedScanner]);

  const startCamera = async () => {
    try {
      setSelectedScanner('camera');
      setIsCameraActive(true);

      const constraints = {
        video: {
          facingMode: 'environment' // Use back camera on mobile devices
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Start continuous scanning
      codeReader.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            processScannedCode(result.getText());
          }
          if (err && !(err instanceof TypeError)) { // Ignore TypeError as it's common during normal operation
            console.error("Error during scan:", err);
          }
        }
      );
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Failed to access camera. Please ensure camera permissions are granted.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (isCameraActive) {
      codeReader.current.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    }
  };

  const showNotification = (title, message, type) => {
    const notificationColors = {
      success: 'bg-green-100 border-green-500 text-green-700',
      warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
      error: 'bg-red-100 border-red-500 text-red-700'
    };

    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg border ${notificationColors[type]} shadow-lg z-50 animate-fade-in`;
    notification.innerHTML = `
      <h4 class="font-bold">${title}</h4>
      <p>${message}</p>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const processScannedCode = async (code) => {
    const [entityCode, finYear, receiptNumber] = code.split('/');

    try {
      const response = await fetch('http://localhost:2002/api/scanner/verify-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entityCode,
          finYear: parseInt(finYear),
          receiptNumber: parseInt(receiptNumber)
        })
      });

      const data = await response.json();
      
      const currentScanData = {
        ENTITY_CODE: entityCode,
        FIN_YEAR: finYear,
        REC_NO: receiptNumber,
        STATUS: data.success ? 'Ready for Delivery' : 'Already Delivered',
        DELIVERY_DATE: data.details?.deliveryDate || '',
        MESSAGE: data.message
      };

      setCurrentSeva(currentScanData);

      const newScan = {
        code,
        entityCode,
        finYear,
        receiptNumber,
        timestamp: new Date().toLocaleString(),
        source: selectedScanner,
        status: data.success ? 'Ready for Delivery' : 'Already Delivered',
        details: currentScanData
      };

      setScanHistory(prev => [newScan, ...prev].slice(0, 10));
      setScanResult(data.message);
      showNotification(data.success ? "Success" : "Notice", data.message, data.success ? "success" : "warning");

    } catch (error) {
      setCurrentSeva(null);
      setError(error.message);
      showNotification("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 md:p-6">
      {/* Add back button here */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-3">
            Universal Code Scanner
          </h1>
          <p className="text-gray-600">
            Scan QR codes or use hardware scanner to verify and deliver prasad
          </p>
        </div>

        {/* Current Scan Display */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Current Scan
              </h2>
            </div>

            {currentSeva && Object.keys(currentSeva).length > 0 ? (
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-8 mb-3">
                  <div>
                    <h3 className="text-orange-600 font-medium mb-1">Entity</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentSeva.ENTITY_CODE}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-orange-600 font-medium mb-1">Year</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentSeva.FIN_YEAR}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-orange-600 font-medium mb-1">
                      Receipt
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentSeva.REC_NO}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Scan a code to view details</p>
              </div>
            )}
          </div>
        </div>
        {/* Manual Receipt Input */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Manual Receipt Entry
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const entityCode = e.target.entityCode.value;
                const finYear = e.target.finYear.value;
                const receiptNumber = e.target.receiptNumber.value;
                const manualCode = `${entityCode}/${finYear}/${receiptNumber}`;
                processScannedCode(manualCode);
                e.target.reset();
              }}
              className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end"
            >
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity Code
                </label>
                <input
                  type="text"
                  name="entityCode"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex items-center justify-center md:col-span-1">
                <span className="text-2xl font-bold text-gray-500">/</span>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="finYear"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex items-center justify-center md:col-span-1">
                <span className="text-2xl font-bold text-gray-500">/</span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receipt Number
                </label>
                <input
                  type="text"
                  name="receiptNumber"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-7">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Validate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Scanner and History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scanner Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Scanner Options
                  </h2>
                </div>
                {isCameraActive && (
                  <button
                    onClick={stopCamera}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setSelectedScanner("hardware");
                    stopCamera();
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    selectedScanner === "hardware"
                      ? "bg-orange-100 text-orange-700 border-2 border-orange-200"
                      : "bg-orange-50 text-gray-700 hover:bg-orange-100"
                  }`}
                >
                  <Upload className="w-8 h-8" />
                  <div className="text-left">
                    <p className="font-medium">Hardware Scanner</p>
                    <p className="text-sm opacity-75">Ready to scan</p>
                  </div>
                </button>

                <button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    selectedScanner === "camera"
                      ? "bg-orange-100 text-orange-700 border-2 border-orange-200"
                      : "bg-orange-50 text-gray-700 hover:bg-orange-100"
                  }`}
                >
                  <Camera className="w-8 h-8" />
                  <div className="text-left">
                    <p className="font-medium">Mobile Camera</p>
                    <p className="text-sm opacity-75">
                      {isCameraActive ? "Scanner active" : "Click to start"}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {isCameraActive && (
              <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded-lg"
                  autoPlay
                  playsInline
                  muted
                ></video>
              </div>
            )}
          </div>

          {/* Scan History */}
          <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Scan History
              </h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {scanHistory.map((scan, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-8 mb-3">
                    <div>
                      <h3 className="text-orange-600 font-medium mb-1">
                        Entity
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {scan.entityCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-orange-600 font-medium mb-1">Year</h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {scan.finYear}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-orange-600 font-medium mb-1">
                        Receipt
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {scan.receiptNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      {scan.timestamp} - via {scan.source}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scan.status === "Verified & Delivered"
                          ? "bg-green-100 text-green-700"
                          : scan.status === "Already Delivered"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </div>
                </div>
              ))}

              {scanHistory.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No scans yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalScanner;