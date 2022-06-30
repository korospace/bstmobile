<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- back -->
      <header-back path="/info" />

      <!-- Thumbnail -->
      <div class="">
        <div
          class="overflow-hidden bg-gray-400 relative"
          :class="{'animate-pulse': detilArtikel == ''}">
            <img src="@/assets/images/default-thumbnail.webp" alt="" class="opacity-0 w-full">
            <img :src="detilArtikel.thumbnail" alt="" class="absolute top-0 h-full left-0 right-0" :class="{'none': detilArtikel == ''}">
        </div>
      </div>

      <!-- title,writer,date -->
      <div class="mt-6 px-4">
        <div v-if="detilArtikel == ''" class="h-3 rounded-sm w-full bg-gray-400 animate-pulse mb-3">
        </div>
        <div v-if="detilArtikel == ''" class="h-3 rounded-sm w-full bg-gray-400 animate-pulse mb-6">
        </div>
        <div v-if="detilArtikel == ''" class="h-3 rounded-sm w-28 bg-gray-400 animate-pulse mb-4">
        </div>
        <div v-if="detilArtikel == ''" class="h-3 rounded-sm w-28 bg-gray-400 animate-pulse">
        </div>
        
        <div 
          v-if="detilArtikel !== ''"
          class="tracking-wide text-xl text-justify capitalize text-gray-700 mb-4" style="font-family: serif;">
            {{ detilArtikel.title }}
        </div>
        <div 
          v-if="detilArtikel !== ''"
          class="flex items-center mb-2">
            <font-awesome-icon
              :icon="faUserEdit" size="1x"
              class="text-gray-400"/>
            <div class="ml-2.5 text-gray-500 text-sm capitalize">{{ detilArtikel.writer }}</div>
        </div>
        <div 
          v-if="detilArtikel !== ''"
          class="flex items-center">
            <font-awesome-icon
              :icon="faCalendar" size="1x"
              class="text-gray-400"/>
            <div class="ml-4 text-gray-500 text-sm capitalize">{{ detilArtikel.date }}</div>
        </div>
      </div>

      <hr class="my-5 opacity-70" style="background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,0))">

      <!-- skeleton content -->
      <template v-if="detilArtikel == ''">
        <div v-for="x in [1,2,3,4]" :key="x" class="px-4 mb-5">
          <div class="h-3 rounded-sm w-full bg-gray-400 animate-pulse mb-3">
          </div>
          <div class="h-3 rounded-sm w-full bg-gray-400 animate-pulse mb-3">
          </div>
          <div class="h-3 rounded-sm w-1/2 bg-gray-400 animate-pulse mb-3">
          </div>
        </div>
      </template>

      <!-- content -->
      <div v-if="detilArtikel !== ''" class="px-4 text-justify text-gray-800 text-md" v-html="detilArtikel.content">
      </div>

      <hr class="my-5 opacity-70" style="background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,0))">

      <h1
        class="text-lg text-gray-700 text-center capitalize">
          artikel lainnya
      </h1>

      <swiper
        v-if="articles !== ''" 
        class="w-full" 
        :slides-per-view="1.1">
          <template v-for="item in artikelLain" :key="item.id">
            <swiper-slide>
              <div 
                @click="getNewArtikel(item.slug)"
                class="block px-4 my-6 cursor-pointer">
                  <div class="rounded-xl border border-gray-300 overflow-hidden w-full shadow-lg bg-gray-100">
                    <div class="w-full relative">
                      <img src="@/assets/images/default-thumbnail.webp" alt="" class="opacity-0 rounded-b-xl w-full">
                      <div class="overflow-hidden bg-gray-400 rounded-b-xl absolute top-0 bottom-0 left-0 right-0">
                        <img :src="item.thumbnail" alt="" class="w-full h-full">
                      </div>
                    </div>
                    <div class="px-4 py-5">
                      <div class="flex justify-between mb-2">
                        <div class="text-gray-400 text-sm">{{ item.kategori }}</div>
                      </div>
                      <span class="text-gray-600 text-left text-md tracking-wide capitalize" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                        {{item.title}}
                      </span>
                    </div>
                  </div>
              </div>
            </swiper-slide>
          </template>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonPage,IonContent,onIonViewWillEnter} from '@ionic/vue';
  import { ref, computed, defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore }  from 'vuex'
  import axios         from 'axios';
  import HeaderBack    from '@/components/headerBack.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faUserEdit,faCalendar } from '@fortawesome/free-solid-svg-icons'
  import {Swiper,SwiperSlide} from 'swiper/vue';
  import '../../node_modules/swiper/swiper.min.css';

  export default defineComponent({
    components: {
      IonContent,
      IonPage,
      HeaderBack,
      FontAwesomeIcon,
      Swiper,
      SwiperSlide,
    },
    setup() {
        const router = useRouter();
        const store  = useStore();
        const detilArtikel = ref("");
        const artikelLain  = ref("");

        const fetchDetilArtikel = (slug) => {
          detilArtikel.value = "";

          axios.get(`${store.state.APIURL}/artikel/getartikel?slug=${slug}`)
          .then(response => {
            const date  = new Date(parseInt(response.data.data.created_at) * 1000);
            const day   = date.toLocaleString("en-US",{day: "numeric"});
            const month = date.toLocaleString("en-US",{month: "long"});
            const year  = date.toLocaleString("en-US",{year: "numeric"});

            detilArtikel.value = {
                title: response.data.data.title,
                description: response.data.data.description,
                thumbnail: response.data.data.thumbnail,
                writer: response.data.data.penulis,
                content: response.data.data.content,
                date: `${day} ${month} ${year}`
            }
          })
          .catch(error => {
              
          })
        }

        const fetchArtikelLain = (slug) => {
          artikelLain.value = "";

          axios.get(`${store.state.APIURL}/artikel/relatedartikel?slug=${slug}`)
          .then(response => {
            artikelLain.value = response.data.data;
          })
          .catch(error => {
              
          })
        }

        const getNewArtikel = (slug) => {
          fetchDetilArtikel(slug);
          fetchArtikelLain(slug);
        }

        onIonViewWillEnter(() => {
          const slug = router.currentRoute.value.query.slug;
          fetchDetilArtikel(slug);
          fetchArtikelLain(slug);
        })

        return { 
          faUserEdit,faCalendar,
          detilArtikel,
          artikelLain,
          getNewArtikel
        }
    }
  });
</script>

<style scoped>
  
</style>