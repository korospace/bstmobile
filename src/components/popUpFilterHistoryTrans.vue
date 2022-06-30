<template>
    <transition name="fade">
        <div
          v-if="showFilterHistoryTrans"
          class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center"
          style="background-color: rgba(0,0,0,0.2);">
            <transition name="bounce" appear>
                <form
                  @submit.prevent="doFilter"
                  class="w-full rounded-md bg-white shadow-2xl overflow-hidden">
                    <!-- header -->
                    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                        <p class="text-gray-600 capitalize text-md">
                            Filter Transaksi
                        </p>
                    </div>
                    <!-- body -->
                    <div
                      class="text-gray-600 flex flex-col relative max-h-56 px-4 py-6 overflow-auto">
                        <span class="w-max text-xs px-1 bg-white transform translate-y-1.5 translate-x-1.5">
                            Tanggal mulai
                        </span>
                        <input
                          name="inputStart" type="date" v-model="startDate"
                          class="w-full border-2 border-gray-400 rounded p-2 focus:outline-none">
                        <span class="w-max text-xs px-1 bg-white transform translate-y-4 translate-x-1.5 mt-4">
                            Tanggal berakhir
                        </span>
                        <input
                          name="inputEnd" type="date" v-model="endDate"
                          class="w-full border-2 border-gray-400 rounded p-2 mt-3 focus:outline-none">
                    </div>
                    <!-- footer -->
                    <div class="p-3 flex justify-end">
                        <a
                          @click.prevent="close"
                          class="px-4 py-2 bg-red-400 active:bg-gray-500 text-gray-100 tracking-widest rounded-md"
                          href="">
                            close
                        </a>
                        <button
                          class="ml-2 px-4 py-2 bg-gray-400 active:bg-gray-500 text-gray-100 tracking-widest rounded-md"
                          href="">
                            ok
                        </button>
                    </div>
                </form>
            </transition>
        </div>
    </transition>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import { computed, defineComponent } from 'vue'
import { useStore } from "vuex"

export default defineComponent({
    components: {
        IonPage,
        IonContent,
    },
    setup(){
        const store = useStore();

        const showFilterHistoryTrans = computed(() => {
            return store.state.showFilterTransaksi;
        });

        const startDate = computed(() => {
            const start      = store.state.historyTransDate.start;
            const startSplit = (start) ? start.split('-') : "";
            const newStart   = (startSplit.length != 0) ? `${startSplit[2]}-${startSplit[1]}-${startSplit[0]}` : ""
            
            return newStart;
        })

        const endDate = computed(() => {
            const end      = store.state.historyTransDate.end;
            const endSplit = (end) ? end.split('-') : "";
            const newEnd   = (endSplit.length != 0) ? `${endSplit[2]}-${endSplit[1]}-${endSplit[0]}` : ""
            
            return newEnd;
        })

        const doFilter = (event) => {
            const formFilter = new FormData(event.target);

            if (formFilter.get('inputStart') == '' || formFilter.get('inputEnd') == '') {
                return 0;
            }
            
            const start = formFilter.get('inputStart').split('-');
            const end   = formFilter.get('inputEnd').split('-');

            store.commit("setHistoryTransDate",{
                start: `${start[2]}-${start[1]}-${start[0]}`,
                end: `${end[2]}-${end[1]}-${end[0]}`
            });

            store.commit("setDataHistoryTrans","");
            store.dispatch("getHistoryTrans");
            store.commit('setShowFilterTrans',false);
        }

        const close = () => {
            store.commit('setShowFilterTrans',false);
        }

        return{
            showFilterHistoryTrans,
            startDate,
            endDate,
            doFilter,
            close
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