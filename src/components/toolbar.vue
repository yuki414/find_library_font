<template>
  <div>
    <v-toolbar dark :color="color" clipped>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Book it</v-toolbar-title>
      <!-- <v-img src="../../public/logo.png" height="50%"></v-img> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- ここから -->
    <v-navigation-drawer v-model="drawer" fixed clipped :color="color" dark>
      <v-list dense nav class="py-0">
        <v-list-item>
          <v-list-item-title>アプリケーション</v-list-item-title>
          <v-list-item-icon>
            <v-btn @click="drawer = false" icon>
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-btn :color="btn_color" dark @click.stop="dialog = true">{{ item.title }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>account_circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-btn :color="btn_color" block @click="logout(); drawer = !drawer">ログアウト</v-btn>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <!-- ここまで -->

    <v-dialog v-model="dialog" max-width="1000">
      <userCard />
    </v-dialog>
  </div>
</template>
<script>
import userCard from "./userCard";

export default {
  components: {
    userCard
  },
  data() {
    return {
      dialog: false,
      drawer: false,
      items: [
        { title: "お近くの図書館", icon: "near_me" },
        { title: "図書参照", icon: "book" }
        // { title: 'Login/Logout', icon: 'account_circle' },
      ],
      color: "teal lighten-1",
      btn_color: "cyan darken-4",
      colors: ["primary", "blue", "success", "red", "teal"]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("destroy");
      this.$router.push("/session");
    }
  }
};
</script>