<template>
  <div class="flex flex-col">
    <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Pedido #{{order.id}}
            <span class="bg-primary-main w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">Entrega</span>
           </h2>
          <bar-loader class="mt-3 mb-2" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        </div>
        <div v-if="order.status !== null" class="py-1 flex whitespace-nowrap flex flex-col md:flex-row items-center">
            <!-- <div v-if="order.status === 1" class="bg-primary-main text-center md:h-8  w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i class="mdi mdi-check text-white mr-1"></i>Aguardando Vendedor</span>
            </div>
            <div v-if="order.status === 2" class="bg-yellow-500 text-center w-full md:h-8 text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i class="mdi mdi-alert-outline text-white mr-1"></i>Método e Condição de Pagamento <span class="font-bold"> NÃO </span> escolhidos</span>
            </div> -->
            <div :class="formatStatus(order.status).bg" class="text-center my-5 w-full md:h-8 text-sm px-2 py-1.5 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i :class="formatStatus(order.status).icon" class="text-white mr-1"></i>{{formatStatus(order.status).text}}</span>
            </div> 
            <a target="_blank" :href="'https://prod.cotamaq.com.br/api/v1/orders/' + order.id + '/pdf'" class="md:h-8 bg-gray-600 text-center w-full text-sm px-2 py-1.5 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i class="mdi mdi-printer text-white mr-1"></i>Imprimir</span>
            </a> 
          </div>
      </div>
      <div class="flex flex-row justify-between mt-4">
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Detalhes do pedido
          </h2>
        </div>
      </div>
      <form v-if="order.proposal != null">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/3 px-3 mb-2 md:mb-0">
            <label  class="text-sm font-semibold text-gray-600 px-1">
              Fornecedor
            </label>
            <input disabled :value="formatMissingInformation(seller.company.company_name)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/3 px-3 mb-2 md:mb-0">
              <label  class="text-sm font-semibold text-gray-600 px-1">
                  CNPJ
              </label>
              <input disabled :value="formatMissingInformation(seller.company.cnpj)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/3 px-3 mb-2 md:mb-0">
              <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                  CEP{{seller.address.zipcode}}
              </label>
              <input disabled :value="formatMissingInformation(seller.address.zipcode)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
            <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
              Endereço
            </label>
            <input disabled :value="formatMissingInformation(seller.address.address)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                Bairro
              </label>
              <input disabled :value="formatMissingInformation(seller.address.neighborhood)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label  class="text-sm font-semibold text-gray-600 px-1">
                  Cidade
              </label>
              <input disabled :value="formatMissingInformation(seller.address.city)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                  Estado
              </label>
              <input disabled :value="formatMissingInformation(seller.address.state)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
            <label class="text-sm font-semibold text-gray-600 px-1">
              E-mail
            </label>
            <input disabled :value="formatMissingInformation(seller.company.email)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label  class="text-sm font-semibold text-gray-600 px-1">
                Telefone
              </label>
              <input disabled :value="formatMissingInformation(seller.company.phone)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                  Celular
              </label>
              <input disabled :value="formatMissingInformation(seller.company.phone)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                  Vendedor
              </label>
              <input disabled :value="formatMissingInformation(seller.name)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
        </div>
      </form>
      <div v-if="order.proposal != null" class="flex flex-row justify-between mt-4">
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Cotação #{{order.proposal.estimate.id}} - {{order.proposal.estimate.description}}
          </h2>
        </div>
        <div class="py-1">
          <span v-if="proposal.estimate.equipment != null"  @click="showEquipmentModal" class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded  cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
        </div>
      </div>
       <table v-if="order.proposal != null" class="w-full whitespace-no-wrap mb-2">
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th  class="text-center" style="width: 10%">Código</th>
                <th  class="text-center" style="width: 10%">Descrição</th>
                <th  class="text-center" style="width: 10%">Peça Similar?</th>
                <th  class="text-center" style="width: 10%">Quantidade</th>
                <th  class="text-center" style="width: 10%">Valor</th>
                <th  class="text-center" style="width: 10%">Subtotal</th>
            </tr>
        </thead> 
         <tbody class="bg-white dark:divide-gray-700 dark:bg-gray-800">
            <tr class="h-10">
                <td class="text-sm font-semibold text-center text-gray-700">{{formatMissingInformation(proposal.estimate.part_code)}}</td>
                <td class="text-sm font-semibold text-center text-gray-700">{{formatMissingInformation(proposal.estimate.description)}}</td>
                 <td class="text-sm  text-center text-gray-700">
                    <span :class="proposal.is_similar == 0 ? 'bg-red-500':'bg-primary-main'" class="text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                      {{formatSimilar(proposal.is_similar)}}
                    </span>
                </td>
                <td class="text-sm font-semibold text-center text-gray-700">{{formatMissingInformation(proposal.estimate.quantity)}}</td>
                <td class="text-sm font-semibold text-center text-gray-700">{{formatCurrency(proposal.value)}}</td>
                <td class="text-sm font-semibold text-center text-gray-700">{{formatCurrency(proposal.subtotal)}}</td>
            </tr>
         </tbody>
       </table>
         <div v-if="order.proposal != null" class="flex flex-row justify-center mt-4">
          <div class="py-1">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
              Pagamento -
            </h2>
          </div>
          <div v-if="order.status != null" class="py-1 flex whitespace-nowrap">
            <div v-if="order.status == 3" class="bg-primary-main text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center">Método: {{order.payment_method}} <span class="font-bold"></span></span>
            </div>
            <div v-if="order.status == 3" class="bg-primary-main text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center">Condição: {{order.payment_condition}} <span class="font-bold"></span></span>
            </div>
          </div>
         </div>
         <div v-if="order.status != null" class="-mx-3 md:flex mb-6">
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
            <label class="text-sm font-semibold text-gray-600 px-1">
              Data de validade
            </label>
            <input disabled :value="proposal.validity | formatDate"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label  class="text-sm font-semibold text-gray-600 px-1">
                Entrega
              </label>
              <input disabled :value="formatDelivery(proposal.delivery, proposal.delivery_time)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                  Frete
              </label>
              <input disabled :value="formatCurrency(proposal.shipping)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
          <div class="md:w-1/4 px-3 mb-2 md:mb-0">
              <label class="text-sm font-semibold text-gray-600 px-1">
                  Total
              </label>
              <input disabled :value="formatCurrency(proposal.total)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
          </div>
        </div>
        <div class="-mx-3 md:flex mt-4">
          <div class="md:w-full px-3 flex justify-end gap-2">
            <button @click="goBack" type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
              <span class="justify-center">Voltar</span>
            </button>
          </div>
        </div>
    </div>
    <OrderPayment :order="order" v-if="modal.payment" @close="closePaymentModal" />
    <EquipmentDetails v-if="modal.equipment" :equipment="proposal.estimate.equipment" @close="closeEquipmentModal" />
  </div>
</template>

<script>
import { bus } from '../../../main';
import { orderService } from '../../../services'
import OrderPayment from './OrderPayment';
import { BarLoader } from "@saeris/vue-spinners";
import EquipmentDetails from '../../../components/Shared/Equipment/EquipmentDetail'
import { formatMissingInformation, formatSimilar, formatCurrency,formatDelivery } from '@/helpers/string-helper';
export default {
    name: 'OrderShow',
    components: {
      OrderPayment,
      EquipmentDetails,
      BarLoader
    },
    created() {
      this.getOrder()
    },
    updated() {
        bus.$off('updatePaymentOnOrder');
        bus.$on('updatePaymentOnOrder', (data) => {
            if(data) {
               this.getOrder(); 
            }
        })
    },
    data() {
        return {
          loader: {
            loading: false,
            color: "#0bc95b",
          },
          modal: {
            payment: false,
            equipment: false,
          },
          order: {
            id: this.$route.params.order_id,
            status: null,
          },
          seller: {},
          proposal: null,
          newSeller: {},
          status: [
                {id: 1, bg: 'bg-orange-400', text: 'Aguardando vendedor', icon: 'mdi mdi-progress-clock'},
                {id: 2, bg: 'bg-orange-400', text: 'Pendente', icon: 'mdi mdi-progress-clock'},
                {id: 3, bg: 'bg-blue-500', text: 'Em preparo', icon: 'mdi mdi-package-variant-closed'},
                {id: 4, bg: 'bg-indigo-600', text: 'Em trânsito', icon: 'mdi mdi-truck-fast-outline'},
                {id: 5, bg: 'bg-primary-main', text: 'Entregue', icon: 'mdi mdi-calendar-check-outline'},
            ],
        }
    },
    methods: {
      formatDelivery,
      formatCurrency,
      formatMissingInformation,
      formatSimilar,
      goBack() {
        this.$router.back()
      },
      formatStatus(value) {
        let format = this.status.find(status => status.id == value)
        return format
      },
      showPaymentModal() {
        this.modal.payment = true
        bus.$emit('ModalOpen', true);
      },
      closePaymentModal() {
        this.modal.payment = false
        bus.$emit('ModalOpen', false);
      },
      closeEquipmentModal() {
        this.modal.equipment = false;
        bus.$emit("ModalOpen", false);
      },
      showEquipmentModal() {
        this.modal.equipment = true;
        bus.$emit("ModalOpen", true);
      },
      getOrder() {
        this.loader.loading = true;
          orderService.getOrderByBuyer(this.order.id).then((response) => {
            const res = response.data.data
            this.order = res.order
            this.proposal = res.order.proposal
            this.seller = res.seller

            if(res.seller.company.address){
              this.seller.address = res.seller.company.address
            }else{
              this.seller.address = []
            }
            this.newSeller = res.newseller
            this.loader.loading = false;
            if(this.order.status == 2) {
              this.showPaymentModal()
            }

          }).catch((error) => {
            console.log(error.response.data.error_message)
          })
        },
    }
    
}
</script>
<style>

</style>