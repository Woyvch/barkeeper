import axios from 'axios';
//import dotenv from 'dotenv';

// the single Axios instance we use for calls
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // this is the default
  ssl: {
    rejectUnauthorized: false
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const dotenv = require("dotenv");
//dotenv.config();
/* process.env now has the keys and values defined in your .env file */
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

export default {
  getUsers() {
    console.log(process.env.DATABASE_URL);
    return apiClient.get('/users');
  },
};