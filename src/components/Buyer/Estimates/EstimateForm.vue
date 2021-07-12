<template>
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Nova cotação</h2>
            </div>
        </div>
        <form @submit.prevent="createEstimate">
        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <label for="" class="flex text-xs font-semibold px-1 justify-start ">Entrega</label>
                <div class="flex justify-start space-x-4 mt-3">
                    <div>
                        <input  @change="() => (errors.delivery_id = 'OK')" v-model="estimate.delivery_id" value="1" class="hidden" id="delivery_1" type="radio" name="delivery">
                        <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                            <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                        </label>
                    </div>
                    <div>
                        <input  @change="() => (errors.delivery_id = 'OK')" v-model="estimate.delivery_id" value="2" class="hidden" id="delivery_2" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                            <span  class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-package-variant-closed text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                        </label>
                    </div>
                    <div>
                        <input  @change="() => (errors.delivery_id = 'OK')"  v-model="estimate.delivery_id" value="3" class="hidden" id="delivery_3" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_3">
                            <span  class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-timetable text-gray-900 text-lg mr-1 ml-1"></i>Decidir depois </span>
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
                        <button  @click.prevent="showAddModal()" class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
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
                        <select :class="errors.equipment_id == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="estimate.equipment_id" class="w-full -ml-10 pl-2   px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option disabled value=""> Selecione... </option>
                            <option   v-for="equipment in equipments" :key="equipment.id" :value="equipment.id">{{formatEquipment(equipment)}}</option>
                        </select> 
                        <button @click.prevent="showEquipmentModal()" class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-plus"></i></span>
                        </button>                               
                </div>   
                <div v-if="errors.equipment_id == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Equipamento é obrigatório.</span>
                </div>                       
            </div>

            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Categoria</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <select @change="() => (errors.category_id = 'OK')" :class="errors.category_id == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="estimate.category_id" class="w-full -ml-10 pl-2   px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        <option disabled value=""> Selecione... </option>
                        <option  v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                    </select> 
                </div> 
                <div v-if="errors.category_id == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Categoria é obrigatório.</span>
                </div>                       
            </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <textarea v-model="estimate.observation" class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                </div>                         
            </div>
        </div>

        <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/8 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button type="submit" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Salvar</span>
                                </button>                         
                            </div>   
                        </div>

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
        </form>

                    <address-add
                        v-if="isAddModalVisible"
                        @close="closeAddModal"
                    ></address-add>

                    <equipment-add
                        v-if="isEquipmentModalVisible"
                        @close="closeEquipmentModal"
                    ></equipment-add>
    </div>
</template>

<script>
import { bus } from '../../../main';
import AddressAdd from '../../Shared/Addresses/AddressAdd';
import EquipmentAdd from '../Equipments/EquipmentAdd.vue';
import { userService, categoryService, estimateService, equipmentService } from '../../../services';
import { required } from 'vuelidate/lib/validators'
import { formatEquipment } from '@/helpers/string-helper';

export default {
    name: 'EstimateForm',
    components: {
        AddressAdd,
        EquipmentAdd
    },
    updated() {
        bus.$off('updatedEstimateAddress');
        bus.$on('updatedEstimateAddress', (data) => {
            if(data) {
               this.getAddresses(); 
            }
        })

        bus.$off('updatedEstimateEquipment');
        bus.$on('updatedEstimateEquipment', (data) => {
            if(data) {
               this.getEquipments(); 
            }
        })
    },
    created() {
        this.getAddresses()
        this.getCategories()
        this.getEquipments();
    },
    data() {
        return {
            isAddModalVisible: false,
            isEquipmentModalVisible: false,
            addresses: [],
            categories: [],
            equipments: [],
            estimate: {
                equipment_id: '',
                observation: null,
                delivery_id: null,
                address_id:  null,
                category_id: '',
            },
            errors: {
                delivery_id: null,
                address_id: null,
                equipment_id: null,
                category_id: null
            },
        }
    },
    methods: {
        formatEquipment,
        createEstimate() {
            this.$v.$touch()

                if(this.$v.estimate.equipment_id.$invalid) {
                    this.errors.equipment = 'ERROR'
                } 

                if(this.$v.estimate.category_id.$invalid) {
                    this.errors.category_id = 'ERROR'
                } 

                if(this.$v.estimate.delivery_id.$invalid) {
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
                    equipment_id: this.estimate.equipment_id,
                    observation: this.estimate.observation,
                    delivery: this.estimate.delivery_id,
                    address_id: this.estimate.address_id,
                    category_id: this.estimate.category_id,
                }
                estimateService.createEstimate(data).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                const estimateId = response.data.id
                this.$router.push({name: 'editEstimate', params: {id: estimateId}})
                }).catch((error) => {
                    console.log(error.response.data)
                })
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddModal() {
            this.isAddModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
        showEquipmentModal() {
            this.isEquipmentModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeEquipmentModal() {
            this.isEquipmentModalVisible = false;
            bus.$emit('ModalOpen', false);
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
                const adr = this.addresses.find(ele => ele.main === 1)
                this.estimate.address_id = adr.id
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        getEquipments() {
            equipmentService.getEquipments().then((response) => {
                this.equipments = response.data.data.equipments
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        }
    },
    validations: {
        estimate: {
            equipment_id: {
                required
            },
            category_id: {
                required
            },
            delivery_id: {
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