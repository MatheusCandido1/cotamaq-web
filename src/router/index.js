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
import EstimateAdd from '../views/Buyer/Estimates/EstimateAdd';
import EstimateEdit from '../views/Buyer/Estimates/EstimateEdit';
import EstimateDetail from '../views/Buyer/Estimates/EstimateDetail';
import ProposalDetail from '../views/Seller/Proposals/ProposalDetail';
import Proposals from '../views/Proposals';
import ProposalDetailBuyer from '../views/Buyer/Proposals/ProposalDetail';
import EstimateDetailSeller from '../views/Seller/Estimates/EstimateDetails';
import ProposalDetailSeller from '../components/Seller/Proposals/ProposalDetail';
import EstimateRejected from '../components/Seller/Estimates/EstimateRejected';
import OrderDetails from '../views/OrderDetails';
import PartAdd from '../views/Buyer/Parts/PartAdd';
import PartDetails from '../views/Buyer/Parts/PartDetails';

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
      { path: '/criar/cotacao',  name: 'addEstimate', component: EstimateAdd},
      { path: '/editar/cotacao/:id',  name: 'editEstimate', component: EstimateEdit},
      { path: '/propostas/cotacao/:id',  name: 'detailEstimate', component: EstimateDetail},
      { path: '/proposta/:id',  name: 'detailProposal', component: ProposalDetail},
      { path: '/propostas', name: 'Proposals', component: Proposals},
      { path: '/detalhe/proposta/:id', name: 'detailBuyerDetail', component: ProposalDetailBuyer},
      { path: '/detalhe/cotacao/:id', name: 'detailSellerEstimate', component: EstimateDetailSeller},
      { path: '/proposta/enviada/:id', name: 'detailSellerProposal', component: ProposalDetailSeller},
      { path: '/detalhe/pedidos/:id',  name: 'OrderDetails', component: OrderDetails, props: true},
      { path: '/cotacao/rejeitada/:id',  name: 'estimateRejected', component: EstimateRejected},
      { path: '/cotacao', name: 'partAdd', component: PartAdd},
      { path: '/cotacao/:id', name: 'partDetails', component: PartDetails, props: true}
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
