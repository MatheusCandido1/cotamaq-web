export default {
    // namespaced: true,
    state: () => ({
        user: {},
        notificationNotRead: [],
        notificationList: [],
        newEstiamte:false
    }),

    getters:{
        notificationList(state){
            return state.notificationList
        },
        notificationNotRead(state){
            return state.notificationNotRead
        },
        newEstimate(state){
            return state.newEstiamte
        },
        user(state){
            return state.user
        }
    },    

    mutations: {
        STORE_USER(state, payload) {
            state.user = payload;
        },

        setNotification(state, payload){
            state.notificationList = payload
            var list = []
            payload.forEach(data => {

                if(data.read == 0){
                    list.push(data)
                }
                
            });
           
            state.notificationNotRead = list
        },
        setNotificationList(state,payload){
            // state.notificationList = []
            // console.log(payload)
            state.notificationList = payload
        },
        setnewEstiamte(state,payload){

            state.newEstiamte = payload
        }
    
    },

    actions: {}
}