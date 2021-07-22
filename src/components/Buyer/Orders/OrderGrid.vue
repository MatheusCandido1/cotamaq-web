<template>
   <span>
   <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
                      <div class="flex -mx-3">
                        <div class="w-4/5 px-3 mb-5">
                            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Pedidos
                                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                            </h2>
                        </div>
                        
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Pesquisar</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input v-model="filter.input.data.value" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            </div>                         
                        </div>
                      </div>
              <div class="flex -mx-3">
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Data Início</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input :max="filter.end_date" v-model="filter.start_date" type="date" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Data Final</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input :min="filter.start_date" v-model="filter.end_date"  type="date" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Situação</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <select v-model="filter.situation"  class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lightercursor-pointer">
                                    <option value="0">Selecione...</option>
                                    <option value="1">Pendente</option>
                                    <option value="2">Em preparo</option>
                                    <option value="3">Em trânsito</option>
                                    <option value="4">Entregue</option>
                                  </select>                            
                              </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button @click="filterData()" class="w-full flex items-center justify-center bg-white text-gray-600 font-semibold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                  </svg>
                                  <span class="justify-center ml-2">Filtrar</span>
                                </button>                         
                                </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button @click="clearFilter()" class="w-full flex items-center justify-center bg-white text-gray-600 font-semibold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                                  <span class="justify-center ml-2">Limpar</span>
                                </button>                         
                                </div>                         
                        </div>
                    </div>
                    <div>
    <span class="flex justify-center items-center text-gray-700" v-if="orders && orders.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum pedido encontrado...' }}</span>
    <div v-if="orders && orders.length !== 0">
        <span class="flex items-center justify-end text-gray-600 font-semibold">
                Items por página
                <select v-model="itemsPerpage" class="w-20 pl-4  ml-3 border-primary-main px-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select> 
            </span>
    <v-table
        class="w-full whitespace-no-wrap mb-2" 
        :data="filteredOrders"     
        :pageSize="itemsPerpage"
        :hideSortIcons="true"
        @totalPagesChanged="totalPages = $event"
        :filters="filter.input"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="id">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="created_at">Data</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="proposal.estimate.equipment">Equipamento</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="status">Status</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="proposal.products.length">Peças</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="proposal.total">Valor Total</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">

            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">Cotação #{{row.proposal.estimate.id}}</td>
                <td class="text-sm text-center text-gray-700">{{row.created_at | formatDate}}</td>
                <td class="text-sm text-center text-gray-700">
                    {{formatEquipment(row.proposal.estimate.equipment)}}
                </td>
                <td class="text-sm text-center text-gray-700">
                    <span class="flex justify-center">
                        <div :class="formatDefault(row.status)" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            <i :class="formatStatusIcon(row.status)" class="text-white text-md mr-1"></i> {{formatName(row.status)}}
                        </div>
                    </span>
                </td>
                <td class="text-sm text-center text-gray-700">
                    {{row.proposal.products.length}}
                </td>
                <td class="text-sm text-center">{{row.proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="flex justify-center mt-1 mb-1">
                    <div class="flex items-center space-x-2 text-sm">
                        <router-link :to="{name: 'OrderDetails', params: {id: row.id}}" class="animate-bounce flex items-center justify-between px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>                        
                        </router-link>

                        <button @click="showOrderFileModalVisible(row)"  class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>                       
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3 whitespace-nowrap">
                Total: {{filteredOrders.length}} registro(s)
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
            />
            
                </span>
            </div>

    </div>
    </div>
            </div>
    <order-file
        v-if="isOrderFileModalVisible"
        :order="order"
        @close="closeOrderFileModalVisible"
    
    ></order-file>
  </span>
</template>

<script>
import { bus } from '../../../main';
import OrderFile from './OrderFile';
import { orderService } from '../../../services'
import { BarLoader } from '@saeris/vue-spinners';
import { formatEquipment } from '@/helpers/string-helper';

export default {
    name: 'OrderGrid',
    components: {
        OrderFile,
        BarLoader
    },
    created() {
        this.getOrders();
    },
    
    data() {
        return {
            orders: [],
            filteredOrders: [],
            order: {},
            isOrderFileModalVisible: false, 
            filter: {
                start_date: null,
                end_date: null,
                situation: 0,
                input: {
                    data: {value: '', keys: ['id','created_at','proposal.estimate.equipment','proposal.total']},
                }
            },
            currentPage: 1,
            itemsPerpage: 10,
            totalPages: 5,
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            statusName: ['Pendente','Em preparo','Em trânsito','Entregue'],
            statusColor: ['bg-orange-400','bg-blue-400','bg-indigo-600','bg-primary-main'],
            statusIcon: ['mdi mdi-progress-clock','mdi mdi-package-variant-closed','mdi mdi-truck-fast-outline','mdi mdi-calendar-check-outline']
        }
    },
    methods: {
        formatEquipment,
        formatDefault(id) {
            return this.statusColor[id-1]
        },
        formatName(id) {
            return this.statusName[id-1]
        }, 
        formatStatusIcon(id) {
            return this.statusIcon[id-1]
        },
        showOrderFileModalVisible(data) {
            this.order = data
            this.isOrderFileModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeOrderFileModalVisible() {
            this.order = null
            this.isOrderFileModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        filterData() {
            this.filteredOrders = this.orders;
            if(this.filter.situation != 0 && this.filter.end_date == null && this.filter.start_date == null) {
                this.filteredOrders = this.filteredOrders.filter(order => (order.status == this.filter.situation))
                return this.filteredOrders
            }

            else if(this.filter.start_date != null && this.filter.end_date == null && this.filter.situation == 0) {
                if(this.filter.start_date != null && this.filter.end_date == null) {
                    this.filteredOrders = this.filteredOrders.filter(order => order.created_at >= this.filter.start_date)
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
                
            }

            else if(this.filter.end_date != null && this.filter.start_date == null && this.filter.situation == 0) {
                // Somente Data Fim
                if(this.filter.end_date != null && this.filter.start_date == null && this.filter.situation == 0) {
                    this.filteredOrders = this.filteredOrders.filter(order => (order.created_at <= this.filter.end_date))
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
            }

            else if(this.filter.situation != 0 && this.filter.start_date != null && this.filter.end_date == null) {
                // Situação e Data Inicio
                if(this.filter.situation != 0 && this.filter.start_date != null && this.filter.end_date == null) {
                    this.filteredOrders = this.filteredOrders.filter(order => (order.created_at >= this.filter.start_date) && (order.status == this.filter.situation))
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
            }

            else if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                // Situação e Data Fim
                if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                    this.filteredOrders = this.filteredOrders.filter(order => (order.created_at <= this.filter.end_date && order.status == this.filter.situation))
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
            }
            else if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation == 0) {
                // Entre data inicio e data fim
                if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation == 0) {
                    this.filteredOrders = this.filteredOrders.filter(order => (order.created_at >= this.filter.start_date) && (order.created_at <= this.filter.end_date))
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
            }

            else if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation != 0) {
                // Filtro Completo
                if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation != 0) {
                    this.filteredOrders = this.filteredOrders.filter(order => (order.created_at >= this.filter.start_date &&  order.created_at <= this.filter.end_date &&  order.status == this.filter.situation))
                    return this.filteredOrders
                } else {
                    return this.filteredOrders
                } 
            }

            else if(this.filter.start_date == null && this.filter.end_date == null && this.filter.situation == 0) {
                this.$toast.info('Preencha pelo menos um dos campos!', {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
            }

        },
        clearFilter() {
            this.filter.start_date = null
            this.filter.end_date = null
            this.filter.situation = 0
            this.getOrders()
        },
        getOrders() {
            this.loader.loading = true
            orderService.getOrders().then((response) => {
                this.loader.loading = false
                this.orders = response.data.data
                this.filteredOrders = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
                this.loader.loading = false
            })
        }
    }
}
</script>

<style>
.no-selection {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.vt-sort:before{
    font-family: FontAwesome;
    padding-right: 0.5em;
    width: 1.28571429em;
    display: inline-block;
    text-align: center;
}

.vt-sortable:before{
    font-family: FontAwesome;
    font-weight: 900;
    content: "\f0dc";
}

.vt-asc:before{
    font-family: FontAwesome;
    font-weight: 900;
    content: "\f160";
}

.vt-desc:before{
    font-family: FontAwesome;
    font-weight: 900;
    content: "\f161";
}
</style>