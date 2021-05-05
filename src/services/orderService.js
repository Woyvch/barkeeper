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
  // Een bestelling toevoegen aan de database
  addOrder(item) {
    let d = new Date();
    let data = {
      table: item.table,
      datetime: d.toLocaleString(),
    };
    //console.log(data);
    return apiClient.post('/orders', data);
  },
  // Alle bestellingen ophalen uit de database
  getOrders() {
    return apiClient.get('/orders');
  },
  // De details van een bestelling opslaan
  addOrdering(id, item) {
    let data = {
      item: item.item.name,
      quantity: item.quantity,
      value: item.value,
      orderId: id,
    };
    //console.log(data);
    return apiClient.post('/ordering', data);
  },
  // De details van een bestelling opvragen
  getOrderings() {
    return apiClient.get('/ordering');
  },
};