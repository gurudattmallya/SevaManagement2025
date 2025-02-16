


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Number = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  // Validate phone number format
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handlePhoneSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    // Simulate OTP sending
    setIsPhoneSubmitted(true);
    setErrorMessage('');
    console.log('Sending OTP to', phoneNumber);
  };

  const navigate = useNavigate();
  const handleOtpSubmit = () => {
    if (otp === '123456') { // Simulate OTP verification
      setIsOtpVerified(true);
      setErrorMessage('');
      navigate('/booking/devotee-form');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    if (resendCount < 3) { // Limit resend attempts
      setResendCount((prev) => prev + 1);
      setErrorMessage('');
      console.log('Resending OTP to', phoneNumber);
    } else {
      setErrorMessage('Maximum resend attempts reached. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Phone Number Validation</h2>

        <div className="space-y-4">
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isPhoneSubmitted && !isOtpVerified}
              className="w-full px-4 py-2 border border-orange-200 rounded-md"
            />
          </div>

          {/* OTP Input - Appears after phone number is submitted */}
          {isPhoneSubmitted && !isOtpVerified && (
            <div>
              <label className="block text-sm mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-orange-200 rounded-md"
              />
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">{errorMessage}</div>
          )}

          {/* Buttons */}
          <div className="flex justify-between">
            {!isPhoneSubmitted ? (
              <button
                onClick={handlePhoneSubmit}
                className="w-full bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Send OTP
              </button>
            ) : !isOtpVerified ? (
              <>
                <button
                  onClick={handleResendOtp}
                  disabled={resendCount >= 3}
                  className="text-orange-500 hover:text-orange-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Resend OTP
                </button>
                <button
                  onClick={handleOtpSubmit}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                >
                  Verify OTP
                </button>
              </>
            ) : null}
          </div>

          {/* OTP Verification Success Message */}
          {isOtpVerified && (
            <div className="text-green-600 font-bold text-center mt-4">
              OTP Verified Successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

 export default Number;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from "../../firebase.config";

// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// const PhoneVerification = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Cleanup recaptcha on component unmount
//     return () => {
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//       }
//     };
//   }, []);

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible',
//         callback: () => {
//           console.log('Recaptcha verified');
//         },
//         'expired-callback': () => {
//           setErrorMessage('reCAPTCHA expired. Please try again.');
//           if (window.recaptchaVerifier) {
//             window.recaptchaVerifier.clear();
//           }
//         }
//       });
//     }
//   };

//   const formatPhoneNumber = (number) => {
//     if (!number.startsWith('+91')) {
//       return '+91' + number;
//     }
//     return number;
//   };

//   const validatePhoneNumber = (number) => {
//     const regex = /^(\+91)?[6-9]\d{9}$/;
//     return regex.test(number);
//   };

//   const handlePhoneSubmit = async () => {
//     try {
//       setLoading(true);
//       setErrorMessage('');

//       const formattedNumber = formatPhoneNumber(phoneNumber);
//       if (!validatePhoneNumber(formattedNumber)) {
//         setErrorMessage('Please enter a valid 10-digit Indian phone number');
//         setLoading(false);
//         return;
//       }

//       setupRecaptcha();
      
//       const confirmation = await signInWithPhoneNumber(
//         auth, 
//         formattedNumber, 
//         window.recaptchaVerifier
//       );
      
//       setConfirmationResult(confirmation);
//       setIsPhoneSubmitted(true);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Phone submission error:', error);
//       setErrorMessage(error.message || 'Error sending OTP. Please try again.');
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpSubmit = async () => {
//     if (!otp || otp.length !== 6) {
//       setErrorMessage('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       setLoading(true);
//       setErrorMessage('');
      
//       const result = await confirmationResult.confirm(otp);
      
//       if (result.user) {
//         setIsOtpVerified(true);
        
//         // Get the ID token
//         const idToken = await result.user.getIdToken();
        
//         // Send verification to your backend
//         const response = await fetch('http://localhost:2002/api1/verify-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${idToken}`
//           },
//           body: JSON.stringify({
//             phoneNumber: formatPhoneNumber(phoneNumber),
//             uid: result.user.uid
//           }),
//         });

//         if (response.ok) {
//           // Store the token in localStorage if needed
//           localStorage.setItem('authToken', idToken);
//           navigate('/booking/devotee-form');
//         } else {
//           throw new Error('Backend verification failed');
//         }
//       }
//     } catch (error) {
//       console.error('OTP verification error:', error);
//       setErrorMessage('Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Phone Verification
//         </h2>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                 +91
//               </span>
//               <input
//                 type="tel"
//                 value={phoneNumber.startsWith('+91') ? phoneNumber.slice(3) : phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                 disabled={isPhoneSubmitted && !isOtpVerified}
//                 placeholder="Enter 10-digit number"
//                 className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//               />
//             </div>
//           </div>

//           {isPhoneSubmitted && !isOtpVerified && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="Enter 6-digit OTP"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//               />
//             </div>
//           )}

//           {errorMessage && (
//             <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
//               {errorMessage}
//             </div>
//           )}

//           <div className="flex justify-center">
//             {!isPhoneSubmitted ? (
//               <button
//                 onClick={handlePhoneSubmit}
//                 disabled={loading || phoneNumber.length !== 10}
//                 className="w-full bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? 'Sending...' : 'Send OTP'}
//               </button>
//             ) : !isOtpVerified ? (
//               <button
//                 onClick={handleOtpSubmit}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? 'Verifying...' : 'Verify OTP'}
//               </button>
//             ) : null}
//           </div>

//           {isOtpVerified && (
//             <div className="text-green-600 font-medium text-center bg-green-50 p-2 rounded">
//               Phone number verified successfully!
//             </div>
//           )}
//         </div>
//       </div>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default PhoneVerification;