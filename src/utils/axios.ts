import axios from 'axios'

console.log(import.meta.env.VITE_API_BASEURL)

const instanceAxios = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_BASEURL + '/api/v1'
})

export default instanceAxios
