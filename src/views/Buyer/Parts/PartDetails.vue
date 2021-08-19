<template>
    <div>
        <PartUpdate  v-if="status == 1" />
        <PartProposals  v-else-if="status == 2" />
    </div>
</template>

<script>
import PartUpdate from '../../../components/Buyer/Parts/PartUpdate'
import PartProposals from '../../../components/Buyer/Parts/PartProposals'
export default {
    name: 'PartDetails',
    props: ['status'],
    components: {
        PartUpdate,
        PartProposals
    },
    data() {
        return {
        }
    },
    methods: {}
}
</script>

<style>

</style>