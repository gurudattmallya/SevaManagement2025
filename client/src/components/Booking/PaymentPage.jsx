import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [sevaCart, setSevaCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [entityDetails, setEntityDetails] = useState(null);

    // Add this useEffect along with your existing ones
    useEffect(() => {
      const entityCode = localStorage.getItem('entityCode');
      if (entityCode) {
        axios.get(`http://localhost:2002/entity/${entityCode}`)
          .then(response => setEntityDetails(response.data))
          .catch(error => console.error('Error:', error));
      }
    }, []);
  const [devoteeDetails, setDevoteeDetails] = useState({
    fullName: '',
    mobile: '',
    email: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    mode_of_payment: 'C',
    reference_number: '',
    clearing_amount: '',
    bank_name: '',
    bank_branch: '',
    reference_date: ''
  });

  useEffect(() => {
    const storedDevotee = JSON.parse(localStorage.getItem('currentDevotee')) || {};
    const cart = JSON.parse(localStorage.getItem('sevaCart')) || [];
    setDevoteeDetails(storedDevotee);
    setSevaCart(cart);
    const total = cart.reduce((sum, item) => sum + item.totalAmount, 0);
    setTotalAmount(total);
  }, []);

  // const handlePrintReceipt = () => {
  //   setIsPrinting(true);
  //   const printWindow = window.open('', '_blank');
  //   const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
//   //   const currentDate = new Date().toLocaleDateString('en-GB');
//   const handlePrintReceipt = () => {
//     setIsPrinting(true);
//     const printWindow = window.open('', '_blank');
//     const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
//     const currentDate = new Date().toLocaleDateString('en-GB');

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Temple Seva Receipt</title>
//           <style>
//             @page {
//               size: A4;
//               margin: 20mm;
//             }
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               margin: 0;
//               padding: 20px;
//               color: #000;
//             }
//             .receipt {
//               max-width: 800px;
//               margin: 0 auto;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;
//             }
//             .header h1 {
//               margin: 0;
//               font-size: 24px;
//               margin-bottom: 5px;
//             }
//             .header p {
//               margin: 5px 0;
//               font-size: 14px;
//             }
//             .divider {
//               border-bottom: 1px solid #000;
//               margin: 20px 0;
//             }
//             .receipt-info {
//               margin-bottom: 20px;
//             }
//             .devotee-details {
//               display: grid;
//               grid-template-columns: 1fr 1fr;
//               gap: 20px;
//               margin-bottom: 30px;
//             }
//             .seva-table {
//               width: 100%;
//               border-collapse: collapse;
//               margin: 20px 0;
//             }
//             .seva-table th, .seva-table td {
//               border: 1px solid #000;
//               padding: 8px;
//               text-align: left;
//             }
//             .total-amount {
//               text-align: right;
//               margin: 20px 0;
//               font-weight: bold;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 40px;
//               font-size: 12px;
//             }
//             .payment-mode {
//               margin: 20px 0;
//               font-weight: bold;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt">
//             <div class="header">
//              <h1>${entityDetails?.name || 'Temple Trust'}</h1>
//               <p>${[
//                 entityDetails?.address1,
//                 entityDetails?.address2,
//                 entityDetails?.address3,
//                 entityDetails?.pinCode
//               ].filter(Boolean).join(', ')}</p>
//               <p>Phone: ${entityDetails?.phone || ''}</p>
//               ${entityDetails?.email ? `<p>Email: ${entityDetails.email}</p>` : ''}
//             </div>
// <div class="devotee-details">
//   <div>
//     <p><strong>Name: </strong>${[devoteeDetails.firstName, devoteeDetails.middleName, devoteeDetails.lastName].filter(name => name).join(' ')}</p>
//     <p><strong>Mobile: </strong>${devoteeDetails.mobile}</p>
//     <p><strong>Email: </strong>${devoteeDetails.email}</p>
//   </div>
//   <div>
//     <p><strong>Address: </strong>${formattedAddress}</p>
//     <p><strong>City: </strong>${devoteeDetails.city}, ${devoteeDetails.district}</p>
//     <p><strong>Country: </strong>${devoteeDetails.country}</p>
//   </div>
// </div>


//             <h3>Selected Sevas</h3>
//             <table class="seva-table">
//               <thead>
//                 <tr>
//                   <th>Seva Name</th>
//                   <th>Date</th>
//                   <th>Quantity</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${sevaCart.map(item => item.sevas.map(seva => `
//                   <tr>
//                     <td>${seva.sevaName}</td>
//                     <td>${item.date}</td>
//                     <td>1</td>
//                     <td>₹${seva.amount.toFixed(2)}</td>
//                   </tr>
//                 `).join('')).join('')}
//               </tbody>
//             </table>

//             <div class="payment-mode">
//               <p>Mode of Payment: ${getPaymentMode(paymentDetails.mode_of_payment)}</p>
//             </div>

//             <div class="total-amount">
//               <p>Total Amount: ₹${totalAmount.toFixed(2)}</p>
//             </div>

//             <div class="footer">
//                   <p>This is a computer generated receipt and doesn't require signature.</p>
//               <p>Thank you for your devotion. Om Namah Shivaya ॐ</p>
//               <p>For any queries, please contact: ${entityDetails?.phone || ''} ${entityDetails?.email ? `or email: ${entityDetails.email}` : ''}</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `);
const handlePrintReceipt = () => {
  setIsPrinting(true);
  const printWindow = window.open('', '_blank');
  const receiptNumber = `RECEIPT${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-GB');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Temple Seva Receipt</title>
        <style>
          @page {
            size: A5;
            margin: 10mm;
          }
          @media print {
            body {
              width: 148mm;
              height: 210mm;
            }
          }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 10px;
            color: #000;
            font-size: 10pt;
          }
          .receipt {
            max-width: 148mm;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 16pt;
            margin-bottom: 3px;
          }
          .header p {
            margin: 2px 0;
            font-size: 9pt;
          }
          .receipt-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 9pt;
          }
          .receipt-info p {
            margin: 2px 0;
          }
          .devotee-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
            font-size: 9pt;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .devotee-details p {
            margin: 3px 0;
          }
          .section-title {
            font-size: 11pt;
            font-weight: bold;
            margin: 10px 0;
            padding-bottom: 3px;
            border-bottom: 1px solid #000;
          }
          .seva-table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 9pt;
          }
          .seva-table th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .seva-table th, .seva-table td {
            border: 1px solid #000;
            padding: 5px;
            text-align: left;
          }
          .payment-details {
            margin: 10px 0;
            padding: 8px;
            background-color: #f8f8f8;
            border-radius: 4px;
            font-size: 9pt;
          }
          .total-amount {
            text-align: right;
            margin: 10px 0;
            font-weight: bold;
            font-size: 11pt;
            padding: 5px;
            border-top: 1px solid #000;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 8pt;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          .receipt-number {
            font-size: 9pt;
            color: #666;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>${entityDetails?.name || 'Temple Trust'}</h1>
            <p>${[
              entityDetails?.address1,
              entityDetails?.address2,
              entityDetails?.address3,
              entityDetails?.pinCode
            ].filter(Boolean).join(', ')}</p>
            <p>Phone: ${entityDetails?.phone || ''}</p>
            ${entityDetails?.email ? `<p>Email: ${entityDetails.email}</p>` : ''}
          </div>

          <div class="receipt-info">
            <p class="receipt-number">Receipt No: ${receiptNumber}</p>
            <p>Date: ${currentDate}</p>
          </div>

          <div class="section-title">Devotee Details</div>
          <div class="devotee-details">
            <div>
              <p><strong>Name:</strong> ${[devoteeDetails.firstName, devoteeDetails.middleName, devoteeDetails.lastName].filter(name => name).join(' ')}</p>
              <p><strong>Mobile:</strong> ${devoteeDetails.mobile}</p>
              <p><strong>Email:</strong> ${devoteeDetails.email}</p>
            </div>
            <div>
              <p><strong>Address:</strong> ${formattedAddress}</p>
              <p><strong>City:</strong> ${devoteeDetails.city}, ${devoteeDetails.district}</p>
              <p><strong>Country:</strong> ${devoteeDetails.country}</p>
            </div>
          </div>

          <div class="section-title">Seva Details</div>
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
              ${sevaCart.map(item => item.sevas.map(seva => `
                <tr>
                  <td>${seva.sevaName}</td>
                  <td>${item.date}</td>
                  <td>1</td>
                  <td>₹${seva.amount.toFixed(2)}</td>
                </tr>
              `).join('')).join('')}
            </tbody>
          </table>

          <div class="payment-details">
            <p><strong>Mode of Payment:</strong> ${getPaymentMode(paymentDetails.mode_of_payment)}</p>
            ${paymentDetails.reference_number ? `<p><strong>Reference Number:</strong> ${paymentDetails.reference_number}</p>` : ''}
          </div>

          <div class="total-amount">
            <p>Total Amount: ₹${totalAmount.toFixed(2)}</p>
          </div>

          <div class="footer">
            <p>This is a computer generated receipt and doesn't require signature.</p>
            <p>Thank you for your devotion. Om Namah Shivaya ॐ</p>
            <p>For any queries, please contact: ${entityDetails?.phone || ''} ${entityDetails?.email ? `or email: ${entityDetails.email}` : ''}</p>
          </div>
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      setIsPrinting(false);
    }, 500);
  };

  const getPaymentMode = (mode) => {
    const modes = {
      'C': 'Cash',
      'CC': 'Credit Card',
      'DC': 'Debit Card',
      'UPI': 'UPI',
      'NB': 'Net Banking'
    };
    return modes[mode] || mode;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPaymentConfirmed(true);
    toast.success('Payment confirmed successfully!', {
      position: "top-right",
      autoClose: 3000
    });
  };

  const formattedAddress = [
    devoteeDetails.addressLane1,
    devoteeDetails.addressLane2,
  ].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-6">Payment Details</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <p><strong>Devotee Name:</strong> {devoteeDetails.fullName}</p>
            <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode of Payment
              </label>
              <select
                name="mode_of_payment"
                value={paymentDetails.mode_of_payment}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="C">Cash</option>
                <option value="CC">Credit Card</option>
                <option value="DC">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="NB">Net Banking</option>
              </select>
            </div>

            {paymentDetails.mode_of_payment !== 'C' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    name="reference_number"
                    value={paymentDetails.reference_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                {/* Other payment fields... */}
              </div>
            )}

            <div className="flex justify-end space-x-4 items-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Confirm Payment
              </button>
              {isPaymentConfirmed && (
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  disabled={isPrinting}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  <Printer size={20} />
                  {isPrinting ? 'Printing...' : 'Print Receipt'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;