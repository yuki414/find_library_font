<template>
  <v-col col="12" md="6" offset="3">
    <v-stepper v-model="event">
      <v-stepper-items>
        <!-- content1 -->
        <v-stepper-content step="1">
          <!-- <v-card class="mx-auto" width="400" height="450"> -->
          <v-form ref="form" v-model="valid" @submit.prevent>
            <v-row>
              <v-col align="center">
                <v-card-text>
                  <v-img src="../../public/logo.png" width="25%"></v-img>
                  <p class="display-1 text--primary">ログイン</p>
                  <p class="body-1 font-weight-medium">Bookitアカウントを使用</p>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="メールアドレス"
                      outlined
                      required
                    ></v-text-field>
                    <v-col align="start">
                      <v-btn text color="primary">メールアドレスを忘れてしまった場合</v-btn>
                    </v-col>
                  </v-col>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" offset align="start">
                <v-btn text color="primary">アカウントを作成</v-btn>
              </v-col>
              <v-col cols="12" md="5" align="end">
                <v-btn color="primary" @click="getEmail(); validate();">次へ</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <!-- </v-card> -->
        </v-stepper-content>
        <!-- ここまで１ -->
        <v-stepper-content step="2">
          <!-- <v-card class="mx-auto" width="400" height="450"> -->
          <v-form @submit.prevent>
            <v-row>
              <v-col align="center">
                <v-card-text>
                  <v-img src="../../public/logo.png" width="25%"></v-img>
                  <p class="display-1 text--primary">ようこそ</p>
                  <p class="body-1 font-weight-medium">{{this.email}}</p>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="pwRules"
                      :type="show ? 'text' : 'password'"
                      label="パスワードを入力"
                      outlined
                      required
                      @click:append="show =! show"
                    ></v-text-field>
                    <v-col align="start">
                      <v-btn text color="primary">パスワードを忘れてしまった場合</v-btn>
                    </v-col>
                  </v-col>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" offset align="start">
                <v-btn text color="primary" @click="event=1">戻る</v-btn>
              </v-col>
              <v-col cols="12" md="5" align="end">
                <v-btn color="primary" @click="login()">ログイン</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <!-- </v-card> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-col>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      conti: 0,
      valid: true,
      event: 1,
      show: false,
      email: "",
      password: "",
      success: null,
      emailRules: [
        v => !!v || "メールアドレスを入力してください",
        v => /.+@.+/.test(v) || "有効なメールアドレスを入力してください"
      ],
      pwRules: [v => !!v || "パスワードを入力してください"]
      // loginOrSignup = null, //trueならlogin, falseならSingup
    };
  },
  methods: {
    validate() {
      setTimeout(() => {
        console.log(this.$refs.form.validate());
        if (this.$refs.form.validate()) {
          this.event = 2;
        }
      }, 200);
    },
    getEmail() {
      axios
        .get("user_additions_search", {
          params: {
            email: this.email
          }
        })
        .then(response => {
          console.log(response.data);
          this.conti = response.data.continue;
        });
    },
    login() {
      axios
        .post("auth/sign_in", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$store.dispatch("create", response);
        });
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.access_token;
    }
  },
  watch: {
    token() {
      this.$router.push("/book_index");
    }
  }
};
</script>