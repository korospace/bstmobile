<template>
    <transition name="slide" appear>
        <div
          v-if="showAlert"
          class="sticky z-20 left-0 right-0 top-8 px-2 flex justify-center">
            <div
              class="w-full max-w-640 rounded-lg text-white flex justify-between items-center"
              :class="{'bg-red-500':alertType=='danger','bg-green-500':alertType=='success','bg-yellow-500':alertType=='warning','bg-blue-500':alertType=='info'}">
                <span class="p-3 text-sm" v-html="alertMessage"></span>
                <span class=" p-3" @click="closeAlert">
                    <font-awesome-icon
                      :icon="faTimes" size="0.8x"
                      class="text-white"/>
                </span>
            </div>
        </div>
    </transition>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { IonPage}          from '@ionic/vue';
import { useStore }        from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes }         from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
    components: {
        IonPage,
        FontAwesomeIcon
    },
    setup() {
        const store = useStore();

        const showAlert = computed(() => {
            return store.state.dataAlert.show;
        });

        const alertType = computed(() => {
            return store.state.dataAlert.type;
        });

        const alertMessage = computed(() => {
            return store.state.dataAlert.message;
        });

        const closeAlert = () => {
            store.commit('setDataAlert',{show:false,type:'',message:``});
        }

        return{
            showAlert,
            alertType,
            alertMessage,
            faTimes,
            closeAlert
        }
    },
})
</script>

<style scoped>
    .slide-enter-active{
        animation: slide 0.3s;
    }
    .slide-leave-active{
        animation: slide 0.3s reverse;
    }
    @keyframes slide {
        0% {
            opacity: 0;
            transform: translateY(-14px);
        }
        100% {
            opacity: 1;
            transform: translateY(-0px);
        }
    }
</style>