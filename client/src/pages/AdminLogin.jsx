

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import axios from '../../utils/axios';
import md5 from 'md5';
import templeImage from "../assets/temple.jpg";


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = md5(credentials.password);
      const response = await axios.post('http://localhost:2002/users/login', {
        userId: credentials.userId,
        password: hashedPassword
      });

      if (response.status === 200) {
        const { token, entityCode, userId, created,pageAccess,USER_NAME } = response.data;
        
        // Set all required localStorage items
        localStorage.setItem('token', token);
        localStorage.setItem('entityCode', entityCode);
        localStorage.setItem('userId', userId);
        localStorage.setItem('created', created);
        localStorage.setItem('isLoggedIn', 'true'); // Add this for navbar visibility
        localStorage.setItem('ENTITY_CODE', entityCode); // Add this for consistency with previous code
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('USER_NAME', USER_NAME);
        localStorage.setItem("permissions", JSON.stringify(pageAccess));
        console.log(Permissions);

        // Navigate to dashboard
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      // Clear any existing auth data on error
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('entityCode');
      localStorage.removeItem('userId');
      localStorage.removeItem('created');
      localStorage.removeItem('ENTITY_CODE');
    }
  };

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-white">
  //     <div className="bg-white p-8 rounded-lg shadow-lg w-96">
  //       <h2 className="text-2xl font-bold text-center mb-6 text-yellow-600">Admin Login</h2>
        
  //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
  //       <form onSubmit={handleLogin} className="space-y-4">
  //         <div>
  //           <input
  //             type="text"
  //             name="userId"
  //             placeholder="User ID"
  //             value={credentials.userId}
  //             onChange={handleChange}
  //             className="w-full p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
  //           />
  //         </div>
          
  //         <div>
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Password"
  //             value={credentials.password}
  //             onChange={handleChange}
  //             className="w-full p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
  //           />
  //         </div>
          
  //         <div>
  //           <Button
  //             type="submit"
  //             className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300"
  //           >
  //             Login
  //           </Button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );

   return (
     <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
       <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
         {/* Left Section - Image */}
         <div className="hidden md:block w-1/2 relative">
           <img
             src={templeImage}
             alt="Login"
             className="object-cover w-full h-full"
           />
           <div className="absolute inset-0 bg-yellow-600/20" /> {/* Overlay */}
         </div>

         {/* Right Section - Login Form */}
         <div className="w-full md:w-1/2 p-8 lg:p-12">
           <div className="space-y-6">
             <div className="text-center">
               <h2 className="text-3xl font-bold text-yellow-600">
                 Welcome Back
               </h2>
               <p className="text-gray-500 mt-2">
                 Please enter your credentials
               </p>
             </div>

             {error && (
               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                 {error}
               </div>
             )}

             <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-2">
                 <label
                   htmlFor="userId"
                   className="block text-sm font-medium text-gray-700"
                 >
                   User ID
                 </label>
                 <input
                   id="userId"
                   type="text"
                   name="userId"
                   placeholder="Enter your user ID"
                   value={credentials.userId}
                   onChange={handleChange}
                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                 />
               </div>

               <div className="space-y-2">
                 <label
                   htmlFor="password"
                   className="block text-sm font-medium text-gray-700"
                 >
                   Password
                 </label>
                 <input
                   id="password"
                   type="password"
                   name="password"
                   placeholder="Enter your password"
                   value={credentials.password}
                   onChange={handleChange}
                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                 />
               </div>

               <Button
                 type="submit"
                 className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-4 rounded-lg transition-all duration-300"
               >
                 Sign In
               </Button>
             </form>

             <div className="text-center text-sm text-gray-500">
               <p>Need help? Contact support</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
};

export default AdminLogin;




