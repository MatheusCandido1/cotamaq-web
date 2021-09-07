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
              Nova condição de pagamento
            </h3>
          </div>
          <!--body-->
          <form @submit.prevent="createPaymentCondition">
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição da condição de pagamento</label>
                    <div class="flex">
                    <div  class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="paymentCondition.description" placeholder="exemplo: 30 dias" @change="() => (errors.description = 'OK')" :class="errors.description == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div> 
                    <div v-if="errors.description == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Descrição é obrigatório.</span>
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
import { paymentConditionService } from '../../../../services'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "PaymentConditionAdd",
  data() {
      return {
        paymentCondition: {
          description: null,
        },
        disabled: false,
        errors: {
              description: null,
            }
      }
  },
  methods: {
    createPaymentCondition() {
        this.$v.$touch()
        if(this.$v.paymentCondition.description.$invalid) {
          this.errors.description = 'ERROR'
        } 

        if(this.$v.$anyError == false) {
          this.disabled = true
        const data = {
            description: this.paymentCondition.description,
            main: this.paymentCondition.main
        }
        paymentConditionService.createPaymentCondition(data).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.$store.commit('setPaymentCondition',response.data)
            bus.$emit('updatePaymentCondition', true);
            bus.$emit('updatePayment', true);
            this.close();
            this.disabled = false
        }).catch((error) => {
            this.disabled = false
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
    paymentCondition: {
      description: {
        required
      },
    }
  }
};
</script>