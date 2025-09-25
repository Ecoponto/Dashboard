import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecotank.hirameki.me'
})

export default api;