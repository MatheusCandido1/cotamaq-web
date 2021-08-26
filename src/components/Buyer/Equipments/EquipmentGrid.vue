<template>
   <span>
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Equipamentos cadastrados</h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
        </div>
        <span class="flex justify-center items-center text-gray-700" v-if="equipments && equipments.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum equipamento encontrado...' }}</span>
    <div v-if="equipments && equipments.length !== 0">
    <v-table
         
        class="w-full whitespace-no-wrap mb-2" 
        :data="equipments"     
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="itemsPerpage"
        @totalPagesChanged="totalPages = $event"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" sortKey="id">Patrimônio</v-th>
                <v-th class="text-center" sortKey="description">Descrição</v-th>
                <th class="text-center" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">

            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">{{row.patrimony}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-4 text-sm">
                        <button @click="showDetailModal(row, true)" class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                        </button>

                        <button @click="showDetailModal(row, false)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>

                        <button @click="showDeleteModal(row)" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>
        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
                Total: {{equipments.length}} registros
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <smart-pagination
                v-if="equipments && equipments.length !== 0"
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
            />
            
                </span>
            </div>
    </div>

    <equipment-delete
        v-if="isDeleteModalVisible"
        :equipment="equipment"
        @close="closeDeleteModal">
    </equipment-delete>

    <equipment-detail
        v-if="isDetailModalVisible"
        :equipment="equipment"
        :allowEdit="allowEdit"
        @close="closeDetailModal">
    </equipment-detail>

    </span>
</template>
<script>
import { BarLoader } from '@saeris/vue-spinners';
import { equipmentService } from '../../../services';
import { bus } from '../../../main';
import EquipmentDelete from './EquipmentDelete';
import EquipmentDetail from './EquipmentDetail';

export default {
    name: 'EquipmentGrid',
    components: {
        BarLoader,
        EquipmentDelete,
        EquipmentDetail
    },
    mounted() {
        this.getEquipments();
    },
    updated() {
        bus.$off('updatedEquipment');
        bus.$on('updatedEquipment', (data) => {
            if(data) {
                this.getEquipments();
            }
        })
    },
    data() {
        return {
            isDeleteModalVisible: false,
            isDetailModalVisible: false,
            equipments: [],
            equipment: {},
            allowEdit: false,
            currentPage: 1,
            totalPages: 5,
            itemsPerpage: 5,
            loader: {
                loading: false,
                color: '#0bc95b',
            },
        }
    },
    methods: {
        showDeleteModal(data) {
            this.equipment = data
            this.isDeleteModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showDetailModal(data, editable) {
            this.allowEdit = editable
            this.equipment = data
            this.isDetailModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDetailModal() {
            this.isDetailModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        getEquipments() {
            this.loader.loading = true
            equipmentService.getEquipments().then((response) => {
                this.loader.loading = false
                this.equipments = response.data.data.equipments
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        }
    }
}
</script>

<style>

</style>