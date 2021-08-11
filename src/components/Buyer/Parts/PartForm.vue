<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Nova Cotação
                    </h2>
                </div>

                <div @click="()=>(open = !open)" class="py-1">
                    <button  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                        <svg v-if="open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                        </svg>
                        <svg v-if="!open"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                        </svg>                        
                    </button>
                </div>
            </div>
            <div v-if="open">
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
                        <button class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
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
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 mb-2 md:mb-0">
                        <label class="text-sm font-semibold text-gray-600 px-1">Imagens</label>   
                        <span @click="addFiles()" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Adicionar Imagens</span>
                        <input ref="files" @change="onFileChange" id="files" class="hidden" multiple type="file" />         
                        <div class="flex justify-start items-center flex-wrap mt-2">
                        <div class="flex flex-row justify-center items-center">
                            <div class="flex flex-col justify-center items-center"  v-for="(file, key) in files" :key="key">
                            <img  class="h-28 w-28 rounded-lg ml-2 mr-2" :ref="'file'" />
                            <button @click="removeImage(key)" type="button" class="w-8 h-8 mt-1 justify-center items-center mr-2 bg-red-600 text-white p-2 rounded  leading-none flex items-center">
                            <i class="mdi mdi-delete text-white"></i>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="md:w-full px-3 mb-2 md:mb-0">
                    <label for="allow_similar" class="flex justify-center text-lg font-semibold text-gray-600 px-1">
                        Adicionar detalhes do Equipamento?
                    </label>
                </div>
                
                <div class="-mx-3 md:flex mb-6 mt-2">
                    <div class="md:w-full px-3 flex justify-center gap-4">
                        <button @click="showEquipmentForm" type="button" class="sm:w-full md:w-1/4 flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center items-center"><i class="mdi mdi-tractor-variant mr-2"></i>Usar Equipamento Existente</span>
                        </button> 
                        <button @click="showEquipmentSelect"  type="button" class="sm:w-full md:w-1/4 flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center items-center"><i class="mdi mdi-plus-box mr-2"></i>Cadastrar novo equipamento</span>
                        </button> 
                    </div>
                </div>

                <div v-if="equipmentForm == 2">
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                            <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                                Descrição
                            </label>
                            <input v-model="equipment.description" @change="() => (errors.equipment.description = 'OK')" :class="errors.equipment.description == 'ERROR' ? 'border-red-400':'border-primary-main'" placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <div  v-if="errors.equipment.description == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Descrição é obrigatório.</span>
                            </div> 
                        </div>
                        <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                            <label for="patrimony" class="text-sm font-semibold text-gray-600 px-1">
                                Patrimônio
                            </label>
                            <input v-model="equipment.patrimony" id="patrimony" placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                    </div>

                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                            <label for="model" class="text-sm font-semibold text-gray-600 px-1">
                                Modelo
                            </label>
                            <input v-model="equipment.model" id="model" placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                            <label for="brand" class="text-sm font-semibold text-gray-600 px-1">
                                Marca
                            </label>
                            <input v-model="equipment.brand" id="brand" placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                            <label for="year" class="text-sm font-semibold text-gray-600 px-1">
                                Ano
                            </label>
                            <input v-model="equipment.year" id="year" placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                    </div>
                </div>

                <div v-if="equipmentForm == 1">
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-full px-3 mb-2 md:mb-0">
                            <label for="equipment_id" class="text-sm font-semibold text-gray-600 px-1">
                                Equipamento
                            </label>
                            <multiselect 
                                v-model="equipment.id" 
                                @input="() => (errors.equipment.id = 'OK')"
                                :options="equipments"
                                label="patrimony"
                                track-by="id"
                                :searchable="true"
                                :loading="loading"
                                :customLabel="formatEquipment"
                                placeholder="Escolha ou pesquise um equipamento"
                                :close-on-select="true"
                                selectLabel="Pressione Enter para escolher"
                                selectedLabel="Selecionado"
                                deselectLabel="Pressione Enter para remover"
                                open-direction="bottom"
                                
                                >
                                <template v-slot:noOptions>
                                    Ops... Você não tem nenhum equipamento cadastrado...
                                </template>
                            </multiselect>
                             <div  v-if="errors.equipment.id == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Equipamento é obrigatório.</span>
                            </div> 
                        </div>
                    </div>
                </div>


                <div class="-mx-3 md:flex mt-2">
                    <div class="md:w-full px-3 flex justify-end gap-2">
                       <button  class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar Rascunho</span>
                        </button>  
                        <button type="submit" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Enviar Cotação</span>
                        </button> 
                    </div>
                </div>
                          </form>
  </div>
    </div>
    <PartConfirm v-if="modal.confirm" :part="part" :equipment="equipment" @save="createPart" @close="closeConfirmModal" />
</div>
</template>

<script>
import { bus } from "../../../main";
import { required, requiredIf } from 'vuelidate/lib/validators'
import { categoryService, equipmentService, userService, partService } from '../../../services';
import Multiselect from 'vue-multiselect'
import { formatEquipment } from '@/helpers/string-helper';
import PartConfirm from './PartConfirm';

export default {
    name: 'PartForm',
    components: {
        Multiselect,
        PartConfirm
    },
    created() {
        this.getEquipments()
        this.getCategories()
        this.getAddresses()
    },
    data() {
        return {
            modal: {
                confirm: false,
            },
            files: [],
            addresses: [],
            equipments: [],
            open: true,
            loading: false,
            isSimilar: false,
            equipmentForm: null,
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
                address_id: '',
            },
            equipment: {
                id: null,
                description: '',
                patrimony: '',
                model: '',
                year: '',
                brand: '',
            },
            errors: {
                part: {
                    description: null,
                    quantity: null,
                    category_id: null,
                    allow_similar: null,
                    brand: null,
                    address_id: null,
                },
                equipment: {
                    id: null,
                    description: null
                }
            },
            categories: []
        }
    },
    methods: {
        formatEquipment,
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
            if(this.equipmentForm == 2) {
                if(this.$v.equipment.description.$invalid) {
                    this.errors.equipment.description = 'ERROR'
                }
            }

            // Only Validate if select is enable
            if(this.equipmentForm == 1) {
                if(this.$v.equipment.id.$invalid) {
                    this.errors.equipment.id = 'ERROR'
                }
            }
            
            if(this.$v.$anyError == false) {
                this.modal.confirm = true;
                bus.$emit("ModalOpen", true);
            }
        },
        closeConfirmModal() {
            this.modal.confirm = false;
            bus.$emit("ModalOpen", false);
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
                this.estimate.address_id = adr.id
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
            this.equipmentForm = 1;
        },
        showEquipmentSelect() {
            this.errors.equipment.id = 'OK'
            this.equipment.id = null
            this.equipmentForm = 2;
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
        createPart() {
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

                if(this.equipmentForm == 1) {
                    this.form.append('equipment_id', this.equipment.id.id);
                }

                if(this.equipmentForm == 2) {
                    this.form.append('equipment_description', this.equipment.description);
                    this.form.append('equipment_patrimony', this.equipment.patrimony);
                    this.form.append('equipment_model', this.equipment.model);
                    this.form.append('equipment_year', this.equipment.year);
                    this.form.append('equipment_brand', this.equipment.brand);
                }

                partService.createPart(this.form).then((response) => {
                        this.$toast.success(response.success_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 2500
                    });
                    
                this.$router.push({name: 'estimates'})
                
                this.closeConfirmModal()
                }).catch((error) => {
                    console.log(error.response.data)
                })
        }
    },
    validations: {
        equipment: {
            id: {
                required: requiredIf(function() {
                    return this.equipmentForm == 1
                })
            },
            description: {
                required: requiredIf(function() {
                    return this.equipmentForm == 2
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