<template>
  <div class="box pb-5">
    <!-- slide img -->
    <div class="container-fluid mx-auto" style="background-color: black; margin: 0px 0px 0px 0px">
      <div class="box mx-auto" style="width: 60vw; height: auto; margin: 0px 0px 0px 0px" >
        <div  id="carouselExample1" class="carousel slide z-depth-1-half" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="../assets/bts1.jpg"  alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="../assets/bts2.jpg"  alt="Second slide"/>
            </div>
            <div class="carousel-item">
              <img  class="d-block w-100" src="../assets/cats1.png" alt="Third slide"/>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExample1" role="button" data-slide="prev" >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExample1" role="button" data-slide="next" >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Search concserts -->
    <div class=" pt-5 form-inline pb-4">
        <div class="row mx-auto form-group mb-2 ">
            <div class="form-group mx-sm-3 mb-2">
              <input class="form-control" id="search" style="min-width: 50vw" type="text" v-model="search" placeholder="ค้นหางานแสดงที่ต้องการ">
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <button class="btn btn-primary"   style="font-size: 20px" @click="getConcert">ค้นหา</button>
            </div>
        </div>
      </div> 

    <!-- show concert -->
    <div class="container">
      <div class="row mx-auto m-5">
        <h4 class="m-0 pl-3 pt-1" >คอนเสิร์ต</h4>
        
        <!-- dropdown -->
        <div class="btn-group mr-3 ml-auto">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            เรียงลำดับ
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click="sortConcert(1)" style="cursor: pointer">ยอดนิยม</a>
            <a class="dropdown-item" @click="sortConcert(2)" style="cursor: pointer">เก่าสุด - ใหม่สุด</a>
            <a class="dropdown-item" @click="sortConcert(3)" style="cursor: pointer">ใหม่สุด - เก่าสุด</a>
            <!-- <div class="dropdown-divider"></div> -->
          </div>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="col-4 col-md-3 col-lg-2 pb-4" v-for="concert in concerts" :key="concert.id" >
          <div class="card" style="position:relative; border-style: hidden;">
            <router-link  :to="`/detail/${concert.concert_id}`">
            <div id="card-img-top"  style="height: 150px; width: auto; background-position: center;">
                <img :to="`/detail/${concert.concert_id}`"  :src="imagePath(concert.concert_image)" alt="image cap">
            </div>
            </router-link>
            <div :to="`/detail/${concert.concert_id}`" class="card-body" style="min-height:200px; padding: 0.5rem;">
              <router-link  :to="`/detail/${concert.concert_id}`">
                  <p class="card-title pt-2 text-center" >{{ concert.concert_title }}</p>
                  <p class="card-text text-center" style="height:10px; font-weight: 500;" >
                    {{concert.concert_showtime.substring(0, 10)}}
                    <!-- {{new Date(concert.concert_showtime).toLocaleDateString("th", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }} -->
                    </p>
                  <!-- <p class="card-text" >{{findDate}}</p> -->
                  <p class="card-text mt-4" style="height:20px; font-weight: 500;">
                    {{ concert.concert_address}}
                  </p><br>
                </router-link>
              <div class="text-center" >
                <router-link v-if="user.user == 'cus'"  class="btn btn-outline-danger" :to="`/step1/${concert.concert_id}`">ซื้อบัตร</router-link>
                <router-link v-if="user.user == 'sell' && user.user_id == concert.user_user_id"  class="btn btn-outline-danger" :to="`/update/${concert.concert_id}`">แก้ไข</router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal login -->
        <div class="modal fade" tabindex="-1" id="modalLogin" aria-hidden="true">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-body ">
                        <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                        <h3 class="text-center mt-3">เข้าสู่ระบบ</h3>

                            <div class="form-group">
                                <input type="email" class="form-control mt-5" id="" aria-describedby="emailHelp" placeholder="อีเมล" v-model="emailLogin">
                                <input type="password" class="form-control mt-3" id="" placeholder="รหัสผ่าน" v-model="passLogin">
                            </div>
                            <!-- <a href="#" class="btn mx-auto text-muted" style=" display: block;">ลืมรหัสผ่าน</a> -->
                           
                            <hr class="my-0 pb-3">
                            <button @click="login()"  class="btn btn-danger mx-auto" style="display: block;">เข้าสู่ระบบ</button>


                        <div class="text-center mt-3">
                            <h6>หากท่านยังไม่ได้เป็นสมาชิก</h6>
                            <a href="#" class="text-danger" data-dismiss="modal"  data-toggle="modal" data-target="#modalRegister">กรุณาสมัครสมาชิก</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal register -->
        <div class="modal fade"  role="dialog" id="modalRegister" aria-hidden="true">
            <div class="modal-dialog" role="document" >
                <div class="modal-content">
                    <div class="modal-body" style="padding: 30px;">
                        <button type="button" class="close pt-4" data-dismiss="modal" aria-label="Close">
                            <span class="close-but" aria-hidden="true" >&times;</span>
                        </button>
                        <img class="mx-auto" src="../assets/logo.png" alt="logo" style="width: 10vw; display: block;">
                        <h3 class="text-center 
                        mt-3">สมัครสมาชิก</h3>
                        <small id="" class="form-text text-muted text-center">กรุณากรอกข้อมูลให้ครบถ้วน</small>
                        <form>
                            <div class="form-group  pt-4">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="rd_1" name="rd" class="custom-control-input red" value="cus" v-model="role">
                                  <label class="custom-control-label" for="rd_1">ผู้ซื้อ</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="rd_2" name="rd" class="custom-control-input red" value="sell" v-model="role">
                                  <label class="custom-control-label" for="rd_2">ผู้ขาย</label>
                                </div>
                                <input type="text" class="form-control mt-3 " id="" placeholder="ชื่อ" v-model="$v.first_name.$model" :class="{'is-danger' : $v.first_name.$error}">
                                <template v-if="$v.first_name.$error">
                                  <div>
                                    <div class="error text-danger" v-if="!$v.first_name.required">
                                      กรุณากรอกข้อมูล
                                    </div>
                                    <div class="error text-danger" v-if="!$v.first_name.maxLength">
                                      ชื่อคุณยาวเกินไป
                                      </div>
                                  </div>
                                </template>
                                <input type="text" class="form-control mt-3" id="" placeholder="นามสกุล" v-model="$v.last_name.$model" :class="{'is-danger' : $v.last_name.$error}">
                                <template v-if="$v.last_name.$error">
                                  <div>
                                    <div class="error text-danger" v-if="!$v.last_name.required">
                                      กรุณากรอกข้อมูล
                                    </div>
                                    <div class="error text-danger" v-if="!$v.last_name.maxLength">
                                      นามสกุลคุณยาวเกินไป
                                      </div>
                                  </div>
                                </template>
                                <input type="email" class="form-control mt-3" id="" aria-describedby="emailHelp" placeholder="อีเมล" v-model="$v.email.$model" :class="{'is-danger' : $v.email.$error}">
                                <template v-if="$v.email.$error">
                                  <div>
                                    <div class="error text-danger" v-if="!$v.email.required">
                                      กรุณากรอกข้อมูล
                                    </div>
                                    <div class="error text-danger" v-if="!$v.email.email">
                                      อีเมลไม่ถูกต้อง
                                      </div>
                                  </div>
                                </template>
                                <input type="password" class="form-control mt-3" id="" placeholder="รหัสผ่าน" v-model="$v.password.$model" :class="{'is-danger' : $v.password.$error}">
                                <template v-if="$v.password.$error">
                                  <div class="error text-danger" v-if="!$v.password.required">
                                    กรุณากรอกข้อมูล
                                  </div>
                                  <div class="error text-danger" v-if="!$v.password.minLength">
                                    รหัสผ่านสั้นเกินไป
                                  </div>
                                  <div class="error text-danger" v-else-if="!$v.password.complex">
                                    รหัสผ่านของคุณอ่อนแอ (ควรมีอักษร A-Z , a-z , 0-9)
                                  </div>
                                </template>
                                <input type="password" class="form-control mt-3" id="" placeholder="ยืนยันรหัสผ่าน" v-model="$v.confirmpassword.$model" :class="{'is-danger' : $v.confirmpassword.$error}">
                                <template v-if="$v.confirmpassword.$error">
                                  <div class="error text-danger" v-if="!$v.confirmpassword.required">
                                    กรุณากรอกข้อมูล
                                  </div>
                                  <div class="error text-danger" v-if="!$v.confirmpassword.sameAs">
                                    รหัสผ่านยืนยันไม่ถูกต้อง
                                  </div>
                                </template>
                                <label for="" class="mt-3">ที่อยู่</label>
                                <textarea class="form-control " id="" rows="2" v-model="$v.address.$model" :class="{'is-danger' : $v.address.$error}"></textarea>
                                <template v-if="$v.address.$error">
                                  <div>
                                    <div class="error text-danger" v-if="!$v.address.required">
                                    กรุณากรอกข้อมูล
                                  </div>
                                  </div>
                                </template>
                                <input type="text" class="form-control mt-3" id="" placeholder="เบอร์โทรศัพท์" v-model="$v.mobile.$model" :class="{'is-danger' : $v.mobile.$error}">
                                <template v-if="$v.mobile.$error">
                                  <div>
                                    <div class="error text-danger" v-if="!$v.mobile.required">
                                    กรุณากรอกข้อมูล
                                    </div>
                                    <div class="error text-danger" v-else-if="!$v.mobile.mobile">
                                    เบอร์โทรศัพท์ไม่ถูกต้อง
                                    </div>
                                  </div>
                                </template>
                            </div>
                            
                           <hr class="my-0 pb-3">     
                        </form>
                        <button type="submit" class="btn btn-danger mx-auto"
                                style="display: block;" @click="submit()">สมัครสมาชิก</button>
                        <div class="text-center mt-3">
                            <h6>หากท่านเป็นสมาชิกอยู่แล้ว</h6>
                            <a href="#" class="text-danger" data-dismiss="modal"  data-toggle="modal" data-target="#modalLogin">กรุณาเข้าสู่ระบบ</a>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import config from '../../config';
import {required, email, minLength, sameAs, maxLength} from "vuelidate/lib/validators";
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
export default {
  props: ["user"],
  data() {
    return {
      backEndURL: config.backEndURL,
      emailLogin: '',
      passLogin: '',
      concerts: [],
      search: '',
      images: [],
      date: "",
      error: null,
      password: "",
      confirmpassword: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      address: "",
      role: "cus",
    };
  },
  mounted () {
    this.getConcert()
  },
  methods: {
    // buy(id){
    //   location.href = 'localhost:8080/buy/'+id
    // },
    login(){
      let data = {
         emailLogin: this.emailLogin,
         passLogin: this.passLogin
       }
       axios.post('/user/login', data)
         .then(res => {
           alert('login success')
           const token = res.data.token                                
           localStorage.setItem('token', token)
           this.$emit('auth-change')
           this.$router.push({path: '/'})
            location.reload()

         })
         .catch(error => {
           alert('Please login again')
           this.error = error.response.data
           alert(error.response.data)
         })
    },
    submit(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          address: this.address,
          password: this.password,
          confirmpassword: this.confirmpassword,
          email: this.email,
          mobile: this.mobile,
          first_name: this.first_name,
          last_name: this.last_name,
          role: this.role
        };
        axios
          .post("/signup", data)
          .then((response) => {
            console.log(response)
            alert("Sign up Success Please Login");
            location.reload()
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
    getConcert() {
      axios
        .get("/", {
          params: {
            search: this.search
          }
        })
        .then((response) => {
          this.concerts = response.data;
          console.log(this.concerts)

        })
        .catch((err) => {
          console.log(err);
        });
    },
    sortConcert(id){
        axios
        .get("/", {
          params: {
            sort: id
            
          }
        })
        .then((response) => {
          this.concerts = response.data;
          // console.log(id)

        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      console.log(file_path);
      return  file_path
      // return 'data:image/jpeg;base64,' + btoa(new Uint8Array(file_path).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      // console.log(file_path)
      // return new Promise((resolve) => {
      //   const reader = new FileReader();
      //   reader.onloadend = () => resolve(reader.result);
      //   reader.readAsDataURL(file_path)
      // })
      // if (file_path){
      //   return config.backEndURL + '/' + file_path
      // } 
      // else {
      //   return 'https://bulma.io/images/placeholders/640x360.png'
      // }
    },
    // shortContent(content) {
    //   if (content.length > 200) {
    //     return content.substring(0, 197) + '...'
    //   }
    //   return content
    // },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirmpassword: {
      required: required,
      sameAs: sameAs("password"),
    },
    mobile: {
      required,
      mobile: mobile,
    },
    address: {
      required: required,
    },
    first_name: {
      required: required,
      maxLength: maxLength(150),
    },
    last_name: {
      required: required,
      maxLength: maxLength(150),
    },
  },
};
</script>

<style scoped>
#search{
  width: 100%;
    padding: 21px 150px 21px 60px;
    font-size: 24px;
    letter-spacing: 0.51px;
    line-height: 29px;
    color: rgb(74, 74, 74);
    border: none;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
}
.card{
  box-shadow: 0 0 10px 0 #e1e1e1;
  border-radius: 5px;
}
.card:hover {
  box-shadow: 0 0 30px 0 #d5d5d5;
  border-radius: 5px;

}
.card-text{
  font-size: 12px;
  line-height: 13pt;
}
.card-title{
  height:40px; 
  font-size:14px; 
  font-weight: 600; 
  line-height: 13pt;
  overflow: hidden;
}
#card-img-top img{
  max-width: 100%;
  max-height: 100%;
  margin: auto auto;
  display: block;
  min-width: 100%;
  min-height: 100%;
}
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 80vh;
    overflow-y: auto;
    padding: 30px;
}
.close-but{
  position: absolute;
  top: 20px; 
  right: 4px; 
  width: 32px;  
  height: 32px;
}
.card:hover,.card-title:hover{
    /* background-color: #ffd0d0; */
    transition: .5s;
    color: red;
    cursor: pointer;
}
p{
  color: black;
}
a:link {
  text-decoration: none;
}
</style>