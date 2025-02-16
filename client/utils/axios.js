// import * as axios_lib from 'axios';

 
// export const baseURL=import.meta.env.VITE_BACKEND_URL;
// export const axios =axios_lib.default.create({
//     baseURL,timeout:100000
// })

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/api', // your API base URL
});

export default axiosInstance; // Default export
