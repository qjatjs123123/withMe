import axios from 'axios';
import { cookies } from 'next/headers'; // Next.js 13+에서 서버 쿠키 가져오기

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

axios.interceptors.request.use(
  async (config) => {
    const cookieStore = cookies(); 
    const userDataCookie = (await cookieStore).get('userData'); 

    if (userDataCookie) {
      const userData = JSON.parse(decodeURIComponent(userDataCookie.value)); // 쿠키 값 디코딩 및 파싱
      const accessToken = userData.access_token; 

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`; 
      }
    }
    
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axios;
