<template>

    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Propostas Recebidas </h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
        </div>
        <span class="flex justify-center items-center text-gray-700" v-if="proposals && proposals.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhuma proposta encontrada...' }}</span>
        <div  v-if="proposals && proposals.length !== 0">
            <v-table
                class="w-full whitespace-no-wrap mb-2" 
                :data="proposals"     
                :hideSortIcons="true"
                :currentPage.sync="currentPage"
                :pageSize="3"
                @totalPagesChanged="totalPages = $event"
            >
                <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
                    <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <v-th  class="text-center" style="width: 10%" sortKey="description">Código</v-th>
                        <v-th  class="text-center" style="width: 20%" sortKey="quantity">Prazo de Entrega</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="allow_similar">Valor Total</v-th>
                        <th class="text-center" style="width: 20%" >Ação</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
                    <tr  v-for="row in displayData" :key="row.id">
                        <td class="text-sm text-center text-gray-700">#{{row.id}}</td>
                        <td class="text-sm text-center text-gray-700">{{ getHigherDelivery(row.products) }} </td>
                        <td class="text-sm text-center text-gray-700">{{row.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                        <td class="flex justify-center mt-2">
                            <div class="flex items-center space-x-4 text-sm">
                                <router-link  :to="{name: 'detailBuyerDetail', params: {id: row.id}}" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                                </router-link> 
                                <button v-tooltip="{content: 'Recusar Proposta'}"  @click="showDeclineModal(row)"  class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                                </button>
                            </div>  
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span class="flex items-center col-span-3">
                    Total: {{proposals.length}} registros
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

    <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/8 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'estimates'}" class="w-full flex items-center justify-center  bg-gray-600 text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
    </div>
    <proposal-decline
        v-if="isDeclineModalVisible"
        :proposal="proposal"
        @close="closeDeclineModal"
    >
    </proposal-decline>
    </div>
</template>
<script>
import { bus } from '../../../main'
import { proposalService } from '../../../services';
import ProposalDecline from '../Proposals/ProposalDecline';

import { BarLoader } from '@saeris/vue-spinners';

export default {
    name: 'EstimateProposals',
    components: {
        BarLoader,
        ProposalDecline
    },
    updated() {
        bus.$off('updatedProduct');
        bus.$on('updatedProduct', (data) => {
            if(data) {
                this.getProposalsByEstimate();
            }
        })
    },
    created() {
        this.getProposalsByEstimate();
    },
    data() {
        return {
            isDeclineModalVisible: false,
            isDetailModalVisible: false,
            allowEdit: false,
            currentPage: 1,
            totalPages: 5,
            proposals: [],
            proposal: {},
            product: null,
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            loader: {
                loading: false,
                color: '#0bc95b',
            },
        }
    },
    methods: {
        getHigherDelivery(row) {
            const maxDelivery =  row.reduce((max, p) => p.product_delivery > max ? p.product_delivery : max, row[0].product_delivery);
            if(maxDelivery == 0) {
                return 'Imediata'
            } else if(maxDelivery == 1) {
                return '1 dia'
            } else {
            return maxDelivery + ' dias'
            }

        },
        getProposalsByEstimate() {
            const estimate_id = this.$route.params.id
            this.loader.loading = true
            proposalService.getProposalsByEstimate(estimate_id).then((response) => {
                this.loader.loading = false
                this.proposals = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        showDeclineModal(row){
            this.proposal = row
            this.isDeclineModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeclineModal() {
            this.isDeclineModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showDetailModal(data, editable) {
            this.allowEdit = editable
            this.product = data
            this.isDetailModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDetailModal() {
            this.isDetailModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
    }

}
</script>

<style>

</style>