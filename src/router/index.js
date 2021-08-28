import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import RecoverPassword from '../views/Auth/RecoverPassword';
import ResetPassword from '../views/Auth/ResetPassword';
import Dashboard from '../views/Dashboard';
import Orders from '../views/Orders';
import Estimates from '../views/Estimates';
import Company from '../views/Company';
import Addresses from '../views/Addresses';
import Payments from '../views/Payments';
import Profile from '../views/Profile';
import Equipments from '../views/Equipments';
import PartAdd from '../views/Buyer/Parts/PartAdd';
import Users from '../views/Shared/Users.vue'
import Notification from '../views/Notification.vue'
import UpdateEstimate from '../components/Buyer/Parts/PartUpdate'
import ProposalAdd from '../views/Seller/Proposals/ProposalAdd'
import ProposalEdit from '../views/Seller/Proposals/ProposalEdit'
import ProposalsByEstimate from '../views/ProposalsByEstimate'
Vue.use(VueRouter);

const routes = [ 
  {
    path: '/',
    component: Layout,
    children: [
      { path: '',  name: 'dashboard', component: Dashboard},
      { path: '/pedidos',  name: 'orders', component: Orders, props: true},
      { path: '/cotacoes',  name: 'estimates', component: Estimates, props: true},
      { path: '/enderecos',  name: 'addresses', component: Addresses, props: true},
      { path: '/equipamentos',  name: 'equipments', component: Equipments, props: true},
      { path: '/empresa',  name: 'companies', component: Company},
      { path: '/pagamentos',  name: 'payments', component: Payments},
      { path: '/perfil',  name: 'profile', component: Profile, props: true},

      { path: '/cotacao/:estimate_id/proposta', name: 'addProposal', component: ProposalAdd},
      { path: '/cotacao/:estimate_id/proposta/:proposal_id', name: 'updateProposal', component: ProposalEdit},
      { path: '/cotacao/:estimate_id/propostas', name: 'ProposalsByEstimate', component: ProposalsByEstimate},

     
      { path: '/cotacao', name: 'partAdd', component: PartAdd},
      { path: '/cotacao/:id', name: 'editEstimate', component: UpdateEstimate},
      {path:  '/usuarios',name:'usuarios', component:Users},
      {path:  '/notificacoes', name:'notifications', component:Notification},
    ]
  },
  {
    path: '/entrar',
    name: 'login',
    component: Login
  },
  {
    path: '/registrar',
    name: 'register',
    component: Register
  },
  {
    path: '/recuperar-senha',
    name: 'recoverPassword',
    component: RecoverPassword
  },
  {
    path: '/resetar-senha',
    name: 'resetPassword',
    component: ResetPassword
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/entrar', '/registrar', '/recuperar-senha', '/resetar-senha'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');

  if(loggedIn && !authRequired) {
    return next('/');
  }

  if (authRequired && !loggedIn) {
      return next('/entrar');
  }

  next();
})


export default router;
