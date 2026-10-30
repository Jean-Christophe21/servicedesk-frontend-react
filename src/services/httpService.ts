import axios from "axios";

const axiosInstance = axios.create({
    // url de l'api
    baseURL: import.meta.env.VITE_API_URL,
//    withCredentials:true
});

export default {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
};
