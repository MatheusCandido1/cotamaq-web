<template>
<div>
    
  <div v-if="order.status == 1" class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div >
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
                 <div v-if="errors.paymentCondition== 'ERROR'">
                    <span class="text-xs text-red-500 font-semibold px-1">Você deve escolher pelo menos uma condição de pagamento.</span>
                </div>  
            </div>

            </div>
            <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <button @click="selectPayment()" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Salvar</span>
                                </button>                         
                            </div>   
                        </div>
                    </div>
    </div>
  </div>
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Pedido #{{order.id}}</h2>
                <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </div>
            <div class="w-1/5 px-3 mb-5">
                 <div class="flex">
                    <select :disabled="order.status < 3" v-model="order.status" @change="showStatusModal()"  class="w-full -ml-10 pl-2  border-primary-main px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        <option value="1"> Pendente </option>
                        <option value="2"> Em preparo </option>
                        <option value="3"> Em trânsito </option>
                        <option value="4"> Entregue </option>
                    </select> 
                    </div>  
            </div>
        </div>
            <div v-if="order.status >= 2"  class="flex -mx-3">
                
            <div class="w-1/2 px-3 mb-5">
              <label for="" class="text-sm  flex justify-start font-semibold text-gray-600 px-1">Formas de pagamento disponíveis</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <span v-for="paymentMethod in selectedPaymentMethods" :key="paymentMethod.id" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2 mt-2">{{getPaymentMethodName(paymentMethod)}}</span>                       
                    </div>  
            </div>

            <div class="w-1/2 px-3 mb-5">
                 <label for="" class="text-sm flex justify-start font-semibold text-gray-600 px-1">Condições de pagamento disponíveis</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1  text-center pointer-events-none flex items-center justify-center"></div>
                        <span v-for="paymentCondition in selectedPaymentConditions" :key="paymentCondition.id" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2 mt-2">{{getPaymentConditionName(paymentCondition)}}</span>                       
                    </div> 
                     
            </div>

        </div>
        <div v-if="buyer.name"   class="flex -mx-3">
            <div class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Cliente</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{buyer.name}}</span>
                        </div> 
                    </div>                      
            </div>

            <div v-if="buyer.company.cnpj"  class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CNPJ</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">{{buyer.company.cnpj | Document}}</span>
                        </div> 
                    </div>                        
            </div>

            <div v-if="buyer.address.zipcode" class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CEP</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.address.zipcode}}</span>
                    </div> 
                </div>                     
            </div>
        </div>

          <div v-if="buyer.address.address" class="flex -mx-3">
            <div class="w-3/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Endereço</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.address.address}}</span>
                    </div> 
                </div>                      
            </div>

            <div v-if="buyer.address.neighborhood" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Bairro</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.address.neighborhood}}</span>
                    </div> 
                </div>                    
            </div>

            <div v-if="buyer.address.city" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Cidade</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.address.city}}</span>
                    </div> 
                </div>                    
            </div>

            <div v-if="buyer.address.state" class="w-1/6 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Estado</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.address.state}}</span>
                    </div> 
                </div>                    
            </div>
        </div>

        <div v-if="buyer.email" class="flex -mx-3">
            <div class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">E-mail</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.email}}</span>
                    </div> 
                </div>                      
            </div>

            <div v-if="buyer.company.phone" class="w-1/3 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Telefone</label>
                <div class="flex">
                    <div class="w-full rounded border-b-2 border-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center">{{buyer.company.phone}}</span>
                    </div> 
                </div>                       
            </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Método de Pagamento escolhida</label>
                <div class="flex">
                    <div class="w-full rounded bg-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center text-white">{{order.payment_method == '' ? 'Não disponível':order.payment_method}}</span>
                    </div> 
                </div>                      
            </div>

            <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Condição de Pagamento escolhida</label>
                <div class="flex">
                    <div class="w-full rounded bg-primary-main flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center text-white">{{order.payment_condition == '' ? 'Não disponível':order.payment_condition}}</span>
                    </div> 
                </div>                      
            </div>
        </div>

       
  </div>

  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
    <div class="flex -mx-3 justify-between">
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Proposta #{{proposal.id}}</h2>
        </div>
        
        <div class="px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Cotação #{{proposal.estimate.id}} <span @click="showEstimateModal" class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-primary-main rounded ml-2 cursor-pointer">Exibir detalhes do equipamento</span></h2>
        </div>
        <div class="px-3 mb-5">                
            <div class="flex justify-start space-x-4">
            <div>
                <input disabled class="hidden" id="delivery_1" type="radio" name="delivery">
                <label :class="proposal.estimate.delivery == 1 ? 'border-primary-main  bg-primary-main':'border-gray-400'" class="flex h-9 p-1 border-2  rounded-md justify-items-center align-items-center"  for="delivery_1">
                    <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                </label>
            </div>
            <div>
                <input disabled class="hidden" id="delivery_2" type="radio" name="delivery">
                <label :class="proposal.estimate.delivery == 2 ? 'border-primary-main  bg-primary-main':'border-gray-400'" class="flex h-9 p-1 border-2  rounded-md justify-items-center align-items-center"  for="delivery_2">
                    <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                </label>
            </div>
            </div>
            
        </div>
    </div>

    <v-table
        class="w-full whitespace-no-wrap mb-2 " 
        :data="products"     
        :hideSortIcons="true"
    >
        <thead class="rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none no-selection" slot="head">
            <tr class="text-xs h-10 font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <v-th  class="text-center" style="width: 10%" sortKey="part_code">Código</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="description">Descrição</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="is_similar">Peça Similar?</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="quantity">Quantidade</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="measure">Unidade</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="details.alue">Valor Unitário</v-th>
                <v-th  class="text-center" style="width: 10%" sortKey="details.subtotal">Subtotal</v-th>
                <th class="text-center" style="width: 10%" >Ação</th>
            </tr>
        </thead>    
        <tbody  class="bg-white dark:divide-gray-700 dark:bg-gray-800" slot="body" slot-scope="{displayData}">
            <tr class="mb-5"  v-for="row in displayData" :key="row.id">
                <td class="text-sm text-center text-gray-700">{{row.part_code != '' ? row.part_code:'Sem código'}}</td>
                <td class="text-sm text-center text-gray-700">{{row.description}}</td>
                <td class="text-sm text-center text-gray-700">
                    <span :class="formatDefault(row.allow_similar)" class="text-sm px-2 py-1 font-semibold text-white rounded-full dark:text-white">
                        {{formatName(row.allow_similar)}}
                    </span>
                </td>                     
                <td class="text-sm text-center text-gray-700">{{row.quantity}}</td>
                <td class="text-sm text-center text-gray-700">{{formatMeasure(row.measure)}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="text-sm text-center text-gray-700">{{row.details.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</td>
                <td class="flex justify-center mt-2">
                    <div class="flex items-center space-x-2 text-sm">
                        <button v-tooltip="{content: 'Visualizar Produto'}" @click="showProductModal(row)" class="flex items-center justify-between px-2 py-2 mb-1 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /> </svg>
                        </button>
                    </div>  
                </td>
            </tr>
            <tr  v-if="products && products.length !== 0"  class="rounded border-t-2 border-primary-main shadow-md py-2 px-6 outline-none h-12">
                <td class="text-sm font-semibold text-center text-gray-900">Total:</td>
                <td></td>
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">{{getQuantitySum()}}</td>
                <td></td>
                <td class="text-sm font-semibold text-center text-gray-900">R$ {{proposal.subtotal.toFixed(2)}}</td>
                <td></td>
            </tr>
        </tbody>
    </v-table>
</div>

  
  <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <div class="flex -mx-3">
                <div v-if="proposal.subtotal" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Subtotal: {{proposal.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>

                <div v-if="proposal.shipping" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Frete: {{proposal.shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                    </div> 
                    </div> 
                </div>
                <div v-if="proposal.total" class="w-1/3 px-3 mb-5">
                    <div class="flex">
                    <div class="w-full rounded border-b-2 border-blue-500 flex items-center justify-center bg-white text-gray-800 font-semibold rounded   shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Total: {{proposal.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
                        </div> 
                    </div>  
                </div>
            </div>
        <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 ">
                        <div class="w-1/7 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <router-link :to="{name: 'orders'}" class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Voltar</span>
                                </router-link>                         
                            </div>   
                        </div>
                    </div>
                    <proposal-product
            v-if="isProductModalVisible"
            :product="product"
            @close="closeProductModal"
          >
          </proposal-product>

          
        <order-status
            v-if="isStatusModalVisible"
            :order="order"
            :status="newStatus"
            @close="closeStatusModalAfterSave"
            @closeAfterSave="closeStatusModal"
            >
        </order-status>

        <estimate-details-modal
            v-if="isEstimateModalOpen"
            :estimate="estimate"
            @close="closeEstimateModal"
        >
        </estimate-details-modal>

        <payment-method-add
            v-if="isMethodModalOpen"
            @close="closeMethodModal"
        ></payment-method-add> 

        
        <payment-condition-add
            v-if="isConditionModalOpen"
            @close="closeConditionModal"
        ></payment-condition-add> 

        <order-payment-alert
            v-if="isAlertModalOpen"
            @close="closeAlertModal"
        ></order-payment-alert> 

    </div>
</div>
</template>

<script>
import { bus } from '../../../main';
import ProposalProduct from '../../Buyer/Proposals/ProposalProduct';
import { orderService } from '../../../services'
import OrderStatus from './OrderStatus';
import EstimateDetailsModal from '../../../components/Seller/Estimates/EstimateDetailsModal.vue';
import { BarLoader } from '@saeris/vue-spinners';
import PaymentConditionAdd from '../Payments/PaymentCondition/PaymentConditionAdd';
import PaymentMethodAdd from '../Payments/PaymentMethod/PaymentMethodAdd';
import OrderPaymentAlert from './OrderPaymentAlert';
import {formatMeasure} from '../../../helpers/string-helper'

export default {
    name: 'OrderInfo',
    components: {
        ProposalProduct,
        OrderStatus,
        EstimateDetailsModal,
        BarLoader,
        PaymentConditionAdd,
        PaymentMethodAdd,
        OrderPaymentAlert
    },
    created() {
        this.getOrder();
        
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
    data() {
        return {
            isAlertModalOpen: false,
            isEstimateModalOpen: false,
            isStatusModalVisible: false,
            isMethodModalOpen: false,
            isConditionModalOpen: false,
            newStatus: null,
            oldStatus: null,
            isProductModalVisible: false,
            paymentEnable: false,
            estimate: {},
            errors: {},
            buyer: {
                address: {}
            },
            proposal: {
                id: null,
                estimate: {
                    id: null,
                }
            },
            products: [],
            loaderMethod: {
                loading: false,
                color: '#0bc95b',
            },
            loaderCondition: {
                loading: false,
                color: '#0bc95b',
            },
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            order: {
                id: null
            },
            paymentMethods: [],
            paymentConditions: [],
            selectedPaymentMethods: [],
            selectedPaymentConditions: [],
            colors: ["bg-red-500", "bg-primary-main"],
            defaults: ['Não', 'Sim'],
            statusName: ['Pendente','Em preparo','Em trânsito','Entregue'],
            statusColor: ['bg-orange-400','bg-blue-400','bg-indigo-600','bg-primary-main'],
            statusIcon: ['mdi mdi-progress-clock','mdi mdi-package-variant-closed','mdi mdi-truck-fast-outline','mdi mdi-calendar-check-outline']
        }
    },
    methods: {
        formatMeasure,
        selectPayment() {
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
        },
        showAlertModal() {
            this.isAlertModalOpen = true;
            bus.$emit('ModalOpen', true);
        },
        closeAlertModal() {
            this.isAlertModalOpen = false;
            bus.$emit('ModalOpen', false);
        },
        showMethodModal() {
            this.isMethodModalOpen = true;
            bus.$emit('ModalOpen', true);
        },
        closeMethodModal() {
            this.isMethodModalOpen = false;
            bus.$emit('ModalOpen', false);
        },
        showConditionModal() {
            this.isConditionModalOpen = true;
            bus.$emit('ModalOpen', true);
        },
        closeConditionModal() {
            this.isConditionModalOpen = false;
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
            this.isProductModalVisible = true
            bus.$emit('ModalOpen', true);
        },
        closeProductModal() {
            this.isProductModalVisible = false
            bus.$emit('ModalOpen', false);
        },
        getOrder() {
            this.loader.loading = true
            const orderId = this.$route.params.id
            orderService.getOrderBySeller(orderId).then((response) => {
                this.loader.loading = false
                const res = response.data.data
                this.buyer = res.buyer
                this.buyer.address = res.order.proposal.estimate.address
                this.order = res.order
                this.proposal = res.order.proposal
                this.products = res.order.proposal.products
                this.estimate = res.order.proposal.estimate
                this.oldStatus = this.order.status
                this.paymentMethods = res.paymentMethods
                this.paymentConditions = res.paymentConditions
                this.selectedPaymentMethods = res.selectedPaymentMethods
                this.selectedPaymentConditions = res.selectedPaymentConditions

                if(this.order.status == 1) {
                    this.showAlertModal()
                }
            }).catch((error) => {
                this.loader.loading = false
                console.log(error.response.data)
            })
        },
        getQuantitySum() {
            const sum = this.products.reduce((a, b) => a + b.quantity, 0)
            return sum;
        },
        formatStatusDefault(id) {
            return this.statusColor[id]
        },
        formatStatusName(id) {
            return this.statusName[id]
        },
        formatStatusIcon(id) {
            return this.statusIcon[id]
        },
        formatDefault(id) {
            return this.colors[id]
        },
        formatName(id) {
            return this.defaults[id]
        },
        showStatusModal() {
            const status = this.order.status
            this.newStatus = status
            this.isStatusModalVisible = true;
            bus.$emit('ModalOpen', true);
        },
        closeStatusModalAfterSave() {
            this.isStatusModalVisible = false
            bus.$emit('ModalOpen', false);
            this.order.status = this.oldStatus
        },
        closeStatusModal() {
            this.isStatusModalVisible = false
            bus.$emit('ModalOpen', false);
        }
        
    },
    
}
</script>

<style>

</style>