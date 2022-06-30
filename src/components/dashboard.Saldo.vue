<template>
  <transition name="fade">
    <div
      v-if="currentTab == 'saldo saya'"
      class="tabcontent text-white pb-12">

        <pop-up-detil-sampah-masuk />

        <!-- ID Card -->
        <div id="idcard-container" class="px-6 relative" :class="{'animate-pulse':!username}">
            <div 
              id="idcard-skeleton" 
              class="absolute z-10 top-0 bottom-0 right-6 left-6 bg-lime-600 rounded-md"
              :class="{'hidden':username}"></div>
            <div
              id="idcard" 
              class="rounded-xl relative">
                <div id="bg-idcard" class="p-4 xs:p-8 rounded-xl" style="background: rgba(101, 163, 13, 0);">
                  <div class="flex justify-between">
                    <font-awesome-icon
                    :icon="faWifi" size="1x"
                    class=""/>

                    <img src="@/assets/images/banksampah-logo.webp" alt="" class="loginLogo w-10 opacity-80">
                  </div>

                  <p class="mt-4 text-lg xs:text-2xl" v-html="idNasabah"></p>

                  <div class="flex mt-8">
                    <div class="mr-6">
                      <p class="text-xs xs:text-lg tracking-widest opacity-80">Username</p>
                      <p class="text-lg xs:text-2xl mt-2">
                        {{ username }}
                      </p>
                    </div>
                    <div>
                      <p class="text-xs xs:text-lg tracking-widest opacity-80">Tgl Bergabung</p>
                      <p class="text-lg xs:text-2xl mt-2">
                        {{ bergabung }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- shadow -->
                <div class="absolute left-3 right-3 h-2.5 bg-greenbsbl-young2 rounded-b-lg">
                </div>
                <div class="absolute left-6 right-6 -bottom-5 h-2.5 bg-greenbsbl-young3 rounded-b-lg">
                </div>
            </div>
        </div>

        <!-- Saldo -->
        <div id="saldo-container" class="flex px-6 mt-11">
          <div
            class="flex-1 mr-1 bg-white flex items-center rounded-md py-4 px-5 overflow-hidden relative shadow-xl"
            :class="{'animate-pulse':saldoUang == ''}">
              <div 
                class="absolute z-10 top-0 bottom-0 right-0 left-0 bg-lime-600 rounded-md"
                :class="{'hidden':saldoUang != ''}"></div>
              <div class="w-max rounded-md p-5 bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young">
                <font-awesome-icon
                  :icon="faMoneyBillWaveAlt" size="1x"
                  class="text-white text-xl xs:text-3xl"/>
              </div>
              <p class="flex-1 text-center text-gray-600 text-xl xs:text-3xl">
                Rp {{ saldoUang }}
              </p>
          </div>
        </div>

        <!-- Sampah masuk -->
        <div
          v-if="!sampahMasuk"
          id="sampahMasukSkeleton"
          class="grid grid-cols-4 gap-2 place-content-center px-6 mt-6 text-white animate-pulse">
            <div
              v-for="data in [1,2,3,4]" :key="data"
              class="text-center rounded-lg h-28 bg-lime-600">
            </div>
        </div>
        <div
          v-if="sampahMasuk"
          class="grid grid-cols-4 gap-2 place-content-center px-6 mt-6 text-white">
            <div
              v-for="x in arrayCard" :key="x"
              @click="detilSampahMasuk(sampahMasuk[x.name].kategori);"
              class="text-center rounded-lg py-1.5 sm320:py-3 bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young transition transform active:scale-95 shadow-lg">
                <div class="px-5">
                  <font-awesome-icon
                    :icon="x.icon" size="1x"
                    class="text-lg xxs:text-xl xs:text-3xl"/>
                </div>
                <p class="mt-2 text-xxs xs:text-lg">
                  {{ sampahMasuk[x.name].kategori }}
                </p>
                <p class="mt-2 border-b border-white opacity-40"></p>
                <p class="mt-2 text-xxs xs:text-lg">{{ sampahMasuk[x.name].total }} kg</p>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, computed }   from 'vue';
import { useStore }          from 'vuex';
import PopUpDetilSampahMasuk from '@/components/popUpDetilSampahMasuk.vue';
import { FontAwesomeIcon }   from '@fortawesome/vue-fontawesome'
import { faWifi,faCoins,faMoneyBillWaveAlt,faScroll,faTrophy,faWineBottle,faRecycle } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  components: {
    FontAwesomeIcon,
    PopUpDetilSampahMasuk
  },
  setup() {
    const store = useStore();
    const arrayCard = ref([
      {name: 'kertas',    icon: faScroll},
      {name: 'plastik',   icon: faTrophy},
      {name: 'logam',     icon: faWineBottle},
      {name: 'lain-lain', icon: faRecycle}
    ]);

    const currentTab  = computed(() => {
      return store.state.currentDashboardTab;
    });

    // -- Username --
    const username = computed(() => {
      return store.state.dataNasabah.username;
    });

    // -- ID Nasabah --
    const idNasabah = computed(() => {
      const id = (store.state.dataNasabah.id) ? store.state.dataNasabah.id : "";
      
      return `${id.slice(0, 5)}&nbsp;&nbsp;&nbsp;${id.slice(5, 9)}&nbsp;&nbsp;&nbsp;${id.slice(9,99999999)}`;
    });

    // -- Tanggal bergabung --
    const bergabung = computed(() => {
      const createdAt = (store.state.dataNasabah.created_at)?store.state.dataNasabah.created_at:0;
      const date      = new Date(parseInt(createdAt) * 1000);
      
      return `${date.toLocaleString("en-US",{day: "numeric"})}/${date.toLocaleString("en-US",{month: "numeric"})}/${date.toLocaleString("en-US",{year: "numeric"})}`
    });

    // -- Saldo Uang -- 
    const saldoUang = computed(() => {
      const uang = (store.state.dataSaldo.uang) ? store.state.dataSaldo.uang : ""; 
      return uang.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });

    // -- Saldo Emas -- 
    const saldoEmas = computed(() => {
      return store.state.dataSaldo.emas;
    });

    // -- Sampah masuk --
    const sampahMasuk = computed(() => {
      return store.state.dataSampahMasuk;
    });

    // -- Open modal detil --
    const detilSampahMasuk = (kategori) => {
      store.commit('setDetilSampahMasuk',{
          show    : true,
          kategori: kategori
      });
    }

    return {
      faWifi,
      faCoins,
      faMoneyBillWaveAlt,
      faScroll,
      faTrophy,
      faWineBottle,
      faRecycle,
      currentTab,
      username,
      idNasabah,
      bergabung,
      saldoUang,
      saldoEmas,
      arrayCard,
      sampahMasuk,
      detilSampahMasuk
    }
  },
});
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

  #idcard{
    background: url('../assets/images/Card-Member.webp') no-repeat center center;
  }
</style>