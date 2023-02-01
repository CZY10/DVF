export default {
    namespaced:true,
    state:{
        isMessage: 0,
        message:0,
        isRead:0,
    },
    mutations:{
        setIsMessage(state,payload){
            state.isMessage = payload;
        },
        setMessage(state,payload){
            state.message = payload;
        },
        setIsRead(state,payload){
            state.isRead = payload;
        }

    },
    actions:{

    },
    getters:{

    }
}
