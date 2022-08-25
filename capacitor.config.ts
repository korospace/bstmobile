import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bstpinangpermai',
  appName: 'Bank Sampah Teratai',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      androidScaleType:"CENTER_CROP"
    },
  }
};

export default config;
