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
                <div class="w-1/2 px-3 mb-5">
                <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center">Aceita Similar?</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @change="() => (errors.allow_similar = 'OK')"  v-model="product.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input  @change="() => (errors.allow_similar = 'OK')"   v-model="product.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                        
                        
                    </div>
                  <div  v-if="errors.allow_similar == 'ERROR'" class="flex justify-center align-items">
                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Aceita Similar é obrigatório.</span>
                  </div> 
                    
                </div>    
                
                <div class="w-1/2 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="product.brand"  placeholder="" type="text" class="border-primary-main w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div> 
            </div>

            <div class="flex -mx-3 mt-4">
              <div class="w-2/6 px-3 mb-5">
                     <label class="text-sm font-semibold text-gray-600 px-1">Imagens</label>            
                </div> 
                <div class="w-4/6 px-3 mb-5">
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: "ProductAdd",
  components: {
  },
  data() {
      return {
            teste: [],
            index: null,
            url: null,
            disabled: false,
            hover: false,
            newForm: new FormData,
            product: {
                part_code: null,
                description: null,
                quantity: null,
                allow_similar: null,
                observation: null,
                brand: null,
                estimate_id: null,
                images: []
            },
            errors: {
              description: null,
              quantity: null,
              allow_similar: null,
            }
      }
  },
  methods: {
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
                            
        if(this.$v.$anyError == false) {
        this.disabled = true
         const data = {
            part_code: this.product.part_code,
            description: this.product.description,
            quantity: this.product.quantity,
            allow_similar: this.product.allow_similar,
            observation: this.product.observation,
            brand: this.product.brand,
            estimate_id: this.$route.params.id,
          } 
          productService.createProduct(data).then((response) => {
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
    clearInputs() {
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