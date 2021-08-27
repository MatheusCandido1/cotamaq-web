<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-between">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Cotação #
                    </h2>
                </div>
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Propostas
                    </h2>
                </div>
                <div class="py-1">
                    <span class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded  cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
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
    </div>
</template>

<script>
import ProposalItem from './ProposalItem'
//import NewProposalItem from './NewProposalItem'
import { proposalService } from '../../../services'
export default {
    name: 'ProposalBySeller',
    components: {
        ProposalItem,
        //NewProposalItem
    },
    created() {
        this.getProposalsByEstimate();
    },
    data() {
        return {
            proposals: []
        }
    },
    methods: {
        getProposalsByEstimate() {
            const estimate_id = this.$route.params.estimate_id
            proposalService.getProposalsByEstimate(estimate_id).then((response) => {
                this.proposals = response.data.data
            }).catch((error) => {
                console.log(error.response.data)
            })
        }
    }
}
</script>

<style>

</style>