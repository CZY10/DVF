export default {
    namespaced:true,
    state:{
        userInfo:{},
        loginFromPat:''
    },
    mutations:{
        setUserInfo(state,payload){
            console.log('store',state,payload)
            state.userInfo = payload;
        },
        clearUserInfo(state){
            state.userInfo={
                user:'',
                token:''
            }
        },
    },
    actions:{

    },
    getters:{

    }
}
