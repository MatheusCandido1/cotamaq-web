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
          <form @submit.prevent="createProduct">
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Dados do produto
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Código da peça</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="product.part_code"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="product.description" @change="() => (errors.description = 'OK')" :class="errors.description == 'ERROR' ? 'border-red-400':'border-primary-main'"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>  
                    <div v-if="errors.description == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Descrição é obrigatório.</span>
                    </div>                       
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Quantidade</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input  @change="() => (errors.quantity = 'OK')" :class="errors.quantity == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="product.quantity"  placeholder="" type="number" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>   
                    <div v-if="errors.quantity == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Quantidade é obrigatório.</span>
                    </div>                          
                </div>
            </div>
           
            <div class="flex -mx-3 mt-4">
              <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                <div class="flex items-center">
                  <label for="measure" class="text-sm font-semibold text-gray-600 px-1">
                    Unidade
                  </label>
                  
                  </div>
                  <select @change="() => (errors.measure = 'OK')"
                          id="measure" v-model="product.measure"
                          :class="errors.measure == 'ERROR' ? 'border-red-400':'border-primary-main'"
                          class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    <option disabled value=""> Selecione...</option>
                    <option v-for="item in measurementUnit" :key="item.id" :value="item.id">{{ item.value }}
                    </option>
                  </select>
                  <div v-if="errors.measure == 'ERROR'" class="flex justify-center align-items">
                  <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Unidade é obrigatório.</span>
                </div>
              </div>
                <div class="w-1/2 px-3 mb-5">
                <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center">Aceita Similar?</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @change="handleSimilarClick()"  v-model="product.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input  @change="handleSimilarClick()"   v-model="product.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                        
                        
                    </div>
                  <div  v-if="errors.allow_similar == 'ERROR'" class="flex justify-center align-items">
                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Aceita Similar é obrigatório.</span>
                  </div> 
                    
                </div>    
                
                <div v-if="isSimilar" class="w-1/2 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input  @change="() => (errors.brand = 'OK')" :class="errors.brand == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="product.brand"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>    

                    <div  v-if="errors.brand == 'ERROR'" class="flex justify-center align-items">
                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Marca é obrigatório.</span>
                  </div>                      
                </div> 
            </div>

            <div class="flex -mx-3 mt-4">
              <div class="w-full px-3 mb-5">
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
            
            <div class="flex -mx-3 mt-4">
              <div class="w-full px-3 mb-5">
                 <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <textarea v-model="product.observation" class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
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
              :disabled="disabled"
              type="submit"
              class="w-full bg-primary-main hover:bg-primary-lighter inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salvar
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bus } from '../../../main';
import { productService } from '../../../services';
import { required, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: "ProductAdd",
  components: {
  },
  data() {
      return {
            files: [],
            disabled: false,
            hover: false,
            isSimilar: false,
            form: new FormData,
            measurementUnit: [
              {id: "g", value: 'Grama (g)'},
              {id: "kg", value: 'Quilograma (kg)'},
              {id: "m", value: 'Metro (m)'},
              {id: "mm", value: 'Milímetro (mm)'},
              {id: "cm", value: 'Centímetro (cm)'},
              {id: "pol", value: 'Polegada (pol)'},
              {id: "l", value: 'Litro (l)'},
              {id: "o", value: 'Outro'},
            ],
            product: {
                part_code: null,
                description: null,
                quantity: null,
                allow_similar: null,
                measure: null,
                observation: null,
                brand: null,
                estimate_id: null,
                images: []
            },
            errors: {
              description: null,
              quantity: null,
              allow_similar: null,
              brand: null,
              measure: null,
            }
      }
  },
  destroyed() {
      this.close()
  },
  methods: {
    handleSimilarClick() {
      this.errors.allow_similar = 'OK'
      if(this.product.allow_similar == 1) {
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
    createProduct() {
        this.$v.$touch()

        if(this.$v.product.description.$invalid) {
          this.errors.description = 'ERROR'
        } 

        if(this.$v.product.quantity.$invalid) {
          this.errors.quantity = 'ERROR'
        } 

        if(this.$v.product.allow_similar.$invalid) {
          this.errors.allow_similar = 'ERROR'
        } 

        if(this.$v.product.brand.$invalid) {
          this.errors.brand = 'ERROR'
        }

        if(this.$v.product.measure.$invalid) {
          this.errors.measure = 'ERROR'
        }

        if(this.$v.$anyError == false) {
        this.disabled = true
            for(let i=0; i<this.files.length;i++){
              this.form.append('files[]',this.files[i]);
            }
            this.form.append('part_code', this.product.part_code);
            this.form.append('description', this.product.description);
            this.form.append('quantity', this.product.quantity);
            this.form.append('measure', this.product.measure);
            this.form.append('allow_similar', this.product.allow_similar);
            this.form.append('observation', this.product.observation);
            this.form.append('brand', this.product.brand);
            this.form.append('estimate_id', this.product.estimate_id);

          productService.createProduct(this.$route.params.id, this.form).then((response) => {
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
          }
    },
    close() {
      this.$emit("close");
    },
  },
  validations: {
        product: {
            description: {
                required
            },
            quantity: {
                required
            },
            allow_similar: {
                required
            },
            measure: {
                required
            },
            brand: {
              required: requiredIf(function() {
                return this.product.allow_similar == 0
              })
            }
        }
    }
};
</script>
<style scoped>
.image {
  opacity: 1;
  width: 6rem; 
  height: 6rem;
  border-radius: 0.5rem;
  margin-left: 10px;
  transition: .5s ease;
  backface-visibility: hidden;
}
</style>