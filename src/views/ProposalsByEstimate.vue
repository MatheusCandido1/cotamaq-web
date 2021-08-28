<template>
  <span v-if="$props.role">
    <ProposalDetailsBuyer v-if="$props.role === 2"></ProposalDetailsBuyer>
    <ProposalDetailsSeller v-else-if="$props.role === 1"></ProposalDetailsSeller>
  </span>
</template>

<script>
import ProposalDetailsBuyer from '../views/Buyer/Proposals/ProposalDetails'
import ProposalDetailsSeller from '../views/Seller/Proposals/ProposalDetails'

export default {
    name: 'ProposalsByEstimate',
    props: ['role'],
    components: {
      ProposalDetailsSeller,
      ProposalDetailsBuyer
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>