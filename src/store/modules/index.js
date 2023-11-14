export default {
    namespaced: true,
    state: {
        isFalg: true,
        RequirementList: [],
        Requiremenitem: {}
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
        }

    },
    actions: {

    },
    getters: {

    }
}
