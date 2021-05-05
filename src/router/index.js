import Vue from 'vue';
import VueRouter from 'vue-router';
// Views
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Barkeeper from '@/views/Barkeeper.vue';
import Categories from '@/views/Categories.vue';
import Drinks from '@/views/Drinks.vue';
import Cart2 from '@/views/Cart2.vue';
import Settings from '@/views/Settings.vue';
import EditDrinks from '@/views/EditDrinks.vue';
import EditCategories from '@/views/EditCategories.vue';
import QRcode from '@/views/QRcode.vue';
import Orders from '@/views/Orders.vue';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home,
    // per-route guard
    beforeEnter(to, from, next) {
      const tableNr = sessionStorage.getItem('table');
      // Als de sessie een tafelnummer bevat
      if(tableNr > 0) next({ path: `/barkeeper/${tableNr}` });
      // anders ga door naar de startpagina
      else next();
    },
  },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/barkeeper/:table',
    component: Barkeeper,
    props: true,
    children: [
      {
        path: '',
        component: Categories,
        props: true,
      },
    ],
  },
  {
    path: '/drinks/:category',
    name: 'Drinks',
    component: Drinks,
    props: true, // Pass route.params to props
  },
  { path: '/cart2', name: 'Cart2', component: Cart2 },
  {
    path: '/settings',
    component: Settings,
    children: [
      {
        path: 'drinks',
        component: EditDrinks,
        props: true,
      },
      {
        path: 'categories',
        component: EditCategories,
        props: true,
      },
      {
        path: 'qrcode',
        component: QRcode,
        props: true,
      },
      {
        path: 'orders',
        component: Orders,
        props: true,
      },
    ],
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
