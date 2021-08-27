export default {
    state:{
        products: []
    },
    getters:{
        products(state){
            return state.products
        }
    },
    mutations:{
        setProducts(state, payload){
            state.products = payload
        }
    }

}