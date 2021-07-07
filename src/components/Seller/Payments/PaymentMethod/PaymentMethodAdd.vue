<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Nova forma de pagamento
            </h3>
          </div>
          <!--body-->
          <form @submit.prevent="createPaymentMethod">
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição da forma de pagamento</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="paymentMethod.description" placeholder="exemplo: Débito" @change="() => (errors.description = 'OK')" :class="errors.description == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>   
                    <div v-if="errors.description == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Descrição é obrigatório.</span>
                    </div>                        
                </div>
            </div>

            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <div class="flex">
                      <label class="inline-flex items-center">
                          <input v-model="paymentMethod.main" type="checkbox" class="form-radio text-green-500">
                          <span class="ml-3 text-lg">Forma de pagamento padrão</span>
                      </label>    
                    </div>                         
                </div>
            </div>


          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              :disabled="disabled"
              type="submit"
              class=" bg-primary-main hover:bg-primary-lighterw-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
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
import { bus } from '../../../../main';
import { paymentMethodService } from '../../../../services'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "PaymentMethodAdd",
  data() {
      return {
          paymentMethod: {
            description: null,
          },
          disabled: false,
          errors: {
                description: null,
            }
      }
  },
  methods: {
    createPaymentMethod() {
        this.$v.$touch()
        if(this.$v.paymentMethod.description.$invalid) {
          this.errors.description = 'ERROR'
        } 

        if(this.$v.$anyError == false) {
          this.disabled = true
       const data = {
            description: this.paymentMethod.description,
            main: this.paymentMethod.main
        }
        paymentMethodService.createPaymentMethod(data).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            bus.$emit('updatePaymentMethod', true);
            this.disabled = false
            this.close();
        }).catch((error) => {
            console.log(error.response.data)
            this.disabled = false
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
    paymentMethod: {
      description: {
        required
      },
    }
  }
};
</script>