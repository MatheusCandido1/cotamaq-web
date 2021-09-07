<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Proposta #{{proposal.id}}
                    </h2>
                </div>
                <div class="py-1">
                    <span @click="showEquipmentModal" class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded  cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
                </div>
            </div>
            <form>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label  class="text-sm font-semibold text-gray-600 px-1">
                            Vendedor
                        </label>
                        <input disabled id="seller_id" :value="formatMissingInformation(seller)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Categoria
                        </label>
                        <input disabled id="category_id" :value="formatMissingInformation(estimate.category.name)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Código da peça
                        </label>
                        <input disabled id="part_code" :value="formatMissingInformation(estimate.part_code)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                        <label for="description" class="text-sm font-semibold text-gray-600 px-1">
                            Descrição
                        </label>
                        <input disabled id="description" :value="formatMissingInformation(estimate.description)" type="text"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                    <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                        <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                            Quantidade
                        </label>
                        <input disabled id="quantity" :value="formatMissingInformation(estimate.quantity)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
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
                            <input disabled id="brand" :value="formatMissingInformation(estimate.brand)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div :class="estimate.allow_similar == 0 ? 'md:w-3/6':'md:w-4/6' " class="px-3 mb-2 md:mb-0">
                            <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                                Observação
                            </label>
                            <textarea disabled :value="formatMissingInformation(estimate.observation)" class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
                        </div>
                    </div>
                      <div v-if="estimateImages.length > 0">
                        <h2 class="text-2xl font-semibold  text-gray-700 dark:text-gray-200">
                          Galeria cotação
                        </h2>

                        <CoolLightBox
                            :index="index"
                            :items="estimateImages"
                            class="cool-lightbox-z-index"
                            @close="index = null"
                        >
                        </CoolLightBox>

                        <div class="flex flex-wrap justify-start">
                          <img
                              v-for="(image, imageIndex) in estimateImages"
                              :key="imageIndex"
                              :src="image"
                              class="imgPreview m-2 "
                              @click="index = imageIndex"
                          />
                        </div>
                      </div>
                    <div class="flex justify-start">
                        <div class="py-1">
                            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                                Peça - {{estimate.description}}
                            </h2>
                        </div>
                    </div>
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="value" class="text-sm font-semibold text-gray-600 px-1">
                                Valor Unitário
                            </label>
                            <money disabled v-bind="proposalValueMoney" placeholder="" v-model="proposal.value" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none border-primary-main focus:border-primary-lighter"></money> 
                        </div>
                        <div class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="total" class="text-sm font-semibold text-gray-600 px-1">
                                Subtotal
                            </label>
                            <money disabled v-bind="proposalSubtotalMoney" placeholder="" v-model="proposal.subtotal" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none border-primary-main  focus:border-primary-lighter"></money> 
                        </div>
                        <div v-if="estimate.allow_similar == 1" class="md:w-1/4 px-3 mb-2 md:mb-0">
                            <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                                Peça Similar
                            </label>
                            <div class="flex justify-center space-x-2 mt-2">
                                <div>
                                    <input disabled v-model="proposal.is_similar"  value="1" class="hidden" id="is_similar_1" type="radio" name="is_similar">
                                    <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="is_similar_1">
                                        <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-check text-gray-900 text-lg mr-1 ml-1"></i>Sim </span>
                                    </label>
                                </div>
                                <div>
                                    <input disabled v-model="proposal.is_similar"  value="0" class="hidden" id="is_similar_2" type="radio" name="is_similar">
                                    <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="is_similar_2">
                                        <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-close text-gray-900 text-lg mr-1 ml-1"></i>Não </span>
                                    </label>
                                </div>
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
                            <input id="proposal_brand" v-model="proposal.brand"  placeholder="" type="text" class="border-primary-mainw-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                
                        </div>
                    </div> 
                    <div class="-mx-3 md:flex mb-6">
                        <div class="md:w-full px-3 mb-2 md:mb-0">
                            <label for="observation" class="text-sm font-semibold text-gray-600 px-1">
                                Observação
                            </label>
                            <textarea disabled :value="formatMissingInformation(proposal.observation)" class="form-textarea mt-1 block resize-none w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" rows="3" placeholder=""></textarea>
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
                            <money  v-bind="proposalShippingMoney" placeholder="" v-model="proposal.shipping" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></money>
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="shipping" class="text-sm font-semibold text-gray-600 px-1">
                                Total
                            </label>
                            <money disabled v-bind="proposalTotalMoney" placeholder="" v-model="proposal.total" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none border-primary-main  focus:border-primary-lighter"></money>
                        </div>
                       
                       <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="discount" class="text-sm font-semibold text-gray-600 px-1">
                                Desconto(%)
                            </label>
                            <div class="flex">
                            <input disabled id="discount" :value="formatMissingInformation(proposal.discount)"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">

                                <div class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none">
                                    <span class="m-auto"><i class="mdi mdi-percent"></i></span>
                                </div>                             
                            </div>
                        </div>	
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="validity" class="text-sm font-semibold text-gray-600 px-1">
                                Validade da proposta
                            </label>
                            <input disabled id="validity" v-model="proposal.validity"  placeholder="" type="date" class="border-primary-main w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                        <div class="md:w-1/6 px-3 mb-2 md:mb-0">
                        <label for="allow_similar" class="flex justify-center text-sm font-semibold text-gray-600 px-1">
                            Entrega
                        </label>
                            <div class="flex justify-center space-x-2 mt-2">
                                <div>
                                    <input disabled v-model="proposal.delivery"  value="0" class="hidden" id="delivery_1" type="radio" name="delivery">
                                    <label class="flex h-8 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                                        <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-alarm-check text-gray-900 text-lg mr-1 ml-1"></i>Imediata</span>
                                    </label>
                                </div>
                                <div>
                                    <input disabled v-model="proposal.delivery"  value="1" class="hidden" id="delivery_2" type="radio" name="delivery">
                                    <label class="flex h-8 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                                        <span class="flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-truck-delivery-outline text-gray-900 text-lg mr-1 ml-1"></i>Prazo</span>
                                    </label>
                                </div>
                            </div> 
                        </div>
                        <div v-if="this.proposal.delivery == 1" class="md:w-1/6 px-3 mb-2 md:mb-0">
                            <label for="delivery_time" class="text-sm font-semibold text-gray-600 px-1">
                                Dias para entrega
                            </label>
                            <input disabled id="delivery_time" v-model="proposal.delivery_time"  placeholder="" type="number" class="border-primary-main w-full pl-2 pr-3 py-2 rounded border-b-2  shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                        </div>
                    </div>
                     <div v-if="proposalImages.length > 0">
                       <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                         Galeria da proposta
                       </h2>
                       <CoolLightBox2
                           :index="index2"
                           :items="proposalImages"
                           class="cool-lightbox-z-index"
                           @close="index2 = null"
                       >
                       </CoolLightBox2>

                       <div class="flex flex-wrap justify-start">

                         <img
                             v-for="(image, IndexImage) in proposalImages"
                             :key="IndexImage"
                             :src="image"
                             class="imgPreview m-2 "
                             @click="index2 = IndexImage"
                         />
                       </div>
                     </div>
                    <div class="-mx-3 md:flex mt-4">
                        <div class="md:w-full px-3 flex justify-end gap-2">
                            <button @click="goBack" type="button" class="sm:w-full md:w-1/6 w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="justify-center">Voltar</span>
                            </button>
                        </div>
                    </div>

            </form>
    </div>
    <EquipmentDetails v-if="modal.equipment" :equipment="estimate.equipment" @close="closeEquipmentModal" />
</div>
</template>

<script>
import { bus } from "../../../main";
import { Money } from 'v-money'
import { proposalService } from '../../../services'
import EquipmentDetails from '../../../components/Shared/Equipment/EquipmentDetail'
import { formatMissingInformation } from '@/helpers/string-helper';
import CoolLightBox from "vue-cool-lightbox";
import CoolLightBox2 from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
    name: 'ProposalShow',
    components: {
        Money,
        EquipmentDetails,
      CoolLightBox,
      CoolLightBox2
    },
    created() {
        this.getProposal()
    },
    data() {
        return {
          index: null,
          index2: null,
            modal: {
                confirm: false,
                equipment: false,
            },
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
                allow_similar: null,
                category_id: '',
                category: {
                    name: ''
                },
                equipment: {},
                quantity: null,
                brand: '',
                observation: ''
            },
            seller: null,
            proposal: {
                id: this.$route.params.proposal_id,
                seller_id: '',
                description: '',
                quantity: '',
                value: '',
                subtotal: '',
                total: '',
                shipping: '',
                delivery: '',
                delivery_time: '',
                validity: '',
                is_similar: '',
                brand: '',
                observation: '',
                discount: ''
            },
          proposalImages:[],
          estimateImages:[]
        }
    },
    methods: {
        formatMissingInformation,
        getProposal() {
            proposalService.getProposal(this.proposal.id).then((response) => {
                const data = response.data
                this.proposal = data.data;
                this.estimate = data.data.estimate
                this.seller = data.seller

                data.data.images.forEach((data)=>{
                  this.proposalImages.push(data.image_path)
                })
              data.data.estimate.images.forEach((data)=>{
                this.estimateImages.push(data.image_path)
              })

            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        goBack() {
            this.$router.back()
        },
        closeEquipmentModal() {
            this.modal.equipment = false;
            bus.$emit("ModalOpen", false);
        },
        showEquipmentModal() {
            this.modal.equipment = true;
            bus.$emit("ModalOpen", true);
        },
    },
}
</script>

<style>

</style>