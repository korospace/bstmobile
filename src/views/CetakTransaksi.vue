<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- back -->
      <div
        id="container"
        class="min-h-full flex flex-col">
          <header-back path="/dashboard" />

          <!-- Loading -->
          <div 
            v-if="detilTransaksi == ''"
            class="bg-white flex-1 flex justify-center items-center">
              <span>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                      <circle cx="50" cy="50" fill="none" stroke="#84CC16" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                      </circle>
                  </svg>
              </span>
          </div>

          <div v-if="detilTransaksi !==''">
            <!-- header -->
            <div class="flex justify-between items-center px-4 py-5">
              <img src="@/assets/images/banksampah-logo.webp" alt="" class="loginLogo w-16">

              <p
                class="ml-2 text-xl text-gray-700"
                style="font-family:QuicksandSemiBold;">
                Bukti Transaksi
              </p>
            </div>

            <hr class="my-1 opacity-60" style="background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,0))">

            <!-- Keterangan -->
            <div class="p-4 text-gray-600 text-sm">
              <table>
                <tr>
                  <td class="py-1.5">TANGGAL</td>
                  <td v-html="':&nbsp;&nbsp;&nbsp;'+modifTanggal(detilTransaksi.date)"></td>
                </tr>
                <tr>
                  <td class="py-1.5 relative">
                    <span class="absolute top-0.5 left-0">NAMA</span>
                  </td>
                  <td class="uppercase flex">
                    <div class="pr-3">:</div>
                    {{ detilTransaksi.nama_lengkap }}
                  </td>
                </tr>
                <tr>
                  <td class="py-1.5">ID.NASABAH</td>
                  <td>:&nbsp;&nbsp; {{ detilTransaksi.id_user }}</td>
                </tr>
                <tr>
                  <td class="py-1.5">ID.TRANSAKSI&nbsp;&nbsp;&nbsp;</td>
                  <td>:&nbsp;&nbsp; {{ detilTransaksi.id_transaksi }}</td>
                </tr>
              </table>
            </div>

            <hr class="my-1 opacity-60" style="background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,0))">

            <!-- Type -->
            <p class="px-4 py-3 tracking-wide text-md italic text-gray-800 underline underline-offset-8">
              {{ detilTransaksi.jenis_transaksi }}
            </p>

            <!-- Main Content -->
            <div class="px-4 pb-4">
              <div
                v-if="detilTransaksi.jenis_transaksi == 'penyetoran sampah'"
                class="rounded-lg text-gray-600 border-2 border-gray-200 overflow-hidden"
                style="font-family:QuicksandSemiBold;">
                  <table class="w-full relative z-20">
                      <thead>
                          <tr class="bg-white sticky top-0">
                              <th class="p-3">#</th>
                              <th>Jenis sampah</th>
                              <th>Jumlah <small>(Kg)</small></th>
                              <th>Harga <small>(Rp)</small></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr
                            v-for="(x,i) in detilTransaksi.barang" :key="x"
                            class="text-center"
                            :class="{'bg-gray-300': ++i%2 == 1}">
                              <td class="py-3">{{ i }}</td>
                              <td class="capitalize">{{ x.jenis }}</td>
                              <td>{{ parseFloat(x.jumlah_kg).toFixed(2) }}</td>
                              <td class="text-right pr-3">{{ modifUang(x.jumlah_rp) }}</td>
                          </tr>
                          <tr class="border-t-2 border-gray-200">
                              <th class="text-center py-3" colspan='3'>Total</th>
                              <td class="text-right pr-3">
                                {{totalUang(detilTransaksi.barang)}}
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div
                v-if="detilTransaksi.jenis_transaksi == 'konversi saldo'"
                class="rounded-lg bg-gray-400 text-gray-600 p-4"
                style="font-family:QuicksandSemiBold;">
                  <table>
                    <tr>
                      <td class="py-1.5">Jumlah</td>
                      <td>:&nbsp;&nbsp; Rp. {{ modifUang(detilTransaksi.jumlah) }}</td>
                    </tr>
                    <tr>
                      <td class="py-1.5">Harga emas</td>
                      <td>:&nbsp;&nbsp; Rp. {{ modifUang(detilTransaksi.harga_emas) }}</td>
                    </tr>
                    <tr>
                      <td class="py-1.5">Hasil konversi&nbsp;&nbsp;</td>
                      <td>:&nbsp;&nbsp; {{ detilTransaksi.hasil_konversi }} g</td>
                    </tr>
                  </table>
              </div>
              <div
                v-if="detilTransaksi.jenis_transaksi == 'penarikan saldo'"
                class="rounded-lg bg-gray-400 text-lg text-gray-600 p-4"
                style="font-family:QuicksandSemiBold;">
                  <table>
                    <tr>
                      <td class="py-1">Jenis saldo&nbsp;&nbsp;</td>
                      <td>:&nbsp;&nbsp; {{ detilTransaksi.jenis_saldo }}</td>
                    </tr>
                    <tr>
                      <td class="py-1">Jumlah</td>
                      <td v-if="detilTransaksi.jenis_saldo == 'uang'">
                        :&nbsp;&nbsp; Rp. {{ modifUang(detilTransaksi.jumlah_tarik) }}</td>
                      <td v-else>
                        :&nbsp;&nbsp; {{ detilTransaksi.jumlah_tarik }} g</td>
                    </tr>
                  </table>
              </div>
            </div>

          </div>

          <div class="px-4 pb-4">
            <a :href="baseApi+'/transaksi/cetaktransaksi/'+detilTransaksi.id_transaksi+'?token='+TokenService.getToken()" target="_blank" class="block text-center w-full bg-gradient-to-r from-greenbsbl-old to-greenbsbl-young active:from-greenbsbl-old2 active:to-greenbsbl-young text-white mt-4 py-3 rounded">
              CETAK
            </a>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonPage,IonContent,onIonViewWillEnter} from '@ionic/vue';
  import { ref, computed, defineComponent } from 'vue';
  import { TokenService } from '@/services/token.service';
  import { useRouter } from 'vue-router';
  import { useStore }  from 'vuex'
  import axios         from 'axios';
  import HeaderBack    from '@/components/headerBack.vue'

  export default defineComponent({
    components: {
      IonContent,
      IonPage,
      HeaderBack,
    },
    setup() {
      const router = useRouter();
      const store  = useStore();
      const detilTransaksi = ref("");

      const modifTanggal = (val) => {
        const date  = new Date(parseInt(val) * 1000);
        const day   = date.toLocaleString("en-US",{day: "numeric"});
        const month = date.toLocaleString("en-US",{month: "numeric"});
        const year  = date.toLocaleString("en-US",{year: "numeric"});
        const time  = date.toLocaleString("en-US",{hour: '2-digit', minute: '2-digit',second: '2-digit'});

        return `${day}/${month}/${year}&nbsp;&nbsp;&nbsp;${time}`;
      }

      const modifUang = (value) => {
        const newVal = parseFloat(value);
        return newVal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      };

      const totalUang = (value) => {
        let total = 0;

        value.forEach(e => {
          total = total + parseInt(e.jumlah_rp);
        });

        return modifUang(total);
      };

      const baseApi = computed(() => {
        return store.state.APIURL;
      })

      onIonViewWillEnter(() => {
        detilTransaksi.value = "";
        const id = router.currentRoute.value.query.id;

        axios.get(`${store.state.APIURL}/transaksi/getdata?id_transaksi=${id}`,{
          headers: {
              token: TokenService.getToken()
            }
        })
        .then(response => {
          detilTransaksi.value = response.data.data;
        })
        .catch(error => {
          // Unauthorize
          if (error.response.status == 401) {
            if (error.response.data.messages == 'token expired') {
              store.commit("setDataAlert",{
                show   :true,
                type   :'warning',
                message:'waktu login sudah habis, silahkan login ulang'}
              );
            }

            store.commit("setDataNasabah","");
            store.commit("setDataArticles","");
            TokenService.removeToken();
            router.push("/login");
          }
          else if(error.response.status == 404) {
            store.commit("setDataAlert",{
                show   :true,
                type   :'warning',
                message:'<b>Ups...</b> transaksi tidak ditemukan!'}
            );

            detilTransaksi.value = "not found";
          }
        });
      })

      return { 
        TokenService,
        detilTransaksi,
        modifTanggal,
        modifUang,
        totalUang,
        baseApi
      }
    }
  });
</script>

<style scoped>
  
</style>