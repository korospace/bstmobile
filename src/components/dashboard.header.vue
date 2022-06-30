<template>
    <div class="bg-white p-6 rounded-b-3xl flex items-center relative z-20 shadow-lg">
        <img src="@/assets/images/banksampah-logo.webp" alt="" class="loginLogo w-20 xs:w-32">
        <p
          v-html="title"
          class="flex-1 text-xl xs:text-3xl capitalize text-center"
          style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
        </p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage}          from '@ionic/vue';

export default defineComponent({
    components: {
        IonPage,
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    setup() {
    },
})
</script>

<style scoped>
    
</style>