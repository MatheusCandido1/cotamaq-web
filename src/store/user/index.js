export default {
    // namespaced: true,
    state: () => ({
        user: {},
        notificationNotRead: [],
        notificationList: []
    }),

    getters:{
        notificationList(state){
            return state.notificationList
        },
        notificationNotRead(state){
            return state.notificationNotRead
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
        }
    
    },

    actions: {}
}