// import Vue from "vue"

const auth = {
    state: {
        access_token: "",
        client: "",
        uid: "",
        expire: 0,
    },
    mutations: {
        create: (state, data) => {
            state.access_token = data.access_token
            state.client = data.client
            state.uid = data.uid
            state.expire = data.expire
        },
        destroy: (state)=>{
            state.token = "",
            state.client = "",
            state.uid = "",
            state.expire=0
        }
    },
    actions: {
        create({ commit }, data) {
            commit("create", data)
        }
    }
}

export default auth