import axios from 'axios';

// the single Axios instance we use for calls
const apiClient = axios.create({
  baseURL: 'http://localhost:5432',
  //baseURL: process.env.DATABASE_URL + 'sslmode=require', // with ssl?
  withCredentials: false, // this is the default
  ssl: {
    rejectUnauthorized: false
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  /* with pagination */
  getUsers() {
    console.log(process.env.DATABASE_URL);
    return apiClient.get('/users');
  },
};