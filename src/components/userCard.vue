<template>
  <v-card>
    <div id="updateUser">
    <!-- ここからGoogle map -->
    <div>
      <GmapMap
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 300px"
      >
      <!-- googlemapのマーカー設定箇所 -->
        <GmapInfoWindow :options="infoOptions" 
          :position="infoWindowPos" 
          :opened="infoWinOpen" 
          @closeclick="infoWinOpen=false"
          >
            <table>
              <tr>
                <td style="text-align:left;">
                  <p>{{infoContent.title}}</p>
                  <p>{{infoContent.address}}</p>
                </td>
              </tr>
            </table>
        </GmapInfoWindow>
        <!-- ここまで -->
      <GmapMarker
        :key="index"
        :animation= 2
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.title"
        @click="toggleInfoWindow(m)"
        :clickable="true"
      />
      <!-- animation 1で跳ねる、2でドロップ -->
      </GmapMap>
    </div>
    <!-- ここまでGoogle map -->
    <v-row>
      <!-- ここから住所 -->
      <v-col
      cols="6"
      md="4"
      offset="1"
      >
      <h2>
        住所登録
      </h2>
      <v-form ref="form">
        <v-text-field
        v-model="address1"
        lable="都道府県"
        required
        ></v-text-field>

        <v-text-field
        v-model="address2"
        lable="市区町村"
        required
        ></v-text-field>

        <v-text-field
        v-model="address3"
        lable="番地以降"
        required
        ></v-text-field>

        <v-btn
        color="success"
        class="mr-4"
        @click="updateUser()">
        Update
        </v-btn>
      </v-form>
      </v-col>
      <!-- ここまで住所 -->      
      <!-- ここから図書館検索結果表示  -->
      <v-col
      cols="12"
      md="7"
      >
      <v-card
        class="pa-2"
        max-width="80%"
        tile>
        <v-container
        id="scroll-target"
        style="max-height: 300px"
        class="overflow-y-auto"
        >
        <v-row
          v-scroll:#scroll-target
          align="center"
          justify="center"
        >
          <v-list float>
          <v-subheader>
            <v-btn @click="postLibraries()">
            付近の図書館を検索
              <v-icon>search</v-icon>
            </v-btn>
          </v-subheader>
          <v-list-item-group 
          v-model="lib" 
          color="primary">
            <v-list-item
            v-for="(lib, index) in libaryAll" 
            :key=index>
            <label v-bind:for="'checkLibrary_'+lib.libid">
              <input type="checkbox" 
              v-bind:id="'checkLibrary_'+lib.libid"
              :value="lib.libid" 
              v-model="checked" 
              v-on:click="clickToggle(lib)" />
              {{lib.title}}
            </label>
            </v-list-item>
          </v-list-item-group>
          </v-list>
        </v-row>
        </v-container>
      </v-card>
      </v-col>
      <!-- ここまで図書館検索結果表示  -->
    </v-row>
    </div>
  </v-card>
</template>

<script>
// import axios from '../plugins/axios'
import axios from "axios"

export default {
  name: "updateUser",
  data () {
    return {
      dialog: false,
      uid: 1,
      address1: '',
      address2: '',
      address3: '',
      checked: [],
      center: {
        lat: 35,
        lng: 139
      },
      zoom: 14,
      markers: {}, // googlemapのための図書館情報入れ
      lib: "1", // v-listのため
      libaryAll: {}, // 検索した全図書館情報を加える
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
        address: null
      }
    }
  },
  mounted: function() {
    this.getUser();
    this.postLibraries();
    this.getLibraries();
  },
  methods: {
    // google mapでピンの説明よう
    toggleInfoWindow (marker) {
      this.infoWinOpen = false
      this.infoWindowPos = marker.position
      this.infoContent = {
        title: marker.title,
        address: "Tokyo"
      }
      this.infoWinOpen = true
    },
    updateUser () {
      console.log('Update!')
      // axios.post("http://localhost:3000/api/user_additions/",
      axios.patch("http://localhost:3000/api/user_additions/"+this.uid,
        {"userAddition": {
          "uid": this.uid,
          "address1": this.address1,
          "address2": this.address2,
          "address3": this.address3
          }
        })
        .then((response)=>{
          // console.log(response)
          this.center = {
            // str情報なためto float(number)にする必要がある
            lat: Number(response.data.userAddition.latitude),
            lng: Number(response.data.userAddition.longitude)
        }
        })
    },
    getUser (){
      console.log('Get user information!')
      axios.get("http://localhost:3000/api/user_additions/"+this.uid)
      .then((response)=>{
        const addi = response.data.userAddition
        this.address1 = addi.address1
        this.address2 = addi.address2
        this.address3 = addi.address3
        this.center = {
          // str情報なためto float(number)にする必要がある
          lat: Number(addi.latitude),
          lng: Number(addi.longitude)
        }
      })
    },
    // postで図書館周りの検索
    postLibraries (){
      console.log('Search nearby libraries information')
      axios.post('http://localhost:3000/api/libraries',
        {
          "uid": this.uid
        })
      // axios.get('http://localhost:3000/api/libraries/1')
      .then((response)=>{
      this.libaryAll = response.data.libraries
      })
    },
    // bookmarkしている図書館のjsonをゲット
    getLibraries () {
      console.log('Get bookmarks libraries')
      axios.get('http://localhost:3000/api/libraries/'+this.uid)
      .then((response)=>{
        // console.log(response)
        // アイデアがなかったのでfor回してjsonのlibideを配列に格納していく
        // this.markers = []
        this.markers = response.data.libraries

        this.checked=[]
        for (var i=0;i<response.data.libraries.length;i++){
          // this.markers.push(response.data.libraries[i])
          this.checked.push(response.data.libraries[i].libid)
        }
        console.log(this.markers)
      })
    },
    clickToggle (lib) {
      // クリックしたアイテムが存在するときは逆にチェックを外したとき
      if (this.checked.indexOf(lib.libid)>=0) {
        console.log('delete')
        // ここにdestroy
        const params = {"libRel": {
              "user_id":this.uid,
              "library_id":lib.id}}
        axios.delete('http://localhost:3000/api/library_relationships', { data: params })
        // ここにmarkerを消す作業
        var newMarker = this.markers.filter(function(item){
          if (item.libid!=lib.libid) return true;
        });
        this.markers = newMarker;
      } else {
        console.log('create')
        // ここにcreate
        axios.post('http://localhost:3000/api/library_relationships',
          {"libRel": {
            "user_id":this.uid,
            "library_id":lib.id
          }})
        // ここにmarkerを追加する作業
        this.markers.push(lib)
      }
    }
  }
}
</script>