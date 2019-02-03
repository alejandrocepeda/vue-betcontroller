import axios from 'axios'

window.axios = axios
window.axios.defaults.baseURL = process.env.API_URL