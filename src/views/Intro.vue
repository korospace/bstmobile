<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="w-full h-full relative flex">
        <img
          class="absolute z-50 top-2 right-2 w-12 xs:w-20"
          src="@/assets/images/banksampah-logo.webp" alt="">

        <!-- page 1 -->
        <div
          class="w-full h-full min-h-xl absolute transition-all duration-1000 transform"
          :class="{'-translate-x-0':showPage1,'-translate-x-full':!showPage1}">
            <div 
              class="page1 w-full h-full flex flex-col justify-center items-center relative z-10 overflow-auto px-7 xs:px-10">
                <div class="w-full flex items-center justify-center relative">
                  <img class="w-full max-w-md" src="@/assets/images/intro-person1.webp" alt="">
                  <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute right-0 mt-10 text-sm xss:text-lg xs:text-2xl text-greenbsbl-old tracking-wide">
                    <font-awesome-icon :icon="faAngleRight" size="2x"/>
                  </button>
                </div>
                <p class="w-full mt-5 text-2xl xs:text-3xl text-left text-white capitalize" style="font-family:QuicksandSemiBold">
                  Memilah sampah menabung emas
                </p>
                <p class="w-full mt-5 text-md xs:text-xl sm:text-2xl text-left text-white">
                  Tukarkan sampahmu menjadi uang tunai atau emas. disini!
                </p>

                <router-link
                  to="/register" 
                  @click="updateIntroStatus"
                  class="mt-10 w-full py-3 text-center tracking-widest text-sm xss:text-lg xs:text-2xl bg-white active:bg-gray-100 rounded-3xl">
                    <span style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                      DAFTAR
                    </span>
                </router-link>
                <router-link
                  to="/login" 
                  @click="updateIntroStatus"
                  class="mt-5 tracking-widest text-sm xss:text-lg xs:text-2xl text-gray-100 underline opacity-80">
                    LOGIN
                </router-link>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>

        <!-- page 2 -->
        <div
          class="w-full h-full min-h-xl absolute transition-all duration-1000 transform"
          :class="{'translate-x-0':showPage2,'translate-x-full':!showPage2,'translate-x-0':!showPage3,'-translate-x-full':showPage3}">
            <div 
              class="page2 w-full h-full flex flex-col justify-center items-center relative z-10 overflow-auto px-7 xs:px-10">
                <div class="w-full flex items-center justify-center relative">
                  <img class="w-full max-w-md" src="@/assets/images/intro-person2.webp" alt="">
                  <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute left-0 mt-10 text-sm xss:text-lg xs:text-2xl text-greenbsbl-old tracking-wide">
                    <font-awesome-icon :icon="faAngleLeft" size="2x"/>
                  </button>
                  <button
                    @click="showPage2 = !showPage2; showPage3 = !showPage3"
                    class="absolute right-0 mt-10 text-sm xss:text-lg xs:text-2xl text-greenbsbl-old tracking-wide">
                      <font-awesome-icon :icon="faAngleRight" size="2x"/>
                  </button>
                </div>
                <p class="w-full mt-10 text-2xl xs:text-3xl text-left text-white capitalize" style="font-family:QuicksandSemiBold">
                  Bawa sendiri atau bisa kami jemput
                </p>
                <p class="w-full mt-5 text-sm xss:text-md xs:text-xl sm:text-2xl text-left text-white">
                  Beritahu kami lokasi anda, armada kami akan siap menjemput sampahmu
                </p>

                <router-link
                  to="/register" 
                  @click="updateIntroStatus"
                  class="mt-10 w-full py-3 text-center tracking-widest text-sm xss:text-lg xs:text-2xl bg-white active:bg-gray-100 rounded-3xl">
                    <span style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                      DAFTAR
                    </span>
                </router-link>
                <router-link
                  to="/login" 
                  @click="updateIntroStatus"
                  class="mt-5 tracking-widest text-sm xss:text-lg xs:text-2xl text-gray-100 underline opacity-80">
                    LOGIN
                </router-link>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>

        <!-- page 3 -->
        <div 
          class="w-full h-full min-h-xl absolute transition-all duration-1000 transform"
          :class="{'translate-x-0':showPage3,'translate-x-full':!showPage3 }">
            <div 
              class="page3 w-full h-full flex flex-col justify-center items-center relative z-10 overflow-auto px-7 xs:px-10">
                <div class="w-full flex items-center justify-center relative">
                  <img class="w-3/5 max-w-md" src="@/assets/images/intro-person3.webp" alt="">
                  <button
                  @click.prevent="showPage2 = !showPage2;showPage3 = !showPage3" 
                  class="absolute left-0 mt-10 text-sm xss:text-lg xs:text-2xl text-greenbsbl-old tracking-wide">
                    <font-awesome-icon :icon="faAngleLeft" size="2x"/>
                  </button>
                </div>
                <p class="w-full mt-10 text-2xl xs:text-3xl text-left text-white capitalize" style="font-family:QuicksandSemiBold">
                  Bergerak tanpa tapi, lakukan tanpa nanti
                </p>
                <p class="w-full mt-5 text-md xs:text-xl sm:text-2xl text-left text-white">
                  Kami menerima panggilan untuk mensosialisasikan pilah sampah dimana saja
                </p>

                <router-link
                  to="/register" 
                  @click="updateIntroStatus"
                  class="mt-10 w-full py-3 text-center tracking-widest text-sm xss:text-lg xs:text-2xl bg-white active:bg-gray-100 rounded-3xl">
                    <span style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                      DAFTAR
                    </span>
                </router-link>
                <router-link
                  to="/login" 
                  @click="updateIntroStatus"
                  class="mt-5 tracking-widest text-sm xss:text-lg xs:text-2xl text-gray-100 underline opacity-80">
                    LOGIN
                </router-link>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent,onIonViewWillEnter } from '@ionic/vue';
import { defineComponent } from 'vue'
import { ref,reactive }    from "vue";
import { useRouter }       from 'vue-router';
import { IntroService }    from '@/services/token.service';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  components: { 
    IonPage,
    IonContent,
    FontAwesomeIcon
  },
  setup() {
    const router = useRouter();
    const showPage1 = ref(true);
    const showPage2 = ref(false);
    const showPage3 = ref(false);

    const updateIntroStatus = () => {
      IntroService.saveIntroStatus("finish")
    }

    return {
      showPage1,
      showPage2,
      showPage3,
      updateIntroStatus,
      faAngleRight,faAngleLeft
    };
  },
})
</script>

<style scoped>
  ion-content{
    --background: white !important;
  }

  .page1{
    background: url('../assets/images/intro-wave-1.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page2{
    background: url('../assets/images/intro-wave-2.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page3{
    background: url('../assets/images/intro-wave-3.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }
</style>