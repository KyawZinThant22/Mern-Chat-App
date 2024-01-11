import axios from "axios"

export const api  = axios.create({
    baseURL : '/api'
 })

 export const BACKEND_URL= "http://localhost:8080/api/"