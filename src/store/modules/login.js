export default {
    namespaced:true,
    state:{
        userInfo:{},
        loginFromPat:'',
        avatar:'',
        token:'',
        loginFromPath:'/',
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
        setToken(state,payload){
            state.token = payload
        },
        setAvatar(state,payload){
            state.avatar = payload
        },
        setLoginFromPath(state,payload){
            state.loginFromPath = payload
        },
    },
    actions:{

    },
    getters:{

    }
}
