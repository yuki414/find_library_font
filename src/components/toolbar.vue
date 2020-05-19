<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      :color="color"
      dark
      >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                color="primary"
                dark
                @click.stop="dialog = true"
                >
                {{ item.title }}
              </v-btn>  
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
            <v-btn block>Logout</v-btn>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-toolbar
      dark
      :color="color"
      clipped
      fixed
    >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="dialog"
      max-width="1000"
    >
      <userCard/>
    </v-dialog>
  </div>
    
</template>

<script>
import userCard from './userCard'


  export default {
    components: {
      userCard
    },
    data () {
      return {
        dialog: false,
        drawer: false,
        items: [
          { title: 'Book refer', icon: 'book' },
          { title: 'Nearby library', icon: 'near_me' },
          // { title: 'Login/Logout', icon: 'account_circle' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
      }
    },
  }
</script>