<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Pedido #{{order.id}} <span class="bg-primary-main w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">Entrega</span>
                    </h2>
                    <bar-loader class="mt-3 mb-2" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                </div>
                <div v-if="order.status != null" class="py-1 flex whitespace-nowrap flex-col md:flex-row">
                    <button v-if="order.status == 1" class="mr-2 pointer-events-none bg-yellow-500 mt-5 text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white md:h-8">
                        <span class="justify-center"><i class="mdi mdi-alert-outline text-white mr-1"></i>Métodos e Condições de Pagamento <span class="font-bold"> NÃO </span> enviados</span>
                    </button>
                    <button @click="showPaymentsModal" v-if="order.status == 2" class="bg-primary-main text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white md:h-8">
                        <span class="justify-center"><i class="mdi mdi-check text-white mr-1"></i>Métodos e Condições de Pagamento enviados</span>
                    </button> 
                    <div class=" relative inline-block text-left dropdown">
                            <span class="rounded-md shadow-sm"
                            ><button :class="formatStatus(order.status).bg" class="md:h-8 inline-flex mt-5 text-white justify-center w-full px-4 py-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-md" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                <span>
                                    <i :class="formatStatus(order.status).icon" class="text-white mr-1"></i>
                                    {{formatStatus(order.status).text}}
                                </span>
                                <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button
                            ></span>
                            <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                            <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                <div class="">                                    
                                    <button v-if="order.status == 1" class="hover:bg-gray-100 text-black w-full flex justify-start w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" ><i class="mdi mdi-alert-octagon-outline mr-2"></i>Não Disponível</button>
                                    <button v-if="order.status == 2" @click="showStatusModal(3)" class="hover:bg-gray-100 text-black flex justify-start w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" ><i class="mdi mdi-package-variant-closed mr-2"></i>Em preparo</button>
                                    <button v-if="order.status == 3" @click="showStatusModal(4)" class="hover:bg-gray-100 text-black flex justify-start w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" ><i class="mdi mdi-truck-fast-outline mr-2"></i>Em trânsito</button>
                                    <button v-if="order.status == 4" @click="showStatusModal(5)" class="hover:bg-gray-100 text-black flex justify-start w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" ><i class="mdi mdi-package-variant mr-2"></i>Pronto para retirada</button>
                                </div>
                            </div>
                        </div>
                        </div>
                        <a target="_blank" :href="'https://stage.cotamaq.com.br/api/v1/orders/' + order.id + '/pdf'" class=" bg-gray-600 my-5 text-center w-full text-sm px-2 py-1.5 font-semibold text-white rounded-md dark:text-white md:ml-2 md:h-8">
                            <span class="justify-center"><i class="mdi mdi-printer text-white mr-1"></i>Imprimir</span>
                        </a> 
                </div>
            </div>
            <div v-if="order.status == 1">
                <h2 class="text-2xl text-center mb-4 font-semibold text-gray-700 dark:text-gray-200">Métodos e Condições de Pagamento</h2>
                <div class="flex -mx-3 flex-col md:flex-row">
                    <div class="md:w-1/2 w-full px-3 mb-5 md:border-r-2 border-primary-main p-8">
                      <h3 class="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Formas de
                        Pagamento </h3>
                      <span class="flex justify-center items-center mb-2">
                            <bar-loader :color="loaderMethod.color" :loading="loaderMethod.loading" :size="150"
                                        class="mt-3"></bar-loader>
                        </span>
                      <div class="flex justify-center items-center flex-wrap">
                        <div
                            v-for="paymentMethod in paymentMethods"
                            :key="paymentMethod.id"
                            class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                            @click="togglePaymentMethod(paymentMethod.id)">
                          <div class="flex grid justify-center items-center">
                            <div class="flex justify-center items-center">
                              <div
                                  :class="selectedPaymentMethods.includes(paymentMethod.id) ? 'bg-primary-lighter':'bg-gray-400'"
                                  class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                <i class="mdi mdi-checkbox-multiple-marked text-white text-sm"></i>
                              </div>
                            </div>
                            <p class="text-sm font-semibold text-gray-700 mt-1">{{ paymentMethod.description }}</p>
                          </div>
                        </div>
                        <div
                            class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 bg-primary-lighter cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                            @click="showMethodModal">
                          <div class="flex grid justify-center items-center">
                            <div class="flex justify-center items-center">
                              <div
                                  class="mx-auto flex-shrink-0 flex items-center bg-white justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                <i class="mdi mdi-plus-box-multiple text-primary-main text-sm"></i>
                              </div>
                            </div>
                            <p class="text-sm font-semibold text-white mt-1">Adicionar</p>
                          </div>
                        </div>
                      </div>
                      <div v-if="selectedPaymentMethods.length > 0 && paymentMethods.length > 0" class="flex flex-wrap">
                        <label class="text-sm font-semibold text-gray-600 px-1">Selecionados: </label>
                        <span v-for="paymentMethod in selectedPaymentMethods" :key="paymentMethod"
                              class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">{{
                            getPaymentMethodName(paymentMethod)
                          }}</span>
                      </div>
                      <div v-if="selectedPaymentMethods.length == 0">
                        <label class="text-sm font-semibold text-gray-600 px-1">Nenhuma forma de pagamento
                          escolhida </label>
                      </div>
                      <div v-if="errors.paymentMethod == 'ERROR'">
                        <span class="text-xs text-red-500 font-semibold px-1">Você deve escolher pelo menos uma forma de pagamento.</span>
                      </div>
                    </div>

                  <div class="md:w-1/2 w-full px-3 mb-5  border-primary-main p-8">
                    <h3 class="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Condições de
                      Pagamento </h3>
                    <span class="flex justify-center items-center mb-2">
                            <bar-loader :color="loaderCondition.color" :loading="loaderCondition.loading" :size="150"
                                        class="mt-3"></bar-loader>
                        </span>
                    <div class="flex justify-center items-center flex-wrap  ">
                      <div v-for="paymentCondition in paymentConditions"
                           :key="paymentCondition.id"
                           class="w-30 h-30  mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                           tabindex="0" @click="togglePaymentCondition(paymentCondition.id)">
                        <div class="flex grid justify-center items-center">
                          <div class="flex justify-center items-center">
                            <div
                                :class="selectedPaymentConditions.includes(paymentCondition.id) ? 'bg-primary-lighter':'bg-gray-400'"
                                class="mx-auto flex-shrink-0 flex items-center  justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                              <i class="mdi mdi-checkbox-multiple-marked text-white text-sm"></i>
                            </div>
                          </div>
                          <p class="text-sm font-semibold text-gray-700 mt-1 whitespace-no-wrap">
                            {{ paymentCondition.description }}</p>
                        </div>
                      </div>
                      <div
                          class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 bg-primary-lighter cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                          @click="showConditionModal">
                        <div class="flex grid justify-center items-center">
                          <div class="flex justify-center items-center">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center bg-white justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                              <i class="mdi mdi-plus-box-multiple text-primary-main text-sm"></i>
                            </div>
                          </div>
                          <p class="text-sm font-semibold text-white mt-1">Adicionar</p>
                        </div>
                      </div>
                    </div>
                    <div v-if="selectedPaymentConditions.length > 0 && paymentConditions.length > 0"
                         class="flex flex-wrap">
                      <label class="text-sm font-semibold text-gray-600 px-1">Selecionados: </label>
                      <span v-for="paymentCondition in selectedPaymentConditions" :key="paymentCondition"
                            class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">{{
                          getPaymentConditionName(paymentCondition)
                        }}</span>
                    </div>
                    <div v-if="selectedPaymentConditions.length == 0">
                      <label class="text-sm font-semibold text-gray-600 px-1">Nenhuma condição de pagamento
                        escolhida </label>
                    </div>
                    <div v-if="errors.paymentCondition == 'ERROR'">
                      <span class="text-xs text-red-500 font-semibold px-1">Você deve escolher pelo menos uma condição de pagamento.</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                    <div class="w-1/7 mb-5">
                      <label class="text-xs font-semibold px-1"></label>
                        <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                            <button @click="showOrderPaymentConfirmModal" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Salvar</span>
                            </button>                         
                        </div>   
                    </div>
                </div>
            </div>
            <div v-if="order.proposal != null" class="flex flex-row justify-between mt-4">
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
                    Cliente
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.company_name)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                    <label  class="text-sm font-semibold text-gray-600 px-1">
                        CNPJ
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.cnpj)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                    <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                        CEP
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.address)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                    <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                    Endereço
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.address)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                    <label class="text-sm font-semibold text-gray-600 px-1">
                        Bairro
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.address)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                    <label  class="text-sm font-semibold text-gray-600 px-1">
                        Cidade
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.address)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                    <label class="text-sm font-semibold text-gray-600 px-1">
                        Estado
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.address)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                    <label class="text-sm font-semibold text-gray-600 px-1">
                    E-mail
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.email)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                    <label  class="text-sm font-semibold text-gray-600 px-1">
                        Telefone
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.phone)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>
                <div class="md:w-1/3 px-3 mb-2 md:mb-0">
                    <label class="text-sm font-semibold text-gray-600 px-1">
                        Celular
                    </label>
                    <input disabled :value="formatMissingInformation(buyer.company.phone)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
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
       <div v-if="order.proposal != null && order.status == 3" class="flex flex-row justify-center mt-4">
          <div class="py-1">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
              Pagamento -
            </h2>
          </div>
          <div v-if="order.status != null && order.status == 3" class="py-1 flex whitespace-nowrap">
            <button @click="showPaymentsModal" v-if="order.status == 3" class="bg-primary-main text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i class="mdi mdi-check text-white mr-1"></i>Método: {{order.payment_method}} <span class="font-bold"></span></span>
            </button>
            <button @click="showPaymentsModal" v-if="order.status == 3" class="bg-primary-main text-center w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white ml-2">
              <span class="justify-center"><i class="mdi mdi-check text-white mr-1"></i>Condição: {{order.payment_condition}} <span class="font-bold"></span></span>
            </button>
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
        <OrderPayments 
            v-if="modal.payments" 
            @close="closePaymentsModal"
            :buyerMethod="order.payment_method"
            :buyerCondition="order.payment_condition"
            :paymentConditions="paymentConditions" 
            :paymentMethods="paymentMethods" 
            :selectedPaymentMethods="selectedPaymentMethods" 
            :selectedPaymentConditions="selectedPaymentConditions"
         />
         <OrderStatus
            v-if="modal.status"
            :order="order"
            :status="newStatus"
            @close="closeStatusModal"
            >
        </OrderStatus>
        <OrderAlert :status="order.status" v-if="modal.alert" @close="closeAlertModal" />
        <PaymentConditionAdd v-if="modal.condition" @close="closeConditionModal" />
        <PaymentMethodAdd v-if="modal.method" @close="closeMethodModal" />
        <OrderPaymentConfirmModal v-if="modal.payment" @close="closeOrderPaymentConfirmModal" @save="selectPayment" />
        <EquipmentDetail v-if="modal.equiment" :equipment="proposal.estimate.equipment"  @close="closeEquipmentDetail"/>
    </div>
</template>

<script>
import {bus} from '../../../main';
import {orderService} from '../../../services'
import OrderAlert from './OrderAlert';
import {BarLoader} from '@saeris/vue-spinners';
import PaymentConditionAdd from '../Payments/PaymentCondition/PaymentConditionAdd';
import PaymentMethodAdd from '../Payments/PaymentMethod/PaymentMethodAdd';
import OrderPaymentConfirmModal from './OrderPaymentConfirm';
import OrderPayments from './OrderPayments'
import OrderStatus from './OrderStatus'
import {formatCurrency, formatDelivery, formatMissingInformation, formatSimilar} from '@/helpers/string-helper';
import EquipmentDetail from "../../Shared/Equipment/EquipmentDetail";

export default {
  name: 'OrderShow',
  components: {
    EquipmentDetail,
    OrderAlert,
    BarLoader,
    PaymentConditionAdd,
    PaymentMethodAdd,
    OrderPaymentConfirmModal,
    OrderPayments,
    OrderStatus
  },
  updated() {
    bus.$off('updatePaymentMethod');
    bus.$on('updatePaymentMethod', (data) => {
      if (data) {
        // this.getOrder()
        this.paymentMethods.push(this.$store.getters.paymentMethod)
      }
    })

    bus.$off('updateOrderStatus');
    bus.$on('updateOrderStatus', (data) => {
      if (data) {
        this.getOrder()
      }
    })

    bus.$off('updatePaymentCondition');
    bus.$on('updatePaymentCondition', (data) => {
      if (data) {
        // this.getOrder()
        this.paymentConditions.push(this.$store.getters.paymentCondition)
      }
    })
  },
  created() {
    this.getOrder()
  },
  data() {
    return {
      errors: {
        paymentMethod: null,
        paymentCondition: null
      },
      loader: {
        loading: false,
        color: "#0bc95b",
      },
      loaderMethod: {
        loading: false,
        color: '#0bc95b',
      },
      loaderCondition: {
        loading: false,
        color: '#0bc95b',
      },
      modal: {
        status: false,
        alert: false,
        method: false,
        condition: false,
        payment: false,
        payments: false,
        equiment: false
      },
      paymentMethods: [],
      paymentConditions: [],
      selectedPaymentMethods: [],
      selectedPaymentConditions: [],
      newStatus: null,
      oldStatus: null,
      proposal: null,
      selectedPaymentConditionsName:'',
      buyer: {},
      order: {
        id: this.$route.params.order_id,
        status: null,
      },
      status: [
        {id: 1, bg: 'bg-orange-400', text: 'Pendente', icon: 'mdi mdi-progress-clock'},
        {id: 2, bg: 'bg-orange-400', text: 'Aguardando comprador', icon: 'mdi mdi-progress-clock'},
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
    showOrderPaymentConfirmModal() {
      if (this.selectedPaymentMethods.length == 0) {
        this.errors.paymentMethod = 'ERROR'
      }
      if (this.selectedPaymentConditions.length == 0) {
        this.errors.paymentCondition = 'ERROR'
      }
      if (this.selectedPaymentConditions.length > 0 && this.selectedPaymentConditions.length > 0) {
        this.modal.payment = true;
        bus.$emit('ModalOpen', true);
      }
    },
    goBack() {
      this.$router.back()
    },
    closeOrderPaymentConfirmModal() {
      this.modal.payment = false;
      bus.$emit('ModalOpen', true);
    },
    showEquipmentModal(){
      this.modal.equiment = true;
      bus.$emit('ModalOpen', true);
    },
    showPaymentsModal() {
      this.modal.payments = true;
      bus.$emit('ModalOpen', true);
    },
    closePaymentsModal() {
      this.modal.payments = false;
      bus.$emit('ModalOpen', false);
    },
    closeEquipmentDetail() {
      this.modal.equiment = false;
      bus.$emit('ModalOpen', false);
    },
    showMethodModal() {
      this.modal.method = true;
      bus.$emit('ModalOpen', true);
    },
    closeMethodModal() {
      this.modal.method = false;
      bus.$emit('ModalOpen', false);
    },
    showConditionModal() {
      this.modal.condition = true;
      bus.$emit('ModalOpen', true);
    },
    closeConditionModal() {
      this.modal.condition = false;
      bus.$emit('ModalOpen', false);
    },
    showStatusModal(status) {
      this.newStatus = status
      this.modal.status = true;
      bus.$emit('ModalOpen', true);
    },
    closeStatusModal() {
      this.modal.status = false;
      bus.$emit('ModalOpen', false);
    },
    selectPayment() {
      if (this.selectedPaymentMethods.length == 0) {
        this.errors.paymentMethod = 'ERROR'
      }
      if (this.selectedPaymentConditions.length == 0) {
        this.errors.paymentCondition = 'ERROR'
      }
      if (this.selectedPaymentConditions.length > 0 && this.selectedPaymentConditions.length > 0) {
        this.disabled = true
        const payload = {
          id: this.order.id,
          paymentMethods: this.selectedPaymentMethods,
          paymentConditions: this.selectedPaymentConditions,
        }
        orderService.selectPaymentBySeller(payload).then((response) => {
          this.$toast.success(response.success_message, {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500
          });
          this.disabled = false
          this.getOrder();
        }).catch((error) => {
          console.log(error.response.data)
          this.disabled = false
        })
      }
    },
    showAlertModal() {
      this.modal.alert = true;
      bus.$emit('ModalOpen', true);
    },
    closeAlertModal() {
      this.modal.alert = false;
      bus.$emit('ModalOpen', false);
    },
    togglePaymentMethod(value) {
      if (this.selectedPaymentMethods.length != 1) {
        this.errors.paymentMethod = 'OK'
      }
      if (this.selectedPaymentMethods.includes(value)) {
        for (var i = 0; i < this.selectedPaymentMethods.length; i++) {
          if (this.selectedPaymentMethods[i] === value) {
            this.selectedPaymentMethods.splice(i, 1);
          }
        }
      } else {
        this.selectedPaymentMethods.push(value)
      }
    },
    togglePaymentCondition(value) {
      if (this.selectedPaymentConditions.length != 1) {
        this.errors.paymentCondition = 'OK'
      }
      if (this.selectedPaymentConditions.includes(value)) {
        for (var i = 0; i < this.selectedPaymentConditions.length; i++) {
          if (this.selectedPaymentConditions[i] === value) {
            this.selectedPaymentConditions.splice(i, 1);
          }
        }
      } else {
        if(this.selectedPaymentConditionsName.length > 0){
          return this.$toast.error('Condições de Pagamento ja foi selecionada', {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500
          });
        }
        this.selectedPaymentConditions.push(value)
      }
    },
    getPaymentMethodName(id) {
      const {description} = this.paymentMethods.find(pay => pay.id == id)
      return description
    },
    getPaymentConditionName(id) {
      const {description} = this.paymentConditions.find(pay => pay.id == id)
      return description
    },
    getOrder() {
      this.loader.loading = true;
      orderService.getOrderBySeller(this.order.id).then((response) => {
        const res = response.data.data
        this.order = res.order
        this.buyer = res.buyer
        this.proposal = res.order.proposal
        this.paymentMethods = res.paymentMethods
        this.paymentConditions = res.paymentConditions
        this.selectedPaymentMethods = res.selectedPaymentMethods
        this.selectedPaymentConditions = res.selectedPaymentConditions
        this.selectedPaymentConditionsName = res.selectedPaymentConditionsName
        this.loader.loading = false;

        if (this.order.status == 1) {
          this.modal.status == 1
          this.showAlertModal()
        }
        if (this.order.status == 2) {
          this.modal.status == 2
          this.showAlertModal()
        }
      }).catch((error) => {
                console.log(error.response.data.error_message)
            })
        },
        formatStatus(value) {
            let format = this.status.find(status => status.id == value)
            return format
        },
    }
    
}
</script>

<style>
.dropdown:focus-within .dropdown-menu {
  opacity:1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>