<template>
  <transition name="modal-fade">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-main sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Métodos e Condições de Pagamentos
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-600">
                   Informe ao vendedor qual método e condição de pagamento você deseja usar!
                  </p>
                  
              <div class="flex -mx-3">
                  <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Método de pagamento</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <select v-model="paymentMethod" class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lightercursor-pointer">
                                    <option value='' disabled> Selecione...</option>
                                    <option   v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.description">{{paymentMethod.description}}</option>
                                </select>              
                            </div>                         
                        </div>

                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Condição de Pagamento</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <select v-model="paymentCondition" class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lightercursor-pointer">
                                    <option value='' disabled> Selecione...</option>
                                    <option  v-for="paymentCondition in paymentConditions" :key="paymentCondition.id" :value="paymentCondition.description">{{paymentCondition.description}}</option>
                                </select>                            
                              </div>                         
                        </div>
              </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="savePaymentInformation()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lighter sm:ml-3 sm:w-auto sm:text-sm"
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
import { orderService } from '../../../services';
import { bus } from '../../../main';
export default {
  name: "OrderPayment",
  props: ['order'],
  data() {
    return {
        selectedOrder: JSON.parse(JSON.stringify(this.$props.order.id)),
        paymentMethods: [],
        paymentConditions: [],
        paymentMethod: '',
        paymentCondition: '',
    }
  },
  mounted() {
      this.getPaymentInformation()
  },
  destroyed() {
      this.close()
  },
  methods: {
    close() {
      this.$emit("close");
    },
    savePaymentInformation() {
        if(this.paymentMethod !== '' && this.paymentCondition !== '') {
        const payload = {
            id: this.selectedOrder,
            paymentCondition: this.paymentCondition,
            paymentMethod: this.paymentMethod
        }
        orderService.updatePaymentOptionsByBuyer(payload).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.close();
            this.disabled = false
            bus.$emit('updatePaymentOnOrder', true);
            }).catch((error) => {
                console.log(error.response.data)
                this.disabled = false
            })
        } else {
            this.$toast.error('Você precisa selecionar um método e uma condição de pagamento', {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
        }
    },
    getPaymentInformation() {
            orderService.getPaymentOptions(this.selectedOrder).then((response) => {
                const res = response.data.data
                this.paymentMethods = res.paymentMethods
                this.paymentConditions = res.paymentConditions
                this.loader.loading = false
            }).catch((error) => {
               this.loader.loading = false
                console.log(error.response.data)
            })
    }
  },
};
</script>