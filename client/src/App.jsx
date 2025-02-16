// // // export default App;
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Navbar from './components/Common/Navbar';
// // import AdminLogin from './pages/AdminLogin';
// // import AdminDashboard from './pages/AdminDashboard';
// // import ManageMasterSevas from './components/AdminPanel/ManageMasterSevas';
// // import ManageSpecialSevas from './components/AdminPanel/ManageSpecialSevas';
// // import ManageSubSevas from './components/AdminPanel/ManageSubSevas';
// // import BookingLanding from './pages/BookingLanding';
// // import SevaBooking from './components/Booking/SevaBooking';
// // import SubSevaSelection from './components/Booking/SubSevaSelection';
// // import DevoteeForm from './components/Booking/DevoteeForm';
// // import BookingConfirmation from './components/Booking/BookingConfirmation';
// // import NotFound from './pages/NotFound';
// // import ManageDeity from './components/AdminPanel/ManageDeity';
// // import Number from './components/Booking/Number';
// // import UrlValidator from './components/Common/UrlValidator'; // Add this import

// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>
    
// //            <Route path="/" element={<BookingLanding />} />
// //            <Route path="/admin/login" element={<AdminLogin />} />
// //            </Routes>
// //            <Navbar />
     
// //       <div className="main-content">
// //         <Routes>
// //           {/* Landing and Admin Routes */}
     
// //           <Route path="/admin/dashboard" element={<AdminDashboard />} />
// //           <Route path="/admin/manage/deity" element={<ManageDeity />} />
// //           <Route path="/admin/manage/master-sevas" element={<ManageMasterSevas />} />
// //           <Route path="/admin/manage/special-sevas" element={<ManageSpecialSevas />} />
// //           <Route path="/admin/manage/sub-sevas" element={<ManageSubSevas />} />

// //           {/* Temple-specific Routes */}
// //           <Route path="/temple/:entityCode" element={<UrlValidator />} />
          
// //           {/* Booking Flow Routes */}
// //           <Route path="/booking/form" element={<SevaBooking />} />
// //           <Route path="/booking/sevas" element={<SevaBooking />} />
// //           <Route path="/booking/phone" element={<Number />} />
// //           <Route path="/booking/sub-sevas/:sevaId" element={<SubSevaSelection />} />
// //           <Route path="/booking/devotee-form" element={<DevoteeForm />} />
// //           <Route path="/booking/confirmation" element={<BookingConfirmation />} />

// //           {/* Catch-all route for undefined paths */}
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Common/Navbar';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';
// import ManageDeity from './components/AdminPanel/ManageDeity';
// import ManageMasterSevas from './components/AdminPanel/ManageMasterSevas';
// import ManageSpecialSevas from './components/AdminPanel/ManageSpecialSevas';
// import ManageSubSevas from './components/AdminPanel/ManageSubSevas';
// import BookingLanding from './pages/BookingLanding';
// import SevaBooking from './components/Booking/SevaBooking';
// import SubSevaSelection from './components/Booking/SubSevaSelection';
// import DevoteeForm from './components/Booking/DevoteeForm';
// import BookingConfirmation from './components/Booking/BookingConfirmation';
// import NotFound from './pages/NotFound';
// import Number from './components/Booking/Number';
// import UrlValidator from './components/Common/UrlValidator';

// // Protected Route wrapper for admin routes
// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   if (!isLoggedIn) {
//     return <Navigate to="/admin/login" />;
//   }
//   return (
//     <>
//       <Navbar />
//       {children}
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Admin Login Route - No Navbar */}
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* Temple User Route - No Navbar */}
//         <Route path="/temple/:entityCode" element={<UrlValidator />} />
        
//         {/* Admin Routes - With Navbar after login */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/manage/deity"
//           element={
//             <ProtectedRoute>
//               <ManageDeity />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/manage/master-sevas"
//           element={
//             <ProtectedRoute>
//               <ManageMasterSevas />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/manage/special-sevas"
//           element={
//             <ProtectedRoute>
//               <ManageSpecialSevas />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/manage/sub-sevas"
//           element={
//             <ProtectedRoute>
//               <ManageSubSevas />
//             </ProtectedRoute>
//           }
//         />

//         {/* Public Routes - No Navbar */}
//         <Route path="/" element={<BookingLanding />} />
//         <Route path="/booking/form" element={<SevaBooking />} />
//         <Route path="/booking/sevas" element={<SevaBooking />} />
//         <Route path="/booking/phone" element={<Number />} />
//         <Route path="/booking/sub-sevas/:sevaId" element={<SubSevaSelection />} />
//         <Route path="/booking/devotee-form" element={<DevoteeForm />} />
//         <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        
//         {/* Catch-all route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageDeity from './components/AdminPanel/ManageDeity';
import ManageMasterSevas from './components/AdminPanel/ManageMasterSevas';
import ManageSpecialSevas from './components/AdminPanel/ManageSpecialSevas';
import ManageSubSevas from './components/AdminPanel/ManageSubSevas';
import BookingLanding from './pages/BookingLanding';
import SevaBooking from './components/Booking/SevaBooking';
import SubSevaSelection from './components/Booking/SubSevaSelection';
import DevoteeForm from './components/Booking/DevoteeForm';
import BookingConfirmation from './components/Booking/BookingConfirmation';
import NotFound from './pages/NotFound';
import Number from './components/Booking/Number';
import UrlValidator from './components/Common/UrlValidator';
// import DummyConfirmationPage from './components/Booking/DummyConfirmationPage';
import PaymentPage from './components/Booking/PaymentPage';
import ManageStatistics from './components/AdminPanel/ManageStatistics';
import UniversalScanner from './components/AdminPanel/UniversalScanner';
import RoleManagement from './components/AdminPanel/RoleManagement';
import UserManagement from './components/AdminPanel/UserManagement';
import Footer from './components/Common/Footer';
import HomeImage from './components/AdminPanel/homeImage';
// import { json } from 'stream/consumers';



// Layout component for authenticated routes
const AuthenticatedLayout = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  
  // Show navbar only for logged-in users and non-temple routes
  const showNavbar = isLoggedIn && !location.pathname.startsWith('/temple');
  
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
 const permissions= JSON.parse(localStorage.getItem('permissions'));
  const user= localStorage.getItem('userId');
 
  const location = useLocation();

  if (!isLoggedIn && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" />;
  }
if (!user) {
  
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }


  if(!permissions.map(page => {return page.url}).includes(location.pathname) && location.pathname != '/admin/login'){
  
     return  null;
 
  } else{
    console.log("u have access")
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes outside AuthenticatedLayout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/temple/:entityCode" element={<UrlValidator />} />

        {/* All other routes wrapped in AuthenticatedLayout */}
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                {/* Protected Admin Routes */}
                <Route
                  path="admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/deity"
                  element={
                    <ProtectedRoute>
                      <ManageDeity />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/master-sevas"
                  element={
                    <ProtectedRoute>
                      <ManageMasterSevas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/special-sevas"
                  element={
                    <ProtectedRoute>
                      <ManageSpecialSevas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/sub-sevas"
                  element={
                    <ProtectedRoute>
                      <ManageSubSevas />
                    </ProtectedRoute>
                  }
                />
                {/* Protected Admin Routes */}
                <Route
                  path="admin/manage/statistics"
                  element={
                    <ProtectedRoute>
                      <ManageStatistics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/scanner"
                  element={
                    <ProtectedRoute>
                      <UniversalScanner />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/roles"
                  element={
                    <ProtectedRoute>
                      <RoleManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/users"
                  element={
                    <ProtectedRoute>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/manage/image"
                  element={
                    <ProtectedRoute>
                    <HomeImage/>
                    </ProtectedRoute>
                  }
                />

                {/* Public Routes */}
                <Route path="" element={<BookingLanding />} />
                <Route path="booking/form" element={<SevaBooking />} />
                <Route path="booking/sevas" element={<SevaBooking />} />
                <Route path="booking/phone" element={<Number />} />
                <Route
                  path="booking/sub-sevas/:sevaId"
                  element={<SubSevaSelection />}
                />
                <Route path="booking/devotee-form" element={<DevoteeForm />} />
                <Route
                  path="booking/confirmation"
                  element={<BookingConfirmation />}
                />
                <Route path="/payment" element={<PaymentPage />} />
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


