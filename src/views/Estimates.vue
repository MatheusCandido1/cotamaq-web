<template>
  <span v-if="$props.role">
    <seller-estimates v-if="$props.role === 1"></seller-estimates>
    <buyer-estimates v-else-if="$props.role === 2"></buyer-estimates>
  </span>
</template>

<script>
import BuyerEstimates from './Buyer/NewEstimates/NewEstimatesIndex';
import SellerEstimates from './Seller/NewEstimates/NewEstimatesIndex';

export default {
    name: 'Estimates',
    props: ['role'],
    components: {
      BuyerEstimates,
      SellerEstimates
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>