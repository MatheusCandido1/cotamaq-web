<template>
<div>
    <company-form></company-form>
    <company-address-grid></company-address-grid>
</div>
</template>

<script>
import CompanyForm from '../components/Shared/Companies/CompanyForm';
import CompanyAddressGrid from '../components/Shared/Companies/CompanyAddressGrid';

export default {
    name: 'Company',
    components: {
        CompanyAddressGrid,
        CompanyForm
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>