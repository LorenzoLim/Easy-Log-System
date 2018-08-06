import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const setJwt = (token) => {
  localStorage.setItem('token', token)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
};

export {api, setJwt}
