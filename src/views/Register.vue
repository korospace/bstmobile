<template>
    <ion-page>
        <ion-content>
            <!-- <h1
              class="font-black text-center uppercase mt-12 text-3xl"
              style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #81A257);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                register
            </h1> -->
            <x-header :title="'registrasi akun'" />

            <Form
              v-slot="{ errors }"
              :validation-schema="registerSchema"
              class="w-full mt-12 px-4 tracking-widest pb-4"
              @submit="doRegister">
                
                <!-- nama lengkap -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500"
                      :class="{'border-red-500':errors.nama_lengkap}">
                        <Field
                          type="text" name="nama_lengkap" placeholder="Nama lengkap" autocomplete="off" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none transition-all bg-white text-lime-500" />
                        <label 
                        for="nama_lengkap" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Nama lengkap
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.nama_lengkap }}
                    </small>
                </div>
                
                <!-- username -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.username||usernameIsExist}">
                        <Field
                          type="text" name="username" placeholder="Username" autocomplete="off"
                          @keyup="clearErrorExist" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                          for="username" 
                          class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Username
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.username  }}
                    </small>
                    <small v-if="usernameIsExist" class="absolute mt-1 tracking-wide text-red-500">
                        username sudah dipakai
                    </small>
                </div>
                
                <!-- email -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.email||emailIsExist}">
                        <Field
                          type="email" name="email" placeholder="Email" autocomplete="off" 
                          @keyup="clearErrorExist" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                          for="email" 
                          class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Email
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.email }}
                    </small>
                    <small v-if="emailIsExist" class="absolute mt-1 tracking-wide text-red-500">
                        email sudah dipakai
                    </small>
                </div>
                
                <!-- password -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.password}">
                        <Field
                        type="password" name="password" placeholder="Password" autocomplete="off" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="password" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Password
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.password }}
                    </small>
                </div>
                
                <!-- no.telp -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.notelp||notelplIsExist}">
                        <Field
                        type="text" name="notelp" placeholder="No. Telepon" autocomplete="off" 
                        @keyup="clearErrorExist" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="notelp" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            No. Telepon
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.notelp }}
                    </small>
                    <small v-if="notelplIsExist" class="absolute mt-1 tracking-wide text-red-500">
                        nomor telepon sudah dipakai
                    </small>
                </div>
                
                <!-- nik -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.nik||nikIsExist||nikIsValid == false}">
                        <Field
                        type="text" name="nik" placeholder="NIK" autocomplete="off" v-model="nikVal"
                        @keyup="clearErrorExist" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="nik" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            NIK
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.nik }}
                    </small>
                    <small v-if="nikIsExist" class="absolute mt-1 tracking-wide text-red-500">
                        NIK sudah dipakai
                    </small>
                    <small v-if="nikIsValid == false" class="absolute mt-1 tracking-wide text-red-500">
                        NIK tidak valid
                    </small>
                </div>
                
                <!-- tanggal lahir -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.tgl_lahir}">
                        <Field
                          type="date" name="tgl_lahir" placeholder=" " autocomplete="off" v-model="tglLahir"
                          class="block p-4 w-full text-lg text-gray-400 appearance-none focus:outline-none bg-white"
                          :class="{'text-lime-500':isTglLahirEmpty}" />
                        <label 
                          for="tgl_lahir" 
                          class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0">
                            Tanggal Lahir
                        </label>
                    </div>
                </div>
                
                <!-- kelamin -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.kelamin}">
                        <Field
                        id="kelamin" v-model="kelamin" placeholder=" " as="select" name="kelamin"
                        class="block p-4 w-full text-lg text-gray-400 appearance-none focus:outline-none bg-white"
                        :class="{'text-lime-500':isKelaminEmpty}">
                            <option value="">-- pilih jenis kelamin --</option>
                            <option value="laki-laki">laki-laki</option>
                            <option value="perempuan">perempuan</option>
                        </Field>
                        <label 
                        for="kelamin" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 transform scale-75 -translate-y-4 z-0 ml-3 px-1.5 py-0 bg-white text-gray-600">
                            Jenis Kelamin
                        </label>
                    </div>
                </div>
                
                <!-- RT & RW -->
                <div class="flex mt-10">
                    <div class="relative w-1/2">
                        <div
                          class="w-full outline relative rounded border-2 focus-within:border-lime-500 mr-1.5"
                          :class="{'border-red-500':errors.rt}">
                            <Field
                            type="text" name="rt" placeholder="Rt" autocomplete="off" 
                            class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                            <label 
                            for="rt" 
                            class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                                Rt
                            </label>
                        </div>
                        <small class="absolute mt-1 tracking-wide text-red-500">
                            {{ errors.rt }}
                        </small>
                    </div>
                    <div class="relative w-1/2">
                        <div
                          class="w-full outline relative rounded border-2 focus-within:border-lime-500 ml-1.5"
                          :class="{'border-red-500':errors.rw}">
                            <Field
                            type="text" name="rw" placeholder="Rw" autocomplete="off" 
                            class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                            <label 
                            for="rw" 
                            class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                                Rw
                            </label>
                        </div>
                        <small class="absolute mt-1 tracking-wide text-red-500">
                            {{ errors.rw }}
                        </small>
                    </div>
                </div>
                
                <!-- alamat -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.alamat}">
                        <Field
                        type="text" name="alamat" placeholder="Alamat" autocomplete="off" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="alamat" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Alamat
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.alamat }}
                    </small>
                </div>

                <!-- search kodepos -->
                <form 
                  @submit.prevent="searchKodePos"
                  class="mt-10 p-2 rounded border-2 relative overflow-y-visible flex">
                    <div class="p-0.5 rounded border relative flex items-center flex-1">
                        <font-awesome-icon
                          :icon="faSearch" size="1x" v-if="loadingSearch == false"
                          class="absolute text-gray-400 left-1.5"/>
                        <svg v-if="loadingSearch" class="absolute left-1.5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="18px" height="18px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#9ca3af" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                        <input
                          type="text" placeholder="masukan nama wilayah" v-model="searchKeyCom"
                          class="w-full py-1.5 pl-7 pr-1.5 text-xs text-gray-700 tracking-wide focus:outline-none">
                    </div>

                    <div
                      @click="searchKodePos"
                      class="bg-gray-400 active:bg-gray-500 px-2 rounded-sm ml-2 text-gray-100 tracking-wide flex items-center">
                        cari
                    </div>

                    <!-- list kodepos -->
                    <div v-if="searchKey != ''">
                        <div
                          v-if="allKodePos.list.length > 0"
                          class="max-h-28 mt-10 border rounded overflow-auto bg-white absolute left-2 right-2 z-20">
                            <div
                              v-for="(data,index) in allKodePos.list" :key="index"
                              @click="inputKodePos(data)"
                              class="px-1.5 py-2 text-xs text-gray-700 active:bg-gray-200">
                                <span style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                                    {{ data.postalcode }} - {{ data.urban }}, {{ data.subdistrict }}, {{ data.city }}, {{ data.province }}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
                
                <!-- kodepos -->
                <div
                  class="outline relative z-0 rounded border-2 focus-within:border-lime-500 mt-4"
                  :class="{'border-red-500':errors.kodepos}">
                    <Field
                      type="text" name="kodepos" placeholder="pilih kodepos diatas" 
                      v-model="kodePosVal"
                      autocomplete="off" 
                      class="block p-4 w-full text-lg focus:outline-none bg-gray-200 text-lime-500" disabled/>
                    <Field type="hidden" v-model="kelurahanVal" name="kelurahan" />
                    <Field type="hidden" v-model="kecamatanVal" name="kecamatan" />
                    <Field type="hidden" v-model="kotaVal" name="kota" />
                    <Field type="hidden" v-model="provinsiVal" name="provinsi" />
                </div>

                <button class="w-full bg-gradient-to-r from-greenbsbl-old to-greenbsbl-young active:from-greenbsbl-old2 active:to-greenbsbl-young text-white mt-10 py-3 rounded">
                    DAFTAR
                </button>
                <center class="mt-8 pb-4 tracking-wide text-lg xs:text-xl">
                    <p class="text-md xs:text-2xl text-gray-600">sudah memiliki akun?</p>
                    <router-link class="text-sm xs:text-lg text-lime-600 underline" to="/login">login sekarang</router-link>
                </center>
            </Form>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, loadingController } from '@ionic/vue';
import axios                         from 'axios';
import { computed, defineComponent } from 'vue'
import { Field, Form }               from "vee-validate";
import { registerSchema }            from "@/mixins/validationSchemas.js"
import { nikParser }                 from 'nik-parser'
import { FontAwesomeIcon }           from '@fortawesome/vue-fontawesome'
import { faSearch }                  from '@fortawesome/free-solid-svg-icons'
import { ref,reactive }              from "vue";
import { useRouter }                 from 'vue-router';
import { useStore }                  from "vuex"
import xHeader                       from "@/components/dashboard.header.vue";

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        Field,
        FontAwesomeIcon,
        Form,
        xHeader
    },
    setup(){
        const router        = useRouter();
        const store         = useStore();
        const tglLahir      = ref("");
        const kelamin       = ref("");
        const searchKey     = ref("");
        const loadingSearch = ref(false);
        const allKodePos    = reactive({
            list: []
        });
        const nikVal       = ref("");
        const kodePosVal   = ref("");
        const kelurahanVal = ref("");
        const kecamatanVal = ref("");
        const kotaVal      = ref("");
        const provinsiVal  = ref("");
        const emailIsExist    = ref(false);
        const usernameIsExist = ref(false);
        const notelplIsExist  = ref(false);
        const nikIsExist      = ref(false);
        const nikIsValid      = ref(true);

        const isTglLahirEmpty = computed(() => {
            return tglLahir.value !== "";
        });

        const isKelaminEmpty = computed(() => {
            return kelamin.value !== "";
        });

        const clearErrorExist = (event) => {
            if (event.target.name == 'username') {
                usernameIsExist.value = false;
            }
            else if (event.target.name == 'email') {
                emailIsExist.value = false;
            }
            else if (event.target.name == 'notelp') {
                notelplIsExist.value = false;
            }
            else{
                nikIsExist.value = false;
                nikIsValid.value = true;
            }
        }

        const searchKeyCom = computed({
            get:() => searchKey.value,
            set:(val) => {
                if (val == '') {
                    allKodePos.list = []
                }
                searchKey.value = val;
            }
        })

        // -- search kodepos --
        const searchKodePos = () => {
            if (searchKey.value == '') {
                return 0;
            } 
            else {
                loadingSearch.value = true;
                axios
                  .get(`https://kodepos.vercel.app/search/?q=${searchKey.value}`)
                  .then((response) => {
                    if (response.data.messages == 'No data can be returned.') {
                        allKodePos.list = [];
                    } 
                    else {
                        allKodePos.list = response.data.data;
                    }
                    
                    loadingSearch.value = false;
                  })
                  .catch((error) => {
                    allKodePos.list = [];
                    loadingSearch.value = false;
                  })
            }
        }

        // -- input kodepos --
        const inputKodePos = (data) => {
            kodePosVal.value   = data.postalcode;
            kelurahanVal.value = data.urban;
            kecamatanVal.value = data.subdistrict;
            kotaVal.value      = data.city;
            provinsiVal.value  = data.province;
            searchKey.value    = "";
            allKodePos.list    = [];
        }

        // -- loading spinner --
        const createSpinner = () => {
            return loadingController
            .create({
                spinner: "crescent",
                message: '',
                translucent: true,
                cssClass: 'rounded-xl',
                backdropDismiss: false
            });
        }

        const doRegister = async (event) => {
            const loading      = await createSpinner();
            const formRegister = new FormData();
            emailIsExist.value    = false;
            usernameIsExist.value = false;
            notelplIsExist.value  = false;
            nikIsExist.value      = false;
            nikIsValid.value      = true;
            nikIsValid.value      = nikParser(nikVal.value).isValid();

            if (!nikIsValid.value) {
                return 0;
            }
            
            for ( const key in event ) {
                if (key !== 'tgl_lahir') {
                    formRegister.append(key, event[key]);
                } 
                else {
                    const tgl = event["tgl_lahir"].split('-');
                    formRegister.append("tgl_lahir", `${tgl[2]}-${tgl[1]}-${tgl[0]}`);
                }
            }
            
            loading.present();

            axios
              .post(`${store.state.APIURL}/register/nasabah`, formRegister)
              .then((response) => {
                loading.dismiss();

                store.commit('setDataAlert',{show:true,type:'success',message:`<b>berhasil!</b> cek email anda`});
                store.commit('setDataLogin',{username_or_email:formRegister.get('username'),password:formRegister.get('password')});

                setTimeout(() => {
                    store.commit('setDataAlert',{show:false,type:'',message:``});
                    
                    setTimeout(() => {
                        router.push('/otp');
                    }, 500);
                }, 3000);
              })
              .catch((error) => {
                loading.dismiss();

                // bad request
                if (error.response.status == 400) {
                    if (error.response.data.messages.email) {
                        emailIsExist.value = true;
                    }
                    if (error.response.data.messages.username) {
                        usernameIsExist.value = true;
                    }
                    if (error.response.data.messages.notelp) {
                        notelplIsExist.value = true;
                    }
                    if (error.response.data.messages.nik) {
                        nikIsExist.value = true;
                    }
                }
                // error server
                else if (error.response.status == 500) {
                    store.commit('setDataAlert',{show:true,type:'danger',message:`<b>terjadi kesalahan.</b> silahkan coba lagi`});

                    setTimeout(() => {
                        store.commit('setDataAlert',{show:false,type:'',message:``});
                    }, 5000);
                }
              })
        }

        return{
            tglLahir,
            kelamin,
            isTglLahirEmpty,
            isKelaminEmpty,
            registerSchema,
            faSearch,
            searchKey,
            searchKeyCom,
            searchKodePos,
            loadingSearch,
            allKodePos,
            inputKodePos,
            nikVal,
            nikIsValid,
            kodePosVal,
            kelurahanVal,
            kecamatanVal,
            kotaVal     ,
            provinsiVal ,
            emailIsExist,
            usernameIsExist,
            notelplIsExist,
            nikIsExist,
            clearErrorExist,
            doRegister
        }
    }
})
</script>

<style scoped>
    
</style>