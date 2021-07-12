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
              Condições de pagamento
            <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </h3>
          </div>

          <!--body-->

          <div class="relative p-8 flex-auto">
            <div class="flex justify-center items-center" v-if="paymentConditions.length > 0" >
               <div class="w-32 h-32 mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"  tabindex="0" @click="togglePaymentCondition(paymentCondition.id)" v-for="paymentCondition in paymentConditions" :key="paymentCondition.id">
      <div class="flex grid justify-center items-center mb-3">
        <div class="flex justify-center items-center" >
          <div :class="selectedPaymentConditions.includes(paymentCondition.id) ? 'bg-primary-lighter':'bg-gray-400'" class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
            <i class="mdi mdi-checkbox-multiple-marked text-white text-md"></i>
          </div>
        </div>
        <h2 class="text-base text-blue-darker my-2">{{paymentCondition.description}}</h2>
        
      </div>
    </div>
              </div>

              <div class="flex justify-center items-center" v-else >
                <span class="text-sm text-center text-gray-700">{{loader.loading ? 'Carregando...' :'Você não possui nenhuma condição de pagamento cadastrada!'}}  </span>
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
              v-if="selectedPaymentConditions.length > 0"
              @click="attachPaymentConditions()"
              class=" bg-primary-main hover:bg-primary-lighterw-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
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
import { proposalService, paymentConditionService } from '../../../services';
import { BarLoader } from '@saeris/vue-spinners'

export default {
    name: "ProposalPaymentCondition",
    components: {
        BarLoader
    },
    mounted() {
        this.getPaymentConditions();
        this.getSelectedPaymentConditions();
    },
    data() {
      return {
        proposal_id: this.$route.params.id,
        selectedPaymentConditions: [],
        paymentConditions: [],
        loader: {
                loading: false,
                color: '#0bc95b',
            },
      }
    },
    methods: {
        close() {
        this.$emit("close");
        },
        attachPaymentConditions() {
            const payload = this.selectedPaymentConditions
            proposalService.togglePaymentConditions(payload, this.proposal_id).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.loader.loading = false;
            bus.$emit('updatePayment', true);
            this.close();
            }).catch((e) => {
            console.log(e.response)
            })
        },
        getSelectedPaymentConditions() {
            this.loader.loading = true
            paymentConditionService.getPaymentConditionByProposal(this.proposal_id).then((response) => {
              this.selectedPaymentConditions = response.data.data
                this.loader.loading = false
            }).catch((error) => {
                console.log(error.response.data)
            }) 
        },
        getPaymentConditions() {
            this.loader.loading = true
            paymentConditionService.getPaymentConditions().then((response) => {
                this.paymentConditions = response.data.data.paymentConditions
                this.loader.loading = false
            }).catch((error) => {
                console.log(error.response.data)
            }) 

        },
        togglePaymentCondition(value) {
            if(this.selectedPaymentConditions.includes(value)) {
                for(var i = 0; i < this.selectedPaymentConditions.length; i++) {
                if(this.selectedPaymentConditions[i] === value) {
                    this.selectedPaymentConditions.splice(i, 1); 
                }
                }
            } else {
                this.selectedPaymentConditions.push(value)
            }
        },
  },
};
</script>