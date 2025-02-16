// // components/Common/UrlValidator.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UrlValidator = () => {
//     const { entityCode } = useParams();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
     
//         const validateEntity = async () => {
//           try {
//               console.log('Validating:', entityCode);
//               const response = await axios.get(`http://localhost:2002/entity/validate`, {
//                   params: { shortDesc: entityCode }
//               });
              
//               if (response.data) {
//                   localStorage.setItem('ENTITY_CODE', response.data.ENTITY_CODE);
//                   navigate('/');
//               }
//           } catch (error) {
//               console.error('Validation failed:', error);
//               navigate('/not-found');
//           }
//       };
      
//        validateEntity();
//         // if (entityCode) {
//         //     validateEntity();
//         // } else {
//         //     navigate('/not-found');
//         // }
//     }, [entityCode, navigate]);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-center">
//                     <div className="spinner"></div>
//                     <p className="mt-4">Validating...</p>
//                 </div>
//             </div>
//         );
//     }

//     return null;
// };

// export default UrlValidator;
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UrlValidator = () => {
    const { entityCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const validateEntity = async () => {
            try {
                const response = await axios.get(`http://localhost:2002/entity/validate`, {
                    params: { shortDesc: entityCode }
                });
                
                if (response.data) {
                    // Store the entity code and navigate to booking landing
                    localStorage.setItem('ENTITY_CODE', response.data.ENTITY_CODE);
                    // Navigate to booking landing without navbar
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.error('Validation failed:', error);
                navigate('/not-found');
            }
        };
        
        validateEntity();
    }, [entityCode, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="spinner"></div>
                <p className="mt-4">Validating...</p>
            </div>
        </div>
    );
};

export default UrlValidator;