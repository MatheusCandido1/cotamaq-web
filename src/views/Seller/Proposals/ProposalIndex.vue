<template>
    <div>
        <ProposalGrid />
        <ProposalForm />
    </div>
</template>

<script>
import ProposalGrid from '../../../components/Seller/Proposals/ProposalGrid'
import ProposalForm from '../../../components/Seller/Proposals/ProposalForm'

export default {
    name: 'ProposalIndex',
    components: {
        ProposalGrid,
        ProposalForm
    }

}
</script>

<style>

</style>