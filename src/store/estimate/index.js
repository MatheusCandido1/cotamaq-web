export default {
    state:{
        products: [],
        files:[]
    },
    getters:{
        products(state){
            return state.products
        },
        files(state){
            return state.files
        }
    },
    mutations:{
        setProducts(state, payload){
            state.products = payload
        },
         setFiles(state, payload){
            state.files = payload
        }
    }

}