<template>
<div>
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-3/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Editar cotação</h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
            
        </div>
    <form @submit.prevent="updateEstimate">
        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <label for="" class="flex text-xs font-semibold px-1 justify-start ">Entrega</label>
                <div class="flex justify-start space-x-4 mt-3">
                    <div>
                        <input :disabled="loader.loading"  @change="() => (errors.delivery_id = 'OK')" v-model="estimate.delivery" value="1" class="hidden" id="delivery_1" type="radio" name="delivery">
                        <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                            <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                        </label>
                    </div>
                    <div>
                        <input  :disabled="loader.loading" @change="() => (errors.delivery_id = 'OK')" v-model="estimate.delivery" value="2" class="hidden" id="delivery_2" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                            <span  class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-package-variant-closed text-gray-900 text-lg mr-1 ml-1"></i>Retirada</span>
                        </label>
                    </div> 
                    <div>
                      <input  :disabled="loader.loading" @change="() => (errors.delivery_id = 'OK')"  v-model="estimate.delivery" value="3" class="hidden" id="delivery_3" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_3">
                            <span  class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-timetable text-gray-900 text-lg mr-1 ml-1"></i>Decidir depois</span>
                        </label>
                    </div>
                </div>
                <div v-if="errors.delivery_id == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Entrega é obrigatório.</span>
                </div> 
            </div>      

            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Endereço</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <select :class="errors.address_id == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="estimate.address_id" class="w-full -ml-10 pl-2   px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option   v-for="address in addresses" :key="address.id" :value="address.id">{{address.description}}</option>
                        </select> 
                        <button @click="showAddressAddModal()" class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-plus"></i></span>
                        </button>                               
                </div>   
                <div v-if="errors.address_id == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Endereço é obrigatório.</span>
                </div>                        
            </div>  
        </div>

        <div class="flex -mx-3">
            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Equipamento</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input  v-model="estimate.equipment" :disabled="loader.loading"  @change="() => (errors.equipment = 'OK')" :class="errors.equipment == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>      
                <div v-if="errors.equipment == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Equipamento é obrigatório.</span>
                </div>                      
            </div>

            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Categorias</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <select @change="() => (errors.category_id = 'OK')" :disabled="loader.loading" :class="errors.category_id == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="estimate.category_id" class="w-full -ml-10 pl-2   px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        <option value=""> Selecione... </option>
                        <option  v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                    </select> 
                </div>     
                <div v-if="errors.category_id == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Categoria é obrigatório.</span>
                </div>                    
            </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Patrimonio</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input :disabled="loader.loading" v-model="estimate.patrimony" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>                         
            </div>

            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Modelo</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input :disabled="loader.loading" placeholder="" v-model="estimate.model" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>                         
            </div>

            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input placeholder="" :disabled="loader.loading" v-model="estimate.brand" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>                         
            </div>

            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Ano</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <the-mask @change.native="() => (errors.year = 'OK')" :class="errors.year == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="estimate.year" mask="####" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></the-mask>
                </div>    
                <div v-if="errors.year == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Ano não é válido.</span>
                </div>                      
            </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <textarea  :disabled="loader.loading" v-model="estimate.observation" class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                </div>                         
            </div>
        </div>
    </form>

                    
                    <address-add
                        v-if="isAddAddressModalVisible"
                        @close="closeAddAddressModal"
                    ></address-add>
  </div>

                    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Produtos</h2>
            </div>
            <div class="w-1/5 px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1"></label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button @click="showAddModal()" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white hover:bg-primary-darker font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="justify-center ml-2">Adicionar</span>
                    </button>  
                </div>  
            </div>
        </div>
        <span class="flex justify-center items-center text-gray-700" v-if="products && products.length === 0" > {{ loader.loading ? 'Carregando...':'Nenhum produto encontrado...' }}</span>
        <div  v-if="products && products.length !== 0">
            <v-table
                class="w-full whitespace-no-wrap mb-2" 
                :data="products"     
                :hideSortIcons="true"
                :currentPage.sync="currentPage"
                :pageSize="3"
                @totalPagesChanged="totalPages = $event"
            >
                <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
                    <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="description">Descrição</v-th>
                        <v-th  class="text-center" style="width: 20%" sortKey="quantity">Quantidade</v-th>
                        <v-th  class="text-center" style="width: 10%" sortKey="allow_similar">Aceita Similar</v-th>
                        <th class="text-center" style="width: 20%" >Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
                    <tr  v-for="row in displayData" :key="row.id">
                        <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                        <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                        <td class="text-sm text-center text-gray-700">
                            <span :class="formatDefault(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                                {{formatName(row.allow_similar)}}
                            </span>
                        </td>
                        <td class="flex justify-center mt-2">
                            <div class="flex items-center space-x-4 text-sm">
                                <button @click="showDetailModal(row, true)"  class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                                </button>

                                <button @click="showDetailModal(row, false)" class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                                </button>

                                <button  @click="showDeleteModal(row)" class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>                        
                                </button>
                            </div>  
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span class="flex items-center col-span-3">
                    Total: {{products.length}} registros
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
         <div class="flex justify-end center-items" >
            <div  class="w-1/5 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button  @click="updateStatus(1)" class="w-full flex items-center justify-center  bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center whitespace-nowrap">Salvar Rascunho</span>
                                </button>                         
                            </div>   
                        </div>
                        <div v-if="products.length" class="w-1/5  px-3  mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="showConfirmModal(2)"  class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center whitespace-nowrap">Enviar Cotação</span>
                                </button>                         
                            </div>   
                        </div>
            </div>
         <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'estimates'}" class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
                    </div>

        <product-add
            v-if="isAddModalVisible"
            @close="closeAddModal">
        </product-add>

        <product-delete
            v-if="isDeleteModalVisible"
            :product="product"
            @close="closeDeleteModal">
        </product-delete>

        <product-detail
            v-if="isDetailModalVisible"
            :product="product"
            :allowEdit="allowEdit"
            @close="closeDetailModal"
        >
        </product-detail>

        <estimate-confirm
            v-if="isConfirmModalVisible"
            :estimate="estimate"
            :status="selectedStatus"
            @close="closeConfirmModal"
        ></estimate-confirm>

    </div>
</div>
</template>

<script>
import { bus } from '../../../main';
import AddressAdd from '../../Shared/Addresses/AddressAdd';
import { userService, categoryService, estimateService, productService } from '../../../services';
import { required } from 'vuelidate/lib/validators'
import ProductAdd from '../Products/ProductAdd';
import ProductDelete from '../Products/ProductDelete';
import ProductDetail from '../Products/ProductDetail';
import EstimateConfirm from './EstimateConfirm';
import { BarLoader } from '@saeris/vue-spinners'

export default {
    name: 'EstimateUpdate',
    components: {
        AddressAdd,
        BarLoader,
        ProductAdd,
        ProductDelete,
        ProductDetail,
        EstimateConfirm
    },
    updated() {
        bus.$off('updatedEstimateAddress');
        bus.$on('updatedEstimateAddress', (data) => {
            if(data) {
               this.getAddresses(); 
            }
        })
                
        bus.$off('updatedProduct');
        bus.$on('updatedProduct', (data) => {
            if(data) {
                this.getProducts();
            }
        })
    },
    created() {
        this.getAddresses()
        this.getCategories()
        this.getEstimate(this.$route.params.id)
        this.getProducts();
    },
    data() {
        return {
            isConfirmModalVisible: false,
            isAddAddressModalVisible: false,
            isDeleteModalVisible: false,
            isDetailModalVisible: false,
            allowEdit: false,
            currentPage: 1,
            totalPages: 5,
            products: [],
            product: null,
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            isAddModalVisible: false,
            edit: true,
            addresses: [],
            categories: [],
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            selectedStatus: null,
            errors: {
                delivery_id: null,
                address_id: null,
                equipment: null,
                category_id: null,
                year: null,
            },
            estimate: {
                id: null,
                equipment: null,
                patrimony: null,
                model: null,
                brand: null,
                year: null,
                status_id: null,
                observation: null,
                delivery: null,
                address_id:  null,
                category_id: null,
            }
        }
    },
    methods: {
        updateStatus(status) {
            const data = {
                id: this.estimate.id,
                status: status,
                equipment: this.estimate.equipment,
                patrimony: this.estimate.patrimony,
                model: this.estimate.model,
                brand: this.estimate.brand,
                year: this.estimate.year,
                observation: this.estimate.observation,
                delivery: this.estimate.delivery,
                address_id: this.estimate.address_id,
                category_id: this.estimate.category_id,
            }
            estimateService.updateStatus(data).then((response) => {
            this.loader.loader = true
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });

            this.loader.loading = false
            this.$router.push({name: 'estimates'})
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        updateEstimate() {
            this.$v.$touch()

                if(this.$v.estimate.equipment.$invalid) {
                    this.errors.equipment = 'ERROR'
                } 

                if(this.$v.estimate.category_id.$invalid) {
                    this.errors.category_id = 'ERROR'
                } 

                if(this.$v.estimate.delivery.$invalid) {
                    this.errors.delivery_id = 'ERROR'
                } 

                if(this.$v.estimate.address_id.$invalid) {
                    this.errors.address_id = 'ERROR'
                } 

                if(this.estimate.year != null) {
                    var now = new Date()
                    if(this.estimate.year > now.getFullYear() || this.estimate.year < 1900)
                    {
                        this.errors.year = 'ERROR'
                    }
                }

                
            if(this.$v.$anyError == false && this.errors.year != "ERROR") {
            const data = {
                id: this.estimate.id,
                equipment: this.estimate.equipment,
                patrimony: this.estimate.patrimony,
                model: this.estimate.model,
                brand: this.estimate.brand,
                year: this.estimate.year,
                observation: this.estimate.observation,
                delivery: this.estimate.delivery,
                address_id: this.estimate.address_id,
                category_id: this.estimate.category_id,
            }
        estimateService.updateEstimate(data).then((response) => {
            this.loader.loader = true
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.loader.loading = false
            }).catch((error) => {
                console.log(error.response.data)
            })
            }
        },
        showConfirmModal(status) {
            this.selectedStatus = status
            this.isConfirmModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeConfirmModal() {
            this.isConfirmModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showAddressAddModal() {
            this.isAddModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddAddressModal() {
            this.isAddModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        getEstimate(id) {
            this.loader.loading = true
            estimateService.getEstimate(id).then((response) => {
                this.estimate = response.data.data
                this.loader.loading = false
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        getCategories() {
            categoryService.getCategories().then((response) => {
                this.categories = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        getAddresses() {
            userService.getAddresses().then((response) => {
                this.addresses = response.data.addresses
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        getProducts() {
            const estimate_id = this.$route.params.id
            this.loader.loading = true
            productService.getProducts(estimate_id).then((response) => {
                this.loader.loading = false
                this.products = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            }) 
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
        showDeleteModal(data) {
            this.product = data
            this.isDeleteModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showAddModal() {
            this.isAddModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddModal() {
            this.isAddModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
    },
    validations: {
        estimate: {
            equipment: {
                required
            },
            category_id: {
                required
            },
            delivery: {
                required
            },
            address_id: {
                required
            },
        }
    }
    
}
</script>

<style>

</style>