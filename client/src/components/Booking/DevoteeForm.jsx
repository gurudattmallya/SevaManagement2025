 // // DevoteeForm.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const DevoteeForm = ({ onDevoteeSubmit }) => {
//   const [devotee, setDevotee] = useState(() => {
//     const savedDevotee = localStorage.getItem('currentDevotee');
//     return savedDevotee ? JSON.parse(savedDevotee) : {
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       mobile: '',
//       country: 'India',
//       state: '',
//       district: '',
//       city: '',
//       areas: [],
//       selectedArea: '',
//       addressLane1: '',
//       addressLane2: '',
//       pincode: ''
//     };
//   });

//   const [existingDevotee, setExistingDevotee] = useState(null);
//   const [error, setError] = useState('');
//   const [areaOptions, setAreaOptions] = useState([]);

//   useEffect(() => {
//     localStorage.setItem('currentDevotee', JSON.stringify(devotee));
//   }, [devotee]);

//   useEffect(() => {
//     const fetchPincodeDetails = async () => {
//       if (devotee.pincode.length === 6) {
//         try {
//           const response = await fetch(`http://localhost:2002/api/devotee/pincode/${devotee.pincode}`);
//           if (response.ok) {
//             const data = await response.json();
//             setDevotee(prev => ({
//               ...prev,
//               country: data.country || 'India',
//               state: data.state || '',
//               district: data.district || '',
//               city: data.city || '',
//               areas: data.areas || []
//             }));
//             setAreaOptions(data.areas || []);
//           }
//         } catch (error) {
//           console.error('Error fetching pincode details:', error);
//         }
//       }
//     };

//     fetchPincodeDetails();
//   }, [devotee.pincode]);

//   useEffect(() => {
//     if (devotee.mobile.length === 10) {
//       const allDevotees = JSON.parse(localStorage.getItem('allDevotees') || '[]');
//       const existingDev = allDevotees.find(d => d.mobile === devotee.mobile);
//       if (existingDev) {
//         setExistingDevotee(existingDev);
//         setDevotee(existingDev);
//       } else {
//         setExistingDevotee(null);
//       }
//     }
//   }, [devotee.mobile]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!devotee.firstName || !devotee.mobile) {
//       setError('First Name and Mobile are required.');
//       return;
//     }

//     try {
//       const allDevotees = JSON.parse(localStorage.getItem('allDevotees') || '[]');
      
//       const existingIndex = allDevotees.findIndex(d => d.mobile === devotee.mobile);
//       if (existingIndex !== -1) {
//         allDevotees[existingIndex] = devotee;
//       } else {
//         allDevotees.push(devotee);
//       }

//       localStorage.setItem('allDevotees', JSON.stringify(allDevotees));
      
//       if (onDevoteeSubmit) {
//         onDevoteeSubmit(devotee);
//       }

//       localStorage.removeItem('currentDevotee');
//     } catch (error) {
//       setError('Failed to save devotee details. Please try again.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-orange-600">Devotee Details</h2>
      
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {existingDevotee && (
//         <p className="text-blue-500 mb-4">
//           Existing devotee found! Details have been auto-filled.
//         </p>
//       )}
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               First Name *
//             </label>
//             <input
//               type="text"
//               value={devotee.firstName}
//               onChange={(e) => setDevotee({ ...devotee, firstName: e.target.value })}
//               placeholder="Enter First Name"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Mobile Number *
//             </label>
//             <input
//               type="tel"
//               value={devotee.mobile}
//               onChange={(e) => setDevotee({ ...devotee, mobile: e.target.value })}
//               placeholder="Enter Mobile Number"
//               className="w-full px-4 py-2 border rounded-md"
//               maxLength={10}
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Pincode
//           </label>
//           <input
//             type="text"
//             value={devotee.pincode}
//             onChange={(e) => setDevotee({ ...devotee, pincode: e.target.value })}
//             placeholder="Enter Pincode"
//             className="w-full px-4 py-2 border rounded-md"
//             maxLength={6}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Country
//             </label>
//             <input
//               type="text"
//               value={devotee.country}
//               readOnly
//               className="w-full px-4 py-2 border rounded-md bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               State
//             </label>
//             <input
//               type="text"
//               value={devotee.state}
//               readOnly
//               className="w-full px-4 py-2 border rounded-md bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               District
//             </label>
//             <input
//               type="text"
//               value={devotee.district}
//               readOnly
//               className="w-full px-4 py-2 border rounded-md bg-gray-50"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               City
//             </label>
//             <input
//               type="text"
//               value={devotee.city}
//               readOnly
//               className="w-full px-4 py-2 border rounded-md bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Area
//             </label>
//             <select
//               value={devotee.selectedArea}
//               onChange={(e) => setDevotee({ ...devotee, selectedArea: e.target.value })}
//               className="w-full px-4 py-2 border rounded-md"
//             >
//               <option value="">Select Area</option>
//               {areaOptions.map((area, index) => (
//                 <option key={index} value={area}>
//                   {area}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address
//           </label>
//           <input
//             type="text"
//             value={devotee.addressLane1}
//             onChange={(e) => setDevotee({ ...devotee, addressLane1: e.target.value })}
//             placeholder="Address Line 1"
//             className="w-full px-4 py-2 border rounded-md mb-2"
//           />
//           <input
//             type="text"
//             value={devotee.addressLane2}
//             onChange={(e) => setDevotee({ ...devotee, addressLane2: e.target.value })}
//             placeholder="Address Line 2"
//             className="w-full px-4 py-2 border rounded-md"
//           />
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             type="submit"
//             className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
//           >
//             Save Details
//           </button>
//           <Link
//             to="/booking/sevas"
//             className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
//           >
//             Begin Seva Booking
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DevoteeForm;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DevoteeForm = ({ onDevoteeSubmit }) => {
  const [devotee, setDevotee] = useState(() => {
    const savedDevotee = localStorage.getItem('currentDevotee');
    return savedDevotee ? JSON.parse(savedDevotee) : {
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
      email: '',
      mobile: '',
      country: 'India',
      state: '',
      district: '',
      city: '',
      areas: [],
      selectedArea: '',
      addressLane1: '',
      addressLane2: '',
      pincode: ''
    };
  });

  const [existingDevotee, setExistingDevotee] = useState(null);
  const [error, setError] = useState('');
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    localStorage.setItem('currentDevotee', JSON.stringify(devotee));
  }, [devotee]);

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (devotee.pincode.length === 6) {
        try {
          const response = await fetch(`http://localhost:2002/api/devotee/pincode/${devotee.pincode}`);
          if (response.ok) {
            const data = await response.json();
            setDevotee(prev => ({
              ...prev,
              country: data.country || 'India',
              state: data.state || '',
              district: data.district || '',
              city: data.city || '',
              areas: data.areas || []
            }));
            setAreaOptions(data.areas || []);
          }
        } catch (error) {
          console.error('Error fetching pincode details:', error);
        }
      }
    };

    fetchPincodeDetails();
  }, [devotee.pincode]);

  useEffect(() => {
    if (devotee.mobile.length === 10) {
      const allDevotees = JSON.parse(localStorage.getItem('allDevotees') || '[]');
      const existingDev = allDevotees.find(d => d.mobile === devotee.mobile);
      if (existingDev) {
        setExistingDevotee(existingDev);
        setDevotee(existingDev);
      } else {
        setExistingDevotee(null);
      }
    }
  }, [devotee.mobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!devotee.firstName || !devotee.mobile) {
      setError('First Name and Mobile are required.');
      return;
    }

    try {
      // Combine names into fullName
      const fullName = [devotee.firstName, devotee.middleName, devotee.lastName]
        .filter(Boolean)
        .join(' ');

      const devoteeWithFullName = {
        ...devotee,
        fullName
      };

      const allDevotees = JSON.parse(localStorage.getItem('allDevotees') || '[]');
      
      const existingIndex = allDevotees.findIndex(d => d.mobile === devotee.mobile);
      if (existingIndex !== -1) {
        allDevotees[existingIndex] = devoteeWithFullName;
      } else {
        allDevotees.push(devoteeWithFullName);
      }

      localStorage.setItem('allDevotees', JSON.stringify(allDevotees));
      
      if (onDevoteeSubmit) {
        onDevoteeSubmit(devoteeWithFullName);
      }

      localStorage.removeItem('currentDevotee');
    } catch (error) {
      setError('Failed to save devotee details. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Devotee Details</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {existingDevotee && (
        <p className="text-blue-500 mb-4">
          Existing devotee found! Details have been auto-filled.
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={devotee.firstName}
              onChange={(e) => setDevotee({ ...devotee, firstName: e.target.value })}
              placeholder="Enter First Name"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              value={devotee.middleName}
              onChange={(e) => setDevotee({ ...devotee, middleName: e.target.value })}
              placeholder="Enter Middle Name"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={devotee.lastName}
              onChange={(e) => setDevotee({ ...devotee, lastName: e.target.value })}
              placeholder="Enter Last Name"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={devotee.mobile}
              onChange={(e) => setDevotee({ ...devotee, mobile: e.target.value })}
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-2 border rounded-md"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={devotee.email}
              onChange={(e) => setDevotee({ ...devotee, email: e.target.value })}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            value={devotee.pincode}
            onChange={(e) => setDevotee({ ...devotee, pincode: e.target.value })}
            placeholder="Enter Pincode"
            className="w-full px-4 py-2 border rounded-md"
            maxLength={6}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={devotee.country}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={devotee.state}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              type="text"
              value={devotee.district}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={devotee.city}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <select
              value={devotee.selectedArea}
              onChange={(e) => setDevotee({ ...devotee, selectedArea: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Area</option>
              {areaOptions.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={devotee.addressLane1}
            onChange={(e) => setDevotee({ ...devotee, addressLane1: e.target.value })}
            placeholder="Address Line 1"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            value={devotee.addressLane2}
            onChange={(e) => setDevotee({ ...devotee, addressLane2: e.target.value })}
            placeholder="Address Line 2"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-4">
          {/* <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
          >
            Save Details
          </button> */}
          <Link
            to="/booking/sevas"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Begin Seva Booking
          </Link>
        </div>
      </form>
    </div>
  );
};

export default DevoteeForm;