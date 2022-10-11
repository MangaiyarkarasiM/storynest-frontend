import axios from "axios";

const fetchApi = axios.create({
   //baseURL:'https://storynest.herokuapp.com'
   baseURL:'http://localhost:5000',
})

export default fetchApi;