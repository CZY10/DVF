export default {
    namespaced:true,
    state:{
        userInfo:{},
        avatar:'',
        token:'',
        loginFromPath:'/',
        expiretime:'',
    },
    mutations:{
        setUserInfo(state,payload){
            state.userInfo = payload;
        },
        clearUserInfo(state){
            state.userInfo = {};
            state.token = '';
            state.avatar = '';
            state.expiretime = '';
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('avatar');
        },
        setExpiretime(state,payload){
            state.expiretime = payload
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
