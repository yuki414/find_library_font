<template>
  <div id="login">
    <h1>ログインページ</h1>
    <ul style="list-style-type: none">
        <li><input type="email" placeholder="Email" v-model="email"></li>
        <li>{{ email }}</li>
        <li><input type="password" placeholder="Password" v-model="password"></li>
        <li>{{ password }}</li>
    </ul>
    <button @click="login">ログイン</button>
    <p>
      <router-link to="/signup">新規登録はこちら</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
// let headers = {
//     'Content-Type': 'application/json;charset=UTF-8',
//     "access-Access-Control-Expose-Headers": 'access-token',
// };

export default {
    name: "login",
    data () {
        return{
            email: 'uchiyama.yuki@moneyforward.co.jp',
            password: 'moenyforward'
        }
    },
    methods: {
        login () {
            console.log('Login')
            axios.post("http://localhost:3000/api/auth/sign_in",
            {
                "email": this.email,
                "password": this.password
            })
            .then(
                (response) => {
                    // console.log(response.headers))
                    this.$store.dispatch("create", response.headers)
                }
            )
        }
    },
    computed: {
        token() {
            return this.$store.state.auth.access_token
        }
    },
    watch: {
        token () {
        this.$router.push('/session')
        }
    }
}
</script>
