<template>
   <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3">
                        <div class="w-4/5 px-3 mb-5">
                            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotações
                                    <bar-loader class="mt-3 mb-2" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
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
                                    <option value="3">Enviada</option>
                                    <option value="7">Cancelada</option>
                                    <option value="5">Rejeitada</option>
                                    <option value="6">Aprovada</option>
                                  </select>                            
                              </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button  @click="filterData()"  class="w-full flex items-center justify-center bg-white text-gray-600 font-semibold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
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
                    <div class="flex items-center justify-between">
            <button @click="getEstimates" class=" mb-2 mt-2 px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-md dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">                            
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>

         <span class=" text-gray-600 font-semibold">
                Items por página
                <select v-model="itemsPerpage" class="w-20 pl-4  ml-3 border-primary-main px-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select> 
            </span>
        </div>
    <span class="flex justify-center items-center text-gray-700" v-if="estimates && estimates.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum cotação encontrada...' }}</span>
    <div v-if="estimates && estimates.length !== 0">
    <v-table
        class="w-full whitespace-no-wrap mb-2" 
        :data="filteredEstimates"     
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="itemsPerpage"
        :filters="filter.input"
        @totalPagesChanged="totalPages = $event"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="id">Código</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="created_at">Data</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="equipment">Equipamento</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="status">Status</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="products">Peças</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="status.id">Valor Total</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">

            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">#{{row.id}}</td>
                <td class="text-sm text-center text-gray-700">{{row.created_at | formatDate}}</td>
                <td class="text-sm text-center text-gray-700">{{row.equipment}}</td>

               <td v-if="row.proposals_by_seller.length == 0" class="text-sm text-center text-gray-700">
                    <span>
                        <div :class="formatEstimateColor(row.proposals_by_seller.length >= 1 ? row.proposals_by_seller[0].status:row.status)"  class="w-full text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            {{formatEstimateName(row.proposals_by_seller.length >= 1 ? row.proposals_by_seller[0].status:row.status)}}
                        </div>
                    </span>
                </td> 
                
                <td v-else class="text-sm text-center text-gray-700">
                    <span>
                        <div :class="formatDefaultProposal(row.proposals_by_seller.length >= 1 ? row.proposals_by_seller[0].status:1)"  class="w-full text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            {{formatNameProposal(row.proposals_by_seller.length >= 1 ? row.proposals_by_seller[0].status:1)}}
                        </div>
                    </span>
                </td>
                <td class="text-sm text-center text-gray-700">{{row.products.length}}</td>
                <td class="text-sm text-center"> {{row.proposals_by_seller.length >= 1 ? row.proposals_by_seller[0].total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :'R$ 0,00'}} </td>
                <td v-if="row.proposals_by_seller.length == 0" class="flex justify-center mt-1 mb-1">
                    <div class="flex items-center space-x-2 text-sm">
                        <router-link  v-tooltip="{content: 'Visualizar Cotação'}" :to="{name: 'detailSellerEstimate', params: {id: row.id}}"   class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </router-link>
                        
                        <button  v-tooltip="{content: 'Recusar Cotação'}" @click="showProposalDeclineModal(row)" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                        </button>
                    </div>
                </td>
                <td v-else class="flex justify-center mt-1 mb-1">
                    <div class="flex items-center space-x-2 text-sm">
                        <router-link  v-tooltip="{content: 'Editar Proposta'}" v-if="row.proposals_by_seller[0].status == 1 " :to="{name: 'detailProposal', params: {id:row.proposals_by_seller[0].id}}"   class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </router-link>

                        <button  v-tooltip="{content: 'Recusar Cotação'}" v-if="row.proposals_by_seller[0].status == 1" @click="showProposalDeclineModal(row)" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                        </button>

                        <router-link v-tooltip="{content: 'Pedidos'}" v-if="row.proposals_by_seller[0].status == 6" :to="{name: 'orders'}" class="flex items-center justify-between px-2 py-2 bg-indigo-600 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </router-link>

                         <router-link v-tooltip="{content: 'Visualizar Proposta'}" v-if="row.proposals_by_seller[0].status == 2 || row.proposals_by_seller[0].status == 3 || row.proposals_by_seller[0].status == 7" :to="{name: 'detailSellerProposal', params: {id: row.proposals_by_seller[0].id}}" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </router-link>

                        <router-link v-tooltip="{content: 'Visualizar Cotação'}" v-if="row.proposals_by_seller[0].status == 5" :to="{name: 'estimateRejected', params: {id: row.id}}"   class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </router-link>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3 whitespace-nowrap" >
                Total: {{filteredEstimates.length}} registro(s)
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
    <estimate-decline
        v-if="isDeclineModalVisible"
        :proposal="proposal"
        @close="closeDeclineModal()"
    >
    </estimate-decline>

    <proposal-decline
        v-if="isProposalDeclineModalVisible"
        :proposal="proposal"
        @close="closeProposalDeclineModal()"
    >
    </proposal-decline>
    </div>

</template>
<script>
import { bus } from '../../../main';
import { BarLoader } from '@saeris/vue-spinners';
import { estimateService } from '../../../services';
import EstimateDecline from './EstimateDecline';
import ProposalDecline from '../Proposals/ProposalDecline';

export default {
    name: 'EstimateGrid',
    components: {
        BarLoader,
        EstimateDecline,
        ProposalDecline
    },
    mounted() {
        this.getEstimates();
         window.Echo.channel('events').listen('RealTimeMessage', () => {
             
            this.playSound('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3')

            this.$toast.info('Temos uma nova cotação disponível!', {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                
                estimateService.getAvailableEstimates().then((response) => {
                this.estimates = response.data.data
                this.filteredEstimates = response.data.data
                }).catch((error) => {
                    console.log(error.response.data)
                }) 
        });
        
    },
    updated() {
        bus.$off('updateEstimateSeller');
        bus.$on('updateEstimateSeller', (data) => {
            if(data) {
            this.getEstimates()
            }
        })
    },
    destroyed() {
        window.Echo.leaveChannel('events')
    },
    data() {
        return {
            isDeclineModalVisible: false,
            isProposalDeclineModalVisible: false,
            interval: null,
            proposal: {},
            estimate: {},
            filter: {
                start_date: null,
                end_date: null,
                situation: 0,
                input: {
                    data: {value: '', keys: ['id','equipment','created_at','observation']},
                }
            },
            filteredEstimates: [],
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            currentPage: 1,
            totalPages: 5,
            itemsPerpage: 10,
            estimates: [],
            estimateColors: ["bg-yellow-300","bg-yellow-300","bg-red-700","bg-blue-700"],
            estimateStatus: ["Pendente","Pendente","Cancelada","Andamento"],
            proposalColors: ["bg-yellow-300","bg-blue-400","bg-blue-400","bg-indigo-200","bg-red-600","bg-primary-main","bg-red-600"],
            proposalStatus: ['Pendente', 'Enviada',"Enviada","Iniciada", "Rejeitada", "Aprovada","Rejeitada"]
        }
    },
    methods: {
         playSound(url) {
             if(url) {
                var audio = new Audio(url);
                audio.play();
             }
        },
        clearFilter() {
            this.filter.start_date = null
            this.filter.end_date = null
            this.filter.situation = 0
            this.getEstimates()
        },
        filterData() {
            this.filteredEstimates = this.estimates;
            if(this.filter.situation != 0 && this.filter.end_date == null && this.filter.start_date == null) {
                // Somente Situação
                if(this.filter.situation != 0) {
                    if(this.filter.situation == 1) {
                        const newFilter = 2
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation || estimate.status == this.filter.situation:estimate.status == newFilter)
                    } else {
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation)
                        return this.filteredEstimates
                    }
                } else {
                    return this.filteredEstimates
                } 
            }

            else if(this.filter.start_date != null && this.filter.end_date == null && this.filter.situation == 0) {
                // Somente Data Inicio
                if(this.filter.start_date != null && this.filter.end_date == null) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.created_at >= this.filter.start_date)
                    return this.filteredEstimates
                } else {
                    return this.filteredEstimates
                } 
                
            }

            else if(this.filter.end_date != null && this.filter.start_date == null && this.filter.situation == 0) {
                // Somente Data Fim
                if(this.filter.end_date != null && this.filter.start_date == null && this.filter.situation == 0) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at <= this.filter.end_date))
                    return this.filteredEstimates
                } else {
                    return this.filteredEstimates
                } 
            }

            else if(this.filter.situation != 0 && this.filter.start_date != null && this.filter.end_date == null) {
                // Situação e Data Inicio
                  if(this.filter.situation == 1) {
                        const newFilter = 2
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at >= this.filter.start_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation || estimate.status == this.filter.situation:estimate.status == newFilter))
                    } else {
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at >= this.filter.start_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation))
                        return this.filteredEstimates
                    }
            }

            
            else if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                // Situação e Data Fim
                if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                     if(this.filter.situation == 1) {
                        const newFilter = 2
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at <= this.filter.end_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation || estimate.status == this.filter.situation:estimate.status == newFilter))
                    } else {
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at <= this.filter.end_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation))
                        return this.filteredEstimates
                    }
                } else {
                    return this.filteredEstimates
                } 
            }

            else if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation == 0) {
                // Entre data inicio e data fim
                if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation == 0) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at >= this.filter.start_date &&  estimate.created_at <= this.filter.end_date))
                    return this.filteredEstimates
                } else {
                    return this.filteredEstimates
                } 
            }

            else if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation != 0) {
                // Filtro Completo
                if(this.filter.start_date != null && this.filter.end_date != null && this.filter.situation != 0) {
                    if(this.filter.situation == 1) {
                        const newFilter = 2
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at >= this.filter.start_date &&  estimate.created_at <= this.filter.end_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation || estimate.status == this.filter.situation:estimate.status == newFilter))
                    } else {
                        this.filteredEstimates = this.filteredEstimates.filter(estimate => (estimate.created_at >= this.filter.start_date &&  estimate.created_at <= this.filter.end_date) && (estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation))
                        return this.filteredEstimates
                    }
                } else {
                    return this.filteredEstimates
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
        showProposalDeclineModal(data) {
            this.proposal = data;
            this.isProposalDeclineModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeProposalDeclineModal() {
            this.isProposalDeclineModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showDeclineModal(data) {
            this.proposal = data;
            this.isDeclineModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeclineModal() {
            this.isDeclineModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        formatEstimateColor(id) {
            return this.estimateColors[id-1]
        },
        formatEstimateName(id) {
            return this.estimateStatus[id-1]
        },
        formatDefaultProposal(id) {
            return this.proposalColors[id-1]
        },
        formatNameProposal(id) {
            return this.proposalStatus[id-1]
        },
        getEstimates() {
            this.loader.loading = true
            estimateService.getAvailableEstimates().then((response) => {
                this.loader.loading = false
                this.estimates = response.data.data
                this.filteredEstimates = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
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