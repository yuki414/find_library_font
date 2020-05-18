<template>
<div id="updateUser">
    <h1>
        User {{ $route.params.id }} page
    </h1>
    <input type="text" placeholder="都道府県" v-model="address1">
    <input type="text" placeholder="市区町村" v-model="address2">
    <input type="text" placeholder="番地以降" v-model="address3">
    <button @click="updateUser">更新</button>
    <p>{{center}}</p>
    <div>
        <GmapMap
        :center="center"
        :zoom="zoom"

        style="width: 500px; height: 300px"
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :title="m.title"
            :clickable="true"
        />
        </GmapMap>
    </div>
    <p><button @click="postLibraries">図書館を検索する</button></p>
    <p><button @click="getLibraries">お気に入り図書館の表示</button></p>
    {{checked}}
    <ul style="list-style-type: none">
        <li v-for="(lib, index) in libaryAll" :key=index>
            <input type="checkbox" 
            :value="lib.libid" 
            v-model="checked" 
            v-on:click="clickToggle(lib)" >
            {{lib.title}}
        </li>
    </ul>
    
</div>
</template>

<script>
// import axios from '../plugins/axios'
import axios from "axios"

export default {
    name: "updateUser",
    data () {
        return {
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
            markers: {}, // ここに図書館情報を加えていく
            libaryAll: {} // 検索した全図書館情報を加える
        }
    },
    mounted: function() {
        this.getUser();
        this.postLibraries();
    },
    methods: {
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
                    console.log(response)
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
                this.latitude = addi.latitude
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
        getLibraries () {
            console.log('Get bookmarks libraries')
            axios.get('http://localhost:3000/api/libraries/'+this.uid)
            .then((response)=>{
                // console.log(response)
                this.markers = response.data.libraries
                console.log(this.markers)
                // アイデアがなかったのでfor回してjsonのlibideを配列に格納していく
                this.checked=[]
                for (var i=0;i<response.data.libraries.length;i++){
                    this.checked.push(response.data.libraries[i].libid)
                }
            }
            )
        },
        clickToggle (lib) {
            // クリックしたアイテムが存在するときは逆にチェックを外したとき
            if (this.checked.indexOf(lib.libid)>=0) {
                console.log('delete')
                // ここにdestroy
                const params = {"libRel": {
                            "user_id":this.uid,
                            "library_id":lib.lid}}
                axios.delete('http://localhost:3000/api/library_relationships', { data: params })
                // ここにmarkerを消す作業
                // var newMarker = this.marker.filter(function(item){
                //     if (item.libid!=lib.libid) return true;
                // });
                // this.marker = newMarker;
            } else {
                console.log('create')
                // ここにcreate
                axios.post('http://localhost:3000/api/library_relationships',
                    {"libRel": {
                        "user_id":this.uid,
                        "library_id":lib.lid
                    }})
                // ここにmarkerを追加する作業
                // this.marker.push(lib)
            }
        }


    }
}

</script>