<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Proposta #1
                    </h2>
                </div>
                <div class="py-1">
                    <span class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded  cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
                </div>
            </div>
            <form @submit.prevent="sendProposal">
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label  class="text-sm font-semibold text-gray-600 px-1">
                            Vendedor
                        </label>
                        <select @change="() => (errors.proposal.seller_id = 'OK')" :class="errors.proposal.seller_id == 'ERROR' ? 'border-red-400':'border-primary-main'"  id="seller_id" v-model="proposal.seller_id"   class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option disabled value=""> Selecione... </option>
                            <option value="1"> Matheus </option>
                        </select> 
                        <div v-if="errors.proposal.seller_id == 'ERROR'" class="flex justify-center align-items">
                            <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Vendedor é obrigatório.</span>
                        </div> 
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Categoria
                        </label>
                        <input disabled id="category_id" v-model="estimate.category_id"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Código da peça
                        </label>
                        <input disabled id="part_code" v-model="estimate.part_code"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                            Descrição
                        </label>
                        <input disabled id="description" v-model="estimate.description" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Quantidade
                        </label>
                        <input disabled id="quantity" v-model="estimate.quantity"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                        <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                            Aceita Similar
                        </label>
                            <div class="flex justify-center space-x-2 mt-2">
                                <div>
                                    <input disabled v-model="estimate.allow_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                                    <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                        <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                                    </label>
                                </div>
                                <div>
                                    <input disabled v-model="estimate.allow_similar"  value="0" class="hidden" id="similar_2" type="radio" name="similar">
                                    <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                        <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                                    </label>
                                </div>
                            </div> 
                        </div>
                        <div v-if="estimate.allow_similar == 0" class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                                Marca
                            </label>
                            <input disabled id="brand" v-model="estimate.brand"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div :class="estimate.allow_similar == 0 ? 'md:w-3/6':'md:w-4/6' " class="px-3 mb-2 md:mb-0">
                            <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                                Observação
                            </label>
                            <textarea disabled v-model="estimate.observation" class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <div class="py-1">
                            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                                Cotar - {{estimate.description}}
                            </h2>
                        </div>
                    </div>
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="value" class="text-sm font-semibold text-gray-600 px-1">
                                Valor Unitário
                            </label>
                            <money :class="errors.proposal.value == 'ERROR' ? 'border-red-400':'border-primary-main'" @change.native="getProposalSubtotal" v-bind="proposalValueMoney" placeholder="" v-model="proposal.value" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none focus:border-primary-lighter"></money>
                            <div v-if="errors.proposal.value == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Valor Unitário é obrigatório.</span>
                            </div> 
                        </div>
                        <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="total" class="text-sm font-semibold text-gray-600 px-1">
                                Subtotal
                            </label>
                            <money :class="errors.proposal.subtotal == 'ERROR' ? 'border-red-400':'border-primary-main'" disabled v-bind="proposalSubtotalMoney" placeholder="" v-model="proposal.subtotal" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                            <div v-if="errors.proposal.subtotal == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Subtotal é obrigatório.</span>
                            </div> 
                        </div>
                        <div v-if="estimate.allow_similar == 1" class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                                Peça Similar
                            </label>
                            <div class="flex justify-center space-x-2 mt-2">
                                <div>
                                    <input @change="() => (errors.proposal.is_similar = 'OK')" v-model="proposal.is_similar"  value="1" class="hidden" id="is_similar_1" type="radio" name="is_similar">
                                    <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="is_similar_1">
                                        <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                                    </label>
                                </div>
                                <div>
                                    <input @change="() => (errors.proposal.is_similar = 'OK')" v-model="proposal.is_similar"  value="0" class="hidden" id="is_similar_2" type="radio" name="is_similar">
                                    <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="is_similar_2">
                                        <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                                    </label>
                                </div>
                            </div> 
                            <div v-if="errors.proposal.is_similar == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Peça Similar é obrigatório.</span>
                            </div> 
                        </div>
                        <div v-else class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label class="text-sm font-semibold text-blackpx-1">
                                Atenção!
                            </label>
                            <div class="bg-red-500 w-full  flex justify-center items-center text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                               Essa cotação não aceita similar
                            </div>
                        </div>
                        <div v-if="estimate.allow_similar == 1 && proposal.is_similar == 1" class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="proposal_brand" class="text-sm font-semibold text-gray-600 px-1">
                                Marca
                            </label>
                            <input @change="() => (errors.proposal.brand = 'OK')" :class="errors.proposal.brand == 'ERROR' ? 'border-red-400':'border-primary-main'" id="proposal_brand" v-model="proposal.brand"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <div v-if="errors.proposal.brand == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Marca é obrigatório.</span>
                            </div> 
                        </div>
                    </div> 
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-full px-3 mb-2 md:mb-0">
                            <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                                Observação
                            </label>
                            <textarea v-model="proposal.observation" class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                         </div>
                    </div> 
                    <div class="flex flex-row justify-between">
                        <div class="py-1">
                            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                                Detalhes da proposta 
                            </h2>
                        </div>
                            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                                <span class="text-sm">CEP para entrega: </span><span class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2">31720-580</span>
                            </h2>
                    </div>
                    
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="shipping" class="text-sm font-semibold text-gray-600 px-1">
                                Frete
                            </label>
                            <money @change.native="getProposalTotal" v-bind="proposalShippingMoney" placeholder="" v-model="proposal.shipping" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="shipping" class="text-sm font-semibold text-gray-600 px-1">
                                Total
                            </label>
                            <money :class="errors.proposal.total == 'ERROR' ? 'border-red-400':'border-primary-main'" disabled v-bind="proposalTotalMoney" placeholder="" v-model="proposal.total" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                            <div v-if="errors.proposal.total == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Total é obrigatório.</span>
                            </div>
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="discount" class="text-sm font-semibold text-gray-600 px-1">
                                Desconto
                            </label>
                            <input id="discount" v-model="proposal.discount"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="validity" class="text-sm font-semibold text-gray-600 px-1">
                                Validade da proposta
                            </label>
                            <input @change="() => (errors.proposal.validity = 'OK')" :class="errors.proposal.validity == 'ERROR' ? 'border-red-400':'border-primary-main'" id="validity" v-model="proposal.validity"  placeholder="" type="date" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <div v-if="errors.proposal.validity == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Validade da proposta é obrigatório.</span>
                            </div>
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                        <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                            Entrega
                        </label>
                            <div class="flex justify-center space-x-2 mt-2">
                                <div>
                                    <input @click="handleDeliveryTimeClick" v-model="proposal.delivery"  value="0" class="hidden" id="delivery_1" type="radio" name="delivery">
                                    <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                                        <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-alarm-check text-gray-900 text-lg mr-1 ml-1"></i>Imediata</span>
                                    </label>
                                </div>
                                <div>
                                    <input @click="handleDeliveryTimeClick" v-model="proposal.delivery"  value="1" class="hidden" id="delivery_2" type="radio" name="delivery">
                                    <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                                        <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-truck-delivery-outline text-gray-900 text-lg mr-1 ml-1"></i>Prazo</span>
                                    </label>
                                </div>
                            </div> 
                            <div v-if="errors.proposal.delivery == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Entrega é obrigatório.</span>
                            </div> 
                        </div>
                        <div v-if="this.proposal.delivery == 1" class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="delivery_time" class="text-sm font-semibold text-gray-600 px-1">
                                Dias para entrega
                            </label>
                            <input @change="() => (errors.proposal.delivery_time = 'OK')" :class="errors.proposal.delivery_time == 'ERROR' ? 'border-red-400':'border-primary-main'" id="delivery_time" v-model="proposal.delivery_time"  placeholder="" type="number" class="w-full pl-2 pr-3 py-2 rounded border-b-2  shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <div v-if="errors.proposal.delivery_time == 'ERROR'" class="flex justify-center align-items">
                                <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo Dias para entrega é obrigatório.</span>
                            </div>
                        </div>
                    </div>
                    <div class="-mx-3 md:flex mt-4">
                        <div class="md:w-full px-3 flex justify-end gap-2">
                            <button type="submit" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Enviar Proposta</span>
                            </button> 
                        </div>
                    </div>
                    <div class="-mx-3 md:flex mt-4">
                        <div class="md:w-full px-3 flex justify-end gap-2">
                            <button type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Voltar</span>
                            </button> 
                            <button type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Salvar Rascunho</span>
                            </button>
                        </div>
                    </div>
            </form>
    </div>
</div>
</template>

<script>
import { Money } from 'v-money'
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
    name: 'ProposalUpdate',
    components: {
        Money
    },
    data() {
        return {
            proposalTotalMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            proposalShippingMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            proposalValueMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            proposalSubtotalMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            estimate: {
                part_code: '',
                description: '',
                allow_similar: 0,
                category_id: '',
                quantity: 4,
                brand: '',
                observation: ''
            },
            proposal: {
                seller_id: '',
                description: '',
                quantity: '',
                value: '',
                subtotal: '',
                total: '',
                pickup: '',
                allow_pickup: '',
                shipping: '',
                allow_shipping: '',
                delivery: '',
                delivery_time: '',
                validity: '',
                is_similar: '',
                brand: '',
                observation: '',
                discount: ''
            },
            errors: {
                proposal: {
                    seller_id: null,
                    value: null,
                    subtotal: null,
                    total: null,
                    is_similar: null,
                    brand: null,
                    validity: null,
                    delivery: null,
                    delivery_time: null,
                }
            }
        }
    },
    methods: {
        handleDeliveryTimeClick() {
            this.errors.proposal.delivery = 'OK'
        },
        getProposalSubtotal() {
            this.errors.proposal.value = 'OK'
            this.errors.proposal.subtotal = 'OK'
            this.errors.proposal.total = 'OK'
            const subtotal = parseFloat(this.proposal.value) * parseInt(this.estimate.quantity)
            this.proposal.subtotal = subtotal.toFixed(2)
            this.getProposalTotal()
        },
        getProposalTotal() {
            const total = parseFloat(this.proposal.subtotal) + parseFloat(this.proposal.shipping)
            this.proposal.total = total.toFixed(2)
        },
        goBack() {

        },
        sendProposal() {
            this.$v.$touch()

            if(this.$v.proposal.seller_id.$invalid) {
                this.errors.proposal.seller_id = 'ERROR'
            } 

            if(this.proposal.value == '0') {
                this.errors.proposal.value = 'ERROR'
            } 

            if(this.proposal.subtotal == '0') {
                this.errors.proposal.subtotal = 'ERROR'
            } 

            if(this.proposal.total == '0') {
                this.errors.proposal.total = 'ERROR'
            } 

            if(this.estimate.allow_similar == 1) {
                if(this.$v.proposal.is_similar.$invalid) {
                    this.errors.proposal.is_similar = 'ERROR'
                }

                if(this.$v.proposal.brand.$invalid) {
                    this.errors.proposal.brand = 'ERROR'
                }
            }

            if(this.$v.proposal.validity.$invalid) {
                this.errors.proposal.validity = 'ERROR'
            } 

            if(this.$v.proposal.delivery.$invalid) {
                this.errors.proposal.delivery = 'ERROR'
            } 

            if(this.proposal.delivery == 1) {
                if(this.$v.proposal.delivery_time.$invalid) {
                    this.errors.proposal.delivery_time = 'ERROR'
                } 
            }

        },
        saveProposal() {

        }
    },
    validations: {
            proposal: {
                seller_id: {
                    required
                },
                is_similar: {
                    required: requiredIf(function() {
                        return this.estimate.allow_similar == 1
                    })
                },
                brand: {
                    required: requiredIf(function() {
                        return this.estimate.allow_similar == 1 && this.proposal.is_similar == 1
                    })
                },
                validity: {
                    required
                },
                delivery: {
                    required
                },
                delivery_time: {
                    required: requiredIf(function() {
                        return this.proposal.delivery == 1
                    })
                }
            }
        }

}
</script>

<style>

</style>