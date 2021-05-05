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
  // Alle categorieën ophalen uit de database
  getCategories() {
    return apiClient.get('/categories');
  },
  // Enkel de namen van de categoriën ophalen
  getCatNames() {
    return apiClient.get('/categoryNames');
  },
  // Een categorie toevoegen aan de database
  postCategory(category) {
    let data = {
      name: category.name
    };
    return apiClient.post('/categories', data);
  },
  // Een bestaande categorie aanpassen
  putCategory(category) {
    let data = {
      id: category.id,
      name: category.name
    };
    return apiClient.put('/categories', data);
  },
  // Een categorie verwijderen uit de database
  deleteCategory(category) {
    return apiClient.delete(`/categories/${category.name}`);
  },
};