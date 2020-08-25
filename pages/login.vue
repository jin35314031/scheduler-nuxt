<template>
  <div class="background">
  <el-card class="box-card login">
    <div>
      <span style="margin-bottom:20px">Login</span>
    </div>
    <hr>
    <el-form ref="form" :model="form" label-width="120px" style="margin-top:20px">
      <el-form-item label="loginID">
        <el-input v-model="form.loginId"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-button class="button" type="primary" v-on:click="login()">Login</el-button>
    </el-form>
  </el-card>
  </div>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      if(store.$auth.loggedIn) {
        redirect('/top');
      }
    },
    data() {
      return {
        form: {
          loginId: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        try {
          await this.$auth.loginWith('local', { data: this.form });

        } catch(error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style>
  .box-card {
    width: 480px;
  }

  .login {
    position: relative;
    top: 100px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    margin: auto;
  }

  .button{
    float:right;
    margin-bottom: 20px;
  }
  .background{
    background-image:url("https://cdn.pixabay.com/photo/2019/01/02/19/29/background-3909536_1280.jpg");
    height:1000px;
    background-size:cover ;
  }

</style>
