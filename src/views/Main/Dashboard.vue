<template>
  <ion-page>    
    <ion-content :fullscreen="true">
      <div
        id="container"
        class="min-h-full flex flex-col bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young">
          
          <!-- // header // -->
          <div class="px-4 py-6 rounded-b-3xl relative">
            
            <!-- Icon -->
            <div class="flex items-center">
              <div class="bg-gray-400 rounded-full w-max shadow-xl overflow-hidden">
                <img src="@/assets/images/Person-Logo.webp" alt="" class="loginLogo w-14 xs:w-20">
              </div>
              <p
                class="flex-1 capitalize text-white ml-4"
                :class="{'opacity-0': !dataNasabah.username}"
                style="font-family:QuicksandSemiBold;">
                  <span
                    class="text-sm xs:text-lg">
                      Hi, {{ dataNasabah.username }}
                  </span> 
                  <br>
                  <span class="text-lg xs:text-2xl">
                    Selamat datang !
                  </span>
              </p>
            </div>

          </div>

          <div 
            class="pt-6 bg-gray-100 rounded-t-3xl flex-1 flex flex-col" 
            style="box-shadow: 0px -2px 10px rgba(0,0,0,0.2);">
              <!-- Toggle Switch -->
              <div class="px-6 mb-12">
                <div
                  id="toggle-wraper"
                  class="w-full bg-gray-100 flex rounded-3xl relative px-1"
                  style="box-shadow: inset 0 0 4px 0px rgba(0, 0, 0, 0.3);">
                    <button
                      id="toggle"
                      class="absolute left-0 transform h-full w-1/2 text-white capitalize tracking-widest bg-greenbsbl-old2 transition duration-200 rounded-3xl"
                      :class="{'translate-x-full':currentTab == 'transaksi'}">
                        {{ currentTab }}
                    </button>
                    
                    <button
                      class="flex-1 py-3.5 text-gray-500 capitalize text-center outline-none"
                      @click="switchTab('saldo saya')">
                        saldo saya
                    </button>
                    <button
                      class="flex-1 py-3.5 text-gray-500 capitalize text-center outline-none"
                      @click="switchTab('transaksi')">
                        transaksi
                    </button>
                </div>
              </div>
            
              <saldo />
              <transaksi />
          </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, onIonViewWillEnter} from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex'
import Saldo        from '@/components/dashboard.Saldo.vue'
import Transaksi    from '@/components/dashboard.Transaksi.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    IonPage,
    IonContent,
    Saldo,
    Transaksi
  },
  setup() {
    const store = useStore();
    
    const currentTab = computed(() => {
      return store.state.currentDashboardTab;
    });

    const switchTab  = (text) => {
      store.commit('setDashboardTab',text);
    }

    const dataNasabah = computed(() => {
      return store.state.dataNasabah;
    });

    const setCurrentDate = () => {
      const currentUnixTime = new Date(new Date().getTime());
      const currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
      const currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
      const currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

      const previousUnixTime = new Date(currentUnixTime.getTime()-(86400*30*1000));
      const previousDay   = previousUnixTime.toLocaleString("en-US",{day: "2-digit"});
      const previousMonth = previousUnixTime.toLocaleString("en-US",{month: "2-digit"});
      const previousYear  = previousUnixTime.toLocaleString("en-US",{year: "numeric"});

      const start = `${previousDay}-${previousMonth}-${previousYear}`;
      const end   = `${currentDay}-${currentMonth}-${currentYear}`;

      store.commit("setHistoryTransDate",{
        start,
        end
      });
    }

    onIonViewWillEnter(() => {
      if (!dataNasabah.value) {
        // Tab saldo
        store.commit("setDataNasabah","");
        store.dispatch("getProfileNasabah");
        store.commit("setDataSaldo","");
        store.dispatch("getSaldo");
        store.commit("setDataSampahMasuk","");
        store.dispatch("getSampahMasuk");
        // Tab transaksi
        store.commit("setDataGrafikSetor","");
        store.dispatch("getDataGrafikSetor");
        setCurrentDate();
        store.commit("setDataHistoryTrans","");
        store.dispatch("getHistoryTrans");
      }
    })

    return { 
      currentTab,
      switchTab,
      dataNasabah, 
    };
  },
});
</script>

<style>
  
</style>