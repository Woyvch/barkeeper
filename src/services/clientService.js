import axios from 'axios';

// the single Axios instance we use for calls
const apiClient = axios.create({
  baseURL: 'https://aware-cactus-hero.glitch.me',
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
  // Een client toevoegen
  addClient(client) {
    let d = new Date();
    let data = {
      name: client.name,
      phone: client.phone,
      email: client.email,
      table: client.table,
      datetime: d.toLocaleString(),
    };
    //console.log(data);
    return apiClient.post('/clients', data);
  },
};