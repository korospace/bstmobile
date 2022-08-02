<template>
    <transition name="fade">
        <div
          v-if="showForgotPass"
          class="absolute z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center"
          style="background-color: rgba(0,0,0,0.2);">
            <transition name="bounce" appear>
                <form
                  @submit.prevent="sendPassword"
                  class="w-full rounded-md bg-white shadow-2xl">
                    <!-- body -->
                    <div class="px-4">
                        <h1 class="text-center opacity-70 text-lg sm360:text-xl pt-8 text-gray-900" style="font-family:QuicksandSemiBold;">
                            LUPA PASSWORD?
                        </h1>
                        <p class="mt-2.5 text-xs sm360:text-sm text-center text-gray-600">
                            Masukan email yang terdaftar. Password akan dikirim ke email anda
                        </p>

                        <input type="text" name="email" v-model="emailVal" class="mt-10 w-full rounded text-lime-500 border border-lime-400 p-2 bg-white focus:outline-none focus:border-lime-500" autocomplete="off">

                        <div class="flex justify-center mt-5">
                            <button class="px-4 py-2 bg-gradient-to-r from-lime-600 to-lime-400 active:from-lime-500 active:to-lime-400 text-white tracking-widest rounded-md">
                                <span v-if="!loadingSendPass">submit</span>
                                <svg v-if="loadingSendPass" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="18px" height="18px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                    </circle>
                                </svg>
                            </button>
                            <a
                            class="ml-2 px-4 py-2 bg-gray-400 active:bg-gray-500 text-gray-100 tracking-widest rounded-md"
                            href="" @click.prevent="closeForgotPass">
                                close
                            </a>
                        </div>
                    </div>
                    <!-- footer -->
                    <div class="mt-5 py-5 border-t border-gray-300 text-center">
                        <a :href="linkAdmin" class="text-sm text-lime-500 underline underline-offset-8">
                            hubungi admin
                        </a>
                    </div>
                </form>
            </transition>
        </div>
    </transition>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import axios                         from 'axios';
import { computed, defineComponent } from 'vue'
import { FontAwesomeIcon }           from '@fortawesome/vue-fontawesome'
import { faSearch }                  from '@fortawesome/free-solid-svg-icons'
import { ref, onMounted }            from "vue";
import { useStore }                  from "vuex"

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        FontAwesomeIcon,
    },
    setup(){
        const store     = useStore();
        const linkAdmin = ref("");
        const emailVal  = ref("");
        const loadingSendPass = ref(false);

        onMounted(() => {
            linkAdmin.value = store.state.linkAdmin;
        });

        const showForgotPass = computed(() => {
            return store.state.showForgotPass;
        });

        const closeForgotPass = () => {
            store.commit('setShowForgotPass',false);
        }

        const sendPassword = (event) => {
            const formForgotPass = new FormData(event.target);

            if (formForgotPass.get('email') == '') {
                return 0;
            }

            loadingSendPass.value = true;
            
            axios
            .post(`${store.state.APIURL}/login/forgotpass`,formForgotPass)
            .then(() => {
                emailVal.value        = ""
                loadingSendPass.value = false;

                store.commit('setDataAlert',{show:true,type:'success',message:`<b>Berhasil!</b> silahkan check email anda`});
                closeForgotPass();

                setTimeout(() => {
                    store.commit('setDataAlert',{show:false,type:'',message:``});
                }, 5000);
            })
            .catch(error => {
                emailVal.value        = ""
                loadingSendPass.value = false;

                if (error.response.status == 404) {
                    store.commit('setDataAlert',{show:true,type:'warning',message:`<b>Ups...</b> email tidak terdaftar`});
                }
                else if (error.response.status == 500) {
                    store.commit('setDataAlert',{show:true,type:'danger',message:`<b>terjadi kesalahan.</b> silahkan coba lagi`});
                }
                
                setTimeout(() => {
                    store.commit('setDataAlert',{show:false,type:'',message:``});
                }, 3000);
            })
        }

        return{
            linkAdmin,
            showForgotPass,
            closeForgotPass,
            loadingSendPass,
            emailVal,
            sendPassword
        }
    }
})
</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .bounce-enter-active{
        animation: bounce-inA .2s;
    }
    .bounce-leave-active{
        animation: bounce-inA .1s reverse;
    }
    @keyframes bounce-inA {
        0% {
            transform: scale(0.6);
        }
        50% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(1);
        }
    }
</style>