<template>
<div>
<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{estimate.id}}<span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
            <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
        </div>
        <div class="px-3 mb-5">
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-full mr-5">
                <label class="text-sm font-semibold text-gray-600 px-1">
                    Entregar para CEP
                </label>
                </div>
                <div class="md:w-1/2">
                <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask :mask="['#####-###']" class="w-28 -ml-12 pl-2 pr-3 py-2 rounded-l border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" disabled type="text" v-model="address.zipcode"></the-mask>
                        <button class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-content-copy"></i></span>
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
<span class="flex items-center justify-end text-gray-600 font-semibold">
                Items por página
                <select v-model="itemsPerpage" class="w-20 pl-4  ml-3 border-primary-main px-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select> 
            </span>
    <v-table
        class="w-full whitespace-no-wrap mb-2 " 
        :data="products"     
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="itemsPerpage"
        @totalPagesChanged="totalPages = $event"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="value">Status</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="description">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 20%" sortKey="allow_similar">Aceita Similar?</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="value">Valor</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="subtotal">Subtotal</v-th>
                <th class="text-center" style="width: 20%" >Ações</th>
            </tr>
        </thead>
 
                    
        <tbody @click="checkIfEditing()" class="bg-white dark:divide-gray-700 dark:bg-gray-800 overflow-y-scroll" slot="body" slot-scope="{displayData}">
            <tr  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700"> 
                    <span :class="formatDefaultStatus(row.details.value)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                            {{formatNameStatus(row.details.value)}}
                    </span>
                </td>
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefaultSimilar(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatNameSimilar(row.allow_similar)}}
                    </span>
                </td>
                <td v-if="row.details.value === null || row.details.value === 0" class="text-sm text-center text-gray-700">R$ 0,00</td>
                <td v-else class="text-sm text-center text-gray-700">{{row.details.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td v-if="row.details.subtotal === null || row.details.subtotal === 0" class="text-sm text-center text-gray-700">R$ 0,00</td>
                <td v-else class="text-sm text-center text-gray-700">{{row.details.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-2 text-sm">
                        <button :disabled="edit" :class="!edit ? 'bg-blue-500':'bg-gray-400 pointer-events-none'" @click="editProduct(row)" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor"> <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /> </svg>
                        </button>

                        <button  :disabled="edit" :class="!edit ? 'bg-primary-lighter':'bg-gray-400 pointer-events-none'" @click="showProductModal(row)" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>
                    </div>  
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3 whitespace-nowrap" >
                Total: {{products.length}} registro(s)
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
            />
                </span>
            </div>
</div>
<div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">{{!edit ? 'Selecione uma peça para cotar na tabela acima. ': 'Cotar peça'}}</h3>
        </div>
    </div>

    <div :class="edit? 'p-6':''" class="relative  flex-auto">
            <div v-if="edit">
            <form @submit.prevent="updateProduct">
            <div class="flex -mx-3">
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Código da peça</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input disabled v-model="product.part_code"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input disabled v-model="product.description"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Quantidade</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input disabled v-model="product.quantity"  placeholder="" type="number" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                
                <div class="w-1/4 px-3 mb-5">
                <span v-if="product.allow_similar == 0">
                    <div class="w-full flex items-center justify-center bg-red-500 text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center pointer-events-none	">
                        <span class="justify-center">Este produto não aceita peça similar!</span>
                    </div> 
                </span>
                <span v-else-if="product.allow_similar == 1">
                    <label for="" class="flex justify-center text-sm font-semibold text-gray-600 px-1">Peça Similar?</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @change="() => (errors.is_similar = 'OK')" v-model="product.is_similar"  value="1" class="hidden" id="similar_1" type="radio" name="similar">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                            </label>
                        </div>
                        <div>
                            <input @change="() => (errors.is_similar = 'OK')" v-model="product.is_similar"   value="0" class="hidden" id="similar_2" type="radio" name="similar">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="similar_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                            </label>
                        </div>
                    </div>
                    <div class="flex justify-center mt-3" v-if="errors.is_similar == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Peça Similar é obrigatório.</span>
                    </div>     
                </span>
                </div>
            </div>
            <div  class="flex -mx-3">
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Valor Unitário</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <money  :disabled="!edit" @change.native="getProductSubTotal()"   v-bind="productMoney" placeholder="" v-model="product.details.value" :class="errors.value == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                    </div>   
                    <div v-if="errors.value == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Valor Unitário deve ser válido.</span>
                    </div>                        
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Total</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <money disabled v-model="product.details.subtotal"   v-bind="productSubtotal" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 border-primary-main rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center">Entrega</label>
                    <div class="flex justify-center space-x-4 mt-3">
                        <div>
                            <input @click="handleSelectDelivery(true)" @change="() => (errors.product_delivery = 'OK')" v-model="delivery_default"  value="0" class="hidden" id="delivery_1" type="radio" name="delivery_product">
                            <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Imediata</span>
                            </label>
                        </div>
                        <div>
                            <input @click="handleSelectDelivery(false)" @change="() => (errors.product_delivery = 'OK')" v-model="delivery_default" value="1"  class="hidden" id="delivery_2" type="radio" name="delivery_product">
                            <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                                <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-calendar text-gray-900 text-lg mr-1 ml-1"></i>Prazo</span>
                            </label>
                        </div>  
                    </div>
                    
                    
                </div> 
            <div class="w-1/4 px-3 mb-5">
                <div v-if="setDeliveryProduct == false" class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Prazo de entrega (em dias)</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :class="errors.product_delivery == 'ERROR' ? 'border-red-400':'border-primary-main'" @change="() => (errors.product_delivery = 'OK')" v-model="product.details.product_delivery"  placeholder="Exemplo: 2" type="number" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div> 
                    <div class="flex justify-center mt-3" v-if="errors.product_delivery == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Entrega é obrigatório.</span>
                    </div>                         
                </div>
             </div>
            </div>

             <div class="flex -mx-3">
                 <div class="w-3/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Observação</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <textarea disabled v-model="product.observation"  class="form-textarea mt-1 block resize-none w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="2" placeholder=""></textarea>
                    </div>                         
                </div> 

                <div class="w-1/4 mb-5">
                    <label for="" class="text-xs font-semibold px-1"></label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <button type="submit" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar</span>
                        </button>  
                        <button ref="cancelProductButton" @click="ClearProduct()" class="w-full ml-3 flex items-center bg-gray-600 focus:bg-red-600 focus:border-red-600 justify-center  text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Cancelar</span>
                        </button>    
                                            
                    </div>  
                </div>
            </div>
        </form>
            </div>
          </div>
    </div>

    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Detalhes do faturamento</h3>
        </div>
    </div>

    <div class="relative p-6 flex-auto">   
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Subtotal</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <money disabled v-model="details.subtotal"   v-bind="subtotalMoney" type="text" class="w-full -ml-10 pl-2  border-primary-main pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                    </div>  
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Frete</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <money @change.native="getProposalTotal"  v-bind="shippingMoney" placeholder="" v-model="details.shipping" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                    </div>  
                </div>
                
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Data de validade da proposta</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :min="today" @change="() => (errors.validity = 'OK')" v-model="details.validity" :class="errors.validity == 'ERROR' ? 'border-red-400':'border-primary-main'"  placeholder="" type="date" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>  
                     <div v-if="errors.validity == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Data de Validade deve ser válido.</span>
                    </div>                        
                </div>
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1"></label>
                    <div class="flex">
                    <div class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Total: R$ {{details.total.toFixed(2)}}</span>
                        </div> 
                    </div>  
                </div>
            </div>
            <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'estimates'}" class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
                        
                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="saveDraft()" class="w-full flex items-center justify-center bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Salvar rascunho</span>
                                </button>                         
                            </div>   
                        </div>

                        <div class="w-1/7 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="showConfirmModal(details)" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Enviar</span>
                                </button>                         
                            </div>   
                        </div>

                        

                    </div>
          </div>
</div>
        <proposal-confirm
            v-if="isConfirmModalOpen"
            :proposal="details"
            :paymentMethods="selectedPaymentMethods"
            :paymentConditions="selectedPaymentConditions"
            @close="closeConfirmModal"
            >
        </proposal-confirm>

        <product-detail
            v-if="isProductModalOpen"
            :product="product"
            @close="closeProductModal"> 
        </product-detail>

        
         <estimate-details-modal
            v-if="isEstimateModalOpen"
            :estimate="estimate"
            @close="closeEstimateModal"
        >
        </estimate-details-modal>
</div>

</template>
<script>
import {TheMask} from 'vue-the-mask'
import { bus } from '../../../main';
import ProposalConfirm from './ProposalConfirm';
import ProductDetail from '../Products/ProductDetail';
import { BarLoader } from '@saeris/vue-spinners';
import { proposalService, productService } from '../../../services';
import { required, minValue, requiredIf } from 'vuelidate/lib/validators'
import {Money} from 'v-money'
import EstimateDetailsModal from '../../../components/Seller/Estimates/EstimateDetailsModal';

export default {
    name: 'ProposalInfo',
    components: {
        TheMask,
        ProposalConfirm,
        ProductDetail,
        Money,
        BarLoader,
        EstimateDetailsModal
    },
    mounted() {
        this.getProposal()
        this.getProductsTotal()
        this.getToday()
    },
    updated() {
    },
    data() {
        return {
            isEstimateModalOpen: false,
            today: new Date(),
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            setDeliveryProduct: false,
            price: 0,
            isConfirmModalOpen: false,
            isProductModalOpen: false,
            edit: false,
            paymentStatus: false,
            buyer: {},
            address: {},
            estimate: {},
            itemsPerpage: 5,
            currentPage: 1,
            totalPages: 5,
            products:[],
            product: {
                details: {
                    product_delivery: null,
                    value: 0,
                    subtotal: 0,
                    is_similar: null,
                }
            },
            subtotalMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            productMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            productSubtotal: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            shippingMoney: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },
            errors: {
                value: null,
                is_similar: null,
                product_delivery: null,
                validity: null,
            },
            proposal: {},
            delivery_default: 0,
            details: {
                id: this.$route.params.id,
                validity: null,
                shipping: 0,
                subtotal: 0,
                total: 0,
            },
            isEditing: false,
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
        }

    },
    methods: {
        showEstimateModal() {
            this.isEstimateModalOpen = true
            bus.$emit('ModalOpen', true);
        },
        closeEstimateModal() {
            this.isEstimateModalOpen = false
            bus.$emit('ModalOpen', false);
        },
        showProductModal(data) {
            this.product = data
            this.isProductModalOpen = true;
            bus.$emit('ModalOpen', true);
        },
        closeProductModal() {
            this.product = {
                product_delivery: null
            }
            this.isProductModalOpen = false;
            bus.$emit('ModalOpen', false);
        },
        showConfirmModal() {
            const check =  this.products.filter(product => product.details.value != null || product.details.value > 0).length;
            if(check != this.products.length) {
                this.$toast.info('Você precisa cotar todos os produtos antes de enviar uma proposta!', {
                    position: "top-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
            }

            if(this.details.validity == null) {
                this.errors.validity = 'ERROR'
            } 
            
            if(check == this.products.length && this.details.validity != null) {
                this.isConfirmModalOpen = true;
                bus.$emit('ModalOpen', true);
            }
        },
        getToday() {
            this.today = new Date().toISOString().split("T")[0];
        },
        closeConfirmModal() {
            this.isConfirmModalOpen = false;
            bus.$emit('ModalOpen', false);
        },
        ClearProduct() {
            this.product = {
                details: {
                    product_delivery: null,
                    value: 0,
                    subtotal: 0,
                    is_similar: null,
                }
            }
            this.edit = false
            this.isEditing = false
        },
        formatDefaultSimilar(id) {
            return this.colors[id]
        },
        formatNameSimilar(id) {
            return this.defaults[id]
        },
        formatDefaultStatus(value) {
            if((value == 0) || (value == null)) {
                return "bg-yellow-600"
            } else {
                return "bg-primary-main"
            }
        },
        formatNameStatus(value) {
            if((value == 0) || (value == null)) {
                return 'Pendente'
            } else {
                return 'Cotado'
            }
        },
        getProductSubTotal() {
            this.errors.value = 'OK'
            const subtotal = parseFloat(this.product.details.value) * parseInt(this.product.quantity)
            this.product.details.subtotal = subtotal.toFixed(2)
        },
        getProductsTotal() {
            const total = this.products.reduce((accum,item) => accum + item.details.subtotal, 0)
            this.details.subtotal = total.toFixed(2)
        },
        getProposalTotal() {
            this.details.total = parseFloat(this.details.subtotal) + parseFloat(this.details.shipping)
        },
        saveDraft() {
            const data = {
                id: this.details.id,
                validity: this.details.validity,
                subtotal: this.details.subtotal,
                shipping: this.details.shipping,
                total: this.details.total
            }
            proposalService.saveDraft(data).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.$router.push({'name': 'estimates'})
            }).catch((error) => {
                console.log(error.response.data)
            })

        },
        checkIfEditing() {
            if(this.isEditing == false){
                this.isEditing = true
            }
            else {
                this.$refs.cancelProductButton.focus()
                this.$toast.info('Para editar ou visualizar outro item, cancele o item selecionado', {
                    position: "top-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
            }
        },
        updateProduct() {
            this.$v.$touch()

            if(this.delivery_default == 0){
                this.product.details.product_delivery = 0
            } 
            

            if(this.$v.product.details.value.$invalid) {
                this.errors.value = 'ERROR'
            } 
            

            if(this.$v.product.details.is_similar.$invalid) {
                this.errors.is_similar = 'ERROR'
            } 

            let isValid = true
            
            if(this.setDeliveryProduct == false && this.product.details.product_delivery == 0) {
                this.errors.product_delivery = 'ERROR'
                isValid = false
            }
            
            if(this.$v.$anyError == false && isValid == true) {
                const data = this.product;
                const proposalId = this.$route.params.id
                productService.updateProductDetail(data, proposalId).then((response) => {
                    this.$toast.success(response.success_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 2500
                    });
                    this.ClearProduct()
                    this.getProposal()
                    this.getProductSubTotal()
                    this.getProductsTotal()
                    this.getProposalTotal()
                    }).catch((error) => {
                    console.log(error)
                })
            }
        },
        handleSelectDelivery(value) {
            if(value) {
                this.setDeliveryProduct = true
            } else {
                this.setDeliveryProduct = false
            }
        },
        editProduct(data) {
            this.edit = true
            data.details.product_delivery > 0 ? this.setDeliveryProduct = false :  this.setDeliveryProduct = true;
            data.details.product_delivery > 0 ? this.delivery_default = 1 :  this.delivery_default = 0;
            this.product = {
                id: data.id,
                part_code: data.part_code,
                description: data.description,
                quantity: data.quantity,
                allow_similar: data.allow_similar,
                observation: data.observation,
                details: {
                    product_delivery:data.details.product_delivery,
                    value:data.details.value,
                    is_similar:data.details.is_similar,
                    subtotal:data.details.value * data.quantity
                }
            }
        },
        getProposal() {
            this.loader.loading = true
            const proposalId = this.$route.params.id
            proposalService.getProposal(proposalId).then((response) => {
                const res = response.data.data
                this.estimate = res.estimate
                this.products = res.products
                this.buyer = res.buyer
                this.address = res.address
                this.details = res.proposal
                this.getProductsTotal()
                this.getProposalTotal()
                this.loader.loading = false
            }).catch((error) => {
                console.log(error)
            }) 
        },
    },
    validations: {
            product: {
                quantity: {
                    required
                },
                details: {
                    value: {
                        minValue: minValue(0.01)
                    },
                    is_similar: {
                        required: requiredIf(function() {
                            return this.product.allow_similar
                        })
                    },
                    product_delivery: {
                        required
                    },
                }
                
            }
        }
    
}
</script>
