export default {
    namespaced: true,
    state: () => ({
        user: {},
    }),

    mutations: {
        STORE_USER(state, payload) {
            state.user = payload;
        },
    },

    actions: {}
}