<template>
    <div>
        <v-container
        class="fill-height"
        fluid
        style="min-height: 434px">
        <v-row>
            <v-col cols="2" v-for="book in books" :key="book.id">
            <v-card>
                <v-img
                :src="'book_images/'+book.image_name"
                width="100%"
                class="grey darken-4"
                ></v-img>
                <v-card-title class="title">{{book.title}}</v-card-title>
            </v-card>
            </v-col>
        </v-row>

        </v-container>
        <!-- <ul> -->
            <!-- <li v-for="book in books" :key="book.id"> -->
                <!-- {{book.title}} -->
                <!-- <img :src="'book_images/'+book.image_name" width="300"/> -->
            <!-- </li> -->
        <!-- </ul> -->
    </div>
</template>

<script>
import axios from "axios";
// import axios from '@/plugins/axios'

export default {
  name: 'BookForIndex',
  data: function () {
    return {
        books: null
    }
  },
  mounted () {
    console.log('Mounted! Book index!')
    axios.get('http://localhost:3000/api/books.json')
    .then(response => (this.books = response.data.books))
    // .then(response => console.log(response.data.books))
    }
}
</script>