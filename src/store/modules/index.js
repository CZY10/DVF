export default {
    namespaced: true,
    state: {
        isFalg: true,
        RequirementList: [],
        Requiremenitem: {},
        RequirementFirst: 1
    },
    mutations: {
        setIsFalg(state, payload) {
            state.isFalg = payload;
        },
        //需求列表
        setRequirementList(state, payload) {
            state.RequirementList = payload
        },
        setRequiremenitem(state, payload) {
            state.Requiremenitem = payload
        },
        setRequirementFirst(state, payload) {
            state.RequirementFirst = payload
        }

    },
    actions: {

    },
    getters: {

    }
}
