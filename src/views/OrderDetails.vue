<template>
  <span v-if="$props.role">
      <SellerOrderShow v-if="$props.role === 1"></SellerOrderShow>
      <BuyerOrderShow v-else-if="$props.role === 2"></BuyerOrderShow>
  </span>
</template>

<script>
import BuyerOrderShow from '../components/Buyer/NewOrders/OrderShow';
import SellerOrderShow from '../components/Seller/NewOrders/OrderShow';
export default {
    name: 'OrderDetails',
    props: ['role'],
    components: {
      BuyerOrderShow,
      SellerOrderShow
    },
    data() {
        return {

        }
    }

}
</script>

<style>

</style>