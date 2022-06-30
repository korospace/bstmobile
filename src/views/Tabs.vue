<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <!-- // Refresher // -->
        <ion-refresher
          slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" 
          @ionRefresh="doRefresh">
            <ion-refresher-content>
              
            </ion-refresher-content>
        </ion-refresher>

        <ion-router-outlet></ion-router-outlet>

        <!-- // Tabs // -->
        <ion-tab-bar class="xs:py-2" style="box-shadow: 0px -2px 6px rgba(0,0,0,0.1);">  
          <ion-tab-button tab="tab1" href="/info">
            <font-awesome-icon class="opacity-70 text-xl xs:text-3xl" :icon="faInfoCircle" size="2x"/>
            <span class="mt-0.5 text-xs xs:text-sm">info</span>
          </ion-tab-button>

          <div class="h-full flex justify-center items-end xs:mx-8 pb-2 xs:pb-0.5 relative">
            <ion-tab-button
              tab="tab2" 
              href="/dashboard"
              class="home px-3 h-12 xs:h-16 rounded-2xl absolute -top-6 xs:-top-10"
              style="box-shadow: 0px 0px 6px rgba(0,0,0,0.2);">
                <font-awesome-icon class="text-xl xs:text-3xl" :icon="faHome" size="2x"/>
            </ion-tab-button>
            <span class="text-xs xs:text-sm">home</span>
          </div>
          
          <ion-tab-button tab="tab3" href="/profile">
            <font-awesome-icon class="opacity-70 text-xl xs:text-3xl" :icon="faUser" size="2x"/>
            <span class="mt-0.5 text-xs xs:text-sm">profile</span>
          </ion-tab-button>
        </ion-tab-bar>
        
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore }        from 'vuex'
import { useRouter }       from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faInfoCircle, faUser, } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  name: 'Tabs',
  components: { 
    IonLabel, 
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonPage, 
    IonRouterOutlet, 
    IonRefresher, 
    IonRefresherContent,
    FontAwesomeIcon,
    IonContent },
  setup() {
    const router= useRouter();
    const store = useStore();

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

    const doRefresh = (event) => {
      const path = router.options.history.location;

      if (path == '/dashboard') {
        if (store.state.currentDashboardTab == "saldo saya") {
          store.commit("setDataNasabah","");
          store.dispatch("getProfileNasabah",event.target);
          
          store.commit("setDataSaldo","");
          store.dispatch("getSaldo");

          store.commit("setDataSampahMasuk","");
          store.dispatch("getSampahMasuk");
        } 
        else {
          store.commit("setDataGrafikSetor",{
            date:"",dataId:"",dataKg:""
          });
          store.dispatch("getDataGrafikSetor",event.target);
          setCurrentDate();
          store.commit("setDataHistoryTrans","");
          store.dispatch("getHistoryTrans");
        }
      }
      else if (path == '/info') {
        store.commit("setDataArticles","");
        store.dispatch("getArticles",event.target);

        store.commit("setDataJenisSampah","");
        store.dispatch("getJenisSampah");
      }
      else if (path == '/profile') {
        store.commit("setDataNasabah","");
        store.dispatch("getProfileNasabah");
      }
    };

    return {
      faHome,
      faInfoCircle,
      faUser,
      doRefresh
    }
  },
})
</script>

<style scoped>
  ion-tabs { contain: none; }
  ion-tab-bar { contain: none }
  
  ion-tab-button::part(native){
    overflow: visible;
  }
  
  ion-tab-button{
    --color-selected: #7AA842;
  }

  ion-tab-button.home{
    /* --color: rgba(255,255,255,0.4); */
    background: white;
    --color: rgba(122, 168, 66, 0.6);
    --color-selected: #fff;
  }
  ion-tab-button.home[aria-selected=true] {
    background: linear-gradient(to right, #C1D966, #537629);
  }
</style>