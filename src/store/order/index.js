export default {
    state:{
        paymentMethod: [],
        paymentCondition:[]
    },
    getters:{
        paymentMethod(state){
            return state.paymentMethod
        },
        paymentCondition(state){
            return state.paymentCondition
        },

    },
    mutations:{
        setPaymentMethod(state, payload){
            state.paymentMethod = payload
        },
        setPaymentCondition(state, payload){
            state.paymentCondition = payload
        },

    }

}