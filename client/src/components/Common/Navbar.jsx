import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Home, LogOut, User, Shield } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entityCode = localStorage.getItem('entityCode');
  const userName = localStorage.getItem('USER_NAME');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      setCurrentTime(now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('entityCode');
    localStorage.removeItem('userId');
    localStorage.removeItem('created');
    localStorage.removeItem('ENTITY_CODE');
    navigate('/admin/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

//   return (
//     <nav className="bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Left section */}
//           <div className="flex items-center space-x-6">
//             <button
//               onClick={handleHome}
//               className="flex items-center text-white hover:text-yellow-100 font-medium transition-all duration-200 hover:scale-105"
//             >
//               <Home size={20} className="mr-2" />
//               <span>Home</span>
//             </button>

//             <Link
//               to="/admin/dashboard"
//               className={`flex items-center text-white hover:text-yellow-100 font-medium transition-all duration-200 hover:scale-105 
//                 ${isAdminRoute ? 'border-b-2 border-white pb-0.5' : ''}`}
//             >
//               <span>Admin Dashboard</span>
//             </Link>
//           </div>

//           {/* Center section - Date and Time */}
//           <div className="hidden md:flex flex-col items-center text-white">
//             <div className="flex items-center text-sm font-medium">
//               <Calendar size={16} className="mr-2" />
//               {currentDate}
//             </div>
//             <div className="text-xs text-yellow-100">
//               {currentTime}
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-6">
//             <button
//               onClick={handleLogout}
//               className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-yellow-500 font-medium transition-all duration-200 hover:shadow-md"
//             >
//               <LogOut size={20} className="mr-2" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile date display */}
//       <div className="md:hidden bg-yellow-500 py-1">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center text-white text-sm">
//             <Calendar size={14} className="mr-2" />
//             {currentDate}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
 return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-orange-500/30 shadow-lg border-b border-orange-200/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleHome}
              className="flex items-center text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 hover:scale-105"
            >
              <Home size={20} className="mr-2" strokeWidth={1.5} />
              <span>Home</span>
            </button>
             
            <Link
              to="/admin/dashboard"
              className={`flex items-center text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 hover:scale-105 ${
                isAdminRoute ? 'border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              <Shield size={20} className="mr-2" strokeWidth={1.5} />
              <span>Admin Dashboard</span>
            </Link>
          </div>

          {/* Center section - Date and Time */}
          <div className="hidden md:flex flex-col items-center text-amber-800">
            <div className="flex items-center text-sm font-medium">
              <Calendar size={16} className="mr-2" strokeWidth={1.5} />
              {currentDate}
            </div>
            <div className="text-xs text-amber-700/80">{currentTime}</div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* User Name Display */}
            <div className="flex items-center text-amber-800 font-medium">
              <User size={18} className="mr-2" strokeWidth={1.5} />
              <span>{userName || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg text-amber-800 hover:bg-amber-500/20 font-medium transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <LogOut size={20} className="mr-2" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile date display */}
      <div className="md:hidden bg-amber-100 py-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center text-amber-800 text-sm">
            <Calendar size={14} className="mr-2" strokeWidth={1.5} />
            {currentDate}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;