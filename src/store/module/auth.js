// import Vue from "vue"

const auth = {
    state: {
        id: "",
        access_token: "",
        client: "",
        uid: "",
        expire: 0,
    },
    mutations: {
        create: (state, data) => {
            state.id = data.data.data.id
            state.access_token = data.headers["access-token"]
            state.client = data.headers.client
            state.uid = data.headers.uid
            state.expire = data.headers.expire
        },
        destroy: (state) => {
            state.id = ""
            state.token = ""
            state.client = ""
            state.uid = ""
            state.expire = 0
        }
    },
    actions: {
        create({ commit }, data) {
            commit("create", data)
        },
        destroy({ commit }) {
            commit("destroy")
        }
    }
}

export default auth