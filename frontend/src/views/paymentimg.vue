<template>
    <div>
        <img :src="'http://44.201.130.196:3000/' + img" alt="">
        <button @click="back()">test</button>
    </div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
    props: ["user"],
    data(){
        return{
            img: null,
        }
    },
    mounted() {
         axios
        .get(`/checkImg/${this.$route.params.id}`)
        .then((res) => {
          this.img = (res.data[0].file_path)
        })
        .catch((e) => {
          console.log(e)
        });
    },
    methods:{
        back(){
            location.href = `http://44.201.130.196:8080/myconcert/${this.user.user_id}`
        }
    },
}
</script>