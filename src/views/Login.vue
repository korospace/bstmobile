<template>
  <ion-page>
    <form @submit.prevent="doLogin">
        <ion-card class="center w-11/12">
          <ion-card-header>
              <center>
                <img src="../assets/images/banksampah-logo.webp" alt="" class="loginLogo w-28">
              </center>
          </ion-card-header>
          
          <ion-item class="mt-2">
              <ion-label position="floating">Username or Email</ion-label>
              <ion-input type="text" name="username_or_email" v-model="usernameOrEmail" autocomplete="off"></ion-input>
          </ion-item>
          <small v-if="usernameOrEmailWrong" class="mt-1 tracking-wide text-red-500">
            Username/email tidak terdaftar
          </small>

          <ion-item class="mt-4">
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" name="password" v-model="password" autocomplete="off"></ion-input>
          </ion-item>
          <small v-if="passwordWrong" class="mt-1 tracking-wide text-red-500">
            Password salah
          </small>

          <button class="w-full mt-8 py-3 text-center text-white text-xl tracking-widest bg-gradient-to-r from-greenbsbl-old to-greenbsbl-young active:from-greenbsbl-old2 active:to-greenbsbl-young rounded-md">
            LOGIN
          </button>
          
          <center class="mt-8 pb-8">
            <span class="text-md xs:text-xl">belum punya akun? </span>
            <router-link to="/register" class="text-md xs:text-xl text-lime-600 active:text-lime-600">
              daftar disini
            </router-link>
            <p
             @click="showPopupForgotPass"
             class="mt-2 text-sm xs:text-lg max-w-max underline underline-offset-8 opacity-80">
              lupa password
            </p>
          </center>
        </ion-card>
    </form>

    <pop-up-forgot-pass />
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonCard, IonLabel, IonInput, IonItem, IonCardHeader, loadingController } from '@ionic/vue';
import axios               from 'axios';
import { defineComponent } from 'vue'
import { ref,reactive }    from "vue";
import { useRouter }       from 'vue-router';
import { useStore }        from "vuex"
import { TokenService }    from '@/services/token.service';
import PopUpForgotPass     from "@/components/popUpForgotPass.vue";

export default defineComponent({
  components: { IonPage, IonButton, IonCard, IonCardHeader, IonLabel, IonInput, IonItem, PopUpForgotPass },
  setup() {
    const router = useRouter();
    const store  = useStore();
    const usernameOrEmail = ref("");
    const password = ref("");
    const usernameOrEmailWrong = ref(false);
    const passwordWrong = ref(false);

    // -- loading spinner --
    const createSpinner = () => {
      return loadingController
        .create({
          spinner: "crescent",
          message: '',
          translucent: true,
          cssClass: 'rounded-xl',
          backdropDismiss: false
        });
    }

    const doLogin = async (event) => {
      const loading   = await createSpinner();
      const formLogin = new FormData(event.target); 

      usernameOrEmailWrong.value = false;
      passwordWrong.value = false;
            
      if (formLogin.get('username_or_email') == "" || formLogin.get('password') == "") {
        return 0;
      }

      store.commit("setShowLoading",{show:true,text:"Login"});

      axios
        .post(`${store.state.APIURL}/login/nasabah`, formLogin)
        .then((response) => {
          password.value = "";
          usernameOrEmail.value = "";
          TokenService.saveToken(response.data.token);
          store.commit('setDataAlert',{show:false,type:'',message:``});

          store.commit("setShowLoading",{show:false,text:""});
          router.push("/dashboard");
        })
        .catch((error) => {
          store.commit("setShowLoading",{show:false,text:""});

          // bad request
          if (error.response.status == 404) {
              if (error.response.data.messages.username_or_email) {
                  usernameOrEmailWrong.value = true;
              }
              if (error.response.data.messages.password) {
                  passwordWrong.value = true;
              }
          }
          // akun not verift
          else if (error.response.status == 401) {
              if (error.response.data.messages == 'account is not verify') {
                store.commit('setDataAlert',{show:true,type:'warning',message:`<b>Ups...</b> akun anda belum terveirifikasi`});
                store.commit('setDataLogin',{username_or_email:formLogin.get('username_or_email'),password:formLogin.get('password')});

                setTimeout(() => {
                    store.commit('setDataAlert',{show:false,type:'',message:``});
                    
                    setTimeout(() => {
                        router.push('/otp');
                    }, 500);
                }, 3000);
              }
          }
          // error server
          else if (error.response.status == 500) {
              store.commit('setDataAlert',{show:true,type:'danger',message:`<b>terjadi kesalahan.</b> silahkan coba lagi`});

              setTimeout(() => {
                  store.commit('setDataAlert',{show:false,type:'',message:``});
              }, 5000);
          }
        })
    }

    // -- Forgot Password --
    const showPopupForgotPass = () => {
      store.commit('setShowForgotPass',true);
    }

    return {
      usernameOrEmail,
      password,
      usernameOrEmailWrong,
      passwordWrong,
      doLogin,
      showPopupForgotPass,
    };
  },
})
</script>
<style scoped>
  .ion-page {
    background: url('../assets/images/Login.webp') no-repeat center center fixed !important;
    background-size: cover !important;
  }
  .center {
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 14px;
  }

  ion-item{
    --border-color: #C1D966;
  }
  ion-label{
    --color: rgba(62, 67, 75, 0.6) !important;
  }
</style>