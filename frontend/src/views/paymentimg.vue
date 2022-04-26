<template>
    <div>
        <img :src="backEndURL+'/' + img" alt="">
        <button @click="back()">test</button>
    </div>
</template>
<script>
import axios from "@/plugins/axios";
import config from '../../config';
export default {
    props: ["user"],
    data(){
        return{
            backEndURL: config.backEndURL,
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
            location.href = `${config.frontEndURL}/myconcert/${this.user.user_id}`
        }
    },
}
</script>