<template>
    <buyer-proposal></buyer-proposal>
</template>

<script>
import BuyerProposal from './Buyer/Proposals/Proposals';
// SellerEstimates from './Seller/Estimates/Estimates';

export default {
    name: 'Proposals',
    //props: ['role'],
    components: {
    BuyerProposal,
      //SellerEstimates
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>