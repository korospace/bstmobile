<template>
    <div class="shadow-lg px-2 py-4 bg-white sticky top-0 z-10">
        <router-link :to="path" class="py-2 px-4 bg-gray-100 block w-max rounded shadow">
          <font-awesome-icon
            :icon="faAngleLeft" size="2x"
            class="text-gray-400"/>
        </router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage}          from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleLeft, }    from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
    components: {
        IonPage,
        FontAwesomeIcon
    },
    props: {
        path: {
            type: String,
            default: ""
        }
    },
    setup() {
        return {
            faAngleLeft
        }
    },
})
</script>

<style scoped>
    
</style>