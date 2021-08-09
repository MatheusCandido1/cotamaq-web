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
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Código da peça
                        </label>
                    <input id="part_code" v-model="part.part_code"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                            Descrição
                        </label>
                        <input id="description" v-model="part.description"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="category_id" class="text-sm font-semibold text-gray-600 px-1">
                            Categoria
                        </label>
                        <select id="category_id" v-model="part.category_id"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option disabled value=""> Selecione... </option>
                            <option  v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                        </select> 
                    </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="quantity" class="text-sm font-semibold text-gray-600 px-1">
                            Quantidade
                        </label>
                        <input id="quantity" v-model="part.quantity" type="number" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
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
                    </div>
                    <div v-if="isSimilar" class="md:w-1/3 px-3 mb-2 md:mb-0">
                        <label for="brand" class="text-sm font-semibold text-gray-600 px-1">
                            Marca
                        </label>
                        <input id="brand" v-model="part.brand"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 mb-2 md:mb-0">
                        <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                            Observação
                        </label>
                        <textarea class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
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
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-full px-3 flex justify-end">
                        <button @click="handleEquipmentClick" type="button" class="sm:w-full md:w-1/2 flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center items-center"><i class="mdi mdi-playlist-plus"></i>Adicionar detalhes do equimento</span>
                        </button> 
                    </div>
                </div>
                
                <div v-if="showEquipmentArea" class="-mx-3 md:flex mb-6">
                    <h2>Teste</h2>
                </div>


                <div class="-mx-3 md:flex mt-2">
                    <div class="md:w-full px-3 flex justify-end gap-2">
                       <button type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar Rascunho</span>
                        </button>  
                        <button type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Enviar Cotação</span>
                        </button> 
                    </div>
                </div>
        <!--
     <div class="flex -mx-3">
        <div class="w-1/4 px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1">Código da peça</label>
            <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                <input v-model="part.part_code"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
            </div>                         
        </div>
        <div class="w-3/4 px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição da peça</label>
            <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                <input v-model="part.description" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
            </div>                         
        </div>
     </div>

     <div class="flex -mx-3">
        <div class="w-1/4 px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1">Quantidade</label>
            <div class="flex">
                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                <input v-model="part.quantity" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
            </div>                         
        </div>
        <div class="w-1/4 px-3 mb-5">
            <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center">Aceita Similar?</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @change="handleSimilarClick()"  v-model="part.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input  @change="handleSimilarClick()"   v-model="part.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                    </div>                      
        </div>
        <div v-if="isSimilar" class="w-2/4 px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
            <div class="flex">
                <div  class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                <input placeholder="" v-model="part.brand" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
            </div>                         
        </div>
     </div>
     
     <div class="flex -mx-3">
         <div class="w-full px-3 mb-5">
                 <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <textarea class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                    </div> 
              </div>
     </div>

        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <label class="text-sm font-semibold text-gray-600 px-1">Imagens</label>   
                <span  class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Adicionar Imagens</span>
                <input ref="files"  id="files" class="hidden" multiple type="file" />     
            </div>
        </div> -->
  </div>
   </div>
</div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { categoryService } from '../../../services';

export default {
    name: 'PartForm',
    components: {
    },
    created() {
        this.getCategories()
    },
    data() {
        return {
            open: true,
            isSimilar: false,
            showEquipmentArea: false,
            part: {
                part_code: null,
                description: null,
                quantity: null,
                allow_similar: null,
                brand: null,
                observation: null,
                category_id: '',
                delivery: null,
            },
            equipment: {

            },
            errors: {
              description: null,
              quantity: null,
              allow_similar: null,
              brand: null,
            },
            categories: [],

        }
    },
    methods: {
        getCategories() {
            categoryService.getCategories().then((response) => {
                this.categories = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        handleEquipmentClick() {
            this.showEquipmentArea = !this.showEquipmentArea;
        },
        handleSimilarClick() {
            this.errors.allow_similar = 'OK'
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

        }
    },
    validations: {
        part: {
            description: {
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

<style>

</style>