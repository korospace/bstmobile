import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.ac.budiluhur.banksampah',
  appName: 'Bank Sampah Budi Luhur',
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
