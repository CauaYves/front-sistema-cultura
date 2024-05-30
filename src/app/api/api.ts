import axios from 'axios';
export const baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;
const instance = axios.create({
    baseURL,
});
export default instance;
