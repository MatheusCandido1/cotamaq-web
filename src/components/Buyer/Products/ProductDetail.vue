<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Dados do produto
            </h3>

            <div class="w-1/4 px-3">
                            <div class="flex" >
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button @click="toggleEdit()" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <span class="justify-center">{{edit === true ? 'Bloquear edição':'Habilitar Edição'}}</span>
                                </button>  
                                </div>  
                        </div>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Código da peça</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit" v-model="selectedProduct.part_code"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit" v-model="selectedProduct.description"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Quantidade</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input  :disabled="!edit" v-model="selectedProduct.quantity"  placeholder="" type="number" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                 <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                  <div class="flex items-center">
                    <label for="measure" class="text-sm font-semibold text-gray-600 px-1">
                      Unidade
                    </label>
                    
                    </div>
                    <select :disabled="!edit"
                            id="measure" v-model="selectedProduct.measure"
                            class="border-primary-main w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                      <option disabled value=""> Selecione...</option>
                      <option v-for="item in measurementUnit" :key="item.id" :value="item.id">{{ item.value }}
                      </option>
                    </select>
                    
                </div>
            </div>
            <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center">Aceita Similar?</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @change="handleSimilarClick()" :disabled="!edit" v-model="selectedProduct.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input @change="handleSimilarClick()" :disabled="!edit" v-model="selectedProduct.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                    </div>
                </div>  

                <div class="w-1/2 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-if="isSimilar" :disabled="!edit" v-model="selectedProduct.brand"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>
            </div>
        
            <div v-if="!edit" class="flex -mx-3 mt-4">
                <CoolLightBox 
                :items="images" 
                :index="index"
                :effect="'fade'"
                @close="index = null">
              </CoolLightBox>
              <div class="w-full px-3 mb-5">
                     <label class="text-sm font-semibold text-gray-600 px-1">Imagens</label>   
                    <div class="flex justify-start items-center flex-wrap mt-2">
                      <div class="flex flex-row justify-center items-center">
                        <div class="flex flex-col justify-center items-center"  v-for="(file, key) in selectedProduct.images" :key="key">
                          <img  class="h-28 w-28 rounded-lg ml-2 mr-2 cursor-pointer" @click="index = key" :src="file.image_path" />
                        </div>
                      </div>
                      </div>
              </div>
            </div> 
            
            <div v-if="edit" class="flex -mx-3 mt-4">
              <div class="w-full px-3 mb-5">
                <label class="text-sm font-semibold text-gray-600 px-1">Imagens</label>   
                  <span @click="addFiles()" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Adicionar Imagens</span>
                  <input ref="files" @change="onFileChange" id="files" class="hidden" multiple type="file" />         
                    <div class="flex justify-start items-center flex-wrap mt-2">
                      <div class="flex flex-row justify-center items-center">
                        <div class="flex flex-col justify-center items-center"  v-for="(file, key) in selectedProduct.images" :key="key">
                        <img  class="h-28 w-28 rounded-lg ml-2 mr-2" :src="file.image_path" />
                        <button @click="removeImage(key)" type="button" class="w-8 h-8 mt-1 justify-center items-center mr-2 bg-red-600 text-white p-2 rounded  leading-none flex items-center">
                           <i class="mdi mdi-delete text-white"></i>
                        </button>
                        </div>
                      </div>
                    </div>
                </div>
            </div> 


            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <textarea :disabled="!edit" v-model="selectedProduct.observation" class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                    </div>                         
                </div> 
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              v-if="edit"
              :disabled="disabled"
              @click="updateProduct()"
              class="w-full bg-primary-main hover:bg-primary-lighter inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salvar
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bus } from '../../../main';
import { productService } from '../../../services';


export default {
  name: "ProductDetail",
  props: ["product","allowEdit"],
  components: {
  },
  data() {
      return {
            selectedProduct: JSON.parse(JSON.stringify(this.$props.product)),
            edit: this.$props.allowEdit,
            disabled: false,
            isSimilar: false,
            index: null,
            images: [],
            measurementUnit: [
              {id: "g", value: 'Grama (g)'},
              {id: "kg", value: 'Quilograma (kg)'},
              {id: "m", value: 'Metro (m)'},
              {id: "mm", value: 'Milímetro (mm)'},
              {id: "cm", value: 'Centímetro (cm)'},
              {id: "pol", value: 'Polegada (pol)'},
            ],
      }
  },
  mounted() {
    this.formatProduct()
    this.handleImages()
    
  },
  destroyed() {
      this.close()
  },
  methods: {
    handleImages() {
      let imgs = []
      this.selectedProduct.images.forEach(function(value) {
       imgs.push(value.image_path)
      });
      this.images = imgs
    },
    formatProduct() {
      if(this.selectedProduct.allow_similar == 0) {
        this.isSimilar = true
      }

      if(this.selectedProduct.observation == 'null') {
        this.selectedProduct.observation = ''
      }
    },
    handleSimilarClick() {
      if(this.selectedProduct.allow_similar == 1) {
        this.isSimilar = false
      } else {
        this.isSimilar = true
      }
    },
    updateProduct() {
        this.disabled = true
        const data = {
            id: this.selectedProduct.id,
            part_code: this.selectedProduct.part_code,
            description: this.selectedProduct.description,
            quantity: this.selectedProduct.quantity,
            allow_similar: this.selectedProduct.allow_similar,
            measure: this.selectedProduct.measure,
            brand: this.selectedProduct.brand,
            observation: this.selectedProduct.observation,
            estimate_id: this.$route.params.id
        }
        productService.updateProduct(data).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.close();
            bus.$emit('updatedProduct', true);
            this.disabled = false
            }).catch((error) => {
                console.log(error.response.data)
            })
    },
    toggleEdit() {
        this.edit = !this.edit
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>