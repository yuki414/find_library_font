<template>
  <v-card min-height="1000px">
    <v-card-title class="headline">{{book.title}}</v-card-title>
    <v-row>
      <v-col cols="12" md="4" offset="1">
        <v-img class="align-center" :src="'book_images/'+book.image_name" width="80%"></v-img>
      </v-col>
      <v-col cols="12" md="7">
        <v-card-subtitle>本の内容</v-card-subtitle>
        <v-card-text>{{book.description}}</v-card-text>
        <v-col align="end" cols="11">
          <v-btn
            :loading="loading"
            :disabled="loading"
            :color="color"
            dark
            @click="searchBook(); loader='loading'"
          >
            本を探す
            <v-icon>search</v-icon>
          </v-btn>
        </v-col>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
    <!-- ここからGoogle map -->
    <v-row>
      <v-row justify="center">
        <GmapMap :center="center" :zoom="zoom" style="width: 90%; height: 400px">
          <!-- googlemapのマーカー設定箇所 -->
          <GmapInfoWindow
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
          >
            <table>
              <tr>
                <td style="text-align:left;">
                  <p>{{infoContent.title}}</p>
                  <p>{{infoContent.description}}</p>
                </td>
              </tr>
            </table>
          </GmapInfoWindow>
          <!-- ここまで -->
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :title="m.title"
            :clickable="true"
            @click="toggleInfoWindow(m)"
            :animation="2"
          />
        </GmapMap>
      </v-row>
    </v-row>
    <!-- ここまでGoogle map -->
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uid: this.$store.state.auth.id,
      center: {
        lat: 35,
        lng: 139
      },
      zoom: 14,
      // markers: this.marker,
      systemid: [],
      color: "teal lighten-1",
      continue: 1,
      loader: null,
      loading: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false,
      infoContent: {
        title: null,
        description: null
      }
    };
  },
  props: {
    book: {
      title: ""
    },
    dialog: {
      type: Boolean,
      default: false
    },
    markers: {}
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.loader = null;
    }
  },
  mounted: function() {
    this.getUser();
    this.getLibraries();
  },
  methods: {
    // google mapでピンの説明よう
    toggleInfoWindow(marker) {
      this.infoWinOpen = false;
      this.infoWindowPos = marker.position;
      this.infoContent = {
        title: marker.title,
        description: JSON.stringify(marker.status)
          .slice(1, -1)
          .replace(/"/g, " ")
      };
      if (this.infoContent.description == "") {
        this.infoContent.description = "蔵書なし";
      }
      // for (var i=0; marker.status.length; i++) {
      //   this.infoContent.description.push(marker.status[i])
      // }
      this.infoWinOpen = true;
    },
    getUser() {
      console.log("Get user information!");
      axios.get("user_additions/" + this.uid).then(response => {
        const addi = response.data.userAddition;
        this.center = {
          // str情報なためto float(number)にする必要がある
          lat: Number(addi.latitude),
          lng: Number(addi.longitude)
        };
      });
    },
    getLibraries() {
      console.log("Get bookmarks libraries");
      axios.get("libraries/" + this.uid).then(response => {
        this.markersTemp = response.data.libraries;
      });
    },
    searchBook() {
      axios
        .get("book_search", {
          params: {
            user_id: this.uid,
            book_id: this.book.id
          }
        })
        .then(response => {
          this.continue = response.data.continue;
          if (this.continue == 1) {
            console.log("Searching!");
            setTimeout(() => this.searchBook(), 2000);
            this.loading = true;
          } else {
            console.log("Done");
            this.result = response.data.books[this.book.ISBN13];
            this.markers = this.markersTemp;
            for (var i = 0; i < this.markers.length; i++) {
              this.markers[i].status = this.result[
                this.markers[i].systemid
              ].libkey;
            }
            this.loading = false;
          }
        });
    }
  }
};
</script>