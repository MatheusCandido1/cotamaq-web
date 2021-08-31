<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex flex-row justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Pedido #{{order.id}} <span class="bg-primary-main w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">Entrega</span>
                    </h2>
                </div>
                <div class="py-1 flex whitespace-nowrap	">
                    <div :class="formatStatus(order.status).bg" class="text-center w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">
                        <span class="justify-center"><i :class="formatStatus(order.status).icon" class="text-white mr-1"></i>{{formatStatus(order.status).text}}</span>
                    </div> 
                    <div class=" bg-gray-600 text-center w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">
                        <span class="justify-center"><i class="mdi mdi-printer text-white mr-1"></i>Imprimir</span>
                    </div> 
                </div>
            </div>
            <div v-if="order.status == 1">
                <h2 class="text-2xl text-center mb-4 font-semibold text-gray-700 dark:text-gray-200">Métodos e Condições de Pagamento</h2>
                <div class="flex -mx-3">
                    <div class="w-1/2 px-3 mb-5  border-r-2 border-primary-main p-8">
                        <h3 class="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Formas de Pagamento </h3>
                        <span class="flex justify-center items-center mb-2">
                            <bar-loader class="mt-3" :color="loaderMethod.color" :loading="loaderMethod.loading" :size="150"></bar-loader>
                        </span>
                        <div  class="flex justify-center items-center flex-wrap ">   
                            <div class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green" v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" @click="togglePaymentMethod(paymentMethod.id)">
                                <div class="flex grid justify-center items-center">
                                    <div class="flex justify-center items-center" >
                                        <div :class="selectedPaymentMethods.includes(paymentMethod.id) ? 'bg-primary-lighter':'bg-gray-400'" class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                            <i class="mdi mdi-checkbox-multiple-marked text-white text-sm"></i>
                                        </div>
                                    </div>
                                    <p class="text-sm font-semibold text-gray-700 mt-1">{{paymentMethod.description}}</p>
                                </div>
                            </div>
                            <div @click="showMethodModal" class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 bg-primary-lighter cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green">
                                <div class="flex grid justify-center items-center">
                                    <div class="flex justify-center items-center" >
                                        <div class="mx-auto flex-shrink-0 flex items-center bg-white justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                            <i class="mdi mdi-plus-box-multiple text-primary-main text-sm"></i>
                                        </div>
                                    </div>
                                    <p class="text-sm font-semibold text-white mt-1">Adicionar</p>
                                </div>
                            </div>
                        </div>         
                        <div class="flex flex-wrap" v-if="selectedPaymentMethods.length > 0 && paymentMethods.length > 0">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Selecionados: </label>
                            <span v-for="paymentMethod in selectedPaymentMethods" :key="paymentMethod" class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">{{getPaymentMethodName(paymentMethod)}}</span>                       
                        </div>   
                        <div v-if="selectedPaymentMethods.length == 0">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Nenhuma forma de pagamento escolhida </label>
                        </div>   
                        <div v-if="errors.paymentMethod == 'ERROR'">
                            <span class="text-xs text-red-500 font-semibold px-1">Você deve escolher pelo menos uma forma de pagamento.</span>
                        </div>  
                    </div>

                    <div class="w-1/2 px-3 mb-5  border-primary-main p-8">
                        <h3 class="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Condições de Pagamento </h3>
                        <span class="flex justify-center items-center mb-2">
                            <bar-loader class="mt-3" :color="loaderCondition.color" :loading="loaderCondition.loading" :size="150"></bar-loader>
                        </span>
                        <div class="flex justify-center items-center flex-wrap  ">
                            <div @click="togglePaymentCondition(paymentCondition.id)" class="w-30 h-30  mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"  tabindex="0" v-for="paymentCondition in paymentConditions" :key="paymentCondition.id">
                                <div class="flex grid justify-center items-center">
                                    <div class="flex justify-center items-center" >
                                        <div :class="selectedPaymentConditions.includes(paymentCondition.id) ? 'bg-primary-lighter':'bg-gray-400'" class="mx-auto flex-shrink-0 flex items-center  justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                            <i class="mdi mdi-checkbox-multiple-marked text-white text-sm"></i>
                                        </div>
                                    </div>
                                    <p class="text-sm font-semibold text-gray-700 mt-1 whitespace-no-wrap">{{paymentCondition.description}}</p>   
                                </div>
                            </div>
                            <div @click="showConditionModal"  class="w-30 h-30 mr-4 bg-white rounded-lg shadow-md p-6 bg-primary-lighter cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green">
                                <div class="flex grid justify-center items-center">
                                    <div class="flex justify-center items-center" >
                                        <div class="mx-auto flex-shrink-0 flex items-center bg-white justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8">
                                            <i class="mdi mdi-plus-box-multiple text-primary-main text-sm"></i>
                                        </div>
                                    </div>
                                    <p class="text-sm font-semibold text-white mt-1">Adicionar</p>
                                </div>
                            </div>
                        </div> 
                        <div class="flex flex-wrap" v-if="selectedPaymentConditions.length > 0 && paymentConditions.length > 0">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Selecionados: </label>
                            <span v-for="paymentCondition in selectedPaymentConditions" :key="paymentCondition" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">{{getPaymentConditionName(paymentCondition)}}</span>                       
                        </div>   
                        <div v-if="selectedPaymentConditions.length == 0">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Nenhuma condição de pagamento escolhida </label>
                        </div>  
                        <div v-if="errors.paymentCondition == 'ERROR'">
                            <span class="text-xs text-red-500 font-semibold px-1">Você deve escolher pelo menos uma condição de pagamento.</span>
                        </div>  
                    </div>
                </div>
                <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                    <div class="w-1/7 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                        <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                            <button @click="showOrderPaymentConfirmModal" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Salvar</span>
                            </button>                         
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <OrderAlert :status="order.status" v-if="modal.alert" @close="closeAlertModal" />
        <PaymentConditionAdd v-if="modal.condition" @close="closeConditionModal" />
        <PaymentMethodAdd v-if="modal.method" @close="closeMethodModal" />
        <OrderPaymentConfirmModal v-if="modal.payment" @close="closeOrderPaymentConfirmModal" @save="selectPayment" />
    </div>
</template>

<script>
import { bus } from '../../../main';
import { orderService } from '../../../services'
import OrderAlert from './OrderAlert'
import { BarLoader } from '@saeris/vue-spinners';
import PaymentConditionAdd from '../Payments/PaymentCondition/PaymentConditionAdd';
import PaymentMethodAdd from '../Payments/PaymentMethod/PaymentMethodAdd';
import OrderPaymentConfirmModal from './OrderPaymentConfirm'

export default {
    name: 'OrderShow',
    components: {
        OrderAlert,
        BarLoader,
        PaymentConditionAdd,
        PaymentMethodAdd,
        OrderPaymentConfirmModal
    },
    updated() {
        bus.$off('updatePaymentMethod');
        bus.$on('updatePaymentMethod', (data) => {
            if(data) {
                this.getPaymentMethods()
            }
        })

        bus.$off('updatePaymentCondition');
        bus.$on('updatePaymentCondition', (data) => {
            if(data) {
                this.getPaymentConditions()
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
            loaderMethod: {
                loading: false,
                color: '#0bc95b',
            },
            loaderCondition: {
                loading: false,
                color: '#0bc95b',
            },
            modal: {
                status: null,
                alert: false,
                method: false,
                condition: false,
                payment: false,
            },
            paymentMethods: [],
            paymentConditions: [],
            selectedPaymentMethods: [],
            selectedPaymentConditions: [],
            order: {
                id: this.$route.params.order_id
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
        showOrderPaymentConfirmModal() {
            if(this.selectedPaymentMethods.length == 0) {
                this.errors.paymentMethod = 'ERROR'
            }
            if( this.selectedPaymentConditions.length == 0) {
                this.errors.paymentCondition = 'ERROR'
            }
            if(this.selectedPaymentConditions.length > 0 && this.selectedPaymentConditions.length > 0) {
                this.modal.payment = true;
                bus.$emit('ModalOpen', true);
            }
        },
        closeOrderPaymentConfirmModal() {
            this.modal.payment = false;
            bus.$emit('ModalOpen', true);
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
        selectPayment() {
            if(this.selectedPaymentMethods.length == 0) {
                this.errors.paymentMethod = 'ERROR'
            }
            if( this.selectedPaymentConditions.length == 0) {
                this.errors.paymentCondition = 'ERROR'
            }
            if(this.selectedPaymentConditions.length > 0 && this.selectedPaymentConditions.length > 0) {
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
            if(this.selectedPaymentMethods.length != 1) {
                this.errors.paymentMethod = 'OK'
            }
            if(this.selectedPaymentMethods.includes(value)) {
                for(var i = 0; i < this.selectedPaymentMethods.length; i++) {
                    if(this.selectedPaymentMethods[i] === value) {
                        this.selectedPaymentMethods.splice(i, 1); 
                    }
                }
            } else {
                this.selectedPaymentMethods.push(value)
            }
        },
        togglePaymentCondition(value) {
            if(this.selectedPaymentConditions.length != 1) {
                this.errors.paymentCondition = 'OK'
            }
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
        getPaymentMethodName(id) {
            const { description } = this.paymentMethods.find(pay => pay.id == id)
            return description
        },
        getPaymentConditionName(id) {
            const { description } = this.paymentConditions.find(pay => pay.id == id)
            return description
        },
        getOrder() {
            orderService.getOrderBySeller(this.order.id).then((response) => {
                const res = response.data.data
                this.order = res.order
                this.paymentMethods = res.paymentMethods
                this.paymentConditions = res.paymentConditions
                this.selectedPaymentMethods = res.selectedPaymentMethods
                this.selectedPaymentConditions = res.selectedPaymentConditions

                if(this.order.status == 1) {
                    this.modal.status == 1
                    this.showAlertModal()
                } 
                if(this.order.status == 2) {
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

</style>