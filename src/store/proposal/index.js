export default {
    state:{
        proposal: [],
        proposalTakeOut:false
    },
    getters:{
        proposal(state){
            return state.proposal
        },
        proposalTakeOut(state){
            return state.proposalTakeOut
        },

    },
    mutations:{
        setProposal(state, payload){
            state.proposal = payload
        },
        setProposalTakeOut(state, payload){
            state.proposalTakeOut = payload
        },

    }

}