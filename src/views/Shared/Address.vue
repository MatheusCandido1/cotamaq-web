<template>
    <span>
        <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <address-form></address-form>
        </div>
        
        <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <address-grid></address-grid>
        </div>
    </span>
</template>
<script>
import AddressForm from '../../components/Shared/Addresses/AddressForm';
import AddressGrid from '../../components/Shared/Addresses/AddressGrid';

export default {
    name: 'Address',
    components: {
        AddressForm,
        AddressGrid
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>