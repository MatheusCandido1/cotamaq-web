<template>
    <PartForm />
</template>

<script>
import PartForm from '../../../components/Buyer/Parts/PartForm'
export default {
    name: 'PartAdd',
    components: {
        PartForm
    },
    data() {
        return {
            edit: true,
            proposals: []
        }
    },
    methods: {}
}
</script>

<style>

</style>