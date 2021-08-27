<template>
<div>
  <div class="flex flex-col">
    <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex lg:px-3 justify-center" >
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Visualizar Propostas 
          </h2>
        </div>
      </div>
      <div class="flex lg:px-3 flex-row justify-between">
        <div class="py-1">
          <span @click="showEstimateModal" class="items-center justify-center px-2 py-1 text-md font-bold rounded-md text-white bg-primary-main cursor-pointer">Cotação #{{estimate.id}} - {{estimate.description}}<i class="mdi mdi-file-search ml-2"></i></span>
        </div>
        <div class="py-1">
          <span @click="showEquipmentModal" class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded-md cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
        </div>
      </div>
      <div class="flex flex-row lg:px-3 justify-between mb-2 items-center">
        <div>
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Propostas
          </h2>
        </div>
      </div>
      <div class="border-t-2 lg:px-3 "></div>
<div class="flex flex-row justify-start gap-2 mt-2 lg:px-3 ">
            <button  v-for="index in 3" :key="index" :class="formatItem(index).bg" class="text-white text-sm font-semibold text-md px-4 py-1 rounded-md mb-2">{{formatItem(index).text}}</button>
           </div>
      <div class="flex">
        <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
          <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
            <ProposalPartItem v-for="proposal in proposals" :key="proposal.id" :estimate="estimate"  :proposal="proposal" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <EstimateDetails v-if="modal.estimate" :estimate="estimate" @close="closeEstimateModal" />
  <EquipmentDetails v-if="modal.equipment" :equipment="estimate.equipment" @close="closeEquipmentModal" />
</div> 
</template>

<script>
import { bus } from '../../../main'
import ProposalPartItem from '../Proposals/ProposalPartItem'
import EquipmentDetails from '../../../components/Shared/Equipment/EquipmentDetail'
import EstimateDetails from '../../Seller/Estimates/EstimateDetails'
import { estimateService } from '../../../services'

export default {
    name: 'ProposalsByEstimate',
    components: {
      ProposalPartItem,
      EquipmentDetails,
      EstimateDetails
    },
    created() {
      this.getProposalsByEstimate()
    },
    updated() {
        bus.$off('updateProposalsByBuyer');
        bus.$on('updateProposalsByBuyer', (data) => {
            if(data) {
                this.proposals = []
                this.getProposalsByEstimate()
            }
        })
    },
    data() {
        return {
          modal: {
            equipment: false,
            estimate: false,
          },
          formats: [
            {id: 1, bg: 'bg-primary-main', text: 'Entrega'},
            {id: 2, bg: 'bg-orange-500', text: 'Retirada'},
            {id: 3, bg: 'bg-indigo-500', text: 'Aplicar Desconto'}
          ],
          estimate: {},
          proposals: []
        }
    },
    methods: {
      getProposalsByEstimate() {
        const estimate_id = this.$route.params.estimate_id
        estimateService.getEstimate(estimate_id).then((response) => {
          this.estimate = response.data.data
          this.proposals = response.data.data.proposals
        }).catch((error) => {
          console.log(error.response)
        })
      },
      formatItem(value) {
        let format = this.formats.find(status => status.id == value)
        return format
      },
      showEstimateModal() {
        this.modal.estimate = true;
        bus.$emit("ModalOpen", true);
      },
      closeEstimateModal() {
        this.modal.estimate = false;
        bus.$emit("ModalOpen", false);
      },
      showEquipmentModal() {
        this.modal.equipment = true;
        bus.$emit("ModalOpen", true);
      },
      closeEquipmentModal() {
        this.modal.equipment = false;
        bus.$emit("ModalOpen", false);
      },
    }
}
</script>

<style>

</style>