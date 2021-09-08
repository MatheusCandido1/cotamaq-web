export default {
    state:{
        proposal: [],
    },
    getters:{
        proposal(state){
            return state.proposal
        },

    },
    mutations:{
        setProposal(state, payload){
            state.proposal = payload
        },

    }

}