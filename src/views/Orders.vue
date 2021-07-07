<template>
<span v-if="$props.role">
    <seller-orders v-if="$props.role === 1"></seller-orders>
    <buyer-orders v-else-if="$props.role === 2"></buyer-orders>
  </span>
</template>

<script>
import BuyerOrders from './Buyer/Orders/Orders';
import SellerOrders from './Seller/Orders/Orders';
export default {
    name: 'Orders',
    props: ['role'],
    components: {
      BuyerOrders,
      SellerOrders
    },
    data() {
        return {

        }
    }

}
</script>

<style>

</style>