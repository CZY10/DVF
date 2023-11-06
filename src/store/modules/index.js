export default {
    namespaced: true,
    state: {
        isFalg: true,
        RequirementList: []
    },
    mutations: {
        setIsFalg(state, payload) {
            state.isFalg = payload;
        },
        //需求列表
        setRequirementList(state, payload) {
            state.RequirementList = payload
        }

    },
    actions: {

    },
    getters: {

    }
}
