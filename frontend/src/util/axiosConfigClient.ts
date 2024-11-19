import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getCookieValue = (name: string) => {
  const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return matches ? decodeURIComponent(matches[2]) : null;
};

// axios 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const userDataCookie = getCookieValue('userData');

    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie); // 쿠키 값을 파싱
      const accessToken = userData.access_token;

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
