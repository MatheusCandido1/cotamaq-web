<template>
    <span v-if="this.$props.role === 1">
        <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <payment-method-grid></payment-method-grid>
        </div>
        
        <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <payment-condition-grid></payment-condition-grid>
        </div>
    </span>
</template>

<script>
import PaymentMethodGrid from '../components/Seller/Payments/PaymentMethod/PaymentMethodGrid';
import PaymentConditionGrid from '../components/Seller/Payments/PaymentCondition/PaymentConditionGrid';
export default {
    name: 'Payments',
    props: ['role'],
    components: {
        PaymentConditionGrid,
        PaymentMethodGrid
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>