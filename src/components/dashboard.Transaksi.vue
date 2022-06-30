<template>
    <transition name="fade">
        <div
          v-if="currentTab == 'transaksi'"
          class="flex-1 flex flex-col">

            <pop-up-filter-history-trans />

            <div class="mx-6 rounded-3xl shadow-lg bg-white p-2">
                <div
                  class="font-bold text-md text-gray-500 text-center py-2"
                  style="font-family:QuicksandSemiBold;">
                    Penyetoran sampah</div>
                <div
                  class="font-bold text-sm text-gray-500 text-center pb-2 border-b border-gray-200">
                    {{ dataGrafikSetorDate }}</div>

                <div class="relative mt-4">
                    <div
                      v-if="dataGrafikSetorKg==''"
                      class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-white flex justify-center items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <circle cx="50" cy="50" fill="none" stroke="#84CC16" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                </circle>
                            </svg>
                        </span>
                    </div>
                    
                    <LineChart :chartData="grafikData" :options="grafikOptions" />
                </div>
            </div>
            
            <!-- // info harga sampah terkini // -->
            <div class="mt-8 mx-6 rounded-t-3xl shadow-lg bg-white flex-1">
                <div 
                  class="px-4 pt-6 pb-4 border-b border-gray-200">
                    <div
                     class="font-bold text-md text-gray-500 text-center"
                     style="font-family:QuicksandSemiBold;">
                        Histori Transaksi</div>
                    
                    <div class="mt-2.5 flex justify-center items-center ml-2.5 text-gray-500 text-sm">
                        <span class="mr-2">{{ historyTransDate.start }}</span> 
                        <font-awesome-icon :icon="faArrowRight" size="0.8x" class=""/> 
                        <span class="ml-2">{{ historyTransDate.end }}</span> 
                    </div>
                    <div class="flex items-center mt-6">
                        <div 
                          @click="openFilter"
                          class="bg-gray-100 text-gray-500 w-max px-2 py-1 shadow-md rounded-md">
                            <font-awesome-icon
                              :icon="faSlidersH" size="0.4x"
                              class=""/>
                        </div>
                    </div>
                </div>
                <div class="table px-4 pb-10 w-full min-h-xs">
                    <!-- skeleton -->
                    <template
                      v-if="Array.isArray(historyTransaksi) == false">
                        <div
                          v-for="item in [1,2,3,4,5,6]" :key="item"
                          class="flex justify-between border-b border-gray-200 px-2 py-3 animate-pulse">
                            <div>
                                <div class="h-3 w-20 bg-gray-400 rounded-sm mb-2.5">
                                </div>
                                <div class="h-2.5 w-20 bg-gray-400 rounded-sm">
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                <div class="h-3 w-20 bg-gray-400 rounded-sm mb-2.5">
                                </div>
                                <div class="h-2.5 w-12 bg-gray-400 rounded-sm">
                                </div>
                            </div>
                        </div>
                    </template>

                    <template
                      v-else-if="Array.isArray(historyTransaksi)">
                        <router-link
                          v-for="item in historyTransaksi" :key="item"
                          :to="{ path: '/cetakTransaksi', query: { id:item.id_transaksi } }"
                          class="flex justify-between border-b border-gray-200 px-2 py-3">
                            <div>
                                <p class="text-sm tracking-wide text-gray-800">
                                    {{ item.id_transaksi }}
                                </p>
                                <p class="text-xs text-gray-400 mt-2">
                                    {{ dateParse(item.date) }}
                                </p>
                            </div>
                            <div v-if="item.jenis_transaksi == 'konversi saldo'">
                                <div class="text-yellow-400 text-sm">
                                    <span class="mr-2">{{ modifUang(item.total_pindah) }}</span>
                                    <font-awesome-icon :icon="faExchangeAlt" size="1x"/>
                                    <span class="ml-2">{{ modifUang(item.hasil_konversi) }}</span>
                                </div>
                                <div class="mt-2 text-xs text-gray-400 text-widest text-right">IDR -> gram</div>
                            </div>
                            <div v-else-if="item.jenis_transaksi == 'penyetoran sampah'">
                                <div class="text-lime-500 text-sm">
                                    <font-awesome-icon :icon="faPlus" size="0.8x"/>
                                    <span class="ml-1">{{ modifUang(item.total_uang_setor) }}</span>
                                </div>
                                <div class="mt-2 text-xs text-gray-400 text-widest text-right">IDR</div>
                            </div>
                            <div v-else>
                                <div class="text-red-600 text-sm">
                                    <font-awesome-icon :icon="faMinus" size="0.8x"/>
                                    <font-awesome-icon size="0.8x"/>
                                    <span v-if="item.jenis_saldo == 'uang'" class="ml-2">
                                        {{ modifUang(item.total_tarik) }}
                                    </span>
                                    <span v-else class="ml-1">
                                        {{ item.total_tarik }}
                                    </span>
                                </div>
                                <div class="mt-2 text-xs text-gray-400 text-widest text-right">IDR</div>
                            </div>
                        </router-link>
                    </template>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
import { ref, reactive, computed }   from "vue";
import { defineComponent } from 'vue';
import { useStore }        from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import popUpFilterHistoryTrans from '@/components/popUpFilterHistoryTrans.vue';
import { faExchangeAlt,faPlus,faMinus,faSlidersH,faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { Chart, registerables } from 'chart.js';
import { LineChart }   from 'vue-chart-3';
Chart.register(...registerables);

export default defineComponent({
    components: {
        FontAwesomeIcon,
        popUpFilterHistoryTrans,
        LineChart,
    },
    setup() {
        const store = useStore();
        
        const currentTab = computed(() => {
            return store.state.currentDashboardTab;
        });

        const dataGrafikSetorDate = computed(() => {
            return store.state.dataGrafikSetor.date;
        });

        const dataGrafikSetorId = computed(() => {
            return store.state.dataGrafikSetor.dataId;
        });

        const dataGrafikSetorKg = computed(() => {
            return store.state.dataGrafikSetor.dataKg;
        });

        const grafikData = computed(() => ({
            labels: dataGrafikSetorId.value,
            datasets: [
                {
                    data: dataGrafikSetorKg.value,
                    fill: true,
                    label: "Kg",
                    tension: 0.4,
                    pointRadius: 0,
                    borderColor: "#c1d966",
                    borderWidth: 2,
                    minBarLength: 6,
                    maxBarThickness: 6,
                    backgroundColor: 'rgba(193,217,102,0.3)',
                    // backgroundColor: createGradient,
                },
            ],
        }));

        const grafikOptions = ref({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                }
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        beginAtZero: true,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 0,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                }
            }
        });

        const historyTransaksi = computed(() => {
            return store.state.dataHistoryTrans;
        })

        const historyTransDate = computed(() => {
            return store.state.historyTransDate;
        })

        const dateParse = (val) => {
            const date  = new Date(parseInt(val) * 1000);
            const day   = date.toLocaleString("en-US",{day: "numeric"});
            const month = date.toLocaleString("en-US",{month: "long"});
            const year  = date.toLocaleString("en-US",{year: "numeric"});
            const time  = date.toLocaleString("en-US",{hour: '2-digit', minute: '2-digit'});

            return `${day} ${month}, ${year}`;
        }

        const modifUang = (value) => {
            const newVal = parseFloat(value);
            return newVal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        };

        const openFilter = () => {
            store.commit('setShowFilterTrans',true);
        }

        return {
            currentTab,
            historyTransaksi,
            dateParse,
            faExchangeAlt,faPlus,faMinus,faSlidersH,faArrowRight,
            modifUang,
            dataGrafikSetorDate,
            dataGrafikSetorKg,
            historyTransDate,
            openFilter,
            grafikData,
            grafikOptions,
        }
    },
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
</style>