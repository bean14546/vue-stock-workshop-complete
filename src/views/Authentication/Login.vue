<template>
  <div id="login">
     <v-container class="">
        <v-row class="justify-center">
          <!-- justify จัดแนวตามแกนปัจจุบัน หากปัจจุบันอยู่ในแกน row จะจัดตาม row คือ แนวนอน -->
          <v-card style="width:400px">
            <v-img class="white--text align-end" src="@/assets/login_header.jpg" height="200px">
            <!-- align จะจัดแนวตรงข้ามกับแกนปัจจุบัน หากปัจจุบันอยู่ในแกน row จะจัตรงข้าม row คือ แนวตั้ง -->
              <v-card-title>
                Login
              </v-card-title>
            </v-img>
              <v-card-text>
                <v-form @submit.prevent="submit">

                  <v-text-field
                    name="username"
                    label="Username"
                    id="username"
                    v-model="account.username"
                  /> 

                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="account.password"
                    :append-icon="isShowpassword ? 'visibility' : 'visibility_off'"
                    @click:append="togleIsShowpassword"
                    :type="isShowpassword ? 'text' : 'password'"
                  />
                  <!-- @click:append เป็นการ modifier ให้เราสามารถคลิกปุ่ม append-icon ได้ -->

                  <v-row class="justify-space-between px-3 py-3 pt-5" ><!-- px-3 หมายถึง Padding แกน x -->
                          <v-btn block type="submit" class="mb-4">Login</v-btn>
                          <v-btn block @click.prevent="switchToregister">Register</v-btn>
                          <!-- .prevent คือ object ที่ช่วยป้องกันพฤติกรรมที่เป็น defalse ของระบบ เช่น เมื่อกดแล้วจะป้องกันการรีเฟรชหน้าจอ -->
                  </v-row>

                </v-form>
              </v-card-text>
          </v-card>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import api from "@/services/api"
export default {
  name: "Login",
  data(){
    return{
      isShowpassword:false,
      account:{
        username:"",
        password:""
      }
    }
  },
  mounted() {
    if(api.isLoggedIn()){
      this.$router.push("/stock")
    }
  },
  methods:{
    togleIsShowpassword(){
      this.isShowpassword = !this.isShowpassword
    },
    switchToregister(){
      this.$router.push('/register')
    },
    submit(){
      const submit = {
        username:this.account.username,
        password:this.account.password
      }
      this.$store.dispatch("doLogin",submit)
    }
  }
};
</script>

<style>
</style>