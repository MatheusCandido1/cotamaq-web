<template>
    <span span v-if="$props.role">
        <ProposalShowSeller v-if="$props.role === 1"></ProposalShowSeller>
        <ProposalShowByBuyer v-else-if="$props.role === 2"></ProposalShowByBuyer>
    </span>
</template>

<script>
import ProposalShowByBuyer from '../components/Buyer/Proposals/ProposalShow'
import ProposalShowSeller from '../components/Seller/Proposals/ProposalShow'
export default {
    name: 'ProposalDetails',
    props: ['role'],
    components: {
      ProposalShowByBuyer,
      ProposalShowSeller
    },
    data() {
        return {

        }
    }

}
</script>

<style>

</style>