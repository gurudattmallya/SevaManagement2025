// // import React from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import axios from 'axios';
// // import { useState, useEffect } from 'react';


// // const BookingConfirmation = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const cart = location.state?.cart || [];
// //   const totalAmount = location.state?.totalAmount || 0;
// //   const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
// //   const currentDate = new Date().toLocaleDateString();
// //   const [entityDetails, setEntityDetails] = useState(null);
// //   // Get devotee details from localStorage
// //   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee')) || {
// //     fullName: '',
// //     firstName: '',
// //     middleName: '',
// //     lastName: '',
// //     mobile: '',
// //     email: '',
// //     addressLane1: '',
// //     addressLane2: '',
// //     city: '',
// //     state: '',
// //     pincode: ''
// //   };
// //   // Add these state variables at the top of your component
// // const [paymentMethod, setPaymentMethod] = useState('');
// // const [referenceNumber, setReferenceNumber] = useState('');
// // const [referenceDate, setReferenceDate] = useState('');
// // const userType = localStorage.getItem('userType');

// //   // Group sevas by parent seva and deity
// //   const groupedSevas = cart.reduce((acc, item) => {
// //     const parentSevaName = item.parentSeva ? `${item.parentSeva.name}` : 'Individual Sevas';
// //     if (!acc[parentSevaName]) {
// //       acc[parentSevaName] = {};
// //     }
// //     if (!acc[parentSevaName][item.deityName]) {
// //       acc[parentSevaName][item.deityName] = [];
// //     }
// //     acc[parentSevaName][item.deityName].push(...item.sevas);
// //     return acc;
// //   }, {});

// //   useEffect(() => {
// //     const entityCode = localStorage.getItem('entityCode');
// //     if (entityCode) {
// //       axios.get(`http://localhost:2002/entity/${entityCode}`)
// //         .then(response => setEntityDetails(response.data))
// //         .catch(error => console.error('Error:', error));
// //     }
// //   }, []);


// // // const handleSubmit = async () => {
// // //   const userType = localStorage.getItem('userType');
// // //   const entityCode = localStorage.getItem('entityCode');
// // //   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));

// // //   // Validate payment details for admin users
// // //   if (userType === 'admin') {
// // //     if (!paymentMethod) {
// // //       alert('Please select a payment method');
// // //       return;
// // //     }
// // //     if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
// // //       alert('Please enter reference number and date');
// // //       return;
// // //     }
// // //   }

// // //   const bookingData = {
// // //     devoteeDetails,
// // //     sevas: cart.map(item => ({
// // //       ...item,
// // //       sevas: item.sevas.map(seva => ({
// // //         ...seva,
// // //         sevaShashwath: seva.sevaShashwath || 'O',
// // //         performanceDate: seva.performanceDate || new Date().toISOString(),
// // //         inMemoryOf: seva.ssDetails?.inMemoryOf || null,
// // //         deityId: item.deityId,
// // //         deityName: item.deityName,
// // //         prasadDelivery: item.prasadDelivery
// // //       }))
// // //     })),
// // //     totalAmount,
// // //     bookingDate: new Date().toISOString(),
// // //     paymentDetails: userType === 'admin' ? {
// // //       method: paymentMethod,
// // //       referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
// // //       referenceDate: paymentMethod !== 'C' ? referenceDate : null
// // //     } : null
// // //   };

// // //   try {
// // //     const response = await axios.post(
// // //       `http://localhost:2002/shashwath-seva/${entityCode}/book`,
// // //       bookingData
// // //     );
    
// // //     console.log('All sevas booking successful:', response.data);

// // //     // Clear all related localStorage items
// // //     localStorage.removeItem('sevaCart');
// // //     localStorage.removeItem('ssSevaDetails');
// // //     localStorage.removeItem('selectedSevas');
    
// // //     navigate('/booking/success', { 
// // //       state: { 
// // //         bookingId: response.data.custCode,
// // //         message: 'Your seva booking has been confirmed successfully.',
// // //         sevaTypes: {
// // //           hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
// // //           hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
// // //           hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
// // //         },
// // //         paymentDetails: bookingData.paymentDetails
// // //       }
// // //     });
// // //   } catch (error) {
// // //     console.error('Booking error:', error);
// // //     alert('Failed to process booking. Please try again.');
// // //   }
// // // };

// // const handleSubmit = async () => {
// //   const userType = localStorage.getItem('userType');
// //   const entityCode = localStorage.getItem('entityCode');
// //   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));
// //   const userId = localStorage.getItem('userId');
// //   const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

// //   if (userType === 'admin') {
// //       if (!paymentMethod) {
// //           alert('Please select a payment method');
// //           return;
// //       }
// //       if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
// //           alert('Please enter reference number and date');
// //           return;
// //       }
// //   }

// //   const receiptPaymentData = {
// //       ENTITY_CODE: entityCode,
// //       PAYMENT_TYPE: paymentDetails.method,
// //       CUST_NAME: `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim(),
// //       TRANS_DATE: new Date().toISOString(),
// //       VALUE_DATE: new Date().toISOString(),
// //       REC_AMT: Number(totalAmount),
// //       CLEARING_TYPE: paymentDetails.method !== 'C' ? paymentDetails.method : null,
// //       CLEARING_REF_NUM: paymentDetails.referenceNumber || null,
// //       CLEARING_DATE: paymentDetails.referenceDate || null,
// //       CR_BY: userId,
// //       CR_ON: new Date().toISOString(),
// //       STATUS: 'P'
// //   };

// //   const receiptPaymentDtls = cart.map(item => ({
// //       PAYMENT_TYPE: paymentDetails.method,
// //       SEVA_CODE: item.sevaCode,
// //       SEVA_AMT: Number(item.amount),
// //       SEVA_QTY: Number(item.quantity || 1),
// //       TOT_SEVA_AMT: Number(item.amount * (item.quantity || 1)),
// //       SEVA_DATE: item.performanceDate || new Date().toISOString(),
// //       MAASA: item.ssDetails?.maasaDesc || null,
// //       PAKSHA: item.ssDetails?.paksha || null,
// //       THITHI: item.ssDetails?.tithiDesc || null,
// //       SS_DD: item.ssDetails?.day || null,
// //       SS_MM: item.ssDetails?.month || null
// //   }));

// //   const bookingData = {
// //       devoteeDetails,
// //       sevas: cart.map(item => ({
// //           ...item,
// //           sevas: item.sevas.map(seva => ({
// //               ...seva,
// //               sevaShashwath: seva.sevaShashwath || 'O',
// //               performanceDate: seva.performanceDate || new Date().toISOString(),
// //               inMemoryOf: seva.ssDetails?.inMemoryOf || null,
// //               deityId: item.deityId,
// //               deityName: item.deityName,
// //               prasadDelivery: item.prasadDelivery
// //           }))
// //       })),
// //       totalAmount,
// //       bookingDate: new Date().toISOString(),
// //       paymentDetails: userType === 'admin' ? {
// //           method: paymentMethod,
// //           referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
// //           referenceDate: paymentMethod !== 'C' ? referenceDate : null
// //       } : null
// //   };

// //   try {
// //       // Create receipt payment
// //       const receiptResponse = await axios.post(
// //           `http://localhost:2002/api/receipt-payment`,
// //           {
// //               receiptPayment: receiptPaymentData,
// //               receiptPaymentDtls: receiptPaymentDtls
// //           }
// //       );

// //       // Book sevas
// //       const sevaResponse = await axios.post(
// //           `http://localhost:2002/shashwath-seva/${entityCode}/book`,
// //           {
// //               ...bookingData,
// //               receiptNumber: receiptResponse.data.REC_NUM
// //           }
// //       );

// //       const formattedReceiptNumber = `${receiptResponse.data.ENTITY_CODE}/${receiptResponse.data.FIN_YEAR}/${receiptResponse.data.REC_NUM.toString().padStart(6, '0')}`;

// //       // Clear localStorage
// //       localStorage.removeItem('sevaCart');
// //       localStorage.removeItem('ssSevaDetails');
// //       localStorage.removeItem('selectedSevas');
// //       localStorage.removeItem('paymentDetails');

// //       navigate('/booking/success', { 
// //           state: { 
// //               receiptNumber: formattedReceiptNumber,
// //               bookingId: sevaResponse.data.custCode,
// //               message: 'Seva booking and payment processed successfully',
// //               sevaTypes: {
// //                   hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
// //                   hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
// //                   hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
// //               },
// //               paymentDetails: bookingData.paymentDetails
// //           }
// //       });
// //   } catch (error) {
// //       console.error('Processing error:', error);
// //       alert('Failed to process booking and payment. Please try again.');
// //   }
// // };





// //   // const handlePrint = () => {
// //   //   window.print();
// //   // };

// //   // const formatSevaDate = (seva) => {
// //   //   if (seva.sevaShashwath === 'SS') {
// //   //     if (seva.ssDetails?.calendarType === 'ritual') {
// //   //       return `${seva.ssDetails.maasaDesc} ${seva.ssDetails.paksha} ${seva.ssDetails.tithiDesc}`;
// //   //     }
// //   //     return `${seva.ssDetails.month}/${seva.ssDetails.day}`;
// //   //   }
// //   //   return new Date(seva.performanceDate).toLocaleDateString();
// //   // };

// //   // Add this when payment method changes
// // // const handlePaymentMethodChange = (e) => {
// // //   const method = e.target.value;
// // //   setPaymentMethod(method);
// // //   localStorage.setItem('paymentDetails', JSON.stringify({
// // //     method,
// // //     referenceNumber: referenceNumber,
// // //     referenceDate: referenceDate
// // //   }));
// // // };

// // const handlePaymentMethodChange = (e) => {
// //   const methodMap = {
// //     'C': 'C',    // Cash
// //     'CC': 'R',   // Credit Card
// //     'DC': 'D',   // Debit Card
// //     'UPI': 'U',  // UPI
// //     'NB': 'N'    // Net Banking
// //   };
  
// //   const method = e.target.value;
// //   const mappedMethod = methodMap[method];
// //   setPaymentMethod(method);
// //   localStorage.setItem('paymentDetails', JSON.stringify({
// //     method: mappedMethod,
// //     referenceNumber: referenceNumber,
// //     referenceDate: referenceDate
// //   }));
// // };

// // // Add this when reference details change
// // const handleReferenceNumberChange = (e) => {
// //   const refNum = e.target.value;
// //   setReferenceNumber(refNum);
// //   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
// //   localStorage.setItem('paymentDetails', JSON.stringify({
// //     ...currentPaymentDetails,
// //     referenceNumber: refNum
// //   }));
// // };

// // const handlePrint = () => {
// //   const printWindow = window.open('', '_blank', 'width=800,height=600');
  
// //   const printContent = `
// //     <!DOCTYPE html>
// //     <html>
// //       <head>
// //         <title>Seva Receipt</title>
// //         <style>
// //           @page { 
// //             size: A5 portrait;
// //             margin: 1cm;
// //           }
// //           body {
// //             font-family: monospace;
// //             margin: 0;
// //             padding: 20px;
// //           }
// //           .receipt {
// //             max-width: 148mm;
// //             margin: 0 auto;
// //           }
// //           .header {
// //             text-align: center;
// //             border-bottom: 2px solid black;
// //             padding-bottom: 10px;
// //             margin-bottom: 15px;
// //           }
// //           .details {
// //             display: grid;
// //             grid-template-columns: 1fr 1fr;
// //             gap: 8px;
// //             margin-bottom: 15px;
// //           }
// //           table {
// //             width: 100%;
// //             border-collapse: collapse;
// //             margin: 15px 0;
// //           }
// //           th, td {
// //             padding: 8px;
// //             text-align: left;
// //             border-bottom: 1px solid #ddd;
// //           }
// //           .total {
// //             text-align: right;
// //             font-weight: bold;
// //             margin-top: 10px;
// //           }
// //           .footer {
// //             text-align: center;
// //             margin-top: 30px;
// //             font-size: 12px;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="receipt">
// //           <div class="header">
// //             <h2>${entityDetails?.name || 'Temple Trust'}</h2>
// //             <p>${[entityDetails?.address1, entityDetails?.address2].filter(Boolean).join(', ')}</p>
// //           </div>
          
// //           <div class="details">
// //             <div>Receipt No: ${receiptNumber}</div>
// //             <div style="text-align: right">Date: ${currentDate}</div>
// //           </div>
          
// //           <div class="details">
// //             <div>Name: ${devoteeDetails.firstName} ${devoteeDetails.lastName}</div>
// //             <div>Mobile: ${devoteeDetails.mobile}</div>
// //           </div>
          
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Seva Name</th>
// //                 <th style="text-align: right">Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               ${cart.map(item => `
// //                 <tr>
// //                   <td>${item.sevaName}</td>
// //                   <td style="text-align: right">₹${item.amount?.toFixed(2)}</td>
// //                 </tr>
// //               `).join('')}
// //             </tbody>
// //           </table>
          
// //           <div class="total">
// //             Total Amount: ₹${totalAmount.toFixed(2)}
// //           </div>
          
// //           <div class="footer">
// //             <p>This is a computer generated receipt</p>
// //             <p>🕉 Om Namah Shivaya 🕉</p>
// //           </div>
// //         </div>
// //       </body>
// //     </html>
// //   `;

// //   printWindow.document.write(printContent);
// //   printWindow.document.close();
// //   printWindow.focus();
  
// //   setTimeout(() => {
// //     printWindow.print();
// //     printWindow.close();
// //   }, 250);
// // };

// // const handleReferenceDateChange = (e) => {
// //   const refDate = e.target.value;
// //   setReferenceDate(refDate);
// //   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
// //   localStorage.setItem('paymentDetails', JSON.stringify({
// //     ...currentPaymentDetails,
// //     referenceDate: refDate
// //   }));
// // };

// //   const formatSevaDate = (seva) => {
// //     if (seva.sevaShashwath === 'SS') {
// //       if (seva.ssDetails?.calendarType === 'ritual') {
// //         const maasaDesc = seva.ssDetails.maasaDesc || '';
// //         const paksha = seva.ssDetails.paksha === 'S' ? 'Shukla' : 'Krishna';
// //         const tithiDesc = seva.ssDetails.tithiDesc || '';
// //         return `${maasaDesc} ${paksha} ${tithiDesc}`;
// //       }
// //       return `${seva.ssDetails?.month || ''}/${seva.ssDetails?.day || ''}`;
// //     }
// //     return new Date(seva.performanceDate).toLocaleDateString('en-IN');
// //   };
  
  

// //   // Format address for display
// //   const formattedAddress = [
// //     devoteeDetails.addressLane1,
// //     devoteeDetails.addressLane2,
// //   ].filter(Boolean).join(', ');

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Screen View */}
// //         <div>
// //           <h1 className="text-3xl font-bold text-orange-600 mb-6 print:hidden">Booking Confirmation</h1>
          
// //           {/* Temple Header - Visible in both views */}
// //           <div className="text-center mb-6 hidden print:block">
// //             {/* <h1 className="text-3xl font-bold mb-2">Sri Temple Trust</h1>
// //             <p className="text-gray-600">123 Temple Street, Bangalore, Karnataka - 560001</p>
// //             <p className="text-gray-600">Phone: +91 80 1234 5678</p>
// //             <div className="border-b-2 border-gray-800 mt-4"></div> */}
// //             <h1 className="text-3xl font-bold mb-2">{entityDetails?.name || 'Temple Trust'}</h1>
// //   <p className="text-gray-600">
// //     {[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3]
// //       .filter(Boolean)
// //       .join(', ')}
// //   </p>
// //   <p className="text-gray-600">Phone: {entityDetails?.phone}</p>
// //   <div className="border-b-2 border-gray-800 mt-4"></div>
// //           </div>

// //           {/* Receipt Details - Visible in both views */}
// //           <div className="flex justify-between mb-6 print:mt-4">
// //             <div>
// //               <p className="font-bold">Receipt No: {receiptNumber}</p>
// //               <p>Date: {currentDate}</p>
// //             </div>
// //           </div>

// //           {/* Devotee Details */}
// //           <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
// //             <h2 className="text-xl font-semibold mb-4">Devotee Details</h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <p><strong>Name:</strong> {devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
// //                 <p><strong>Mobile:</strong> {devoteeDetails.mobile}</p>
// //                 <p><strong>Email:</strong> {devoteeDetails.email}</p>
// //               </div>
// //               <div>
// //                 <p><strong>Address:</strong> {formattedAddress}</p>
// //                 <p><strong>City:</strong> {devoteeDetails.city}, {devoteeDetails.state}</p>
// //                 <p><strong>Pincode:</strong> {devoteeDetails.pincode}</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Seva Details */}
  
// // <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
// //   <h2 className="text-xl font-semibold mb-4">Selected Sevas</h2>
// //   <table className="w-full border-collapse">
// //     <thead>
// //       <tr className="bg-gray-50">
// //         <th className="border border-gray-300 p-2 text-left">Seva Name</th>
// //         <th className="border border-gray-300 p-2 text-left">Date</th>
// //         <th className="border border-gray-300 p-2 text-left">Quantity</th>
// //         <th className="border border-gray-300 p-2 text-left">Amount</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //     {Object.entries(groupedSevas).map(([parentSeva, deities]) => 
// //   Object.entries(deities).map(([deity, sevas]) => 
// //     sevas.map((seva, index) => {
// //       // Find the corresponding cart item for this seva
// //       const cartItem = cart.find(item => 
// //         item.sevas.some(s => s.sevaCode === seva.sevaCode)
// //       );
      
// //       return (
// //         <tr key={index}>
// //           <td className="border border-gray-300 p-2">{seva.sevaName}</td>
// //           <td className="border border-gray-300 p-2">{cartItem?.date}</td>
// //           <td className="border border-gray-300 p-2">{seva.quantity}</td>
// //           <td className="border border-gray-300 p-2">₹{seva.amount.toFixed(2)}</td>
// //         </tr>
// //       );
// //     })
// //   )
// // )}

// //     </tbody>
// //   </table>
// //   <div className="mt-4 text-right">
// //     <p className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
// //   </div>
// // </div>


// // {/* Action Buttons */}
// // {userType === 'admin' && (
// //   <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-orange-100">
// //     <h2 className="text-xl font-semibold mb-6 text-orange-600 border-b pb-2">Payment Details</h2>
// //     <div className="grid gap-6">
// //       <div>
// //         <label className="block mb-2 text-gray-700 font-medium">Payment Method</label>
// //         <select
// //           className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
// //           onChange={handlePaymentMethodChange}
// //           value={paymentMethod}
// //         >
// //           <option value="">Select Payment Method</option>
// //           <option value="C">Cash</option>
// //           <option value="CC">Credit Card</option>
// //           <option value="DC">Debit Card</option>
// //           <option value="UPI">UPI</option>
// //           <option value="NB">Net Banking</option>
// //         </select>
// //       </div>

// //       {paymentMethod && paymentMethod !== 'C' && (
// //         <div className="grid md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block mb-2 text-gray-700 font-medium">Reference Number</label>
// //             <input
// //               type="text"
// //               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
// //               onChange={handleReferenceNumberChange}
// //               value={referenceNumber}
// //               placeholder="Enter reference number"
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-2 text-gray-700 font-medium">Reference Date</label>
// //             <input
// //               type="date"
// //               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
// //               onChange={handleReferenceDateChange}
// //   value={referenceDate}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   </div>
// // )}
// // <div className="flex flex-col md:flex-row justify-between gap-4 print:hidden mt-8">
// //   <button
// //     type="button"
// //     onClick={() => navigate(-1)}
// //     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
// //   >
// //     Back
// //   </button>
// //   <button
// //     type="button"
// //     onClick={handlePrint}
// //     className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
// //   >
// //     Print Summary
// //   </button>
// //   <button
// //     type="button"
// //     onClick={handleSubmit}
// //     className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
// //   >
// //     Confirm Booking
// //   </button>
// // </div>


// //           {/* Print Footer */}
// //           <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600 hidden print:block">
// //             <p>This is a computer generated receipt and doesn't require signature.</p>
// //             <p>Thank you for your devotion. Om Namah Shivaya 🕉</p>
// //             <p className="mt-4">For any queries, please contact: +91 80 1234 5678 or email: info@temple.com</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingConfirmation;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import ReactDOMServer from 'react-dom/server';






// const BookingConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const cart = location.state?.cart || [];
//   const totalAmount = location.state?.totalAmount || 0;
//   const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
//   const currentDate = new Date().toLocaleDateString();
//   const [entityDetails, setEntityDetails] = useState(null);



//   // Get devotee details from localStorage
//   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee')) || {
//     fullName: '',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     mobile: '',
//     email: '',
//     addressLane1: '',
//     addressLane2: '',
//     city: '',
//     state: '',
//     pincode: ''
//   };
//   // Add these state variables at the top of your component
// const [paymentMethod, setPaymentMethod] = useState('');
// const [referenceNumber, setReferenceNumber] = useState('');
// const [referenceDate, setReferenceDate] = useState('');
// const userType = localStorage.getItem('userType');


//   // Group sevas by parent seva and deity
//   const groupedSevas = cart.reduce((acc, item) => {
//     const parentSevaName = item.parentSeva ? `${item.parentSeva.name}` : 'Individual Sevas';
//     if (!acc[parentSevaName]) {
//       acc[parentSevaName] = {};
//     }
//     if (!acc[parentSevaName][item.deityName]) {
//       acc[parentSevaName][item.deityName] = [];
//     }
//     acc[parentSevaName][item.deityName].push(...item.sevas);
//     return acc;
//   }, {});

//   useEffect(() => {
//     const entityCode = localStorage.getItem('entityCode');
//     if (entityCode) {
//       axios.get(`http://localhost:2002/entity/${entityCode}`)
//         .then(response => setEntityDetails(response.data))
//         .catch(error => console.error('Error:', error));
//     }
//   }, []);


// // const handleSubmit = async () => {
// //   const userType = localStorage.getItem('userType');
// //   const entityCode = localStorage.getItem('entityCode');
// //   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));

// //   // Validate payment details for admin users
// //   if (userType === 'admin') {
// //     if (!paymentMethod) {
// //       alert('Please select a payment method');
// //       return;
// //     }
// //     if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
// //       alert('Please enter reference number and date');
// //       return;
// //     }
// //   }

// //   const bookingData = {
// //     devoteeDetails,
// //     sevas: cart.map(item => ({
// //       ...item,
// //       sevas: item.sevas.map(seva => ({
// //         ...seva,
// //         sevaShashwath: seva.sevaShashwath || 'O',
// //         performanceDate: seva.performanceDate || new Date().toISOString(),
// //         inMemoryOf: seva.ssDetails?.inMemoryOf || null,
// //         deityId: item.deityId,
// //         deityName: item.deityName,
// //         prasadDelivery: item.prasadDelivery
// //       }))
// //     })),
// //     totalAmount,
// //     bookingDate: new Date().toISOString(),
// //     paymentDetails: userType === 'admin' ? {
// //       method: paymentMethod,
// //       referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
// //       referenceDate: paymentMethod !== 'C' ? referenceDate : null
// //     } : null
// //   };

// //   try {
// //     const response = await axios.post(
// //       `http://localhost:2002/shashwath-seva/${entityCode}/book`,
// //       bookingData
// //     );
    
// //     console.log('All sevas booking successful:', response.data);

// //     // Clear all related localStorage items
// //     localStorage.removeItem('sevaCart');
// //     localStorage.removeItem('ssSevaDetails');
// //     localStorage.removeItem('selectedSevas');
    
// //     navigate('/booking/success', { 
// //       state: { 
// //         bookingId: response.data.custCode,
// //         message: 'Your seva booking has been confirmed successfully.',
// //         sevaTypes: {
// //           hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
// //           hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
// //           hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
// //         },
// //         paymentDetails: bookingData.paymentDetails
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Booking error:', error);
// //     alert('Failed to process booking. Please try again.');
// //   }
// // };

// const [nextReceiptNumber, setNextReceiptNumber] = useState('');

// useEffect(() => {
//   const fetchNextReceiptNumber = async () => {
//     const userType = localStorage.getItem('userType');
//     const entityCode = userType === 'admin' ? 
//       localStorage.getItem('entityCode') : 
//       localStorage.getItem('ENTITY_CODE');
      
//     try {
//       const response = await axios.get(`http://localhost:2002/api/receipt-payment/next-number`, {
//         params: {
//           entityCode: entityCode
//         }
//       });
//       const formattedReceiptNumber = `${entityCode}/${response.data.finYear}/${response.data.nextNum.toString().padStart(6, '0')}`;
//       setNextReceiptNumber(formattedReceiptNumber);
//     } catch (error) {
//       console.error('Error fetching next receipt number:', error);
//     }
//   };

//   fetchNextReceiptNumber();
// }, []);



// const handleSubmit = async () => {
//   const userType = localStorage.getItem('userType');
//   const entityCode = userType === 'admin' ? 
//     localStorage.getItem('entityCode') : 
//     localStorage.getItem('ENTITY_CODE');

//   // Set userId with hardcoded value for temple users
//   const userId = userType === 'admin' ? 
//     localStorage.getItem('userId') : 
//     'USER'; // Hardcoded as 'USER' for temple users

//   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));

//   const paymentDetails = userType === 'admin' ? 
//     JSON.parse(localStorage.getItem('paymentDetails')) : 
//     { method: 'C', referenceNumber: null, referenceDate: null };

//   const receiptPaymentData = {
//     ENTITY_CODE: entityCode,
//     PAYMENT_TYPE: paymentDetails.method || 'C',
//     CUST_NAME: `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim(),
//     TRANS_DATE: new Date().toISOString(),
//     VALUE_DATE: new Date().toISOString(),
//     REC_AMT: Number(totalAmount),
//     CLEARING_TYPE: paymentDetails.method !== 'C' ? paymentDetails.method : null,
//     CLEARING_REF_NUM: paymentDetails.referenceNumber || null,
//     CLEARING_DATE: paymentDetails.referenceDate || null,
//     CR_BY: userId,
//     CR_ON: new Date().toISOString(),
//     STATUS: 'P'
//   };

//   const receiptPaymentDtls = cart.map(item => ({
//     PAYMENT_TYPE: paymentDetails.method,
//     SEVA_CODE: item.sevaCode,
//     SEVA_AMT: Number(item.amount),
//     SEVA_QTY: Number(item.quantity || 1),
//     TOT_SEVA_AMT: Number(item.amount * (item.quantity || 1)),
//     SEVA_DATE: item.performanceDate || new Date().toISOString(),
//     MAASA: item.ssDetails?.maasaDesc || null,
//     PAKSHA: item.ssDetails?.paksha || null,
//     THITHI: item.ssDetails?.tithiDesc || null,
//     SS_DD: item.ssDetails?.day || null,
//     SS_MM: item.ssDetails?.month || null
//   }));

//   const bookingData = {
//     devoteeDetails,
//     sevas: cart.map(item => ({
//       ...item,
//       sevas: item.sevas.map(seva => ({
//         ...seva,
//         sevaShashwath: seva.sevaShashwath || 'O',
//         performanceDate: seva.performanceDate || new Date().toISOString(),
//         inMemoryOf: seva.ssDetails?.inMemoryOf || null,
//         deityId: item.deityId,
//         deityName: item.deityName,
//         prasadDelivery: item.prasadDelivery
//       }))
//     })),
//     totalAmount,
//     bookingDate: new Date().toISOString(),
//     paymentDetails
//   };

//   try {
//     const receiptResponse = await axios.post(
//       `http://localhost:2002/api/receipt-payment`,
//       {
//         receiptPayment: receiptPaymentData,
//         receiptPaymentDtls: receiptPaymentDtls
//       }
//     );

//     const sevaResponse = await axios.post(
//       `http://localhost:2002/shashwath-seva/${entityCode}/book`,
//       {
//         ...bookingData,
//         receiptNumber: receiptResponse.data.REC_NUM
//       }
//     );

//     const formattedReceiptNumber = `${receiptResponse.data.ENTITY_CODE}/${receiptResponse.data.FIN_YEAR}/${receiptResponse.data.REC_NUM.toString().padStart(6, '0')}`;

//     // Clear localStorage
//     localStorage.removeItem('sevaCart');
//     localStorage.removeItem('ssSevaDetails');
//     localStorage.removeItem('selectedSevas');
//     localStorage.removeItem('paymentDetails');

//     navigate('/booking/success', { 
//       state: { 
//         receiptNumber: formattedReceiptNumber,
//         bookingId: sevaResponse.data.custCode,
//         message: 'Seva booking and payment processed successfully',
//         sevaTypes: {
//           hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
//           hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
//           hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
//         },
//         paymentDetails
//       }
//     });
//   } catch (error) {
//     console.error('Processing error:', error);
//     alert('Failed to process booking and payment. Please try again.');
//   }
// };




//   // const handlePrint = () => {
//   //   window.print();
//   // };

//   // const formatSevaDate = (seva) => {
//   //   if (seva.sevaShashwath === 'SS') {
//   //     if (seva.ssDetails?.calendarType === 'ritual') {
//   //       return `${seva.ssDetails.maasaDesc} ${seva.ssDetails.paksha} ${seva.ssDetails.tithiDesc}`;
//   //     }
//   //     return `${seva.ssDetails.month}/${seva.ssDetails.day}`;
//   //   }
//   //   return new Date(seva.performanceDate).toLocaleDateString();
//   // };

//   // Add this when payment method changes
// // const handlePaymentMethodChange = (e) => {
// //   const method = e.target.value;
// //   setPaymentMethod(method);
// //   localStorage.setItem('paymentDetails', JSON.stringify({
// //     method,
// //     referenceNumber: referenceNumber,
// //     referenceDate: referenceDate
// //   }));
// // };



// const handlePaymentMethodChange = (e) => {
//   const methodMap = {
//     'C': 'C',    // Cash
//     'CC': 'R',   // Credit Card
//     'DC': 'D',   // Debit Card
//     'UPI': 'U',  // UPI
//     'NB': 'N'    // Net Banking
//   };
  
//   const method = e.target.value;
//   const mappedMethod = methodMap[method];
//   setPaymentMethod(method);
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     method: mappedMethod,
//     referenceNumber: referenceNumber,
//     referenceDate: referenceDate
//   }));
// };
// const fetchData = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (!data) {
//       throw new Error('No data received');
//     }
//     return data;
//   } catch (error) {
//     console.log('Error fetching data:', error);
//     return null;
//   }
// };

// // Replace the qrCode.render() call with:


// // In your component:



// // Add this when reference details change
// const handleReferenceNumberChange = (e) => {
//   const refNum = e.target.value;
//   setReferenceNumber(refNum);
//   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     ...currentPaymentDetails,
//     referenceNumber: refNum
//   }));
// };

// const handlePrint = () => {
//   const printWindow = window.open('', '_blank', 'width=800,height=600');
  
//   const printContent = `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <title>Seva Receipt</title>
//       <style>
//         @page { 
//           size: A5 portrait;
//           margin: 1cm;
//         }
//         body {
//           font-family: 'Arial', sans-serif;
//           margin: 0;
//           padding: 20px;
//           color: #333;
//           background: #fff;
//         }
//         .receipt {
//           max-width: 148mm;
//           margin: 0 auto;
//           border: 2px solid #f97316;
//           border-radius: 8px;
//           padding: 20px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }
//         .header {
//           text-align: center;
//           border-bottom: 2px solid #f97316;
//           padding-bottom: 15px;
//           margin-bottom: 20px;
//         }
//         .header h1 {
//           color: #f97316;
//           margin: 0 0 10px 0;
//           font-size: 24px;
//         }
//         .header p {
//           margin: 5px 0;
//           color: #666;
//         }
//         .receipt-info {
//           display: flex;
//           justify-content: space-between;
//           margin: 15px 0;
//           padding: 10px;
//           background: #fff3e0;
//           border-radius: 4px;
//         }
//         .devotee-details {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 15px;
//           margin: 20px 0;
//           padding: 15px;
//           background: #f9fafb;
//           border-radius: 4px;
//         }
//         .seva-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 20px 0;
//           background: white;
//         }
//         .seva-table th {
//           background: #fff3e0;
//           color: #f97316;
//           padding: 12px;
//           text-align: left;
//           font-weight: 600;
//         }
//         .seva-table td {
//           padding: 10px;
//           border-bottom: 1px solid #eee;
//         }
//         .total-section {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin: 20px 0;
//           padding: 15px;
//           background: #fff3e0;
//           border-radius: 4px;
//         }
//         .qr-section {
//           text-align: center;
//           margin: 20px 0;
//           padding: 15px;
//           background: #f9fafb;
//           border-radius: 4px;
//         }
//         .qr-section img {
//           width: 100px;
//           height: 100px;
//           margin: 10px auto;
//         }
//         .footer {
//           text-align: center;
//           margin-top: 30px;
//           padding-top: 20px;
//           border-top: 1px solid #eee;
//           color: #666;
//         }
//         .om-symbol {
//           font-size: 24px;
//           color: #f97316;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="receipt">
//         <div class="header">
//           <h1>${entityDetails?.name || 'Temple Trust'}</h1>
//           <p>${[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3].filter(Boolean).join(', ')}</p>
//           <p>Phone: ${entityDetails?.phone}</p>
//         </div>

//         <div class="receipt-info">
//           <div>
//             <strong>Receipt No:</strong> ${nextReceiptNumber}
//           </div>
//           <div>
//             <strong>Date:</strong> ${currentDate}
//           </div>
//         </div>

//         <div class="devotee-details">
//           <div>
//             <h3>Devotee Information</h3>
//             <p><strong>Name:</strong> ${devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
//             <p><strong>Mobile:</strong> ${devoteeDetails.mobile}</p>
//             <p><strong>Email:</strong> ${devoteeDetails.email}</p>
//           </div>
//           <div>
//             <h3>Address</h3>
//             <p>${formattedAddress}</p>
//             <p>${devoteeDetails.city}, ${devoteeDetails.state}</p>
//             <p>${devoteeDetails.pincode}</p>
//           </div>
//         </div>

//         <table class="seva-table">
//           <thead>
//             <tr>
//               <th>Seva Name</th>
//               <th>Date</th>
//               <th>Quantity</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${cart.map(item => `
//               <tr>
//                 <td>${item.sevaName}</td>
//                 <td>${item.date || '-'}</td>
//                 <td>${item.quantity || 1}</td>
//                 <td>₹${item.amount?.toFixed(2)}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div class="total-section">
//           <div>
//             <strong>Payment Method:</strong> ${paymentMethod === 'C' ? 'Cash' : paymentMethod}
//           </div>
//           <div>
//             <strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}
//           </div>
//         </div>
        
//   <p class="text-sm text-gray-600">Scan for digital verification</p>
// </div>
// <div class="qr-section">
//   ${ReactDOMServer.renderToString(
//     <QRCodeSVG 
//       value={`${entityDetails?.entityCode || ''}${nextReceiptNumber}`}
//       size={120}
//       level="H"
//       includeMargin={true}
//       style={{ margin: '0 auto' }}
//     />
//   )}
//   <p style="margin-top: 10px; font-size: 12px;">Scan to verify receipt</p>
// </div>


//         <div class="footer">
//           <p>This is a computer generated receipt</p>
//         </div>
//       </div>
//     </body>
//   </html>
// `;


//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   printWindow.focus();
  
//   setTimeout(() => {
//     printWindow.print();
//     printWindow.close();
//   }, 250);
// };



// const handleReferenceDateChange = (e) => {
//   const refDate = e.target.value;
//   setReferenceDate(refDate);
//   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     ...currentPaymentDetails,
//     referenceDate: refDate
//   }));
// };

//   const formatSevaDate = (seva) => {
//     if (seva.sevaShashwath === 'SS') {
//       if (seva.ssDetails?.calendarType === 'ritual') {
//         const maasaDesc = seva.ssDetails.maasaDesc || '';
//         const paksha = seva.ssDetails.paksha === 'S' ? 'Shukla' : 'Krishna';
//         const tithiDesc = seva.ssDetails.tithiDesc || '';
//         return `${maasaDesc} ${paksha} ${tithiDesc}`;
//       }
//       return `${seva.ssDetails?.month || ''}/${seva.ssDetails?.day || ''}`;
//     }
//     return new Date(seva.performanceDate).toLocaleDateString('en-IN');
//   };
  
  

//   // Format address for display
//   const formattedAddress = [
//     devoteeDetails.addressLane1,
//     devoteeDetails.addressLane2,
//   ].filter(Boolean).join(', ');

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Screen View */}
//         <div>
//           <h1 className="text-3xl font-bold text-orange-600 mb-6 print:hidden">Booking Confirmation</h1>
          
//           {/* Temple Header - Visible in both views */}
//           <div className="text-center mb-6 hidden print:block">
//             {/* <h1 className="text-3xl font-bold mb-2">Sri Temple Trust</h1>
//             <p className="text-gray-600">123 Temple Street, Bangalore, Karnataka - 560001</p>
//             <p className="text-gray-600">Phone: +91 80 1234 5678</p>
//             <div className="border-b-2 border-gray-800 mt-4"></div> */}
//             <h1 className="text-3xl font-bold mb-2">{entityDetails?.name || 'Temple Trust'}</h1>
//   <p className="text-gray-600">
//     {[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3]
//       .filter(Boolean)
//       .join(', ')}
//   </p>
//   <p className="text-gray-600">Phone: {entityDetails?.phone}</p>
//   <div className="border-b-2 border-gray-800 mt-4"></div>
//           </div>

//           {/* Receipt Details - Visible in both views */}
//           <div className="flex justify-between mb-6 print:mt-4">
//             <div>
//               {/* <p className="font-bold">Receipt No: {receiptNumber}</p> */}
//               {/* <p>Date: {currentDate}</p> */}
//               <p className="font-bold">Receipt No: {nextReceiptNumber}</p>
//               <p>Date: {currentDate}</p>
//             </div>
//           </div>

//           {/* Devotee Details */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
//             <h2 className="text-xl font-semibold mb-4">Devotee Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p><strong>Name:</strong> {devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
//                 <p><strong>Mobile:</strong> {devoteeDetails.mobile}</p>
//                 <p><strong>Email:</strong> {devoteeDetails.email}</p>
//               </div>
//               <div>
//                 <p><strong>Address:</strong> {formattedAddress}</p>
//                 <p><strong>City:</strong> {devoteeDetails.city}, {devoteeDetails.state}</p>
//                 <p><strong>Pincode:</strong> {devoteeDetails.pincode}</p>
//               </div>
//             </div>
//           </div>

//           {/* Seva Details */}
  
// <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
//   <h2 className="text-xl font-semibold mb-4">Selected Sevas</h2>
//   <table className="w-full border-collapse">
//     <thead>
//       <tr className="bg-gray-50">
//         <th className="border border-gray-300 p-2 text-left">Seva Name</th>
//         <th className="border border-gray-300 p-2 text-left">Date</th>
//         <th className="border border-gray-300 p-2 text-left">Quantity</th>
//         <th className="border border-gray-300 p-2 text-left">Amount</th>
//       </tr>
//     </thead>
//     <tbody>
//     {Object.entries(groupedSevas).map(([parentSeva, deities]) => 
//   Object.entries(deities).map(([deity, sevas]) => 
//     sevas.map((seva, index) => {
//       // Find the corresponding cart item for this seva
//       const cartItem = cart.find(item => 
//         item.sevas.some(s => s.sevaCode === seva.sevaCode)
//       );
      
//       return (
//         <tr key={index}>
//           <td className="border border-gray-300 p-2">{seva.sevaName}</td>
//           <td className="border border-gray-300 p-2">{cartItem?.date}</td>
//           <td className="border border-gray-300 p-2">{seva.quantity}</td>
//           <td className="border border-gray-300 p-2">₹{seva.amount.toFixed(2)}</td>
//         </tr>
//       );
//     })
//   )
// )}

//     </tbody>
//   </table>
//   <div className="mt-4 text-right">
//     <p className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
//   </div>
// </div>


// {/* Action Buttons */}
// {/* Payment Details Section - Only visible for admin users */}
// {userType === 'admin' && (
//   <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-orange-100">
//     <h2 className="text-xl font-semibold mb-6 text-orange-600 border-b pb-2">Payment Details</h2>
//     <div className="grid gap-6">
//       <div>
//         <label className="block mb-2 text-gray-700 font-medium">Payment Method</label>
//         <select
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//           onChange={handlePaymentMethodChange}
//           value={paymentMethod}
//         >
//           <option value="">Select Payment Method</option>
//           <option value="C">Cash</option>
//           <option value="CC">Credit Card</option>
//           <option value="DC">Debit Card</option>
//           <option value="UPI">UPI</option>
//           <option value="NB">Net Banking</option>
//         </select>
//       </div>

//       {paymentMethod && paymentMethod !== 'C' && (
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Reference Number</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//               onChange={handleReferenceNumberChange}
//               value={referenceNumber}
//               placeholder="Enter reference number"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Reference Date</label>
//             <input
//               type="date"
//               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//               onChange={handleReferenceDateChange}
//               value={referenceDate}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}

// <div className="flex flex-col md:flex-row justify-between gap-4 print:hidden mt-8">
//   <button
//     type="button"
//     onClick={() => navigate(-1)}
//     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
//   >
//     Back
//   </button>
//   <button
//     type="button"
//     onClick={handlePrint}
//     className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
//   >
//     Print Summary
//   </button>
//   <button
//     type="button"
//     onClick={handleSubmit}
//     className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
//   >
//     Confirm Booking
//   </button>
// </div>


//           {/* Print Footer */}
//           <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600 hidden print:block">
//             <p>This is a computer generated receipt and doesn't require signature.</p>
//             <p>Thank you for your devotion. Om Namah Shivaya 🕉</p>
//             <p className="mt-4">For any queries, please contact: +91 80 1234 5678 or email: info@temple.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmation;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';


// const BookingConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const cart = location.state?.cart || [];
//   const totalAmount = location.state?.totalAmount || 0;
//   const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
//   const currentDate = new Date().toLocaleDateString();
//   const [entityDetails, setEntityDetails] = useState(null);
//   // Get devotee details from localStorage
//   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee')) || {
//     fullName: '',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     mobile: '',
//     email: '',
//     addressLane1: '',
//     addressLane2: '',
//     city: '',
//     state: '',
//     pincode: ''
//   };
//   // Add these state variables at the top of your component
// const [paymentMethod, setPaymentMethod] = useState('');
// const [referenceNumber, setReferenceNumber] = useState('');
// const [referenceDate, setReferenceDate] = useState('');
// const userType = localStorage.getItem('userType');

//   // Group sevas by parent seva and deity
//   const groupedSevas = cart.reduce((acc, item) => {
//     const parentSevaName = item.parentSeva ? `${item.parentSeva.name}` : 'Individual Sevas';
//     if (!acc[parentSevaName]) {
//       acc[parentSevaName] = {};
//     }
//     if (!acc[parentSevaName][item.deityName]) {
//       acc[parentSevaName][item.deityName] = [];
//     }
//     acc[parentSevaName][item.deityName].push(...item.sevas);
//     return acc;
//   }, {});

//   useEffect(() => {
//     const entityCode = localStorage.getItem('entityCode');
//     if (entityCode) {
//       axios.get(`http://localhost:2002/entity/${entityCode}`)
//         .then(response => setEntityDetails(response.data))
//         .catch(error => console.error('Error:', error));
//     }
//   }, []);


// // const handleSubmit = async () => {
// //   const userType = localStorage.getItem('userType');
// //   const entityCode = localStorage.getItem('entityCode');
// //   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));

// //   // Validate payment details for admin users
// //   if (userType === 'admin') {
// //     if (!paymentMethod) {
// //       alert('Please select a payment method');
// //       return;
// //     }
// //     if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
// //       alert('Please enter reference number and date');
// //       return;
// //     }
// //   }

// //   const bookingData = {
// //     devoteeDetails,
// //     sevas: cart.map(item => ({
// //       ...item,
// //       sevas: item.sevas.map(seva => ({
// //         ...seva,
// //         sevaShashwath: seva.sevaShashwath || 'O',
// //         performanceDate: seva.performanceDate || new Date().toISOString(),
// //         inMemoryOf: seva.ssDetails?.inMemoryOf || null,
// //         deityId: item.deityId,
// //         deityName: item.deityName,
// //         prasadDelivery: item.prasadDelivery
// //       }))
// //     })),
// //     totalAmount,
// //     bookingDate: new Date().toISOString(),
// //     paymentDetails: userType === 'admin' ? {
// //       method: paymentMethod,
// //       referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
// //       referenceDate: paymentMethod !== 'C' ? referenceDate : null
// //     } : null
// //   };

// //   try {
// //     const response = await axios.post(
// //       `http://localhost:2002/shashwath-seva/${entityCode}/book`,
// //       bookingData
// //     );
    
// //     console.log('All sevas booking successful:', response.data);

// //     // Clear all related localStorage items
// //     localStorage.removeItem('sevaCart');
// //     localStorage.removeItem('ssSevaDetails');
// //     localStorage.removeItem('selectedSevas');
    
// //     navigate('/booking/success', { 
// //       state: { 
// //         bookingId: response.data.custCode,
// //         message: 'Your seva booking has been confirmed successfully.',
// //         sevaTypes: {
// //           hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
// //           hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
// //           hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
// //         },
// //         paymentDetails: bookingData.paymentDetails
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Booking error:', error);
// //     alert('Failed to process booking. Please try again.');
// //   }
// // };

// const handleSubmit = async () => {
//   const userType = localStorage.getItem('userType');
//   const entityCode = localStorage.getItem('entityCode');
//   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));
//   const userId = localStorage.getItem('userId');
//   const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

//   if (userType === 'admin') {
//       if (!paymentMethod) {
//           alert('Please select a payment method');
//           return;
//       }
//       if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
//           alert('Please enter reference number and date');
//           return;
//       }
//   }

//   const receiptPaymentData = {
//       ENTITY_CODE: entityCode,
//       PAYMENT_TYPE: paymentDetails.method,
//       CUST_NAME: `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim(),
//       TRANS_DATE: new Date().toISOString(),
//       VALUE_DATE: new Date().toISOString(),
//       REC_AMT: Number(totalAmount),
//       CLEARING_TYPE: paymentDetails.method !== 'C' ? paymentDetails.method : null,
//       CLEARING_REF_NUM: paymentDetails.referenceNumber || null,
//       CLEARING_DATE: paymentDetails.referenceDate || null,
//       CR_BY: userId,
//       CR_ON: new Date().toISOString(),
//       STATUS: 'P'
//   };

//   const receiptPaymentDtls = cart.map(item => ({
//       PAYMENT_TYPE: paymentDetails.method,
//       SEVA_CODE: item.sevaCode,
//       SEVA_AMT: Number(item.amount),
//       SEVA_QTY: Number(item.quantity || 1),
//       TOT_SEVA_AMT: Number(item.amount * (item.quantity || 1)),
//       SEVA_DATE: item.performanceDate || new Date().toISOString(),
//       MAASA: item.ssDetails?.maasaDesc || null,
//       PAKSHA: item.ssDetails?.paksha || null,
//       THITHI: item.ssDetails?.tithiDesc || null,
//       SS_DD: item.ssDetails?.day || null,
//       SS_MM: item.ssDetails?.month || null
//   }));

//   const bookingData = {
//       devoteeDetails,
//       sevas: cart.map(item => ({
//           ...item,
//           sevas: item.sevas.map(seva => ({
//               ...seva,
//               sevaShashwath: seva.sevaShashwath || 'O',
//               performanceDate: seva.performanceDate || new Date().toISOString(),
//               inMemoryOf: seva.ssDetails?.inMemoryOf || null,
//               deityId: item.deityId,
//               deityName: item.deityName,
//               prasadDelivery: item.prasadDelivery
//           }))
//       })),
//       totalAmount,
//       bookingDate: new Date().toISOString(),
//       paymentDetails: userType === 'admin' ? {
//           method: paymentMethod,
//           referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
//           referenceDate: paymentMethod !== 'C' ? referenceDate : null
//       } : null
//   };

//   try {
//       // Create receipt payment
//       const receiptResponse = await axios.post(
//           `http://localhost:2002/api/receipt-payment`,
//           {
//               receiptPayment: receiptPaymentData,
//               receiptPaymentDtls: receiptPaymentDtls
//           }
//       );

//       // Book sevas
//       const sevaResponse = await axios.post(
//           `http://localhost:2002/shashwath-seva/${entityCode}/book`,
//           {
//               ...bookingData,
//               receiptNumber: receiptResponse.data.REC_NUM
//           }
//       );

//       const formattedReceiptNumber = `${receiptResponse.data.ENTITY_CODE}/${receiptResponse.data.FIN_YEAR}/${receiptResponse.data.REC_NUM.toString().padStart(6, '0')}`;

//       // Clear localStorage
//       localStorage.removeItem('sevaCart');
//       localStorage.removeItem('ssSevaDetails');
//       localStorage.removeItem('selectedSevas');
//       localStorage.removeItem('paymentDetails');

//       navigate('/booking/success', { 
//           state: { 
//               receiptNumber: formattedReceiptNumber,
//               bookingId: sevaResponse.data.custCode,
//               message: 'Seva booking and payment processed successfully',
//               sevaTypes: {
//                   hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
//                   hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
//                   hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
//               },
//               paymentDetails: bookingData.paymentDetails
//           }
//       });
//   } catch (error) {
//       console.error('Processing error:', error);
//       alert('Failed to process booking and payment. Please try again.');
//   }
// };





//   // const handlePrint = () => {
//   //   window.print();
//   // };

//   // const formatSevaDate = (seva) => {
//   //   if (seva.sevaShashwath === 'SS') {
//   //     if (seva.ssDetails?.calendarType === 'ritual') {
//   //       return `${seva.ssDetails.maasaDesc} ${seva.ssDetails.paksha} ${seva.ssDetails.tithiDesc}`;
//   //     }
//   //     return `${seva.ssDetails.month}/${seva.ssDetails.day}`;
//   //   }
//   //   return new Date(seva.performanceDate).toLocaleDateString();
//   // };

//   // Add this when payment method changes
// // const handlePaymentMethodChange = (e) => {
// //   const method = e.target.value;
// //   setPaymentMethod(method);
// //   localStorage.setItem('paymentDetails', JSON.stringify({
// //     method,
// //     referenceNumber: referenceNumber,
// //     referenceDate: referenceDate
// //   }));
// // };

// const handlePaymentMethodChange = (e) => {
//   const methodMap = {
//     'C': 'C',    // Cash
//     'CC': 'R',   // Credit Card
//     'DC': 'D',   // Debit Card
//     'UPI': 'U',  // UPI
//     'NB': 'N'    // Net Banking
//   };
  
//   const method = e.target.value;
//   const mappedMethod = methodMap[method];
//   setPaymentMethod(method);
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     method: mappedMethod,
//     referenceNumber: referenceNumber,
//     referenceDate: referenceDate
//   }));
// };

// // Add this when reference details change
// const handleReferenceNumberChange = (e) => {
//   const refNum = e.target.value;
//   setReferenceNumber(refNum);
//   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     ...currentPaymentDetails,
//     referenceNumber: refNum
//   }));
// };

// const handlePrint = () => {
//   const printWindow = window.open('', '_blank', 'width=800,height=600');
  
//   const printContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Seva Receipt</title>
//         <style>
//           @page { 
//             size: A5 portrait;
//             margin: 1cm;
//           }
//           body {
//             font-family: monospace;
//             margin: 0;
//             padding: 20px;
//           }
//           .receipt {
//             max-width: 148mm;
//             margin: 0 auto;
//           }
//           .header {
//             text-align: center;
//             border-bottom: 2px solid black;
//             padding-bottom: 10px;
//             margin-bottom: 15px;
//           }
//           .details {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 8px;
//             margin-bottom: 15px;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 15px 0;
//           }
//           th, td {
//             padding: 8px;
//             text-align: left;
//             border-bottom: 1px solid #ddd;
//           }
//           .total {
//             text-align: right;
//             font-weight: bold;
//             margin-top: 10px;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 30px;
//             font-size: 12px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="receipt">
//           <div class="header">
//             <h2>${entityDetails?.name || 'Temple Trust'}</h2>
//             <p>${[entityDetails?.address1, entityDetails?.address2].filter(Boolean).join(', ')}</p>
//           </div>
          
//           <div class="details">
//             <div>Receipt No: ${receiptNumber}</div>
//             <div style="text-align: right">Date: ${currentDate}</div>
//           </div>
          
//           <div class="details">
//             <div>Name: ${devoteeDetails.firstName} ${devoteeDetails.lastName}</div>
//             <div>Mobile: ${devoteeDetails.mobile}</div>
//           </div>
          
//           <table>
//             <thead>
//               <tr>
//                 <th>Seva Name</th>
//                 <th style="text-align: right">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${cart.map(item => `
//                 <tr>
//                   <td>${item.sevaName}</td>
//                   <td style="text-align: right">₹${item.amount?.toFixed(2)}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
          
//           <div class="total">
//             Total Amount: ₹${totalAmount.toFixed(2)}
//           </div>
          
//           <div class="footer">
//             <p>This is a computer generated receipt</p>
//             <p>🕉 Om Namah Shivaya 🕉</p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   printWindow.focus();
  
//   setTimeout(() => {
//     printWindow.print();
//     printWindow.close();
//   }, 250);
// };

// const handleReferenceDateChange = (e) => {
//   const refDate = e.target.value;
//   setReferenceDate(refDate);
//   const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     ...currentPaymentDetails,
//     referenceDate: refDate
//   }));
// };

//   const formatSevaDate = (seva) => {
//     if (seva.sevaShashwath === 'SS') {
//       if (seva.ssDetails?.calendarType === 'ritual') {
//         const maasaDesc = seva.ssDetails.maasaDesc || '';
//         const paksha = seva.ssDetails.paksha === 'S' ? 'Shukla' : 'Krishna';
//         const tithiDesc = seva.ssDetails.tithiDesc || '';
//         return `${maasaDesc} ${paksha} ${tithiDesc}`;
//       }
//       return `${seva.ssDetails?.month || ''}/${seva.ssDetails?.day || ''}`;
//     }
//     return new Date(seva.performanceDate).toLocaleDateString('en-IN');
//   };
  
  

//   // Format address for display
//   const formattedAddress = [
//     devoteeDetails.addressLane1,
//     devoteeDetails.addressLane2,
//   ].filter(Boolean).join(', ');

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Screen View */}
//         <div>
//           <h1 className="text-3xl font-bold text-orange-600 mb-6 print:hidden">Booking Confirmation</h1>
          
//           {/* Temple Header - Visible in both views */}
//           <div className="text-center mb-6 hidden print:block">
//             {/* <h1 className="text-3xl font-bold mb-2">Sri Temple Trust</h1>
//             <p className="text-gray-600">123 Temple Street, Bangalore, Karnataka - 560001</p>
//             <p className="text-gray-600">Phone: +91 80 1234 5678</p>
//             <div className="border-b-2 border-gray-800 mt-4"></div> */}
//             <h1 className="text-3xl font-bold mb-2">{entityDetails?.name || 'Temple Trust'}</h1>
//   <p className="text-gray-600">
//     {[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3]
//       .filter(Boolean)
//       .join(', ')}
//   </p>
//   <p className="text-gray-600">Phone: {entityDetails?.phone}</p>
//   <div className="border-b-2 border-gray-800 mt-4"></div>
//           </div>

//           {/* Receipt Details - Visible in both views */}
//           <div className="flex justify-between mb-6 print:mt-4">
//             <div>
//               <p className="font-bold">Receipt No: {receiptNumber}</p>
//               <p>Date: {currentDate}</p>
//             </div>
//           </div>

//           {/* Devotee Details */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
//             <h2 className="text-xl font-semibold mb-4">Devotee Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p><strong>Name:</strong> {devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
//                 <p><strong>Mobile:</strong> {devoteeDetails.mobile}</p>
//                 <p><strong>Email:</strong> {devoteeDetails.email}</p>
//               </div>
//               <div>
//                 <p><strong>Address:</strong> {formattedAddress}</p>
//                 <p><strong>City:</strong> {devoteeDetails.city}, {devoteeDetails.state}</p>
//                 <p><strong>Pincode:</strong> {devoteeDetails.pincode}</p>
//               </div>
//             </div>
//           </div>

//           {/* Seva Details */}
  
// <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
//   <h2 className="text-xl font-semibold mb-4">Selected Sevas</h2>
//   <table className="w-full border-collapse">
//     <thead>
//       <tr className="bg-gray-50">
//         <th className="border border-gray-300 p-2 text-left">Seva Name</th>
//         <th className="border border-gray-300 p-2 text-left">Date</th>
//         <th className="border border-gray-300 p-2 text-left">Quantity</th>
//         <th className="border border-gray-300 p-2 text-left">Amount</th>
//       </tr>
//     </thead>
//     <tbody>
//     {Object.entries(groupedSevas).map(([parentSeva, deities]) => 
//   Object.entries(deities).map(([deity, sevas]) => 
//     sevas.map((seva, index) => {
//       // Find the corresponding cart item for this seva
//       const cartItem = cart.find(item => 
//         item.sevas.some(s => s.sevaCode === seva.sevaCode)
//       );
      
//       return (
//         <tr key={index}>
//           <td className="border border-gray-300 p-2">{seva.sevaName}</td>
//           <td className="border border-gray-300 p-2">{cartItem?.date}</td>
//           <td className="border border-gray-300 p-2">{seva.quantity}</td>
//           <td className="border border-gray-300 p-2">₹{seva.amount.toFixed(2)}</td>
//         </tr>
//       );
//     })
//   )
// )}

//     </tbody>
//   </table>
//   <div className="mt-4 text-right">
//     <p className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
//   </div>
// </div>


// {/* Action Buttons */}
// {userType === 'admin' && (
//   <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-orange-100">
//     <h2 className="text-xl font-semibold mb-6 text-orange-600 border-b pb-2">Payment Details</h2>
//     <div className="grid gap-6">
//       <div>
//         <label className="block mb-2 text-gray-700 font-medium">Payment Method</label>
//         <select
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//           onChange={handlePaymentMethodChange}
//           value={paymentMethod}
//         >
//           <option value="">Select Payment Method</option>
//           <option value="C">Cash</option>
//           <option value="CC">Credit Card</option>
//           <option value="DC">Debit Card</option>
//           <option value="UPI">UPI</option>
//           <option value="NB">Net Banking</option>
//         </select>
//       </div>

//       {paymentMethod && paymentMethod !== 'C' && (
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Reference Number</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//               onChange={handleReferenceNumberChange}
//               value={referenceNumber}
//               placeholder="Enter reference number"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-gray-700 font-medium">Reference Date</label>
//             <input
//               type="date"
//               className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
//               onChange={handleReferenceDateChange}
//   value={referenceDate}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}
// <div className="flex flex-col md:flex-row justify-between gap-4 print:hidden mt-8">
//   <button
//     type="button"
//     onClick={() => navigate(-1)}
//     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
//   >
//     Back
//   </button>
//   <button
//     type="button"
//     onClick={handlePrint}
//     className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
//   >
//     Print Summary
//   </button>
//   <button
//     type="button"
//     onClick={handleSubmit}
//     className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
//   >
//     Confirm Booking
//   </button>
// </div>


//           {/* Print Footer */}
//           <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600 hidden print:block">
//             <p>This is a computer generated receipt and doesn't require signature.</p>
//             <p>Thank you for your devotion. Om Namah Shivaya 🕉</p>
//             <p className="mt-4">For any queries, please contact: +91 80 1234 5678 or email: info@temple.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmation;



import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactDOMServer from 'react-dom/server';






const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const totalAmount = location.state?.totalAmount || 0;
  const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString();
  const [entityDetails, setEntityDetails] = useState(null);
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);






  // Get devotee details from localStorage
  const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee')) || {
    fullName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
    addressLane1: '',
    addressLane2: '',
    city: '',
    state: '',
    pincode: ''
  };
  // Add these state variables at the top of your component
const [paymentMethod, setPaymentMethod] = useState('');
const [referenceNumber, setReferenceNumber] = useState('');
const [referenceDate, setReferenceDate] = useState('');
const userType = localStorage.getItem('userType');


  // Group sevas by parent seva and deity
  const groupedSevas = cart.reduce((acc, item) => {
    const parentSevaName = item.parentSeva ? `${item.parentSeva.name}` : 'Individual Sevas';
    if (!acc[parentSevaName]) {
      acc[parentSevaName] = {};
    }
    if (!acc[parentSevaName][item.deityName]) {
      acc[parentSevaName][item.deityName] = [];
    }
    acc[parentSevaName][item.deityName].push(...item.sevas);
    return acc;
  }, {});

  useEffect(() => {
    const entityCode = localStorage.getItem('entityCode');
    if (entityCode) {
      axios.get(`http://localhost:2002/entity/${entityCode}`)
        .then(response => setEntityDetails(response.data))
        .catch(error => console.error('Error:', error));
    }
  }, []);


// const handleSubmit = async () => {
//   const userType = localStorage.getItem('userType');
//   const entityCode = localStorage.getItem('entityCode');
//   const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));

//   // Validate payment details for admin users
//   if (userType === 'admin') {
//     if (!paymentMethod) {
//       alert('Please select a payment method');
//       return;
//     }
//     if (paymentMethod !== 'C' && (!referenceNumber || !referenceDate)) {
//       alert('Please enter reference number and date');
//       return;
//     }
//   }

//   const bookingData = {
//     devoteeDetails,
//     sevas: cart.map(item => ({
//       ...item,
//       sevas: item.sevas.map(seva => ({
//         ...seva,
//         sevaShashwath: seva.sevaShashwath || 'O',
//         performanceDate: seva.performanceDate || new Date().toISOString(),
//         inMemoryOf: seva.ssDetails?.inMemoryOf || null,
//         deityId: item.deityId,
//         deityName: item.deityName,
//         prasadDelivery: item.prasadDelivery
//       }))
//     })),
//     totalAmount,
//     bookingDate: new Date().toISOString(),
//     paymentDetails: userType === 'admin' ? {
//       method: paymentMethod,
//       referenceNumber: paymentMethod !== 'C' ? referenceNumber : null,
//       referenceDate: paymentMethod !== 'C' ? referenceDate : null
//     } : null
//   };

//   try {
//     const response = await axios.post(
//       `http://localhost:2002/shashwath-seva/${entityCode}/book`,
//       bookingData
//     );
    
//     console.log('All sevas booking successful:', response.data);

//     // Clear all related localStorage items
//     localStorage.removeItem('sevaCart');
//     localStorage.removeItem('ssSevaDetails');
//     localStorage.removeItem('selectedSevas');
    
//     navigate('/booking/success', { 
//       state: { 
//         bookingId: response.data.custCode,
//         message: 'Your seva booking has been confirmed successfully.',
//         sevaTypes: {
//           hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
//           hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
//           hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
//         },
//         paymentDetails: bookingData.paymentDetails
//       }
//     });
//   } catch (error) {
//     console.error('Booking error:', error);
//     alert('Failed to process booking. Please try again.');
//   }
// };

const [nextReceiptNumber, setNextReceiptNumber] = useState('');

useEffect(() => {
  const fetchNextReceiptNumber = async () => {
    const userType = localStorage.getItem('userType');
    const entityCode = userType === 'admin' ? 
      localStorage.getItem('entityCode') : 
      localStorage.getItem('ENTITY_CODE');
      
    try {
      const response = await axios.get(`http://localhost:2002/api/receipt-payment/next-number`, {
        params: {
          entityCode: entityCode
        }
      });
      const formattedReceiptNumber = `${entityCode}/${response.data.finYear}/${response.data.nextNum.toString().padStart(6, '0')}`;
      setNextReceiptNumber(formattedReceiptNumber);
    } catch (error) {
      console.error('Error fetching next receipt number:', error);
    }
  };

  fetchNextReceiptNumber();
}, []);



const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  if (isSubmitting) return;
  setIsSubmitting(true);

  const userType = localStorage.getItem('userType');
  const entityCode = userType === 'admin' ? 
    localStorage.getItem('entityCode') : 
    localStorage.getItem('ENTITY_CODE');
  const userId = userType === 'admin' ? localStorage.getItem('userId') : 'USER';
  const devoteeDetails = JSON.parse(localStorage.getItem('currentDevotee'));
  const paymentDetails = userType === 'admin' ? 
    JSON.parse(localStorage.getItem('paymentDetails')) : 
    { method: 'C', referenceNumber: null, referenceDate: null };

  try {
    const receiptResponse = await axios.post(
      `http://localhost:2002/api/receipt-payment`,
      {
        receiptPayment: {
          ENTITY_CODE: entityCode,
          PAYMENT_TYPE: paymentDetails.method || 'C',
          CUST_NAME: `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim(),
          TRANS_DATE: new Date().toISOString(),
          VALUE_DATE: new Date().toISOString(),
          REC_AMT: Number(totalAmount),
          CLEARING_TYPE: paymentDetails.method !== 'C' ? paymentDetails.method : null,
          CLEARING_REF_NUM: paymentDetails.referenceNumber || null,
          CLEARING_DATE: paymentDetails.referenceDate || null,
          CR_BY: userId,
          CR_ON: new Date().toISOString(),
          STATUS: 'P'
        },
        receiptPaymentDtls: cart.map(item => ({
          PAYMENT_TYPE: paymentDetails.method,
          SEVA_CODE: item.sevaCode,
          SEVA_AMT: Number(item.amount),
          SEVA_QTY: Number(item.quantity || 1),
          TOT_SEVA_AMT: Number(item.amount * (item.quantity || 1)),
          SEVA_DATE: item.performanceDate || new Date().toISOString()
        }))
      }
    );

    const sevaResponse = await axios.post(
      `http://localhost:2002/shashwath-seva/${entityCode}/book`,
      {
        devoteeDetails,
        sevas: cart,
        totalAmount,
        bookingDate: new Date().toISOString(),
        receiptNumber: receiptResponse.data.REC_NUM
      }
    );

    setIsSubmissionComplete(true); // Enable print after successful submission
    
    // Show print dialog automatically after submission
    handlePrint();
    // Clear localStorage
    localStorage.removeItem('sevaCart');
    localStorage.removeItem('ssSevaDetails');
    localStorage.removeItem('selectedSevas');
    localStorage.removeItem('paymentDetails');

    // navigate('/booking/success', { 
    //   state: { 
    //     receiptNumber: `${receiptResponse.data.ENTITY_CODE}/${receiptResponse.data.FIN_YEAR}/${receiptResponse.data.REC_NUM.toString().padStart(6, '0')}`,
    //     bookingId: sevaResponse.data.custCode,
    //     message: 'Seva booking and payment processed successfully',
    //     sevaTypes: {
    //       hasShashwath: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'SS')),
    //       hasNityanidhi: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'N')),
    //       hasOther: cart.some(item => item.sevas.some(seva => seva.sevaShashwath === 'O'))
    //     }
    //   }
    // });
    setIsSubmissionComplete(true);
    alert('Booking completed successfully! You can now print the receipt.');
  } catch (error) {
    console.error('Processing error:', error);
    alert('Failed to process booking. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};




  // const handlePrint = () => {
  //   window.print();
  // };

  // const formatSevaDate = (seva) => {
  //   if (seva.sevaShashwath === 'SS') {
  //     if (seva.ssDetails?.calendarType === 'ritual') {
  //       return `${seva.ssDetails.maasaDesc} ${seva.ssDetails.paksha} ${seva.ssDetails.tithiDesc}`;
  //     }
  //     return `${seva.ssDetails.month}/${seva.ssDetails.day}`;
  //   }
  //   return new Date(seva.performanceDate).toLocaleDateString();
  // };

  // Add this when payment method changes
// const handlePaymentMethodChange = (e) => {
//   const method = e.target.value;
//   setPaymentMethod(method);
//   localStorage.setItem('paymentDetails', JSON.stringify({
//     method,
//     referenceNumber: referenceNumber,
//     referenceDate: referenceDate
//   }));
// };



const handlePaymentMethodChange = (e) => {
  const methodMap = {
    'C': 'C',    // Cash
    'CC': 'R',   // Credit Card
    'DC': 'D',   // Debit Card
    'UPI': 'U',  // UPI
    'NB': 'N'    // Net Banking
  };
  
  const method = e.target.value;
  const mappedMethod = methodMap[method];
  setPaymentMethod(method);
  localStorage.setItem('paymentDetails', JSON.stringify({
    method: mappedMethod,
    referenceNumber: referenceNumber,
    referenceDate: referenceDate
  }));
};
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      throw new Error('No data received');
    }
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
};

// Replace the qrCode.render() call with:


// In your component:



// Add this when reference details change
const handleReferenceNumberChange = (e) => {
  const refNum = e.target.value;
  setReferenceNumber(refNum);
  const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
  localStorage.setItem('paymentDetails', JSON.stringify({
    ...currentPaymentDetails,
    referenceNumber: refNum
  }));
};

const handlePrint = () => {
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  // Add error handling
  if (!printWindow) {
    alert('Please allow pop-ups to print the receipt');
    return;
  }


  printWindow.print();
  const printContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Seva Receipt</title>
      <style>
        @page { 
          size: A5 portrait;
          margin: 1cm;
        }
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          background: #fff;
        }
        .receipt {
          max-width: 148mm;
          margin: 0 auto;
          border: 2px solid #f97316;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #f97316;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #f97316;
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .header p {
          margin: 5px 0;
          color: #666;
        }
        .receipt-info {
          display: flex;
          justify-content: space-between;
          margin: 15px 0;
          padding: 10px;
          background: #fff3e0;
          border-radius: 4px;
        }
        .devotee-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 20px 0;
          padding: 15px;
          background: #f9fafb;
          border-radius: 4px;
        }
        .seva-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
        }
        .seva-table th {
          background: #fff3e0;
          color: #f97316;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        .seva-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        .total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0;
          padding: 15px;
          background: #fff3e0;
          border-radius: 4px;
        }
        .qr-section {
          text-align: center;
          margin: 20px 0;
          padding: 15px;
          background: #f9fafb;
          border-radius: 4px;
        }
        .qr-section img {
          width: 100px;
          height: 100px;
          margin: 10px auto;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
        .om-symbol {
          font-size: 24px;
          color: #f97316;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>${entityDetails?.name || 'Temple Trust'}</h1>
          <p>${[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3].filter(Boolean).join(', ')}</p>
          <p>Phone: ${entityDetails?.phone}</p>
        </div>

        <div class="receipt-info">
          <div>
            <strong>Receipt No:</strong> ${nextReceiptNumber}
          </div>
          <div>
            <strong>Date:</strong> ${currentDate}
          </div>
        </div>

        <div class="devotee-details">
          <div>
            <h3>Devotee Information</h3>
            <p><strong>Name:</strong> ${devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
            <p><strong>Mobile:</strong> ${devoteeDetails.mobile}</p>
            <p><strong>Email:</strong> ${devoteeDetails.email}</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>${formattedAddress}</p>
            <p>${devoteeDetails.city}, ${devoteeDetails.state}</p>
            <p>${devoteeDetails.pincode}</p>
          </div>
        </div>

        <table class="seva-table">
          <thead>
            <tr>
              <th>Seva Name</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td>${item.sevaName}</td>
                <td>${item.date || '-'}</td>
                <td>${item.quantity || 1}</td>
                <td>₹${item.amount?.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-section">
          <div>
            <strong>Payment Method:</strong> ${paymentMethod === 'C' ? 'Cash' : paymentMethod}
          </div>
          <div>
            <strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}
          </div>
        </div>
        
  <p class="text-sm text-gray-600">Scan for digital verification</p>
</div>
<div class="qr-section">
  ${ReactDOMServer.renderToString(
    <QRCodeSVG 
      value={`${entityDetails?.entityCode || ''}${nextReceiptNumber}`}
      size={120}
      level="H"
      includeMargin={true}
      style={{ margin: '0 auto' }}
    />
  )}
  <p style="margin-top: 10px; font-size: 12px;">Scan to verify receipt</p>
</div>


        <div class="footer">
          <p>This is a computer generated receipt</p>
        </div>
      </div>
    </body>
  </html>
`;


  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};



const handleReferenceDateChange = (e) => {
  const refDate = e.target.value;
  setReferenceDate(refDate);
  const currentPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
  localStorage.setItem('paymentDetails', JSON.stringify({
    ...currentPaymentDetails,
    referenceDate: refDate
  }));
};

  const formatSevaDate = (seva) => {
    if (seva.sevaShashwath === 'SS') {
      if (seva.ssDetails?.calendarType === 'ritual') {
        const maasaDesc = seva.ssDetails.maasaDesc || '';
        const paksha = seva.ssDetails.paksha === 'S' ? 'Shukla' : 'Krishna';
        const tithiDesc = seva.ssDetails.tithiDesc || '';
        return `${maasaDesc} ${paksha} ${tithiDesc}`;
      }
      return `${seva.ssDetails?.month || ''}/${seva.ssDetails?.day || ''}`;
    }
    return new Date(seva.performanceDate).toLocaleDateString('en-IN');
  };
  
  

  // Format address for display
  const formattedAddress = [
    devoteeDetails.addressLane1,
    devoteeDetails.addressLane2,
  ].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Screen View */}
        <div>
          <h1 className="text-3xl font-bold text-orange-600 mb-6 print:hidden">Booking Confirmation</h1>
          
          {/* Temple Header - Visible in both views */}
          <div className="text-center mb-6 hidden print:block">
            {/* <h1 className="text-3xl font-bold mb-2">Sri Temple Trust</h1>
            <p className="text-gray-600">123 Temple Street, Bangalore, Karnataka - 560001</p>
            <p className="text-gray-600">Phone: +91 80 1234 5678</p>
            <div className="border-b-2 border-gray-800 mt-4"></div> */}
            <h1 className="text-3xl font-bold mb-2">{entityDetails?.name || 'Temple Trust'}</h1>
  <p className="text-gray-600">
    {[entityDetails?.address1, entityDetails?.address2, entityDetails?.address3]
      .filter(Boolean)
      .join(', ')}
  </p>
  <p className="text-gray-600">Phone: {entityDetails?.phone}</p>
  <div className="border-b-2 border-gray-800 mt-4"></div>
          </div>

          {/* Receipt Details - Visible in both views */}
          <div className="flex justify-between mb-6 print:mt-4">
            <div>
              {/* <p className="font-bold">Receipt No: {receiptNumber}</p> */}
              {/* <p>Date: {currentDate}</p> */}
              <p className="font-bold">Receipt No: {nextReceiptNumber}</p>
              <p>Date: {currentDate}</p>
            </div>
          </div>

          {/* Devotee Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
            <h2 className="text-xl font-semibold mb-4">Devotee Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {devoteeDetails.fullName || `${devoteeDetails.firstName} ${devoteeDetails.middleName} ${devoteeDetails.lastName}`.trim()}</p>
                <p><strong>Mobile:</strong> {devoteeDetails.mobile}</p>
                <p><strong>Email:</strong> {devoteeDetails.email}</p>
              </div>
              <div>
                <p><strong>Address:</strong> {formattedAddress}</p>
                <p><strong>City:</strong> {devoteeDetails.city}, {devoteeDetails.state}</p>
                <p><strong>Pincode:</strong> {devoteeDetails.pincode}</p>
              </div>
            </div>
          </div> 

          {/* Seva Details */}
  
<div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
  <h2 className="text-xl font-semibold mb-4">Selected Sevas</h2>
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-50">
        <th className="border border-gray-300 p-2 text-left">Seva Name</th>
        <th className="border border-gray-300 p-2 text-left">Date</th>
        <th className="border border-gray-300 p-2 text-left">Quantity</th>
        <th className="border border-gray-300 p-2 text-left">Amount</th>
      </tr>
    </thead>
    <tbody>
    {Object.entries(groupedSevas).map(([parentSeva, deities]) => 
  Object.entries(deities).map(([deity, sevas]) => 
    sevas.map((seva, index) => {
      // Find the corresponding cart item for this seva
      const cartItem = cart.find(item => 
        item.sevas.some(s => s.sevaCode === seva.sevaCode)
      );
      
      return (
        <tr key={index}>
          <td className="border border-gray-300 p-2">{seva.sevaName}</td>
          <td className="border border-gray-300 p-2">{cartItem?.date}</td>
          <td className="border border-gray-300 p-2">{seva.quantity}</td>
          <td className="border border-gray-300 p-2">₹{seva.amount.toFixed(2)}</td>
        </tr>
      );
    })
  )
)}

    </tbody>
  </table>
  <div className="mt-4 text-right">
    <p className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
  </div>
</div>


{/* Action Buttons */}
{/* Payment Details Section - Only visible for admin users */}
{userType === 'admin' && (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-orange-100">
    <h2 className="text-xl font-semibold mb-6 text-orange-600 border-b pb-2">Payment Details</h2>
    <div className="grid gap-6">
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Payment Method</label>
        <select
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
          onChange={handlePaymentMethodChange}
          value={paymentMethod}
        >
          <option value="">Select Payment Method</option>
          <option value="C">Cash</option>
          <option value="CC">Credit Card</option>
          <option value="DC">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="NB">Net Banking</option>
        </select>
      </div>

      {paymentMethod && paymentMethod !== 'C' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Reference Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
              onChange={handleReferenceNumberChange}
              value={referenceNumber}
              placeholder="Enter reference number"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Reference Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
              onChange={handleReferenceDateChange}
              value={referenceDate}
            />
          </div>
        </div>
      )}
    </div>
  </div>
)}

{/* <div className="flex flex-col md:flex-row justify-between gap-4 print:hidden mt-8">
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
  >
    Back
  </button>

  <button
  type="button"
  onClick={handlePrint}
  disabled={!isSubmissionComplete}
  className={`flex-1 ${
    !isSubmissionComplete 
      ? 'bg-gray-300 cursor-not-allowed' 
      : 'bg-orange-100 hover:bg-orange-200'
  } text-orange-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow`}
>
  Print Receipt
</button>
  
<button
  type="button"
  onClick={handleSubmit}
  disabled={isSubmitting}
  className={`flex-1 ${isSubmitting ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} 
    text-white font-medium py-3 px-6 rounded-md transition-all duration-200 
    shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
>
  {isSubmitting ? (
    <>
      <span className="animate-spin">⌛</span>
      Processing...
    </>
  ) : (
    'Confirm Booking'
  )}
</button>


</div> */}
<div className="flex flex-col md:flex-row justify-between gap-4 print:hidden mt-8">
  {!isSubmissionComplete && (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow"
    >
      Back
    </button>
  )}
  
  <button
    type="button"
    onClick={handlePrint}
    className={`flex-1 ${isSubmissionComplete ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-100 hover:bg-orange-200'} text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow`}
  >
    Print Receipt
  </button>

  {!isSubmissionComplete && (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting}
      className={`flex-1 ${isSubmitting ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} 
        text-white font-medium py-3 px-6 rounded-md transition-all duration-200 
        shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
    >
      {isSubmitting ? (
        <>
          <span className="animate-spin">⌛</span>
          Processing...
        </>
      ) : (
        'Confirm Booking'
      )}
    </button>
  )}
</div>


          {/* Print Footer */}
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600 hidden print:block">
            <p>This is a computer generated receipt and doesn't require signature.</p>
            <p>Thank you for your devotion. Om Namah Shivaya 🕉</p>
            <p className="mt-4">For any queries, please contact: +91 80 1234 5678 or email: info@temple.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;