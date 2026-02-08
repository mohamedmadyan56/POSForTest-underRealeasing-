import axios from 'axios'

const API = axios.create({
    // تعديل السلاش لنقطتين قبل 5000
    baseURL: "http://localhost:5000/api/v1", 
    withCredentials: true, // ضروري جداً عشان الـ Cookies والتوكن
})

export default API;