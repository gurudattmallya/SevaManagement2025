import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SevaBooking = () => {
  const navigate = useNavigate();
  const [masterSevas, setMasterSevas] = useState([]);
  const [specialSevas, setSpecialSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sevaShashwath, setSevaShashwath] = useState('');

  const entityCode = localStorage.getItem('ENTITY_CODE');
  const API_BASE_URL = 'http://localhost:2002/api';

  useEffect(() => {
    const fetchSevas = async () => {
      try {
        const [masterResponse, specialResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/master-sevas/${entityCode}`, {
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' }
          }),
          axios.get(`${API_BASE_URL}/special-sevas/${entityCode}`, {
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' }
          })
        ]);

        setMasterSevas(masterResponse.data);
        setSpecialSevas(specialResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sevas:', err.message);
        setError(`Failed to load sevas: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSevas();
  }, [entityCode]);

  const handleSevaClick = (sevaId, sevaType,sevaShashwath) => {
    console.log(sevaShashwath);
    navigate(`/booking/sub-sevas/${sevaId}`, {
      state: {
        sevaType: sevaType,
        sevaId: sevaId,
        sevaShashwath: sevaShashwath
      }
    });
  };

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-gray-800 mb-4">{error}</p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg 
                     hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 
                     transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto p-6 pt-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 
                     mb-8 text-center">
          Select Your Seva
        </h2>
        
        {masterSevas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-200"></div>
              <h3 className="text-2xl font-semibold text-gray-800 px-4">Master Sevas</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterSevas.map((seva) => (
                <div
                  key={seva.id}
                  onClick={() => handleSevaClick(seva.id, 'master', seva.SEVA_SASHWATH)}

                  className="group relative bg-white rounded-xl overflow-hidden shadow-md 
                           hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 
                               group-hover:from-orange-500/5 group-hover:to-orange-500/10 transition-all duration-300"></div>
                  <div className="relative p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-orange-600 
                                transition-colors duration-300">
                      {seva.name}
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {seva.description}
                    </p>
                    <div className="absolute bottom-0 right-0 w-12 h-12 -mb-6 -mr-6 
                                bg-gradient-to-br from-orange-500/0 to-orange-500/10 
                                rounded-full transform scale-0 group-hover:scale-100 
                                transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {specialSevas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-200"></div>
              <h3 className="text-2xl font-semibold text-gray-800 px-4">Special Sevas</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialSevas.map((seva) => (
                <div
                  key={seva.id}

                  onClick={() => handleSevaClick(seva.id, 'special', seva.SEVA_SASHWATH)}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md 
                           hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 
                               group-hover:from-orange-500/5 group-hover:to-orange-500/10 transition-all duration-300"></div>
                  <div className="relative p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-orange-600 
                                transition-colors duration-300">
                      {seva.name}
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {seva.description}
                    </p>
                    <div className="absolute bottom-0 right-0 w-12 h-12 -mb-6 -mr-6 
                                bg-gradient-to-br from-orange-500/0 to-orange-500/10 
                                rounded-full transform scale-0 group-hover:scale-100 
                                transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="w-full max-w-md mx-auto block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   text-white text-lg font-medium rounded-xl shadow-md 
                   hover:from-orange-600 hover:to-orange-700 transform hover:scale-102 
                   transition-all duration-300 hover:shadow-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SevaBooking;








