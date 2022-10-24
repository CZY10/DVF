export default {
    namespaced:true,
    state:{
        userInfo:{
            user:'',
            token:''
        }
    },
    mutations:{
        setUserInfo(state,payload){
            state.userInfo = payload;
        },
        clearUserInfo(state){
            state.userInfo={
                user:'',
                token:''
            }
        }
    },
    actions:{

    },
    getters:{

    }
}