<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div 
        id="container"
        class="min-h-full flex flex-col relative bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young">

          <!-- // header // -->
          <x-header :title="'Berita Dan Info Sampah'" />

          <!-- artikel skeleton -->
          <div class="my-6 px-4" v-if="articles == ''">
            <div class="rounded-xl overflow-hidden w-full">
              <div class="w-full bg-white">
                <div class="overflow-hidden bg-gray-400 animate-pulse rounded-b-xl">
                  <img src="@/assets/images/default-thumbnail.webp" alt="" class="opacity-0 w-full">
                </div>
              </div>
              <div class="bg-white p-4 py-5 text-left text-sm" >
                <div class="h-3 rounded-sm w-full bg-gray-400 animate-pulse mb-3">
                </div>
                <div class="h-3 rounded-sm w-full bg-gray-400 animate-pulse">
                </div>
              </div>
            </div>
          </div>
          
          <!-- // articles // -->
          <swiper
           v-if="articles !== ''" 
           class="w-full" 
           :slides-per-view="1.1">
              <template v-for="article in articles" :key="article.id" >
                <swiper-slide class="h-full">
                  <router-link 
                    :to="{ path: '/artikel', query: { slug:article.slug } }" 
                    class="block px-4 my-6 h-full">
                      <div class="rounded-xl overflow-hidden w-full h-full bg-white">
                        <div class="w-full bg-white relative">
                          <img src="@/assets/images/default-thumbnail.webp" alt="" class="opacity-0 rounded-b-xl w-full">
                          <div class="overflow-hidden bg-gray-400 rounded-b-xl absolute top-0 bottom-0 left-0 right-0">
                            <img :src="article.thumbnail" alt="" class="w-full h-full">
                          </div>
                        </div>
                        <div class="bg-white px-4 py-5">
                          <div class="flex justify-between mb-2">
                            <div class="text-gray-500 text-sm">{{ article.kategori }}</div>
                          </div>
                          <span class="text-gray-700 text-left text-md tracking-wide capitalize" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                            {{article.title}}
                          </span>
                        </div>
                      </div>
                  </router-link>
                </swiper-slide>
              </template>
          </swiper>

          <!-- // info harga sampah terkini // -->
          <div class="mx-4 rounded-t-xl shadow-lg bg-white flex-1">
            <div 
              class="font-bold text-md px-4 py-6 text-gray-600 border-b border-gray-200"
              style="font-family:QuicksandSemiBold;">
                Harga Sampah Terkini
            </div>
            <div class="table px-4 py-6 w-full">
              <!-- skeleton jenis sampah -->
              <template
                v-if="jenisSampah == ''">
                  <div
                    v-for="x in [1,2,3,4]" :key="x"
                    class="mb-4 animate-pulse">
                      <div class="h-5 w-20 bg-gray-400 rounded-md mb-4">
                      </div>
                      <div
                        v-for="y in [1,2,3]" :key="y"
                        class="text-sm text-gray-700 capitalize pl-4 py-2 flex justify-between">
                          <div class="h-3 w-28 bg-gray-400 rounded-sm">
                          </div>
                          <div class="h-3 w-28 bg-gray-400 rounded-sm">
                          </div>
                      </div>
                  </div>
              </template>

              <template
                v-if="jenisSampah !== ''">
                  <div
                    v-for="(itemA,name) in jenisSampah" :key="itemA"
                    class="mb-4">
                      <div class="text-gray-700 text-md uppercase font-bold">
                        {{ name }}
                      </div>
                      <div
                        v-for="(itemB,noB) in itemA" :key="itemB"
                        class="text-sm text-gray-700 capitalize pl-4 py-2 flex justify-between">
                          <div>
                            {{ ++noB }} {{ itemB.jenis }}
                          </div>
                          <div>
                            Rp. {{ modifHarga(itemB.harga) }}
                          </div>
                      </div>
                      <hr class="mt-2.5 opacity-60" style="background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,0))">
                  </div>
              </template>
            </div>
          </div>
          
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonPage,IonContent,onIonViewWillEnter} from '@ionic/vue';
  import { ref, computed, defineComponent } from 'vue';
  import { useStore }         from 'vuex'
  import xHeader              from "@/components/dashboard.header.vue";
  import {Swiper,SwiperSlide} from 'swiper/vue';
  import '../../../node_modules/swiper/swiper.min.css';

  export default defineComponent({
    components: {
      IonContent,
      IonPage,
      xHeader,
      Swiper,
      SwiperSlide,
    },
    setup() {
      const store = useStore();

      const articles = computed(() => {
        return store.state.dataArticles;
      });

      const jenisSampah = computed(() => {
        const sampah = store.state.dataJenisSampah;

        if (sampah == "") {
          return "";
        } 
        else {
          const arrKategori = [];
          const objSampah   = {};
          const newArrSampah= [];
          
          // create array kategori
          sampah.forEach(d => {
              if (!arrKategori.includes(d.kategori)) {
                  arrKategori.push(d.kategori.replace(/\s/g,'_'));
              }
          });
  
          arrKategori.forEach(aK => {
              objSampah[aK] = sampah.filter((d) => {
                  return d.kategori == aK.replace(/_/g,' ');
              })
          });
  
          return objSampah;
        }
      });

      const modifHarga = (value) => {
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      };

      onIonViewWillEnter(() => {
        if (articles.value == "") {
          store.commit("setDataArticles","");
          store.dispatch("getArticles");
          store.commit("setDataJenisSampah","");
          store.dispatch("getJenisSampah");
        }
      })

      return { 
        articles,
        jenisSampah,
        modifHarga
      }
    }
  });
</script>

<style scoped>
  
</style>