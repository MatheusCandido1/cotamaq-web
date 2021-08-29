<template>
  <span v-if="$props.role">
    <SellerOrders v-if="$props.role === 1"></SellerOrders>
    <BuyerOrders v-else-if="$props.role === 2"></BuyerOrders>
  </span>
</template>

<script>
import BuyerOrders from './Buyer/NewOrders/NewOrdersIndex';
import SellerOrders from './Seller/NewOrders/NewOrdersIndex';
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