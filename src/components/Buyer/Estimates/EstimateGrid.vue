<template>
<div>
   <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3">
                        <div class="w-3/5 px-3 mb-5">
                            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Consulta de cotações 
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

                        <div class="w-1/5 px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <router-link  :to="{path: '/criar/cotacao'}" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  <span class="justify-center ml-2">Nova Cotação</span>
                                  
                                </router-link>  
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
                                    <option value="1">Rascunho</option>
                                    <option value="2">Enviada/Em andamento</option>
                                    <option value="5">Rejeitada</option>
                                    <option value="7">Cancelada</option>
                                    <option value="6">Aprovada</option>
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
           
             <div class="flex items-center justify-between">
            <button @click="playSound" class=" mb-2 mt-2 px-2 py-2 bg-primary-main text-sm font-medium leading-5 text-white rounded-md dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">                            
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
                <v-th  class="text-center" style="width: 10%" sortKey="id">Cotação</v-th>
                <v-th  class="text-center" style="width: 5%" sortKey="created_at">Data</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="equipment">Equipamento</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="proposals">Propostas</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="observation">Observação</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="status">Situação</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">

            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">#{{row.id}}</td>
                <td class="text-sm text-center text-gray-700">{{row.created_at | formatDate}}</td>
                <td class="text-sm text-center text-gray-700">{{row.equipment}}</td>
                <td v-if="row.status == 6" class="text-sm text-center text-gray-700">Não disponível</td>

                <td v-else class="text-sm text-center text-gray-700">{{row.proposals.reduce((acc,e)=>{e.status == 3 ?acc++:false; return acc},0)}}</td>
                <td class="text-sm text-center text-gray-700">{{row.observation}}</td>
                <td v-if="row.proposals.reduce((acc,e)=>{e.status == 3 ?acc++:false; return acc},0)" class="text-sm text-center">
                    <span class="flex justify-center">
                        <div  :class="formatDefault(3)" class="w-1/2  text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            {{formatName(3)}}
                        </div>
                    </span>
                </td>
                <td v-else class="text-sm text-center">
                    <span class="flex justify-center">
                        <div  :class="formatDefault(row.status)" class="w-1/2  text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            {{formatName(row.status)}}
                        </div>
                    </span>
                </td>
                <td class="flex justify-center mt-1 mb-1">
                    <div class="flex items-center space-x-2 text-sm">
                        <router-link v-tooltip="{content: 'Editar Cotação'}" v-if="row.status == 1" :to="{name: 'editEstimate', params: {id: row.id}}"  class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                        </router-link>

                        <router-link v-tooltip="{content: 'Visualizar Cotação'}"  v-if="row.status == 1 || row.status == 2 || row.status == 3 || row.status == 5"  :to="{name: 'detailEstimate', params: {id: row.id}}" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </router-link>

                        <router-link v-tooltip="{content: 'Pedidos'}" v-if="row.status == 6" :to="{name: 'OrderDetails', params: {id: row.proposals[0].order.id}}"   class="flex items-center justify-between px-2 py-2 bg-indigo-600 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </router-link>

                        <button v-tooltip="{content: 'Cancelar/Deletar Cotação'}" v-if="row.status == 1 || row.status == 2 || row.status == 5"  @click="showDeleteModal(row)"  class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                        </button>

                        <button v-tooltip="{content: 'Duplicar Cotação'}" v-if="row.status == 1 || row.status == 2 || row.status == 3 || row.status == 5  ||row.status == 6 || row.proposals.reduce((acc,e)=>{e.status == 3 ?acc++:false; return acc},0)" @click="showDuplicateModal(row)" class="flex items-center justify-between px-2 py-2 bg-yellow-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>                        
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3 whitespace-nowrap">
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
    <estimate-delete
                v-if="isDeleteModalVisible"
                :estimate="estimate"
                @close="closeDeleteModal"
            >
            </estimate-delete>

            <estimate-duplicate
                v-if="isDuplicateModalVisible"
                :estimate="estimate"
                @close="closeDuplicateModal"
            >
            </estimate-duplicate>
    </div>
</div>
</template>
<script>
import { bus } from '../../../main';
import { proposalService } from '../../../services';
import EstimateDelete from './EstimateDelete';
import EstimateDuplicate from './EstimateDuplicate';
import { BarLoader } from '@saeris/vue-spinners';
export default {
    name: 'ProposalGrid',
    components: {
        BarLoader,
        EstimateDelete,
        EstimateDuplicate
    },
    mounted() {
        this.getEstimates();
    },
    updated() {
        bus.$off('updatedEstimate');
        bus.$on('updatedEstimate', (data) => {
            if(data) {
                this.getEstimates();
            }
        })
    },
    data() {
        return {
            isDeleteModalVisible: false,
            isDuplicateModalVisible: false,
            showProductsGrid: false,
            estimate: null,
            currentPage: 1,
            totalPages: 5,
            estimates: [],
            itemsPerpage: 10,
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
            colors: ["bg-orange-400","bg-blue-400","bg-yellow-400","bg-orange-700", "bg-red-500", "bg-primary-main"],
            status: ["Rascunho","Enviada","Em andamento","Rejeitada", "Cancelada","Aprovada"]
        }
    },
    methods: {
        playSound() {
            var data = { soundurl : 'https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3'} 
            var audio = new Audio(data.soundurl);
            audio.play();
        },
        filterData() {
            this.filteredEstimates = this.estimates;
            if(this.filter.situation != 0 && this.filter.end_date == null && this.filter.start_date == null) {
                // Somente Situação
                if(this.filter.situation != 0) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.status == this.filter.situation)
                    return this.filteredEstimates
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
                if(this.filter.situation != 0 && this.filter.start_date != null && this.filter.end_date == null) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.created_at >= this.filter.start_date && estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation)
                    return this.filteredEstimates
                } else {
                    return this.filteredEstimates
                } 
            }

            else if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                // Situação e Data Fim
                if(this.filter.situation != 0 && this.filter.end_date != null && this.filter.start_date == null) {
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.created_at <= this.filter.end_date && estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation)
                    return this.filteredEstimates
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
                    this.filteredEstimates = this.filteredEstimates.filter(estimate => estimate.created_at >= this.filter.start_date &&  estimate.created_at <= this.filter.end_date && estimate.proposals_by_seller.length >= 1 ? estimate.proposals_by_seller[0].status == this.filter.situation:estimate.status == this.filter.situation)
                    return this.filteredEstimates
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
        clearFilter() {
            this.filter.start_date = null
            this.filter.end_date = null
            this.filter.situation = 0
            this.getEstimates()
        },
        formatDefault(id) {
            return this.colors[id-1]
        },
        formatName(id) {
            return this.status[id-1]
        },
        showDuplicateModal(data) {
            this.estimate = data
            this.isDuplicateModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDuplicateModal() {
            this.isDuplicateModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showDeleteModal(data) {
            this.estimate = data
            this.isDeleteModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        getEstimates() {
            this.loader.loading = true
            proposalService.getBuyerProposals().then((response) => {
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