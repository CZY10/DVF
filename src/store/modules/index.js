export default {
    namespaced: true,
    state: {
        isFalg: true,
        RequirementList: [],
        Requiremenitem: {},
        RequirementFirst: 1,
        ExitFullScreen: false,
        influencersList: [],
        influencersListid: 0,
        currentPage: 1,
        dataobj: {
            genderValue: "",
            categoryValue: "",
            themeValue: "",
            searchforval: "",
            priceval: ""
        }
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
        },
        setExitFullScreen(state, payload) {
            state.ExitFullScreen = payload
        },
        setinfluencersList(state, payload) {
            state.influencersList = payload
        },
        setinfluencersListid(state, payload) {
            state.influencersListid = payload
        },
        setcurrentPage(state, payload) {
            state.currentPage = payload
        },
        setdataobj(state, payload) {
            state.dataobj = payload
        }
    },
    actions: {

    },
    getters: {

    }
}
