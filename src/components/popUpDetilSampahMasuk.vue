<template>
    <transition name="fade">
        <div
          v-if="showDetilSampahMasuk"
          class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center"
          style="background-color: rgba(0,0,0,0.2);">
            <transition name="bounce" appear>
                <div
                  class="w-full rounded-md bg-white shadow-2xl overflow-hidden">
                    <!-- header -->
                    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                        <p class="text-gray-600 capitalize text-md">
                            kategori {{ kategori }}
                        </p>
                    </div>
                    <!-- body -->
                    <div
                      class="text-gray-600 flex flex-col relative max-h-56 overflow-auto">
                        <table class="w-full relative z-20">
                            <thead>
                                <tr class="bg-white sticky top-0">
                                    <th class="p-3">#</th>
                                    <th>Jenis sampah</th>
                                    <th>Jumlah</th>
                                </tr>
                            </thead>
                            <tbody v-if="!loading">
                                <tr
                                  v-for="(x,i) in data.list" :key="x"
                                  class="text-center"
                                  :class="{'bg-gray-300': ++i%2 == 1}">
                                    <td class="py-3">{{ i }}</td>
                                    <td class="capitalize">{{ x.jenis }}</td>
                                    <td>{{ parseFloat(x.jumlah_kg).toFixed(2) }} kg</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex-1 flex justify-center items-center">
                            <div v-if="loading" class="py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="50" cy="50" fill="none" stroke="#84CC16" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                    </circle>
                                </svg>
                            </div>
                            <p v-if="notFound" class="py-8 text-gray-400 text-lg">
                              Data belum tersedia
                            </p>
                        </div>
                    </div>
                    <!-- footer -->
                    <div class="mt-5 p-3 flex justify-end">
                        <a
                          class="ml-2 px-4 py-2 bg-gray-400 active:bg-gray-500 text-gray-100 tracking-widest rounded-md"
                          href="" @click.prevent="close">
                            close
                        </a>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import axios                         from 'axios';
import { computed, defineComponent } from 'vue'
import { FontAwesomeIcon }           from '@fortawesome/vue-fontawesome'
import { faTimes }                   from '@fortawesome/free-solid-svg-icons'
import { ref, reactive, onMounted }  from "vue";
import { useStore }                  from "vuex"
import { useRouter }                 from 'vue-router';
import { TokenService }              from "@/services/token.service";

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        FontAwesomeIcon,
    },
    setup(){
        const store    = useStore();
        const router   = useRouter();
        const loading  = ref(false);
        const notFound = ref(false);
        const data     = reactive({
            list: []
        });

        const showDetilSampahMasuk = computed(() => {
            return store.state.dataDetilSampahMasuk.show;
        });

        const close = () => {
            store.commit('setDetilSampahMasuk',{
                show    : false,
                kategori: ''
            });
        }

        const getDetilSampahMasuk = (kategori) => {
            notFound.value= false
            loading.value = true;

            axios
              .get(`${store.state.APIURL}/transaksi/sampahmasuk?kategori=${kategori}`,{
                headers: {
                    token: TokenService.getToken()
                }
              })
              .then((response) => {
                data.list     = response.data.data;
                loading.value = false;
              })
              .catch((error) => {
                if (error.response.status == 401) {
                    if (error.response.data.messages == 'token expired') {
                        store.commit("setDataAlert",{
                            show   :true,
                            type   :'warning',
                            message:'waktu login sudah habis, silahkan login ulang'}
                        );
                    }

                    TokenService.removeToken();
                    router.push("/login");
                    close();
                }
                else if (error.response.status == 404) {
                    data.list     = [];
                    notFound.value= true
                    loading.value = false;
                }
              })
        }

        const kategori = computed(() => {
            const kategori = store.state.dataDetilSampahMasuk.kategori;

            if (kategori) {
                getDetilSampahMasuk(kategori);
            }

            return kategori;
        });

        return{
            faTimes,
            showDetilSampahMasuk,
            close,
            kategori,
            loading,
            notFound,
            data
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