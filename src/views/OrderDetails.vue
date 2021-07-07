<template>
<span v-if="$props.role">
    <seller-order-details v-if="$props.role === 1"></seller-order-details>
    <buyer-order-details v-else-if="$props.role === 2"></buyer-order-details>
  </span>
</template>

<script>
import BuyerOrderDetails from './Buyer/Orders//OrderDetail';
import SellerOrderDetails from './Seller/Orders/OrderDetail';
export default {
    name: 'OrderDetails',
    props: ['role'],
    components: {
      BuyerOrderDetails,
      SellerOrderDetails
    },
    data() {
        return {

        }
    }

}
</script>

<style>

</style>