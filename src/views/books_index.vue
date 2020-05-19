<template>
	<div id="BookForIndex">
		<v-item-group mandatory>
			<v-container>
				<v-row>
					<v-col
						v-for="book in books"
						:key="book.id"
						cols="12"
						md="4"
					>
					<v-hover v-slot:default="{ hover }">
						<v-card
              class="justify-center"
							color="#FAFAFA"
              height="320px"
							width="300px"
							:elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
							@click.stop="dialog = true"
							@click="book_id=book.id; getBook()"
						>
							<v-img
							:src="'book_images/'+book.image_name"
							max-height="250px"
							></v-img>
							<v-card-subtitle class="pb-0">{{book.title}}</v-card-subtitle>
						</v-card>
					</v-hover>
					</v-col>
				</v-row>
			</v-container>
		</v-item-group>
		<v-dialog
      v-model="dialog"
      max-width="1000px"
    >
			<showBook :book="chilBook"/>
    </v-dialog>
		<v-btn @click.stop="dialog = true">Dialog</v-btn>
		{{dialog}}
		{{chilBook}}
		</div>
</template>

<script>
import axios from "axios";
// import axios from '@/plugins/axios'
import showBook from '../components/showBook'

export default {
	components: {
		showBook
	},
  name: 'BookForIndex',
  data: function () {
    return {
				books: null,
				dialog: false,
				book_id: null,
				chilBook: null
    }
	},
	methods: {
		getBook () {
			axios.get('http://localhost:3000/api/books/'+this.book_id)
			.then((response)=>{
			this.chilBook = response.data.book
			})
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