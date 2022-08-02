<template>
  <ion-app>
    <!-- Gobal component -->
    <x-alert /> 
    <x-loading /> 
    
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import '@/assets/tailwind.css';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
  ion-router-outlet{
    display: flex !important;
    justify-content: center !important;
  }
  ion-router-outlet div.ion-page{
    margin: auto;
    width: 100% !important;
    max-width: 640px !important;
  }
</style>