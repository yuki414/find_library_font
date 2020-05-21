<template>
  <div class="signup">
    <h2>Sign up</h2>
    <ul style="list-style-type: none">
        <li><input type="email" placeholder="Email" v-model="email"></li>
        <li>{{ email }}</li>
        <li><input type="password" placeholder="Password" v-model="password"></li>
        <li>{{ password }}</li>
        <li><input type="password" placeholder="Password(Confirmaiton)" v-model="password_confirmation"></li>
    </ul>
    <button @click="signUp">Register</button>
    <p>アカウントをお持ちの方は
      <router-link to="/login">こちら</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data () {
        return{
            email: '',
            password: '',
            password_confirmation: '',
            uid: ''
        }
    },
    methods: {
        signUp () {
            console.log('Sign-up!')
            axios.post("auth",
            {
                "email": this.email,
                "password": this.password
            })
            .then(
                (body,headers) => console.log(body, headers))
            axios.post("user_additions/",
                {"userAddition": {
                    "id": this.id,
                    "uid": this.uid,
                    "address1":  '',
                    "address2": '',
                    "address3": ''
                    }
            })
        }
    }
}
</script>
<style scoped>

a {
  color: #42b983;
}
</style>