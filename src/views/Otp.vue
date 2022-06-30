<template>
    <ion-page>
        <ion-content>
            <div class="flex h-full bg-gradient-to-r from-lime-600 to-lime-400 px-5">
                <div class="m-auto text-center">
                    <h3 class="text-center text-white text-2xl sm360:text-3xl mb-3" style="font-family:QuicksandSemiBold;">VERIFIKASI AKUN</h3>
                    <p class="text-center text-white mb-10 text-xs sm360:text-lg">masukan kode OTP yang anda terima <br> dari email</p>
                    <form
                      class="text-center px-10 mb-10"
                      @submit.prevent="sendOtp">
                        <input class="text-center text-gray-600 text-xl sm360:text-3xl tracking-widest border-solid border-b-4 focus:outline-none border-lime-400 bg-transparent py-2 w-3/4 sm360:w-44 placeholder-gray-300" type="text" name="otp" placeholder="your OTP" autocomplete="off" v-model="otpVal"
                        @input="sendOtp"/>
                    </form>
                    <p class="text-white text-xs sm360:text-md opacity-90">Belum menerima kode OTP?</p>
                    <a :href="linkAdmin" class="text-center text-white mb-8 text-xs sm360:text-md underline underline-offset-8 opacity-90">Hubungi Admin</a>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, loadingController }  from '@ionic/vue';
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import axios                         from 'axios';
import { defineComponent }           from 'vue'
import { useRouter }                 from 'vue-router';
import { useStore }                  from "vuex"
import { TokenService }              from '@/services/token.service';

export default defineComponent({
    components: {
        IonPage,
        IonContent,
    },
    setup(){
        const router = useRouter();
        const store  = useStore();
        const otpVal = ref("");
        const username_or_email = ref("");
        const password = ref("");
        const linkAdmin= ref("");

        onBeforeMount(() => {
            if (store.state.dataLogin.username_or_email == '' || store.state.dataLogin.password == '') {
                return router.push('/login');
            }
        });

        onMounted(() => {
            username_or_email.value = store.state.dataLogin.username_or_email;
            password.value = store.state.dataLogin.password;
            linkAdmin.value= store.state.linkAdmin;
        });

        // -- loading spinner --
        const createSpinner = (msg = '') => {
            return loadingController
            .create({
                spinner: "crescent",
                message: msg,
                translucent: true,
                cssClass: 'rounded-xl',
                backdropDismiss: false
            });
        }

        // -- send OTP
        const sendOtp = async () => {
            const loading = await createSpinner();

            if (otpVal.value.length < 6) {
                return 0;
            } 
            else {
                loading.present();
                const formOtp   = new FormData();
                const formLogin = new FormData();

                formOtp.set('code_otp',otpVal.value);
                formLogin.set('username_or_email',username_or_email.value);
                formLogin.set('password',password.value);

                axios
                    .post(`${store.state.APIURL}/otp/verify`, formOtp)
                    .then((response) => {
                        loading.dismiss();
                        otpVal.value = '';

                        store.commit('setDataAlert',{show:true,type:'success',message:`<b>berhasil!</b> akun anda sudah aktif`});
                        store.commit('setDataLogin',{username_or_email:'',password:''});

                        setTimeout(() => {
                            store.commit('setDataAlert',{show:false,type:'',message:``});

                            setTimeout( async () => {
                                const loading = await createSpinner('Log In');
                                loading.present();
    
                                axios
                                  .post(`${store.state.APIURL}/login/nasabah`, formLogin)
                                  .then((response) => {
                                    loading.dismiss();
                                    TokenService.saveToken(response.data.token);
                                    router.push("/tabs/dashboard");
                                  })
                                  .catch((error) => {
                                    loading.dismiss();
                                    router.push("/login");
                                  })
                                
                            }, 500);
                        }, 3000);
                    })
                    .catch((error) => {
                        loading.dismiss();
                        otpVal.value = '';

                        // OTP not found
                        if (error.response.status == 404) {
                            store.commit('setDataAlert',{show:true,type:'warning',message:`<b>Ups...</b> kode OTP tidak valid`});

                            setTimeout(() => {
                                store.commit('setDataAlert',{show:false,type:'',message:``});
                            }, 5000);
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
        }

        return{
            router,
            store,
            otpVal,
            sendOtp,
            linkAdmin
        }
    }
})
</script>

<style scoped>
    
</style>