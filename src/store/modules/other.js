export default {
    namespaced:true,
    state:{
        isMessage: 0,
        message:0
    },
    mutations:{
        setIsMessage(state,payload){
            state.isMessage = payload;
        },
        setMessage(state,payload){
            state.message = payload;
        }
    },
    actions:{

    },
    getters:{

    }
}
