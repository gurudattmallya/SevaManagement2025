// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { X, Calendar, ShoppingCart } from 'lucide-react';

// const isShashwathSevaSelected = () => {
//   return sevas.some(seva => 
//     selectedPoojas[seva.SEVA_CODE] && seva.SEVA_SHASHWATH === 'SS'
//   );
// };

// const Notification = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md animate-slide-in z-50">
//     <div className="flex items-center justify-between">
//       <p className="text-gray-700">{message}</p>
//       <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
//         <X size={18} />
//       </button>
//     </div>
//   </div>
// );

// // const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveSeva }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
// //       <div className="bg-white w-full max-w-md h-full overflow-y-auto">
// //         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
// //           <h2 className="text-xl font-semibold text-orange-800">Shopping Cart</h2>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             <X size={24} />
// //           </button>
// //         </div>

// //         <div className="p-4">
// //           {cart.length === 0 ? (
// //             <p className="text-gray-500 text-center py-4">Your cart is empty</p>
// //           ) : (
// //             <>
// //               {cart.map((item, itemIndex) => (
// //                 <div key={itemIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
// //                   <div className="flex justify-between items-start mb-2">
// //                     <h3 className="font-medium text-orange-700">{item.deityName}</h3>
// //                     <div className="flex items-center text-orange-600 text-sm">
// //                       <Calendar size={14} className="mr-1" />
// //                       {new Date(item.date).toLocaleDateString('en-IN', {
// //                         year: 'numeric',
// //                         month: 'short',
// //                         day: 'numeric'
// //                       })}
// //                     </div>
                       

// //                   </div>

// //                   {item.sevas.map((seva, sevaIndex) => (
// //                     <div key={sevaIndex} className="flex items-center justify-between py-2">
// //                       <div className="flex-1">
// //                         <p className="text-sm text-orange-600">{seva.sevaName}</p>
// //                         <div className="flex items-center mt-1">
// //                           <button 
// //                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, Math.max(0, seva.quantity - 1))}
// //                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-l"
// //                           >
// //                             -
// //                           </button>
// //                           <span className="w-12 h-8 flex items-center justify-center border-t border-b border-orange-200">
// //                             {seva.quantity}
// //                           </span>
// //                           <button 
// //                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, seva.quantity + 1)}
// //                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-r"
// //                           >
// //                             +
// //                           </button>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-4">
// //                         <span className="text-sm font-medium">₹{seva.amount}</span>
// //                         <button 
// //                           onClick={() => onRemoveSeva(itemIndex, sevaIndex)}
// //                           className="text-red-400 hover:text-red-600"
// //                         >
// //                           <X size={16} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}

// //                   <div className="mt-2 text-sm text-orange-500">
// //                     Prasad Delivery: {item.prasadDelivery}
// //                   </div>
// //                 </div>
// //               ))}

// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <span className="font-medium text-orange-700">Total Amount:</span>
// //                   <span className="font-medium text-orange-900">
// //                     ₹{cart.reduce((total, item) => total + item.totalAmount, 0)}
// //                   </span>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveSeva }) => {
//   if (!isOpen) return null;

//   const formatCartDate = (item) => {
//     const ssSeva = item.sevas.find(seva => seva.sevaShashwath === 'SS');
    
//     if (ssSeva?.ssDetails) {
//       if (ssSeva.ssDetails.calendarType === 'ritual') {
//         return `${ssSeva.ssDetails.maasa} ${ssSeva.ssDetails.paksha} ${ssSeva.ssDetails.tithi}`;
//       }
//       const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//       ];
//       return `${monthNames[parseInt(ssSeva.ssDetails.month) - 1]} ${ssSeva.ssDetails.day}`;
//     }
    
//     return new Date(item.date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
//       <div className="bg-white w-full max-w-md h-full overflow-y-auto">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-orange-800">
// Cart</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-4">
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8 text-gray-500">
//               <ShoppingCart size={48} className="mb-4 opacity-50" />
//               <p>Your cart is empty</p>
//             </div>
//           ) : (
//             <>
//               {cart.map((item, itemIndex) => (
//                 <div key={itemIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-medium text-orange-700">{item.deityName}</h3>
//                     <div className="flex items-center text-orange-600 text-sm">
//                       <Calendar size={14} className="mr-1" />
//                       {formatCartDate(item)}
//                     </div>
//                   </div>

//                   {item.sevas.map((seva, sevaIndex) => (
//                     <div key={sevaIndex} className="flex items-center justify-between py-2">
//                       <div className="flex-1">
//                         <p className="text-sm text-orange-600">{seva.sevaName}</p>
//                         {/* {seva.sevaShashwath === 'SS' && seva.ssDetails?.inMemoryOf && (
//                           <p className="text-xs text-gray-500 mt-1">
//                             In memory of: {seva.ssDetails.inMemoryOf}
//                           </p>
//                         )} */}
//                          {seva.sevaShashwath === 'SS' && (
//         <div className="mt-2 text-xs text-gray-600">
//           <p>In Memory Of: {seva.ssDetails?.inMemoryOf}</p>
//           {seva.ssDetails?.calendarType === 'ritual' ? (
//             <p>Date: {seva.ssDetails.maasa} {seva.ssDetails.paksha} {seva.ssDetails.tithi}</p>
//           ) : (
//             <p>Date: {seva.ssDetails?.month}/{seva.ssDetails?.day}</p>
//           )}
//         </div>
//       )}
//                         <div className="flex items-center mt-1">
//                           <button 
//                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, Math.max(0, seva.quantity - 1))}
//                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-l"
//                           >
//                             -
//                           </button>
//                           <span className="w-12 h-8 flex items-center justify-center border-t border-b border-orange-200">
//                             {seva.quantity}
//                           </span>
//                           <button 
//                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, seva.quantity + 1)}
//                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-r"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span className="text-sm font-medium">₹{seva.amount}</span>
//                         <button 
//                           onClick={() => onRemoveSeva(itemIndex, sevaIndex)}
//                           className="text-red-400 hover:text-red-600"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                   <div className="mt-2 text-sm text-orange-500">
//                     Prasad Delivery: {item.prasadDelivery}
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-orange-700">Total Amount:</span>
//                   <span className="font-medium text-orange-900">
//                     ₹{cart.reduce((total, item) => total + item.totalAmount, 0)}
//                   </span>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// const SubSevaSelection = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [deities, setDeities] = useState([]);
//   const [sevas, setSevas] = useState([]);
//   const [activeDeity, setActiveDeity] = useState(null);
//   const [date, setDate] = useState('');
//   const [quantities, setQuantities] = useState({});
//   const [selectedPoojas, setSelectedPoojas] = useState({});
//   const [prasadDelivery, setPrasadDelivery] = useState('Personally');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState('');
//   const [showCartModal, setShowCartModal] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [calendarType, setCalendarType] = useState('normal');
//   const [paksha, setPaksha] = useState('');
//   const [tithi, setTithi] = useState('');
//   const [day, setDay] = useState('');
//   const [maasa, setMaasa] = useState('');
//   const [inMemoryOf, setInMemoryOf] = useState('');
//   const [month, setMonth] = useState('');
//   const [dateError, setDateError] = useState('');
//   const [panchangaDetails, setPanchangaDetails] = useState(null);
//   const [ssPanchangaDetails, setSsPanchangaDetails] = useState(null);
//   // Add to existing state variables
// const [ritualPanchangaDetails, setRitualPanchangaDetails] = useState(null);
// const [maasaList, setMaasaList] = useState([]);
// const [tithiList, setTithiList] = useState([]);
// const [memoryEntries, setMemoryEntries] = useState([]);



  

//   const entityCode = localStorage.getItem('ENTITY_CODE');
//   const parentSeva = location.state?.sevaType && location.state?.sevaId ? {
//     type: location.state.sevaType,
//     id: location.state.sevaId,
//     name: location.state.sevaName
//   } : null;
//   useEffect(() => {
//     const fetchTithiList = async () => {
//         try {
//             const response = await fetch('http://localhost:2002/tithi');
//             const data = await response.json();
//             setTithiList(data);
//         } catch (error) {
//             console.error('Error fetching tithi list:', error);
//         }
//     };
//     fetchTithiList();
// }, []);
//   useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem('sevaCart') || '[]');
//     setCart(cartData);
//   }, []);
//   useEffect(() => {
//     const fetchMaasaList = async () => {
//         try {
//             const response = await fetch('http://localhost:2002/maasa');
//             const data = await response.json();
//             setMaasaList(data);
//         } catch (error) {
//             console.error('Error fetching maasa list:', error);
//         }
//     };
//     fetchMaasaList();
// }, []);
// useEffect(() => {
//   if (maasa && paksha && tithi) {
//       const pakshaCode = paksha === 'Krishna' ? 'K' : 'S';
//       fetchRitualPanchangaDetails(maasa, pakshaCode, tithi);
//   }
// }, [maasa, paksha, tithi]);



//   useEffect(() => {
//     const fetchDeities = async () => {
//       try {
//         const sevaType = location?.state?.sevaType;
//         const sevaId = location?.state?.sevaId;
        
//         const url = sevaType && sevaId
//           ? `http://localhost:2002/deities1/${entityCode}?sevaType=${sevaType}&sevaId=${sevaId}`
//           : `http://localhost:2002/deities1/${entityCode}`;
  
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch deities');
//         }
  
//         const data = await response.json();
//         setDeities(data);
//         if (data.length > 0) {
//           setActiveDeity(data[0]);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (entityCode) {
//       fetchDeities();
//     }
//   }, [entityCode, location.state]);

//   useEffect(() => {
//     const fetchSevas = async () => {
//       if (!activeDeity) return;
//       try {
//         setLoading(true);
//         const sevaType = location?.state?.sevaType || '';
//         const sevaId = location?.state?.sevaId || '';
        
//         let url = `http://localhost:2002/deities1/${entityCode}/${activeDeity.id}/sevas`;
//         if (sevaType && sevaId) {
//           url += `?sevaType=${encodeURIComponent(sevaType)}&sevaId=${encodeURIComponent(sevaId)}`;
//         }

//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch sevas');
//         const data = await response.json();
//         setSevas(data);
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch sevas error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSevas();
//   }, [entityCode, activeDeity, location?.state]);

//   const showNotificationMessage = (message) => {
//     setNotificationMessage(message);
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   const addNewMemoryEntry = () => {
//     setMemoryEntries([...memoryEntries, { 
//       inMemoryOf: '',
//       calendarType: calendarType,
//       ...(calendarType === 'ritual' ? {
//         maasa: maasa,
//         paksha: paksha,
//         tithi: tithi
//       } : {
//         month: month,
//         day: day
//       })
//     }]);
//   };
  
//   const handleUpdateQuantity = (itemIndex, sevaIndex, newQuantity) => {
//     const newCart = [...cart];
//     const item = newCart[itemIndex];
//     const seva = item.sevas[sevaIndex];
    
//     const oldAmount = seva.amount;
//     const newAmount = (newQuantity * oldAmount) / seva.quantity;
    
//     seva.quantity = newQuantity;
//     seva.amount = newAmount;
//     item.totalAmount = item.sevas.reduce((total, s) => total + s.amount, 0);
    
//     if (newQuantity === 0) {
//       if (item.sevas.length === 1) {
//         newCart.splice(itemIndex, 1);
//       } else {
//         item.sevas.splice(sevaIndex, 1);
//       }
//     }
    
//     setCart(newCart);
//     localStorage.setItem('sevaCart', JSON.stringify(newCart));
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setDate(selectedDate);
//     fetchPanchangaDetails(selectedDate);
// };

//   const handleRemoveSeva = (itemIndex, sevaIndex) => {
//     const newCart = [...cart];
//     const item = newCart[itemIndex];
    
//     if (item.sevas.length === 1) {
//       newCart.splice(itemIndex, 1);
//     } else {
//       const sevaAmount = item.sevas[sevaIndex].amount;
//       item.sevas.splice(sevaIndex, 1);
//       item.totalAmount -= sevaAmount;
//     }
    
//     setCart(newCart);
//     localStorage.setItem('sevaCart', JSON.stringify(newCart));
//     showNotificationMessage('Seva removed from cart');
//   };

//   const handleCheckboxChange = (sevaCode, checked) => {
//     setSelectedPoojas(prev => ({
//       ...prev,
//       [sevaCode]: checked
//     }));
//     if (!checked) {
//       setQuantities(prev => ({
//         ...prev,
//         [sevaCode]: 0
//       }));
//     } else if (!quantities[sevaCode]) {
//       setQuantities(prev => ({
//         ...prev,
//         [sevaCode]: 1
//       }));
//     }
//   };

//   const handleQuantityChange = (sevaCode, value) => {
//     if (value > 0) {
//       setSelectedPoojas(prev => ({
//         ...prev,
//         [sevaCode]: true
//       }));
//     }
//     setQuantities(prev => ({
//       ...prev,
//       [sevaCode]: value,
//     }));
//   };

//   const calculateAmount = (seva) => {
//     return Number(seva.SEVA_AMOUNT) * (quantities[seva.SEVA_CODE] || 0);
//   };

// const fetchRitualPanchangaDetails = async (selectedMaasa, selectedPaksha, selectedTithi) => {
//   if (!selectedMaasa || !selectedPaksha || !selectedTithi) return;
  
//   const currentYear = new Date().getFullYear();
  
//   try {
//       const response = await fetch(`http://localhost:2002/panchanga/ritual/${currentYear}/${selectedMaasa}/${selectedPaksha}/${selectedTithi}`);
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setRitualPanchangaDetails(data);
//   } catch (error) {
//       console.log('Error fetching ritual details:', error);
//   }
// };




//   const fetchSsPanchangaDetails = async (selectedMonth, selectedDay) => {
//     try {
//         const currentYear = new Date().getFullYear();
//         console.log('Making API call with:', currentYear, selectedMonth, selectedDay);
//         const response = await fetch(`http://localhost:2002/panchanga/ss/${currentYear}/${selectedMonth}/${selectedDay}`);
//         const data = await response.json();
//         console.log('Received data:', data);
//         setSsPanchangaDetails(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
// const handleMonthDayChange = () => {
//   if (month && day) {
//     console.log('Fetching for month:', month, 'day:', day);
//       fetchSsPanchangaDetails(month, day);
//   }
// };

// // Add this function to fetch panchanga details
// const fetchPanchangaDetails = async (selectedDate) => {
//   try {
//       const response = await fetch(`http://localhost:2002/panchanga/${selectedDate}`);
//       const data = await response.json();
//       setPanchangaDetails(data);
//   } catch (error) {
//       console.error('Error fetching panchanga details:', error);
//   }
// };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const selectedSevaDetails = sevas
//   //     .filter(seva => selectedPoojas[seva.SEVA_CODE])
//   //     .map(seva => ({
//   //       deityName: activeDeity.name,
//   //       deityId: activeDeity.id,
//   //       sevaCode: seva.SEVA_CODE,
//   //       sevaShashwath: seva.SEVA_SHASHWATH,
//   //       sevaName: seva.SEVA_DESC,
//   //       quantity: quantities[seva.SEVA_CODE] || 0,
//   //       amount: calculateAmount(seva),
//   //       performanceDate: date,
//   //       // Add SS-specific details
//   //       ssDetails: seva.SEVA_SHASHWATH === 'SS' ? {
//   //         calendarType,
//   //         ...(calendarType === 'ritual' ? {
//   //           maasa,
//   //           paksha,
//   //           tithi,
//   //           inMemoryOf
//   //         } : {
//   //           month,
//   //           day,
//   //           inMemoryOf
//   //         })
//   //       } : null,
//   //       parentSeva: parentSeva ? {
//   //         type: parentSeva.type,
//   //         id: parentSeva.id,
//   //         name: parentSeva.name
//   //       } : null
//   //     }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const selectedSevaDetails = sevas
//       .filter(seva => selectedPoojas[seva.SEVA_CODE])
//       .map(seva => {
//         if (seva.SEVA_SHASHWATH === 'SS') {
//           // For SS sevas, create multiple entries based on memoryEntries
//           return memoryEntries.map(entry => ({
//             deityName: activeDeity.name,
//             deityId: activeDeity.id,
//             sevaCode: seva.SEVA_CODE,
//             sevaShashwath: seva.SEVA_SHASHWATH,
//             sevaName: seva.SEVA_DESC,
//             quantity: 1, // Each memory entry gets quantity 1
//             amount: calculateAmount(seva),
//             performanceDate: date,
//             ssDetails: {
//               calendarType: entry.calendarType,
//               ...(entry.calendarType === 'ritual' ? {
//                 maasa: entry.maasa,
//                 paksha: entry.paksha,
//                 tithi: entry.tithi,
//                 inMemoryOf: entry.inMemoryOf
//               } : {
//                 month: entry.month,
//                 day: entry.day,
//                 inMemoryOf: entry.inMemoryOf
//               })
//             },
//             parentSeva: parentSeva
//           }));
//         } else {
//           // For non-SS sevas, keep existing logic
//           return [{
//             deityName: activeDeity.name,
//             deityId: activeDeity.id,
//             sevaCode: seva.SEVA_CODE,
//             sevaShashwath: seva.SEVA_SHASHWATH,
//             sevaName: seva.SEVA_DESC,
//             quantity: quantities[seva.SEVA_CODE] || 0,
//             amount: calculateAmount(seva),
//             performanceDate: date,
//             parentSeva: parentSeva
//           }];
//         }
//       }).flat()

   

//       // const cartItem = {
//       //   deityId: activeDeity.id,
//       //   deityName: activeDeity.name,
//       //   date,
//       //   sevas: selectedSevaDetails,
//       //   prasadDelivery,
//       //   parentSeva,
//       //   totalAmount: selectedSevaDetails.reduce((total, seva) => 
//       //     total + seva.amount, 0) + (prasadDelivery === 'Postal' ? 50 : 0)
//       // };

//       const cartItem = {
//         deityId: activeDeity.id,
//         deityName: activeDeity.name,
//         date,
//         sevas: selectedSevaDetails.map(seva => ({
//           ...seva,
//           sevaShashwath: seva.sevaShashwath,
//           ssDetails: seva.sevaShashwath === 'SS' ? {
//             calendarType,
//             inMemoryOf,
//             ...(calendarType === 'ritual' 
//               ? { maasa, paksha, tithi }
//               : { month, day }
//             )
//           } : null
//         })),
//         prasadDelivery,
//         totalAmount: selectedSevaDetails.reduce((total, seva) => 
//           total + seva.amount, 0) + (prasadDelivery === 'Postal' ? 50 : 0)
//       };
      
    
//       const newCart = [...cart, cartItem];
//       setCart(newCart);
//       localStorage.setItem('sevaCart', JSON.stringify(newCart));

//       const ssSevas = selectedSevaDetails.filter(seva => seva.sevaShashwath === 'SS');
//       if (ssSevas.length > 0) {
//         const existingSsData = JSON.parse(localStorage.getItem('ssSevaDetails') || '[]');
//         const newSsData = [...existingSsData, ...ssSevas];
//         localStorage.setItem('ssSevaDetails', JSON.stringify(newSsData));
//       }
    
//       showNotificationMessage('Sevas added to cart successfully!');
//       setSelectedPoojas({});
//       setQuantities({});
//       setMemoryEntries([]);
//     };

 
//   const navigateToConfirmation = () => {
//     if (cart.length === 0) {
//       showNotificationMessage('Please select at least one seva before proceeding');
//       return;
//     }

//     navigate('/booking/confirmation', {
//       state: {
//         cart,
//         totalAmount: cart.reduce((total, item) => total + item.totalAmount, 0)
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
//         <div className="relative w-16 h-16">
//           <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full animate-ping"></div>
//           <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
//         <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <p className="text-orange-800 font-medium mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white transition-all duration-300">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-orange-800">
//             Pooja Booking
//           </h2>
//           <button
//             onClick={() => setShowCartModal(true)}
//             className="relative p-2 text-orange-600 hover:text-orange-800 transition-colors"
//           >
//             <ShoppingCart size={24} />
//             {cart.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cart.length}
//               </span>
//             )}
//           </button>
//         </div>
//         {showNotification && (
//           <Notification 
//             message={notificationMessage} 
//             onClose={() => setShowNotification(false)} 
//           />
//         )}

//         <CartModal 
//           isOpen={showCartModal}
//           onClose={() => setShowCartModal(false)}
//           cart={cart}
//           onUpdateQuantity={handleUpdateQuantity}
//           onRemoveSeva={handleRemoveSeva}
//         />

//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 pt-6 overflow-x-auto">
//             <div className="flex gap-2 pb-4 scrollbar-hide">
              
//               {deities.map((deity) => (
//   <button
//     key={deity.id}
//     type="button"
//     onClick={() => setActiveDeity(deity)}
//     className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300
//       ${activeDeity?.id === deity.id
//         ? 'bg-orange-800 text-white shadow-lg border-2 border-orange-600'
//         : 'bg-white text-orange-800 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50'
//       }`}
//   >
//     {deity.name}
//   </button>
// ))}
//             </div>
//           </div>

//           {/* <div className="px-6 pt-6">
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Pooja Date
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//               required
//             />
//           </div> */}
       
      
// {/* 
//        {location.state?.sevaShashwath === 'SS' && (
//   <div className="mt-4 space-y-4">
  
    
//     <div>
//       <label className="block text-sm font-medium text-orange-700 mb-2">
//         In Memory Of
//       </label>
//       <input
//         type="text"
//         value={inMemoryOf}
//         onChange={(e) => setInMemoryOf(e.target.value)}
//         placeholder="Enter name"
//         className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//       />
//     </div>
//   </div>
// )} */}

// {/* {location.state?.sevaShashwath === 'SS' && (
//   <div className="px-6 pt-6">
//     <div className="bg-white rounded-lg shadow-sm border border-orange-200">
//       <div className="p-4">
//         <label className="block text-sm font-medium text-orange-700 mb-2">
//           In Memory Of
//         </label>
//         <input
//           type="text"
//           value={inMemoryOf}
//           onChange={(e) => setInMemoryOf(e.target.value)}
//           placeholder="Enter name"
//           className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//         />
//       </div>
//       <div className="px-6 pt-6">
//   {location.state?.sevaShashwath === 'SS' ? (
//     <>
//       <label className="block text-sm font-medium text-orange-700 mb-2">
//         Select Calendar Type
//       </label>
//       <select
//         value={calendarType}
//         onChange={(e) => setCalendarType(e.target.value)}
//         className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//       >
//         <option value="normal">Normal Calendar</option>
//         <option value="ritual">Ritual Calendar</option>
//       </select>


// {calendarType === 'normal' && (
//   <div className="mt-4 space-y-4">
//     <div>
//       <label className="block text-sm font-medium text-orange-700 mb-2">
//         Select Month and Day
//       </label>
//       <div className="flex flex-col gap-4">
//         <select
//           value={month}
//           onChange={(e) => {
//             setMonth(e.target.value);
//             setDay(''); // Reset day when month changes
//             setDateError('');
//           }}
//           className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//           required
//         >
//           <option value="">Select Month</option>
//           <option value="01">January</option>
//           <option value="02">February</option>
//           <option value="03">March</option>
//           <option value="04">April</option>
//           <option value="05">May</option>
//           <option value="06">June</option>
//           <option value="07">July</option>
//           <option value="08">August</option>
//           <option value="09">September</option>
//           <option value="10">October</option>
//           <option value="11">November</option>
//           <option value="12">December</option>
//         </select>

//         {month && (
//           <input
//             type="number"
//             min="1"
//             max={
//               month === '02' ? '29' :
//               ['04', '06', '09', '11'].includes(month) ? '30' : '31'
//             }
//             value={day}
//             onChange={(e) => {
//               const value = e.target.value;
//               const maxDays = month === '02' ? 29 :
//                             ['04', '06', '09', '11'].includes(month) ? 30 : 31;
              
//               if (value > maxDays) {
//                 setDateError(`Selected month has maximum ${maxDays} days`);
//               } else {
//                 setDateError('');
//               }
//               setDay(value);
//             }}
//             placeholder="Enter Day"
//             className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400
//               ${dateError ? 'border-red-300' : 'border-orange-200'}`}
//             required
//           />
//         )}

//         {dateError && (
//           <p className="text-red-500 text-sm">{dateError}</p>
//         )}
//       </div>
//     </div>
    

//   </div>
// )}
//       {calendarType === 'ritual' && (
//         <div className="mt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Maasa
//             </label>
//             <select
//               value={maasa}
//               onChange={(e) => setMaasa(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//             >
//               <option value="">Select Maasa</option>
//               <option value="Chaitra">Chaitra</option>
//               <option value="Vaisakha">Vaisakha</option>
//               <option value="Jyeshtha">Jyeshtha</option>
//               <option value="Ashadha">Ashadha</option>
//               <option value="Shravana">Shravana</option>
//               <option value="Bhadrapada">Bhadrapada</option>
//               <option value="Ashwina">Ashwina</option>
//               <option value="Kartika">Kartika</option>
//               <option value="Margashirsha">Margashirsha</option>
//               <option value="Pushya">Pushya</option>
//               <option value="Magha">Magha</option>
//               <option value="Phalguna">Phalguna</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Paksha
//             </label>
//             <select
//               value={paksha}
//               onChange={(e) => setPaksha(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//             >
//               <option value="">Select Paksha</option>
//               <option value="Shukla">Shukla</option>
//               <option value="Krishna">Krishna</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Tithi
//             </label>
//             <select
//               value={tithi}
//               onChange={(e) => setTithi(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//             >
//               <option value="">Select Tithi</option>
//               <option value="Pratipada">Pratipada</option>
//               <option value="Dwitiya">Dwitiya</option>
//               <option value="Tritiya">Tritiya</option>
//               <option value="Chaturthi">Chaturthi</option>
//               <option value="Panchami">Panchami</option>
//               <option value="Shashthi">Shashthi</option>
//               <option value="Saptami">Saptami</option>
//               <option value="Ashtami">Ashtami</option>
//               <option value="Navami">Navami</option>
//               <option value="Dashami">Dashami</option>
//               <option value="Ekadashi">Ekadashi</option>
//               <option value="Dwadashi">Dwadashi</option>
//               <option value="Trayodashi">Trayodashi</option>
//               <option value="Chaturdashi">Chaturdashi</option>
//               <option value="Purnima">Purnima</option>
//               <option value="Amavasya">Amavasya</option>
//             </select>
//           </div>
//         </div>
//       )}
//     </>
//   ) : (
//     // Original date input for non-SS sevas
//     <>
//       <label className="block text-sm font-medium text-orange-700 mb-2">
//         Select Pooja Date
//       </label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//         required
//       />
//     </>
//   )}
// </div>
      
//     </div>
//   </div>
// )} */}

// {location.state?.sevaShashwath === 'SS' ? (
//   <div className="px-6 pt-6">
//     <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
//       {/* Header Section */}
//       <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
//         <h3 className="text-lg font-semibold text-orange-800">Shashwath Seva Details</h3>
//       </div>
// {/* Form Content */}
//     <div className="p-6 space-y-6">
//         {/* In Memory Of Section */}
//         <div className="bg-orange-50/50 rounded-lg p-4">
//           <label className="block text-sm font-medium text-orange-700 mb-2">
//             In Memory Of
//           </label>
//           <input
//             type="text"
//             value={inMemoryOf}
//             onChange={(e) => setInMemoryOf(e.target.value)}
//             placeholder="Enter name"
//             className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
//           />
//         </div>

//         {/* Calendar Selection Section */}
//         <div>
//           <label className="block text-sm font-medium text-orange-700 mb-2">
//             Select Calendar Type
//           </label>
//           <select
//             value={calendarType}
//             onChange={(e) => setCalendarType(e.target.value)}
//             className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
//           >
//             <option value="normal">Normal Calendar</option>
//             <option value="ritual">Ritual Calendar</option>
//           </select>
//         </div>

       

// {calendarType === 'normal' && (
//   <div className="bg-orange-50/50 rounded-lg p-4 space-y-4">
//     <label className="block text-sm font-medium text-orange-700">
//       Select Month and Day
//     </label>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <select
//           value={month}
//           onChange={(e) => {
//             setMonth(e.target.value);
//             setDay('');
//             setDateError('');
//             if (e.target.value && day) {
//               fetchSsPanchangaDetails(e.target.value, day);
//             }
//           }}
//           className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
//           required
//         >
//           <option value="">Select Month</option>
//           <option value="01">January</option>
//           <option value="02">February</option>
//           <option value="03">March</option>
//           <option value="04">April</option>
//           <option value="05">May</option>
//           <option value="06">June</option>
//           <option value="07">July</option>
//           <option value="08">August</option>
//           <option value="09">September</option>
//           <option value="10">October</option>
//           <option value="11">November</option>
//           <option value="12">December</option>
//         </select>
//       </div>

//       <div>
//         {month && (
//           <input
//             type="number"
//             min="1"
//             max={
//               month === '02' ? '29' :
//               ['04', '06', '09', '11'].includes(month) ? '30' : '31'
//             }
//             value={day}
//             onChange={(e) => {
//               const value = e.target.value;
//               const maxDays = month === '02' ? 29 :
//                             ['04', '06', '09', '11'].includes(month) ? 30 : 31;
              
//               if (value > maxDays) {
//                 setDateError(`Selected month has maximum ${maxDays} days`);
//               } else {
//                 setDateError('');
//                 setDay(value);
//                 if (month && value) {
//                   fetchSsPanchangaDetails(month, value);
//                 }
//               }
//             }}
//             placeholder="Enter Day"
//             className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white
//               ${dateError ? 'border-red-300' : 'border-orange-200'}`}
//             required
//           />
//         )}
//       </div>
//     </div>
//     {dateError && (
//       <p className="text-red-500 text-sm mt-2">{dateError}</p>
//     )}
    
//     {ssPanchangaDetails && (
//       <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
//         <h4 className="text-lg font-semibold text-orange-800 mb-3">Panchanga Details</h4>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {Object.entries(ssPanchangaDetails).map(([key, value]) => (
//             <div key={key}>
//               <label className="text-sm font-medium text-orange-700">{key}</label>
//               <p className="text-orange-600">{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// )}


//         {/* Ritual Calendar Fields */}
//         {calendarType === 'ritual' && (
//           <div className="bg-orange-50/50 rounded-lg p-4 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="mt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Maasa
//             </label>
//             <select
//     value={maasa}
//     onChange={(e) => setMaasa(e.target.value)}
//     className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
// >
//     <option value="">Select Maasa</option>
//     {maasaList.map(item => (
//         <option key={item.RASHI_CODE} value={item.RASHI_CODE}>
//             {item.RASHI_DESC}
//         </option>
//     ))}
// </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Paksha
//             </label>
//             {/* <select
//               value={paksha}
//               onChange={(e) => setPaksha(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//             >
//               <option value="">Select Paksha</option>
//               <option value="Shukla">Shukla</option>
//               <option value="Krishna">Krishna</option>
//             </select> */}
//             {/* // In the paksha select element */}
// <select
//   value={paksha}
//   onChange={(e) => {
//     setPaksha(e.target.value);
//     if (maasa && tithi) {
//       const pakshaCode = e.target.value === 'Krishna' ? 'K' : 'S';
//       fetchRitualPanchangaDetails(maasa, pakshaCode, tithi);
//     }
//   }}
//   className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
// >
//   <option value="">Select Paksha</option>
//   <option value="Krishna">Krishna</option>
//   <option value="Shukla">Shukla</option>
// </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Select Tithi
//             </label>
//             {/*  Replace the existing tithi select options with: */}
// <select
//     value={tithi}
//     onChange={(e) => setTithi(e.target.value)}
//     className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
// >
//     <option value="">Select Tithi</option>
//     {tithiList.map(item => (
//         <option key={item.TITHI_CODE} value={item.TITHI_CODE}>
//             {item.TITHI_DESC}
//         </option>
//     ))}
// </select>
//           </div>
//         </div>
 
// {ritualPanchangaDetails && (
//     <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
//         <h4 className="text-lg font-semibold text-orange-800 mb-3">Selected Date Details</h4>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <div>
//                 <label className="text-sm font-medium text-orange-700">Day</label>
//                 <p className="text-orange-600">{ritualPanchangaDetails.CAL_DAY}</p>
//             </div>
//             <div>
//                 <label className="text-sm font-medium text-orange-700">Date</label>
//                 <p className="text-orange-600">
//                     {new Date(ritualPanchangaDetails.CAL_DATE).toLocaleDateString()}
//                 </p>
//             </div>
//             <div>
//                 <label className="text-sm font-medium text-orange-700">Year</label>
//                 <p className="text-orange-600">{ritualPanchangaDetails.CAL_YEAR}</p>
//             </div>
//         </div>
//     </div>
// )}


//             </div>
//           </div>
//         )}
//         {location.state?.sevaShashwath === 'SS' && (
//   <div className="px-6 pt-4">
//     <button
//       type="button"
//       onClick={addNewMemoryEntry}
//       className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
//     >
//       + Add Another In Memory Of
//     </button>
    
//     {memoryEntries.map((entry, index) => (
//       <div key={index} className="mt-4 p-4 border border-orange-200 rounded-lg">
//         <h4 className="text-orange-800 font-medium mb-3">Additional Memory Entry {index + 1}</h4>
//         <input
//           type="text"
//           value={entry.inMemoryOf}
//           onChange={(e) => {
//             const newEntries = [...memoryEntries];
//             newEntries[index].inMemoryOf = e.target.value;
//             setMemoryEntries(newEntries);
//           }}
//           placeholder="Enter name"
//           className="w-full px-4 py-2.5 border border-orange-200 rounded-lg mb-4"
//         />
//         {/* Add calendar type selection and other fields similar to the main form */}
//       </div>
//     ))}
//   </div>
// )}
//       </div>
//     </div>
//   </div>
// ) : (
//   // Non-SS date input section with matching styling
//   <div className="px-6 pt-6">
//     <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
//       <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
//         <h3 className="text-lg font-semibold text-orange-800">Select Performance Date</h3>
//       </div>
//       <div className="p-6">
//           <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
//     <label className="block text-sm font-medium text-orange-700 mb-2">
//         Select Pooja Date
//     </label>
//     <input
//         type="date"
//         value={date}
//         onChange={handleDateChange}
//         className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//         required
//     />
//           {panchangaDetails && (
//         <div className="mt-4 bg-orange-50/50 rounded-lg p-4">
//             <h4 className="text-lg font-semibold text-orange-800 mb-3">Panchanga Details</h4>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Ayana</label>
//                     <p className="text-orange-600">{panchangaDetails.AAYANA}</p>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Paksha</label>
//                     <p className="text-orange-600">{panchangaDetails.PAKSHA}</p>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Tithi</label>
//                     <p className="text-orange-600">{panchangaDetails.TITHI}</p>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Maasa</label>
//                     <p className="text-orange-600">{panchangaDetails.MAASA}</p>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Nakshatra</label>
//                     <p className="text-orange-600">{panchangaDetails.NAKSHATRA}</p>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-orange-700">Day</label>
//                     <p className="text-orange-600">{panchangaDetails.DAY}</p>
//                 </div>
//             </div>
//         </div>
//     )}
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//           <div className="px-6 pt-6 overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-orange-50">
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700 rounded-l-lg">Select</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Pooja Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Pooja Rate</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Quantity</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700 rounded-r-lg">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-orange-100">
//                 {sevas.map((seva) => (
//                   <tr key={seva.SEVA_CODE} className="group hover:bg-orange-50 transition-colors duration-300">
//                     <td className="px-4 py-3">
//                       <input
//                         type="checkbox"
//                         checked={selectedPoojas[seva.SEVA_CODE] || false}
//                         onChange={(e) => handleCheckboxChange(seva.SEVA_CODE, e.target.checked)}
//                         className="w-4 h-4 text-orange-600 rounded border-orange-300 focus:ring-orange-500 transition-colors"
//                       />
//                     </td>
//                     <td className="px-4 py-3 text-orange-700">{seva.SEVA_DESC}</td>
//                     <td className="px-4 py-3 text-orange-700">₹{Number(seva.SEVA_AMOUNT).toFixed(2)}</td>
//                     <td className="px-4 py-3">
//                       <input
//                         type="number"
//                         value={quantities[seva.SEVA_CODE] || 0}
//                         onChange={(e) => handleQuantityChange(seva.SEVA_CODE, parseInt(e.target.value))}
//                         className="w-24 px-3 py-1.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-orange-50 disabled:text-orange-500"
//                         min="0"
//                         disabled={!selectedPoojas[seva.SEVA_CODE]}
//                       />
//                     </td>
//                     <td className="px-4 py-3 font-medium text-orange-700">
//                       ₹{calculateAmount(seva).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className="bg-orange-50">
//                 <tr>
//                   <td colSpan="4" className="px-4 py-3 text-right font-medium text-orange-700">
//                     Total Amount:
//                   </td>
//                   <td className="px-4 py-3 font-medium text-orange-900">
//                     ₹{sevas.reduce((total, seva) => total + calculateAmount(seva), 0).toFixed(2)}
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//             <div className="px-6 pt-4">
//   <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
//     <div className="flex items-center">
//       <ShoppingCart className="text-orange-500 mr-3" size={24} />
//       <p className="text-orange-700 font-medium">
//         Please click "Add to Cart" after selecting your sevas to proceed with the booking
//       </p>
//     </div>
//   </div>
// </div>
//           </div>

//           <div className="px-6 pt-6">
//             <label className="block text-sm font-medium text-orange-700 mb-2">
//               Prasad Delivery Mode
//             </label>
//             <select
//               value={prasadDelivery}
//               onChange={(e) => setPrasadDelivery(e.target.value)}
//               className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
//             >
//               <option value="Personally">Personally</option>
//               <option value="Postal">Postal</option>
//             </select>
//           </div>

//           {prasadDelivery === 'Postal' && (
//             <div className="px-6 pt-4">
//               <p className="text-orange-600 bg-orange-50 px-4 py-2 rounded-lg text-sm">
//                 Additional ₹50 will be charged for postal delivery.
//               </p>
//             </div>
//           )}

//           <div className="px-6 py-6 mt-6 bg-orange-50 flex flex-col sm:flex-row gap-3">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="px-6 py-2.5 rounded-lg font-medium text-orange-700 bg-white border border-orange-200 
//                      hover:bg-orange-50 hover:border-orange-300 transition-all shadow-sm"
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2.5 rounded-lg font-medium text-white bg-orange-600 
//                      hover:bg-orange-700 transition-all shadow-md"
//             >
//               Add to Cart
//             </button>
//             <button
//               type="button"
//               onClick={navigateToConfirmation}
//               className="px-6 py-2.5 rounded-lg font-medium text-white 
//                      bg-orange-700 hover:bg-orange-800 
//                      transition-all shadow-md"
//             >
//               Review All Sevas
//             </button>
//           </div>
//         </form>
//       </div>
//         <style jsx="true">{`
//           @keyframes slide-in {
//             from {
//               transform: translateX(100%);
//               opacity: 0;
//             }
//             to {
//               transform: translateX(0);
//               opacity: 1;
//             }
//           }

//           .animate-slide-in {
//             animation: slide-in 0.3s ease-out;
//           }

//           .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }

//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>
//       </div>
//   );
// };

// export default SubSevaSelection;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Calendar, ShoppingCart } from 'lucide-react';

const isShashwathSevaSelected = () => {
  return sevas.some(seva => 
    selectedPoojas[seva.SEVA_CODE] && seva.SEVA_SHASHWATH === 'SS'
  );
};

const Notification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md animate-slide-in z-50">
    <div className="flex items-center justify-between">
      <p className="text-gray-700">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
        <X size={18} />
      </button>
    </div>
  </div>
);

// const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveSeva }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div className="bg-white w-full max-w-md h-full overflow-y-auto">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-orange-800">Shopping Cart</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-4">
//           {cart.length === 0 ? (
//             <p className="text-gray-500 text-center py-4">Your cart is empty</p>
//           ) : (
//             <>
//               {cart.map((item, itemIndex) => (
//                 <div key={itemIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-medium text-orange-700">{item.deityName}</h3>
//                     <div className="flex items-center text-orange-600 text-sm">
//                       <Calendar size={14} className="mr-1" />
//                       {new Date(item.date).toLocaleDateString('en-IN', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       })}
//                     </div>
                       

//                   </div>

//                   {item.sevas.map((seva, sevaIndex) => (
//                     <div key={sevaIndex} className="flex items-center justify-between py-2">
//                       <div className="flex-1">
//                         <p className="text-sm text-orange-600">{seva.sevaName}</p>
//                         <div className="flex items-center mt-1">
//                           <button 
//                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, Math.max(0, seva.quantity - 1))}
//                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-l"
//                           >
//                             -
//                           </button>
//                           <span className="w-12 h-8 flex items-center justify-center border-t border-b border-orange-200">
//                             {seva.quantity}
//                           </span>
//                           <button 
//                             onClick={() => onUpdateQuantity(itemIndex, sevaIndex, seva.quantity + 1)}
//                             className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-r"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span className="text-sm font-medium">₹{seva.amount}</span>
//                         <button 
//                           onClick={() => onRemoveSeva(itemIndex, sevaIndex)}
//                           className="text-red-400 hover:text-red-600"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                   <div className="mt-2 text-sm text-orange-500">
//                     Prasad Delivery: {item.prasadDelivery}
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-orange-700">Total Amount:</span>
//                   <span className="font-medium text-orange-900">
//                     ₹{cart.reduce((total, item) => total + item.totalAmount, 0)}
//                   </span>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
const CartModal = ({  isOpen, onClose, cart, onUpdateQuantity, onRemoveSeva, maasaList, tithiList }) => {
  if (!isOpen) return null;

  const formatCartDate = (item) => {
    const ssSeva = item.sevas.find(seva => seva.sevaShashwath === 'SS');
    
    if (ssSeva?.ssDetails) {
      if (ssSeva.ssDetails.calendarType === 'ritual') {
        // Get the RASHI_DESC from maasaList
        const maasaDesc = maasaList.find(m => m.RASHI_CODE === ssSeva.ssDetails.maasa)?.RASHI_DESC;
        // Get TITHI_DESC from tithiList
        const tithiDesc = tithiList.find(t => t.TITHI_CODE === ssSeva.ssDetails.tithi)?.TITHI_DESC;
        return `${maasaDesc} ${ssSeva.ssDetails.paksha} ${tithiDesc}`;
      }
      // Normal calendar format remains same
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${monthNames[parseInt(ssSeva.ssDetails.month) - 1]} ${ssSeva.ssDetails.day}`;
    }
    
    return new Date(item.date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-orange-800">Sevas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <ShoppingCart size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-orange-700">{item.deityName}</h3>
                    <div className="flex items-center text-orange-600 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {formatCartDate(item)}
                    </div>
                  </div>

                  {item.sevas.map((seva, sevaIndex) => (
                    <div key={sevaIndex} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <p className="text-sm text-orange-600">{seva.sevaName}</p>
                        {/* {seva.sevaShashwath === 'SS' && seva.ssDetails?.inMemoryOf && (
                          <p className="text-xs text-gray-500 mt-1">
                            In memory of: {seva.ssDetails.inMemoryOf}
                          </p>
                        )} */}
                         {seva.sevaShashwath === 'SS' && (
        <div className="mt-2 text-xs text-gray-600">
          <p>In Memory Of: {seva.ssDetails?.inMemoryOf}</p>
        </div>
      )}
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => onUpdateQuantity(itemIndex, sevaIndex, Math.max(0, seva.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-l"
                          >
                            -
                          </button>
                          <span className="w-12 h-8 flex items-center justify-center border-t border-b border-orange-200">
                            {seva.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(itemIndex, sevaIndex, seva.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-orange-600 border border-orange-200 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">₹{seva.amount}</span>
                        <button 
                          onClick={() => onRemoveSeva(itemIndex, sevaIndex)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-2 text-sm text-orange-500">
                    Prasad Delivery: {item.prasadDelivery}
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-orange-700">Total Amount:</span>
                  <span className="font-medium text-orange-900">
                    ₹{cart.reduce((total, item) => total + item.totalAmount, 0)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const SubSevaSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deities, setDeities] = useState([]);
  const [sevas, setSevas] = useState([]);
  const [activeDeity, setActiveDeity] = useState(null);
  const [date, setDate] = useState('');
  const [quantities, setQuantities] = useState({});
  const [selectedPoojas, setSelectedPoojas] = useState({});
  const [prasadDelivery, setPrasadDelivery] = useState('Personally');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [calendarType, setCalendarType] = useState('normal');
  const [paksha, setPaksha] = useState('');
  const [tithi, setTithi] = useState('');
  const [day, setDay] = useState('');
  const [maasa, setMaasa] = useState('');
  const [inMemoryOf, setInMemoryOf] = useState('');
  const [month, setMonth] = useState('');
  const [dateError, setDateError] = useState('');
  const [panchangaDetails, setPanchangaDetails] = useState(null);
  const [ssPanchangaDetails, setSsPanchangaDetails] = useState(null);
  // Add to existing state variables
const [ritualPanchangaDetails, setRitualPanchangaDetails] = useState(null);
const [maasaList, setMaasaList] = useState([]);
const [tithiList, setTithiList] = useState([]);
const [memoryEntries, setMemoryEntries] = useState([]);
  const [permissions, setPermissions] = useState([]);





  

  const entityCode = localStorage.getItem('ENTITY_CODE');
  const parentSeva = location.state?.sevaType && location.state?.sevaId ? {
    type: location.state.sevaType,
    id: location.state.sevaId,
    name: location.state.sevaName
  } : null;
  useEffect(() => {
    const fetchTithiList = async () => {
        try {
            const response = await fetch('http://localhost:2002/tithi');
            const data = await response.json();
            setTithiList(data);
        } catch (error) {
            console.error('Error fetching tithi list:', error);
        }
    };
    fetchTithiList();
}, []);
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('sevaCart') || '[]');
    setCart(cartData);
  }, []);
  useEffect(() => {
    const fetchMaasaList = async () => {
        try {
            const response = await fetch('http://localhost:2002/maasa');
            const data = await response.json();
            setMaasaList(data);
        } catch (error) {
            console.error('Error fetching maasa list:', error);
        }
    };
    fetchMaasaList();
}, []);
useEffect(() => {
  if (maasa && paksha && tithi) {
      const pakshaCode = paksha === 'Krishna' ? 'K' : 'S';
      fetchRitualPanchangaDetails(maasa, pakshaCode, tithi);
  }
}, [maasa, paksha, tithi]);



  useEffect(() => {
    const fetchDeities = async () => {
      try {
        const sevaType = location?.state?.sevaType;
        const sevaId = location?.state?.sevaId;
        
        const url = sevaType && sevaId
          ? `http://localhost:2002/deities1/${entityCode}?sevaType=${sevaType}&sevaId=${sevaId}`
          : `http://localhost:2002/deities1/${entityCode}`;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch deities');
        }
  
        const data = await response.json();
        setDeities(data);
        if (data.length > 0) {
          setActiveDeity(data[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (entityCode) {
      fetchDeities();
    }
  }, [entityCode, location.state]);

  useEffect(() => {
    const fetchSevas = async () => {
      if (!activeDeity) return;
      try {
        setLoading(true);
        const sevaType = location?.state?.sevaType || '';
        const sevaId = location?.state?.sevaId || '';
        
        let url = `http://localhost:2002/deities1/${entityCode}/${activeDeity.id}/sevas`;
        if (sevaType && sevaId) {
          url += `?sevaType=${encodeURIComponent(sevaType)}&sevaId=${encodeURIComponent(sevaId)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch sevas');
        const data = await response.json();
        setSevas(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch sevas error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSevas();
  }, [entityCode, activeDeity, location?.state]);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addNewMemoryEntry = () => {
    setMemoryEntries([...memoryEntries, { 
      inMemoryOf: '',
      calendarType: calendarType,
      ...(calendarType === 'ritual' ? {
        maasa: maasa,
        paksha: paksha,
        tithi: tithi
      } : {
        month: month,
        day: day
      })
    }]);
  };
  
  const handleUpdateQuantity = (itemIndex, sevaIndex, newQuantity) => {
    const newCart = [...cart];
    const item = newCart[itemIndex];
    const seva = item.sevas[sevaIndex];
    
    const oldAmount = seva.amount;
    const newAmount = (newQuantity * oldAmount) / seva.quantity;
    
    seva.quantity = newQuantity;
    seva.amount = newAmount;
    item.totalAmount = item.sevas.reduce((total, s) => total + s.amount, 0);
    
    if (newQuantity === 0) {
      if (item.sevas.length === 1) {
        newCart.splice(itemIndex, 1);
      } else {
        item.sevas.splice(sevaIndex, 1);
      }
    }
    
    setCart(newCart);
    localStorage.setItem('sevaCart', JSON.stringify(newCart));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchPanchangaDetails(selectedDate);
};

  const handleRemoveSeva = (itemIndex, sevaIndex) => {
    const newCart = [...cart];
    const item = newCart[itemIndex];
    
    if (item.sevas.length === 1) {
      newCart.splice(itemIndex, 1);
    } else {
      const sevaAmount = item.sevas[sevaIndex].amount;
      item.sevas.splice(sevaIndex, 1);
      item.totalAmount -= sevaAmount;
    }
    
    setCart(newCart);
    localStorage.setItem('sevaCart', JSON.stringify(newCart));
    showNotificationMessage('Seva removed from cart');
  };

  const handleCheckboxChange = (sevaCode, checked) => {
    setSelectedPoojas(prev => ({
      ...prev,
      [sevaCode]: checked
    }));
    if (!checked) {
      setQuantities(prev => ({
        ...prev,
        [sevaCode]: 0
      }));
    } else if (!quantities[sevaCode]) {
      setQuantities(prev => ({
        ...prev,
        [sevaCode]: 1
      }));
    }
  };

  const handleQuantityChange = (sevaCode, value) => {
    if (value > 0) {
      setSelectedPoojas(prev => ({
        ...prev,
        [sevaCode]: true
      }));
    }
    setQuantities(prev => ({
      ...prev,
      [sevaCode]: value,
    }));
  };

  const calculateAmount = (seva) => {
    return Number(seva.SEVA_AMOUNT) * (quantities[seva.SEVA_CODE] || 0);
  };

const fetchRitualPanchangaDetails = async (selectedMaasa, selectedPaksha, selectedTithi) => {
  if (!selectedMaasa || !selectedPaksha || !selectedTithi) return;
  
  const currentYear = new Date().getFullYear();
  
  try {
      const response = await fetch(`http://localhost:2002/panchanga/ritual/${currentYear}/${selectedMaasa}/${selectedPaksha}/${selectedTithi}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRitualPanchangaDetails(data);
  } catch (error) {
      console.log('Error fetching ritual details:', error);
  }
};




  const fetchSsPanchangaDetails = async (selectedMonth, selectedDay) => {
    try {
        const currentYear = new Date().getFullYear();
        console.log('Making API call with:', currentYear, selectedMonth, selectedDay);
        const response = await fetch(`http://localhost:2002/panchanga/ss/${currentYear}/${selectedMonth}/${selectedDay}`);
        const data = await response.json();
        console.log('Received data:', data);
        setSsPanchangaDetails(data);
    } catch (error) {
        console.error('Error:', error);
    }
};
const handleMonthDayChange = () => {
  if (month && day) {
    console.log('Fetching for month:', month, 'day:', day);
      fetchSsPanchangaDetails(month, day);
  }
};

// Add this function to fetch panchanga details
const fetchPanchangaDetails = async (selectedDate) => {
  try {
      const response = await fetch(`http://localhost:2002/panchanga/${selectedDate}`);
      const data = await response.json();
      setPanchangaDetails(data);
  } catch (error) {
      console.error('Error fetching panchanga details:', error);
  }
};
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const selectedSevaDetails = sevas
  //     .filter(seva => selectedPoojas[seva.SEVA_CODE])
  //     .map(seva => ({
  //       deityName: activeDeity.name,
  //       deityId: activeDeity.id,
  //       sevaCode: seva.SEVA_CODE,
  //       sevaShashwath: seva.SEVA_SHASHWATH,
  //       sevaName: seva.SEVA_DESC,
  //       quantity: quantities[seva.SEVA_CODE] || 0,
  //       amount: calculateAmount(seva),
  //       performanceDate: date,
  //       // Add SS-specific details
  //       ssDetails: seva.SEVA_SHASHWATH === 'SS' ? {
  //         calendarType,
  //         ...(calendarType === 'ritual' ? {
  //           maasa,
  //           maasaDesc: maasaList.find(m => m.RASHI_CODE === maasa)?.RASHI_DESC,
  //           paksha,
  //           tithi,
  //           tithiDesc: tithiList.find(t => t.TITHI_CODE === tithi)?.TITHI_DESC,
  //           inMemoryOf
  //         } : {
  //           month,
  //           day,
  //           inMemoryOf
  //         })
  //       } : null,
  //       parentSeva: parentSeva ? {
  //         type: parentSeva.type,
  //         id: parentSeva.id,
  //         name: parentSeva.name
  //       } : null
  //     }));

  

   

 
  //     const cartItem = {
  //       deityId: activeDeity.id,
  //       deityName: activeDeity.name,
  //       date,
  //       sevas: selectedSevaDetails.map(seva => ({
  //         ...seva,
  //         sevaShashwath: seva.sevaShashwath,
  //         ssDetails: seva.sevaShashwath === 'SS' ? {
  //           calendarType,
  //           inMemoryOf,
  //           ...(calendarType === 'ritual' 
  //             ? { maasa, paksha, tithi }
  //             : { month, day }
  //           )
  //         } : null
  //       })),
  //       prasadDelivery,
  //       totalAmount: selectedSevaDetails.reduce((total, seva) => 
  //         total + seva.amount, 0) + (prasadDelivery === 'Postal' ? 50 : 0)
  //     };
      
    
  //     const newCart = [...cart, cartItem];
  //     setCart(newCart);
  //     localStorage.setItem('sevaCart', JSON.stringify(newCart));

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const selectedSevaDetails = sevas
    //   .filter(seva => selectedPoojas[seva.SEVA_CODE])
    //   .map(seva => {
    //     const baseDetails = {
    //       deityName: activeDeity.name,
    //       deityId: activeDeity.id,
    //       sevaCode: seva.SEVA_CODE,
    //       // Update this line to map 'S' to 'O' for special sevas
    //       sevaShashwath: seva.SEVA_SHASHWATH === 'S' ? 'O' : seva.SEVA_SHASHWATH,
    //       sevaName: seva.SEVA_DESC,
    //       quantity: quantities[seva.SEVA_CODE] || 0,
    //       amount: calculateAmount(seva)
    //     };
  
    //     if (seva.SEVA_SHASHWATH === 'SS') {
    //       const performanceDate = calendarType === 'ritual' 
    //         ? `${maasaList.find(m => m.RASHI_CODE === maasa)?.RASHI_DESC} ${paksha} ${tithiList.find(t => t.TITHI_CODE === tithi)?.TITHI_DESC}`
    //         : `${month}/${day}`;
  
    //       return {
    //         ...baseDetails,
    //         performanceDate,
    //         ssDetails: {
    //           calendarType,
    //           inMemoryOf,
    //           ...(calendarType === 'ritual' 
    //             ? { maasa, paksha, tithi }
    //             : { month, day }
    //           )
    //         }
    //       };
    //     }
  
    //     return {
    //       ...baseDetails,
    //       performanceDate: date
    //     };
    //   });
    e.preventDefault();
    const selectedSevaDetails = sevas
      .filter(seva => selectedPoojas[seva.SEVA_CODE])
      .map(seva => {
        const baseDetails = {
          deityName: activeDeity.name,
          deityId: activeDeity.id,
          sevaCode: seva.SEVA_CODE,
          sevaShashwath: seva.SEVA_SHASHWATH === 'S' ? 'O' : seva.SEVA_SHASHWATH,
          sevaName: seva.SEVA_DESC,
          quantity: quantities[seva.SEVA_CODE] || 0,
          amount: calculateAmount(seva)
        };

        if (seva.SEVA_SHASHWATH === 'SS') {
          const ssDetails = calendarType === 'ritual' 
            ? {
                calendarType,
                inMemoryOf,
                maasa,
                paksha,
                tithi
              }
            : {
                calendarType,
                inMemoryOf,
                month,
                day
              };

          return {
            ...baseDetails,
            performanceDate: calendarType === 'ritual' 
              ? `${maasaList.find(m => m.RASHI_CODE === maasa)?.RASHI_DESC} ${paksha} ${tithiList.find(t => t.TITHI_CODE === tithi)?.TITHI_DESC}`
              : `${month}/${day}`,
            ssDetails
          };
        }

        return {
          ...baseDetails,
          performanceDate: date
        };
      });
    // const cartItem = {
    //   deityId: activeDeity.id,
    //   deityName: activeDeity.name,
    //   date,
    //   sevas: selectedSevaDetails,
    //   prasadDelivery,
    //   totalAmount: selectedSevaDetails.reduce((total, seva) => 
    //     total + seva.amount, 0) + (prasadDelivery === 'Postal' ? 50 : 0)
    // };

    
    
  
    // const newCart = [...cart, cartItem];
    // setCart(newCart);
    // localStorage.setItem('sevaCart', JSON.stringify(newCart));

    const hasSSeva = selectedSevaDetails.some(seva => seva.sevaShashwath === 'SS');

    const cartItem = {
      deityId: activeDeity.id,
      deityName: activeDeity.name,
      date: hasSSeva 
        ? (calendarType === 'ritual'
          ? `${maasaList.find(m => m.RASHI_CODE === maasa)?.RASHI_DESC} ${paksha} ${tithiList.find(t => t.TITHI_CODE === tithi)?.TITHI_DESC}`
          : `${month}/${day}`)
        : date,
      sevas: selectedSevaDetails,
      prasadDelivery,
      totalAmount: selectedSevaDetails.reduce((total, seva) => 
        total + seva.amount, 0) + (prasadDelivery === 'Postal' ? 50 : 0)
    };
  
    const newCart = [...cart, cartItem];
    setCart(newCart);
    localStorage.setItem('sevaCart', JSON.stringify(newCart));

      const ssSevas = selectedSevaDetails.filter(seva => seva.sevaShashwath === 'SS');
      if (ssSevas.length > 0) {
        const existingSsData = JSON.parse(localStorage.getItem('ssSevaDetails') || '[]');
        const newSsData = [...existingSsData, ...ssSevas];
        localStorage.setItem('ssSevaDetails', JSON.stringify(newSsData));
      }
    
      showNotificationMessage('Sevas added to cart successfully!');
      setSelectedPoojas({});
      setQuantities({});
      setMemoryEntries([]);
    };

 
  const navigateToConfirmation = () => {
    if (cart.length === 0) {
      showNotificationMessage('Please select at least one seva before proceeding');
      return;
    }

    navigate('/booking/confirmation', {
      state: {
        cart,
        totalAmount: cart.reduce((total, item) => total + item.totalAmount, 0)
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-orange-800 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white transition-all duration-300">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-orange-800">
            Pooja Booking
          </h2>
          <button
            onClick={() => setShowCartModal(true)}
            className="relative p-2 text-orange-600 hover:text-orange-800 transition-colors"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        {showNotification && (
          <Notification 
            message={notificationMessage} 
            onClose={() => setShowNotification(false)} 
          />
        )}

        <CartModal 
          // isOpen={showCartModal}
          // onClose={() => setShowCartModal(false)}
          // cart={cart}
          // onUpdateQuantity={handleUpdateQuantity}
          // onRemoveSeva={handleRemoveSeva}
          isOpen={showCartModal}
          onClose={() => setShowCartModal(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveSeva={handleRemoveSeva}
          maasaList={maasaList}
          tithiList={tithiList}
        />

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 pt-6 overflow-x-auto">
            <div className="flex gap-2 pb-4 scrollbar-hide">
              
              {deities.map((deity) => (
  <button
    key={deity.id}
    type="button"
    onClick={() => setActiveDeity(deity)}
    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300
      ${activeDeity?.id === deity.id
        ? 'bg-orange-800 text-white shadow-lg border-2 border-orange-600'
        : 'bg-white text-orange-800 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50'
      }`}
  >
    {deity.name}
  </button>
))}
            </div>
          </div>

       

{location.state?.sevaShashwath === 'SS' ? (
  <div className="px-6 pt-6">
    <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800">Shashwath Seva Details</h3>
      </div>
{/* Form Content */}
    <div className="p-6 space-y-6">
        {/* In Memory Of Section */}
        <div className="bg-orange-50/50 rounded-lg p-4">
          <label className="block text-sm font-medium text-orange-700 mb-2">
            In Memory Of
          </label>
          <input
            type="text"
            value={inMemoryOf}
            onChange={(e) => setInMemoryOf(e.target.value)}
            placeholder="Enter name"
            className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
          />
        </div>

        {/* Calendar Selection Section */}
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-2">
            Select Calendar Type
          </label>
          <select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value)}
            className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
          >
            <option value="normal">Normal Calendar</option>
            <option value="ritual">Ritual Calendar</option>
          </select>
        </div>

       

{calendarType === 'normal' && (
  <div className="bg-orange-50/50 rounded-lg p-4 space-y-4">
    <label className="block text-sm font-medium text-orange-700">
      Select Month and Day
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <select
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setDay('');
            setDateError('');
            if (e.target.value && day) {
              fetchSsPanchangaDetails(e.target.value, day);
            }
          }}
          className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
          required
        >
          <option value="">Select Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div>
        {month && (
          <input
            type="number"
            min="1"
            max={
              month === '02' ? '29' :
              ['04', '06', '09', '11'].includes(month) ? '30' : '31'
            }
            value={day}
            onChange={(e) => {
              const value = e.target.value;
              const maxDays = month === '02' ? 29 :
                            ['04', '06', '09', '11'].includes(month) ? 30 : 31;
              
              if (value > maxDays) {
                setDateError(`Selected month has maximum ${maxDays} days`);
              } else {
                setDateError('');
                setDay(value);
                if (month && value) {
                  fetchSsPanchangaDetails(month, value);
                }
              }
            }}
            placeholder="Enter Day"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white
              ${dateError ? 'border-red-300' : 'border-orange-200'}`}
            required
          />
        )}
      </div>
    </div>
    {dateError && (
      <p className="text-red-500 text-sm mt-2">{dateError}</p>
    )}
    
    {/* {ssPanchangaDetails && (
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-orange-800 mb-3">Panchanga Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(ssPanchangaDetails).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium text-orange-700">{key}</label>
              <p className="text-orange-600">{value}</p>
            </div>
          ))}
        </div>
      </div>
    )} */}

{ssPanchangaDetails && (
  <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
    <h4 className="text-lg font-semibold text-orange-800 mb-3">Panchanga Details</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-orange-700">Ayana</label>
        <p className="text-orange-600">{ssPanchangaDetails.AAYANA}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Paksha</label>
        <p className="text-orange-600">
          {ssPanchangaDetails.PAKSHA === 'S' ? 'Shukla' : 'Krishna'}
        </p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Tithi</label>
        <p className="text-orange-600">{ssPanchangaDetails.TITHI}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Maasa</label>
        <p className="text-orange-600">{ssPanchangaDetails.MAASA}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Nakshatra</label>
        <p className="text-orange-600">{ssPanchangaDetails.NAKSHATRA}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Day</label>
        <p className="text-orange-600">{ssPanchangaDetails.DAY}</p>
      </div>
      <div>
        <label className="text-sm font-medium text-orange-700">Date</label>
        <p className="text-orange-600">
          {new Date(ssPanchangaDetails.CAL_DATE).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
)}
 
  </div>
)}


        {/* Ritual Calendar Fields */}
        {calendarType === 'ritual' && (
          <div className="bg-orange-50/50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              Select Maasa
            </label>
            <select
    value={maasa}
    onChange={(e) => setMaasa(e.target.value)}
    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
>
    <option value="">Select Maasa</option>
    {maasaList.map(item => (
        <option key={item.RASHI_CODE} value={item.RASHI_CODE}>
            {item.RASHI_DESC}
        </option>
    ))}
</select>
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              Select Paksha
            </label>
            {/* <select
              value={paksha}
              onChange={(e) => setPaksha(e.target.value)}
              className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            >
              <option value="">Select Paksha</option>
              <option value="Shukla">Shukla</option>
              <option value="Krishna">Krishna</option>
            </select> */}
            {/* // In the paksha select element */}
<select
  value={paksha}
  onChange={(e) => {
    setPaksha(e.target.value);
    if (maasa && tithi) {
      const pakshaCode = e.target.value === 'Krishna' ? 'K' : 'S';
      fetchRitualPanchangaDetails(maasa, pakshaCode, tithi);
    }
  }}
  className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
>
  <option value="">Select Paksha</option>
  <option value="Krishna">Krishna</option>
  <option value="Shukla">Shukla</option>
</select>
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              Select Tithi
            </label>
            {/*  Replace the existing tithi select options with: */}
<select
    value={tithi}
    onChange={(e) => setTithi(e.target.value)}
    className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
>
    <option value="">Select Tithi</option>
    {tithiList.map(item => (
        <option key={item.TITHI_CODE} value={item.TITHI_CODE}>
            {item.TITHI_DESC}
        </option>
    ))}
</select>
          </div>
        </div>
 
{ritualPanchangaDetails && (
    <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-orange-800 mb-3">Selected Date Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
                <label className="text-sm font-medium text-orange-700">Day</label>
                <p className="text-orange-600">{ritualPanchangaDetails.CAL_DAY}</p>
            </div>
            <div>
                <label className="text-sm font-medium text-orange-700">Date</label>
                <p className="text-orange-600">
                    {new Date(ritualPanchangaDetails.CAL_DATE).toLocaleDateString()}
                </p>
            </div>
            <div>
                <label className="text-sm font-medium text-orange-700">Year</label>
                <p className="text-orange-600">{ritualPanchangaDetails.CAL_YEAR}</p>
            </div>
        </div>
    </div>
)}


            </div>
          </div>
        )}
       </div>
    </div>
  </div>
) : (
  // Non-SS date input section with matching styling
  <div className="px-6 pt-6">
    <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
      <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800">Select Performance Date</h3>
      </div>
      <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
    <label className="block text-sm font-medium text-orange-700 mb-2">
        Select Pooja Date
    </label>
    <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
        required
    />
          {panchangaDetails && (
        <div className="mt-4 bg-orange-50/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">Panchanga Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-medium text-orange-700">Ayana</label>
                    <p className="text-orange-600">{panchangaDetails.AAYANA}</p>
                </div>
                <div>
    <label className="text-sm font-medium text-orange-700">Paksha</label>
    <p className="text-orange-600">
        {panchangaDetails.PAKSHA === 'S' ? 'Shukla' : 'Krishna'}
    </p>
</div>
                <div>
                    <label className="text-sm font-medium text-orange-700">Tithi</label>
                    <p className="text-orange-600">{panchangaDetails.TITHI}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-orange-700">Maasa</label>
                    <p className="text-orange-600">{panchangaDetails.MAASA}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-orange-700">Nakshatra</label>
                    <p className="text-orange-600">{panchangaDetails.NAKSHATRA}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-orange-700">Day</label>
                    <p className="text-orange-600">{panchangaDetails.DAY}</p>
                </div>
                <div>
                <label className="text-sm font-medium text-orange-700">Date</label>
                <p className="text-orange-600">{new Date(panchangaDetails.CAL_DATE).toLocaleDateString()}</p>
            </div>
            </div>
        </div>
    )}
        </div>
      </div>
    </div>
  </div>
)}

          <div className="px-6 pt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700 rounded-l-lg">Select</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Pooja Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Pooja Rate</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-orange-700 rounded-r-lg">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {sevas.map((seva) => (
                  <tr key={seva.SEVA_CODE} className="group hover:bg-orange-50 transition-colors duration-300">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPoojas[seva.SEVA_CODE] || false}
                        onChange={(e) => handleCheckboxChange(seva.SEVA_CODE, e.target.checked)}
                        className="w-4 h-4 text-orange-600 rounded border-orange-300 focus:ring-orange-500 transition-colors"
                      />
                    </td>
                    <td className="px-4 py-3 text-orange-700">{seva.SEVA_DESC}</td>
                    <td className="px-4 py-3 text-orange-700">₹{Number(seva.SEVA_AMOUNT).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={quantities[seva.SEVA_CODE] || 0}
                        onChange={(e) => handleQuantityChange(seva.SEVA_CODE, parseInt(e.target.value))}
                        className="w-24 px-3 py-1.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-orange-50 disabled:text-orange-500"
                        min="0"
                        disabled={!selectedPoojas[seva.SEVA_CODE]}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-orange-700">
                      ₹{calculateAmount(seva).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-orange-50">
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-right font-medium text-orange-700">
                    Total Amount:
                  </td>
                  <td className="px-4 py-3 font-medium text-orange-900">
                    ₹{sevas.reduce((total, seva) => total + calculateAmount(seva), 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="px-6 pt-4">
  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
    <div className="flex items-center">
      <ShoppingCart className="text-orange-500 mr-3" size={24} />
      <p className="text-orange-700 font-medium">
        Please click "Add to Cart" after selecting your sevas to proceed with the booking
      </p>
    </div>
  </div>
</div>
          </div>

          <div className="px-6 pt-6">
            <label className="block text-sm font-medium text-orange-700 mb-2">
              Prasad Delivery Mode
            </label>
            <select
              value={prasadDelivery}
              onChange={(e) => setPrasadDelivery(e.target.value)}
              className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            >
              <option value="Personally">Personally</option>
              <option value="Postal">Postal</option>
            </select>
          </div>

          {prasadDelivery === 'Postal' && (
            <div className="px-6 pt-4">
              <p className="text-orange-600 bg-orange-50 px-4 py-2 rounded-lg text-sm">
                Additional ₹50 will be charged for postal delivery.
              </p>
            </div>
          )}

          <div className="px-6 py-6 mt-6 bg-orange-50 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg font-medium text-orange-700 bg-white border border-orange-200 
                     hover:bg-orange-50 hover:border-orange-300 transition-all shadow-sm"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-orange-600 
                     hover:bg-orange-700 transition-all shadow-md"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={navigateToConfirmation}
              className="px-6 py-2.5 rounded-lg font-medium text-white 
                     bg-orange-700 hover:bg-orange-800 
                     transition-all shadow-md"
            >
              Review All Sevas
            </button>
          </div>
        </form>
      </div>
        <style jsx="true">{`
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
  );
};

export default SubSevaSelection;

















