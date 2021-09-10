<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex lg:px-3 justify-between">
                <div class="py-1">
                    <span @click="showEstimateModal" class="items-center justify-center px-2 py-1 text-md font-bold rounded-md text-white bg-primary-main cursor-pointer">Cotação #{{estimate.id}} - {{estimate.description}}<i class="mdi mdi-file-search ml-2"></i></span>
                </div>
                <div class="py-1">
                    <span v-if="estimate.equipment != null" @click="showEquipmentModal" class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded-md cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
                    <span v-if="estimate.equipment == null" class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-yellow-500 rounded-md cursor-pointer"><i class="mdi mdi-alert-octagon-outline mr-2"></i>Equipamento não informado</span>
                </div>
            </div>
            <div class="flex lg:px-3 justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Propostas
                    </h2>
                </div>
                <div v-if="this.estimate.allow_similar === 0" />
                <div v-else>
                    <div v-if="proposals.length > 0 && approvedProposals.length == 0" class="py-1">
                        <button @click="handleAddClick"  class="bg-primary-main w-full text-md px-2 py-1 font-semibold text-white rounded-md dark:text-white">Nova Proposta</button>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
                    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
                        <ProposalItem v-for="proposal in proposals" :key="proposal.id" :proposal="proposal" />
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
import ProposalItem from './ProposalItem'
import { proposalService } from '../../../services'
import EquipmentDetails from '../../../components/Shared/Equipment/EquipmentDetail'
import EstimateDetails from '../Estimates/EstimateDetails'
export default {
    name: 'ProposalBySeller',
    components: {
        ProposalItem,
        EquipmentDetails,
        EstimateDetails
    },
    updated() {
        bus.$off('updateProposalsBySeller');
        bus.$on('updateProposalsBySeller', (data) => {
            if(data) {
                this.getProposalsByEstimate();
            }
        })
    },
    created() {
        this.getProposalsByEstimate();
    },
    computed: {
        approvedProposals: function() {
            return this.proposals.filter(proposal => proposal.status == 3)
        }
    },
    data() {
        return {
            proposals: [],
            modal: {
               equipment: false,
               estimate: false,
            },
            estimate: {
                id: this.$route.params.estimate_id
            },
            proposals_quantity: this.$route.params.proposals_quantity,
            allow_similar: this.$route.params.allow_similar,
            imageProposal:[],
            imageEstimate:[]
        }
    },
    methods: {
        getProposalsByEstimate() {
            proposalService.getProposalsByEstimate(this.estimate.id).then((response) => {

              const data = response.data.data
              this.proposals = data
              this.estimate = this.proposals[0].estimate

            }).catch((error) => {
                console.log(error.response.data)
            })


        },
        handleAddClick() {
            this.$router.push({name: 'addProposal', params: {estimate_id: this.estimate.id}})
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