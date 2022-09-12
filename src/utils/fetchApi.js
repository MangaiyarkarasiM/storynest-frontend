import axios from "axios";

const fetchApi = axios.create({
   baseURL:'http://localhost:5000',
})

export default fetchApi;