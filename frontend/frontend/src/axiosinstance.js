import axios from "axios";

const baseUrl=import.meta.env.VITE_BACKEND_BASE_URL;
const axiosinstance = axios.create({
    baseURL:baseUrl,
})
axiosinstance.interceptors.request.use(function(config){
    const accesstoken=localStorage.getItem('accessToken')
    if(accesstoken){
        config.headers['Authorization']=`Bearer ${accesstoken}`
     }
    return config
    
  },
  function (error){
    return Promise.reject(error)
   }
)
axios.interceptors.response.use(function(response){
    return response;
},
    async function(error){
      const originalRequest=error.config;
       if(error.response.status===401 && !originalRequest.retry){
        originalRequest.retry=true;
        const refreshToken=localStorage.getItem('refreshToken');
        try{
        const response= await axiosinstance.post('/token/refresh',{refresh:refreshToken})
        localStorage.setItem('accessToken',response.data.access)
        originalRequest.headers['Authorization']=`Bearer ${response.data.access}`
        console.log('yes')
        return axiosinstance(originalRequest)
        }
        catch(error){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        }
    }
     return Promise.reject(error);
 }
)

export default axiosinstance