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
  // Ophalen van alle dranken uit de database
  getDrinks() {
    return apiClient.get('/drinks');
  },
  // Een nieuwe drank toevoegen aan de database
  postDrink(drink) {
    let data = {
      id: drink.id,
      name: drink.name,
      price: drink.price,
      description: drink.description,
      category: drink.category,
    };
    return apiClient.post('/drinks', data);
  },
  // Een drank verwijderen uit de database
  deleteDrink(drink) {
    return apiClient.delete(`/drinks/${drink.id}`);
  },
  // De gegevens van een drank aanpassen
  putDrink(drink) {
    let data = {
      id: drink.id,
      name: drink.name,
      price: drink.price,
      description: drink.description,
      category: drink.category,
    };
    return apiClient.put('/drinks', data);
  },
  // De dranken opvragen van een bepaalde categorie?
  getCategoryDrinks(category) {
    return apiClient.get(`/drinks/${category.name}`);
  },
};