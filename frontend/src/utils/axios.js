import axios from "axios";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({baseURL:BASE_URL});

axiosInstance.interceptors.request.use((req)=>{
    return req
},(error)=>error);

axios.interceptors.response.use( (response) => response,
(error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance;