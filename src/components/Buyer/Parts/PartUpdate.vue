<template>
    <div class="flex flex-col">
        <Loading 
            :active="loader.active"
            :loader="loader.loader"
            :is-full-page="loader.fullPage"
            :color="loader.color"
        />
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                      Cotação #{{ part.id }}
                    </h2>
                </div>
            </div>
            <div>
            <form @submit.prevent="showConfirmModal">
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                        <label for="category_id" class="text-sm font-semibold text-gray-600 px-1">
                            Categoria
                        </label>
                        <select @change="() => (errors.part.category_id = 'OK')" :class="errors.part.category_id == 'ERROR' ? 'border-red-400':'border-primary-main'"  id="category_id" v-model="part.category_id"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option disabled value=""> Selecione... </option>
                            <option  v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                        </select> 
                        <div  v-if="errors.part.category_id == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Categoria é obrigatório.</span>
                        </div> 
                    </div>
                     <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                        <label for="category_id" class="text-sm font-semibold text-gray-600 px-1">
                            Endereço
                        </label>
                        <div class="flex">
                        <select v-model="part.address_id"  @change="() => (errors.part.address_id = 'OK')" :class="errors.part.address_id == 'ERROR' ? 'border-red-400':'border-primary-main'"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option disabled value=""> Selecione... </option>
                            <option   v-for="address in addresses" :key="address.id" :value="address.id">{{address.description}}</option>
                        </select> 
                        <button @click="showAddAddressModal" type="button" class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-plus"></i></span>
                        </button>  
                        </div>
                        <div  v-if="errors.part.address_id == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Endereço é obrigatório.</span>
                        </div> 
                    </div>
                </div>

                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Código da peça
                        </label>
                        <input id="part_code" v-model="part.part_code"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                        <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                            Descrição
                        </label>
                        <input id="description" v-model="part.description" @change="() => (errors.part.description = 'OK')" :class="errors.part.description == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        <div  v-if="errors.part.description == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Descrição é obrigatório.</span>
                        </div> 
                    </div>
                </div>
                
                
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="quantity" class="text-sm font-semibold text-gray-600 px-1">
                            Quantidade
                        </label>
                        <input @change="() => (errors.part.quantity = 'OK')" :class="errors.part.quantity == 'ERROR' ? 'border-red-400':'border-primary-main'" id="quantity" v-model="part.quantity" min="1" type="number" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        
                        <div  v-if="errors.part.quantity == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Quantidade é obrigatório.</span>
                        </div> 
                    </div>
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                            Aceita Similar
                        </label>
                        <div class="flex justify-center space-x-2 mt-2">
                        <div>
                            <input @change="handleSimilarClick()"  v-model="part.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input  @change="handleSimilarClick()"   v-model="part.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                        </div> 
                        <div  v-if="errors.part.allow_similar == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Aceita Similar é obrigatório.</span>
                        </div> 
                    </div>
                    <div v-if="isSimilar" class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="brand" class="text-sm font-semibold text-gray-600 px-1">
                            Marca
                        </label>
                        <input id="brand" v-model="part.brand" @change="() => (errors.part.brand = 'OK')" :class="errors.part.brand == 'ERROR' ? 'border-red-400':'border-primary-main'"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        
                        <div  v-if="errors.part.brand == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Marca é obrigatório.</span>
                        </div> 
                    </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 mb-2 md:mb-0">
                        <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                            Observação
                        </label>
                        <textarea v-model="part.observation" class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                    </div>
                </div>
              <p v-if="files.length > 0" class="font-semibold">Imagens Salvas</p>
              <FileList :files="files" :type="'estimates'"></FileList>
              <p class="font-semibold">Inserir novas imagens</p>
              <DropZone :images="files.length"></DropZone>
                <div class="md:w-full px-3 mb-2 md:mb-0">
                  <label class="flex justify-center text-lg font-semibold text-gray-600 px-1" for="allow_similar">
                    Adicionar detalhes do Equipamento?
                  </label>
                </div>

                <div class="-mx-3 md:flex mb-6 mt-2">
                  <div class="md:w-full px-3 flex justify-center gap-4">
                    <button class="sm:w-full md:w-1/4 flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 shadow-md py-2 px-6 inline-flex items-center" type="button"
                            @click="showEquipmentForm">
                      <span class="justify-center items-center"><i class="mdi mdi-tractor-variant mr-2"></i>Usar Equipamento Existente</span>
                    </button>
                    <button class="sm:w-full md:w-1/4 flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker shadow-md py-2 px-6 inline-flex items-center" type="button" @click="showEquipmentSelect">
                      <span class="justify-center items-center"><i class="mdi mdi-plus-box mr-2"></i>Cadastrar novo equipamento</span>
                    </button>
                  </div>
                </div>

                <div v-if="equipmentForm == 1">
                  <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="description">
                        Descrição
                      </label>
                      <input v-model="equipment.description" :class="errors.equipment.description == 'ERROR' ? 'border-red-400':'border-primary-main'" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" placeholder="" type="text" @change="() => (errors.equipment.description = 'OK')">
                      <div v-if="errors.equipment.description == 'ERROR'" class="flex justify-center align-items">
                        <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Descrição é obrigatório.</span>
                      </div>
                    </div>
                    <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="patrimony">
                        Patrimônio
                      </label>
                      <input id="patrimony" v-model="equipment.patrimony" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" placeholder="" type="text">
                    </div>
                  </div>

                  <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="model">
                        Modelo
                      </label>
                      <input id="model" v-model="equipment.model" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" placeholder="" type="text">
                    </div>
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="brand">
                        Marca
                      </label>
                      <input id="brand" v-model="equipment.brand" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" placeholder="" type="text">
                    </div>
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="">Ano</label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask v-model="equipment.year" :class="errors.equipment.year == 'ERROR' ? 'border-red-400':'border-primary-main'" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" mask="####" @change.native="() => (errors.equipment.year = 'OK')"></the-mask>
                      </div>
                      <div v-if="errors.equipment.year == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Ano não é válido.</span>
                      </div>
                    </div>
                  </div>
                  <div class="-mx-3 md:flex mt-2">
                    <div class="md:w-full px-3 flex justify-end gap-2">
                      <button class="sm:w-full md:w-1/3 w-full flex items-center justify-center bg-red-600 text-white font-semibold rounded hover:bg-red-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center" @click="() => equipmentForm = null">
                        <span class="justify-center">Cancelar Equipamento</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="equipmentForm == 2">
                  <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 mb-2 md:mb-0">
                      <label class="text-sm font-semibold text-gray-600 px-1" for="equipment_id">
                        Equipamento
                      </label>
                      <multiselect
                          v-model="oldEquipment"
                          :close-on-select="true"
                          :customLabel="formatEquipment"
                          :loading="loading"
                          :options="equipments"
                          :searchable="true"
                          deselectLabel="Pressione Enter para remover"
                          label="patrimony"
                          open-direction="bottom"
                          placeholder="Escolha ou pesquise um equipamento"
                          selectLabel="Pressione Enter para escolher"
                          selectedLabel="Selecionado"
                          track-by="id"
                          @input="() => (errors.equipment.id = 'OK')"

                      >
                        <template v-slot:noOptions>
                          Ops... Você não tem nenhum equipamento cadastrado...
                        </template>
                      </multiselect>
                      <div v-if="errors.oldEquipment == 'ERROR'" class="flex justify-center align-items">
                        <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Equipamento é obrigatório.</span>
                      </div>
                    </div>
                  </div>
                  <div class="-mx-3 md:flex mt-2">
                    <div class="md:w-full px-3 flex justify-end gap-2">
                      <button class="sm:w-full md:w-1/3 w-full flex items-center justify-center bg-red-600 text-white font-semibold rounded hover:bg-red-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center" @click="handleEquipmentCancel">
                        <span class="justify-center">Cancelar Equipamento</span>
                      </button>
                    </div>
                  </div>
                </div>


                <div class="-mx-3 md:flex mt-4">
                  <div class="md:w-full px-3 flex justify-end gap-2">
                    <button class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center" type="button" @click="saveDraft">
                      <span class="justify-center">Salvar Rascunho</span>
                    </button>
                    <button class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center" type="submit">
                      <span class="justify-center">Enviar Cotação</span>
                    </button>
                  </div>
                </div>
            </form>
  </div>
    </div>
    <AddressAdd v-if="modal.address" @close="closeAddAddressModal" />
    <PartConfirm v-if="modal.confirm" :categories="categories" :part="part" :equipment="equipmentInfo" @save="sendPart" @close="closeConfirmModal" />
</div>
</template>

<script>
import {bus} from "../../../main";
import {required, requiredIf} from 'vuelidate/lib/validators'
import {categoryService, equipmentService, estimateService, userService} from '../../../services';
import Multiselect from 'vue-multiselect'
import {formatEquipment} from '@/helpers/string-helper';
import PartConfirm from './PartConfirm';
import AddressAdd from '../../Shared/Addresses/AddressAdd';
import DropZone from "../../Shared/DropZone";
import FileList from "../../Shared/FileList";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'PartUpdate',
    components: {
        FileList,
        Multiselect,
        PartConfirm,
        AddressAdd,
        DropZone,
        Loading
    },
    updated() {
        bus.$off('updatedEstimateAddress');
        bus.$on('updatedEstimateAddress', (data) => {
        if (data) {
            this.getAddresses();
        }
        })
    },
    created() {
        this.getEquipments()
        this.getCategories()
        this.getAddresses()
        this.getPart(this.$route.params.id)
    },
    data() {
        return {
            loader: {
                active: false,
                fullPage: true,
                loader: 'bars',
                color: '#2BCB6F'
            },
            modal: {
                confirm: false,
                address: false,
            },
            files: [],
            addresses: [],
            equipments: [],
            loading: false,
            isSimilar: false,
            equipmentForm: null,
            equipmentInfo: null,
            form: new FormData,
            part: {
                part_code: '',
                description: '',
                quantity: '',
                allow_similar: '',
                brand: '',
                observation: '',
                category_id: '',
                delivery: '',
                equipment_id: '',
                equipment: '',
                address_id: '',
            },
            oldEquipment: null,
            equipment: {
                id: '',
                description: '',
                patrimony: '',
                model: '',
                year: '',
                brand: '',
            },
            errors: {
                oldEquipment: null,
                part: {
                    description: null,
                    quantity: null,
                    category_id: null,
                    allow_similar: null,
                    brand: null,
                    address_id: null,
                    equipment: null,
                },
                equipment: {
                    id: null,
                    description: null,
                    year:null
                }
            },
            categories: []
        }
    },
    methods: {
        formatEquipment,
        showAddAddressModal() {
            this.modal.address = true;
            bus.$emit('ModalOpen', true);
        },
        closeAddAddressModal() {
            this.modal.address = false;
            bus.$emit('ModalOpen', false);
        },
        handleEquipmentCancel() {
            this.equipmentInfo = null
            this.equipmentForm = null
            this.equipment = {
                description: '',
                patrimony:'',
                model:'',
                year:'',
                brand:'',
            }
            this.oldEquipment = null
        },
        showConfirmModal() {
            this.$v.$touch()

            if(this.$v.part.description.$invalid) {
                this.errors.part.description = 'ERROR'
            } 

            if(this.$v.part.category_id.$invalid) {
                this.errors.part.category_id = 'ERROR'
            } 

            if(this.$v.part.address_id.$invalid) {
                this.errors.part.address_id = 'ERROR'
            } 

            if(this.$v.part.quantity.$invalid) {
                this.errors.part.quantity = 'ERROR'
            } 

            if(this.$v.part.allow_similar.$invalid) {
                this.errors.part.allow_similar = 'ERROR'
            } 

            if(this.$v.part.brand.$invalid) {
                this.errors.part.brand = 'ERROR'
            }

            // Only Validate if form is enable
            if(this.equipmentForm == 1) {
                if(this.$v.equipment.description.$invalid) {
                    this.errors.equipment.description = 'ERROR'
                }
            }

            // Only Validate if select is enable
            if(this.equipmentForm == 2) {
                if(this.$v.oldEquipment.$invalid) {
                    this.errors.oldEquipment = 'ERROR'
                }
            }
            if(this.equipment.year != null && this.equipment.year != '') {
                var now = new Date()
                if(this.equipment.year > now.getFullYear() || this.equipment.year <= 1900)
                {
                    this.errors.equipment.year = 'ERROR'            
                  
                }
            } 
            
            if(this.$v.$anyError == false && this.errors.equipment.year != "ERROR") {
                this.getSelectedEquipment()
                this.modal.confirm = true;
                bus.$emit("ModalOpen", true);
            }
        },
        closeConfirmModal() {
            this.modal.confirm = false;
            bus.$emit("ModalOpen", false);
        },
        getSelectedEquipment() {
            if(this.equipmentForm == null) {
                this.equipmentInfo == null
            }
            if(this.equipmentForm == 2) {
                this.equipmentInfo = this.oldEquipment
            }
            if(this.equipmentForm == 1) {
                this.equipmentInfo = this.equipment
            }
        },
        getPart(id) {
            estimateService.getEstimate(id).then((response) => {
                const data = response.data.data
                const userId = localStorage.getItem('user_id')

                if (!data || data.length == 0) {
                    this.$router.push({name: 'NotFound'})
                }
                if (data.status != 1) {
                    this.$router.push({name: 'NotFound'})
                }
                if (data.user_id != userId) {
                    this.$router.push({name: 'NotFound'})
                }
                else {
                    this.part = data
                    this.files = data.images
                    this.oldEquipment = data.equipment
                    if(this.part.allow_similar == 1) {
                        this.isSimilar = false
                    } else {
                        this.isSimilar = true
                    }
                    if(this.oldEquipment.id) {
                        this.equipmentForm = 2
                    }
                    this.getSelectedEquipment()
                }
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        getEquipments() {
            this.loading = true
            equipmentService.getEquipments().then((response) => {
                this.loading = false
                this.equipments = response.data.data.equipments
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
                const adr = this.addresses.find(ele => ele.main === 1)
                this.part.address_id = adr.id
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        showEquipmentForm() {
            this.errors.equipment.description = 'OK'
            this.equipment.description = '',
            this.equipment.patrimony = '',
            this.equipment.model = '',
            this.equipment.year = '',
            this.equipment.brand = '',
            this.equipmentForm = 2;
        },
        showEquipmentSelect() {
            this.errors.oldEquipment = 'OK'
            this.equipmentForm = 1;
        },
        handleSimilarClick() {
            this.errors.part.brand = 'OK'
            this.errors.part.allow_similar = 'OK'
            if(this.part.allow_similar == 1) {
                this.isSimilar = false
            } else {
                this.isSimilar = true
            }
        },
        addFiles() {
            this.$refs.files.click();
        },
        removeImage(key) {
            let index = this.files.indexOf(key);
            this.files.splice(index, 1);
        },
        onFileChange(e) {
            let uploadedFiles = e.target.files;

            for(var x = 0; x < uploadedFiles.length;x++){
                this.files.push(uploadedFiles[x]);
            }

            for (let i = 0; i < this.files.length; i++) {
                let reader = new FileReader();
                reader.onload = () => {
                this.$refs.file[i].src = reader.result;
                };

                reader.readAsDataURL(this.files[i]);
            }
        },
        saveDraft() {
            for(let i=0; i<this.files.length;i++){
                this.form.append('files[]',this.files[i]);
            }

            this.form.append('part_code', this.part.part_code);
            this.form.append('description', this.part.description);
            this.form.append('quantity', this.part.quantity);
            this.form.append('allow_similar', this.part.allow_similar);
            this.form.append('observation', this.part.observation);
            this.form.append('brand', this.part.brand);
            this.form.append('address_id', this.part.address_id);
            this.form.append('category_id', this.part.category_id);
            this.form.append('status', 1);


            if(this.equipmentForm == null) {
                this.form.append('equipment_id', '');
            }

            if(this.equipmentForm == 2) {
                if(this.oldEquipment){
                    this.form.append('equipment_id', this.oldEquipment.id)
                }
            }

            if(this.equipmentForm == 1) {
                if(this.equipment) {
                    this.form.append('equipment_description', this.equipment.description);
                    this.form.append('equipment_patrimony', this.equipment.patrimony);
                    this.form.append('equipment_model', this.equipment.model);
                    this.form.append('equipment_year', this.equipment.year);
                    this.form.append('equipment_brand', this.equipment.brand);
                }
            }
          let Files = this.$store.getters.files
          if(Files.length > 0 || Files != null ){
            Files.forEach((file) => {
              this.form.append('files[]', file.data)
            })
          }
          this.$store.commit('setFiles', [])


          this.loader.active = true
            estimateService.updateEstimate(this.part.id, this.form).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.loader.active = false
                this.$router.push({name: 'estimates'})
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        sendPart() {
            for(let i=0; i<this.files.length;i++){
                this.form.append('files[]',this.files[i]);
            }

            this.form.append('part_code', this.part.part_code);
            this.form.append('description', this.part.description);
            this.form.append('quantity', this.part.quantity);
            this.form.append('allow_similar', this.part.allow_similar);
            this.form.append('observation', this.part.observation);
            this.form.append('brand', this.part.brand);
            this.form.append('address_id', this.part.address_id);
            this.form.append('category_id', this.part.category_id);
            this.form.append('status', 2);

            if(this.equipmentForm == null) {
                this.form.append('equipment_id', '');
            }

            if(this.equipmentForm == 2) {
                this.form.append('equipment_id', this.oldEquipment.id);
            }

            if(this.equipmentForm == 1) {
                this.form.append('equipment_description', this.equipment.description);
                this.form.append('equipment_patrimony', this.equipment.patrimony);
                this.form.append('equipment_model', this.equipment.model);
                this.form.append('equipment_year', this.equipment.year);
                this.form.append('equipment_brand', this.equipment.brand);
            }
          let Files = this.$store.getters.files

          Files.forEach((file) => {
            this.form.append('files[]', file.data)
          })

          this.$store.commit('setFiles', [])

            this.loader.active = true
            estimateService.updateEstimate(this.part.id, this.form).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.loader.active = false
                this.$router.push({name: 'estimates'})
                this.closeConfirmModal()
            }).catch((error) => {
                console.log(error.response.data)
            })
        }
    },
    validations: {
        oldEquipment: {
            required: requiredIf(function() {
                return this.equipmentForm == 2
            })
        },
        equipment: {
            description: {
                required: requiredIf(function() {
                    return this.equipmentForm == 1
                })
            }
        },
        part: {
            description: {
                required
            },
            category_id: {
                required
            },
            address_id: {
                required
            },
            quantity: {
                required
            },
            allow_similar: {
                required
            },
            equipment: {
                required: requiredIf(function() {
                    return this.equipmentForm == 1
                })
            },
            brand: {
              required: requiredIf(function() {
                return this.part.allow_similar == 0
              })
            }
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>