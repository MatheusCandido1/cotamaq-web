<template>
<div>
    <span>
        <estimate-products></estimate-products>
    </span>
    <span>
        <estimate-proposals></estimate-proposals>
    </span>
</div>

</template>
<script>
import { bus } from '../../../main';
//import { estimateService } from '../../../services';
import EstimateProducts from '../../../components/Buyer/Estimates/EstimateProducts';
import EstimateProposals from '../../../components/Buyer/Estimates/EstimateProposals';

//import { BarLoader } from '@saeris/vue-spinners';
export default {
    name: 'EstimateDetail',
    components: {
        //BarLoader,
        EstimateProducts,
        EstimateProposals
    },
    mounted() {
        
    },
    updated() {
        bus.$off('updatedEstimate');
        bus.$on('updatedEstimate', (data) => {
            if(data) {
                this.getEstimates();
            }
        })
    },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>

<style>
</style>