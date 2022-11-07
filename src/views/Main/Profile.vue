<template>
  <ion-page>
    <ion-content :fullscreen="true">
      
      <Form
        id="container"
        v-slot="{ errors }"
        :validation-schema="profileSchema"
        @submit="doEditProfile"
        class="min-h-full pb-11 relative bg-gray-100">
          
          <!-- // header // -->
          <x-header :title="'personal informations'" />

          <!-- Image Profile -->
          <div
            class="flex flex-col items-center mt-10">
              <div class="bg-gray-400 rounded-full w-max shadow-md overflow-hidden">
                <img src="@/assets/images/Person-Logo.webp" alt="" class="loginLogo w-20">
              </div>
              <div
                class="ml-4 mt-4 flex flex-col items-center"
                :class="{'opacity-0': false}"
                style="font-family:QuicksandSemiBold;">
                  <span class="flex flex-col text-lg text-gray-500">
                    {{ dataNasabah.email }}
                  </span> 
                  <span class="text-sm text-gray-400 mt-1">
                      ID: <span class="tracking-widest">{{ dataNasabah.id }}</span>
                  </span>
              </div>
          </div>

          <!-- Biodata -->
          <div class="mt-10 px-6">
            <div
              class="pt-3 pb-4 px-4 shadow-xl rounded-xl bg-white">

                <div class="flex justify-end mb-4">
                  <div 
                    @click="editMode = !editMode"
                    class="bg-gray-100 text-gray-500 w-max px-2 py-1 shadow-md rounded-md"
                    :class="{'hidden':editMode}">
                      <font-awesome-icon
                        :icon="faUserEdit" size="1x"
                        class=""/>
                  </div>
                </div>

                <!-- Email -->
                <small v-if="editMode" class="text-sm text-gray-400">
                  Email
                </small>
                <div v-if="editMode" class="mt-1.5 text-lg text-gray-600 mb-6 relative">
                  <Field
                    type="email" name="email" v-model="dataNasabah.email"
                    placeholder="Email" autocomplete="off" 
                    @keyup="clearErrorExist" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.email||emailIsExist}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.email }}
                  </small>
                  <small v-if="emailIsExist" class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      email sudah dipakai
                  </small>
                </div>

                <!-- Nama lengkap -->
                <small class="text-sm text-gray-400">
                  Nama lengkap
                </small>
                <div class="mt-1.5 mb-6 text-lg text-gray-600 relative">
                  <div class="flex capitalize" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.nama_lengkap }}</div>
                  </div>

                  <Field
                    type="text" name="nama_lengkap" v-model="dataNasabah.nama_lengkap"
                    placeholder="Nama lengkap" autocomplete="off" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.nama_lengkap}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.nama_lengkap }}
                  </small>
                </div>

                <!-- Username -->
                <small class="text-sm text-gray-400">
                  Username
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-6 relative">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.username }}</div>
                  </div>

                  <Field
                    type="text" name="username" v-model="dataNasabah.username"
                    placeholder="Username" autocomplete="off" 
                    @keyup="clearErrorExist" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.username||usernameIsExist}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.username }}
                  </small>
                  <small v-if="usernameIsExist" class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      username sudah dipakai
                  </small>
                </div>

                <!-- Tgl lahir -->
                <small class="text-sm text-gray-400">
                  Tanggal lahir
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-6">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.tgl_lahir }}</div>
                  </div>

                  <Field
                    type="date" name="tgl_lahir" v-model="tglLahirEditMode"
                    placeholder="Username" autocomplete="off" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.tgl_lahir}" />
                </div>

                <!-- Jenis kelamin -->
                <small class="text-sm text-gray-400">
                  Jenis kelamin
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-6">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.kelamin }}</div>
                  </div>

                  <Field
                    v-model="dataNasabah.kelamin" as="select" name="kelamin"
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.kelamin}" >
                      <option value="laki-laki">laki-laki</option>
                      <option value="perempuan">perempuan</option>
                  </Field>
                </div>

                <!-- No.telp -->
                <small class="text-sm text-gray-400">
                  No.telp
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-6 relative">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.notelp }}</div>
                  </div>

                  <Field
                    type="text" name="notelp" v-model="dataNasabah.notelp"
                    placeholder="No. Telepon" autocomplete="off" 
                    @keyup="clearErrorExist" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.notelp||notelplIsExist}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.notelp }}
                  </small>
                  <small v-if="notelplIsExist" class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      nomor sudah dipakai
                  </small>
                </div>

                <!-- NIK -->
                <small v-if="!editMode" class="text-sm text-gray-400">
                  NIK
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-6 relative">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.nik }}</div>
                  </div>

                  <Field
                    type="text" name="nik" v-model="dataNasabah.nik"
                    placeholder="NIK" autocomplete="off" 
                    @keyup="clearErrorExist" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.nik||nikIsExist}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.nik }}
                  </small>
                  <small v-if="nikIsExist" class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      nik sudah dipakai
                  </small>
                </div>

                <!-- Alamat -->
                <small class="text-sm text-gray-400">
                  Alamat
                </small>
                <div class="mt-1.5 text-lg text-gray-600 mb-10 relative">
                  <div class="flex" :class="{'hidden':editMode}">
                    <div class="bg-gradient-to-t from-greenbsbl-old to-greenbsbl-young pl-1 opacity-70"></div>
                    <div class="py-2 px-3">{{ dataNasabah.alamat }}</div>
                  </div>

                  <Field
                    type="text" name="alamat" v-model="dataNasabah.alamat"
                    placeholder="Alamat lengkap" autocomplete="off" 
                    class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                    :class="{'hidden':!editMode,'border-red-500':errors.alamat}" />
                  <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                      {{ errors.alamat }}
                  </small>
                </div>

                <div
                  id="password-wraper"
                  class="border-t border-gray-300 pt-6 pb-6 relative"
                  :class="{'hidden':!editMode}">
                    <p class="absolute -top-4 text-gray-400 bg-white pr-2 italic">
                      Ubah password <small>(opsional)</small>
                    </p>

                    <div class="text-lg text-gray-600 mb-6 relative">
                      <Field
                        @keyup="clearErrorExist" 
                        placeholder="Password baru" autocomplete="off" 
                        type="password" name="new_password" v-model="newPass.value"
                        class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                        :class="{'border-red-500':newPass.status}" />
                      <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                          {{ newPass.message }}
                      </small>
                    </div>

                    <div class="text-lg text-gray-600 mb-6 relative">
                      <Field
                        @keyup="clearErrorExist" 
                        placeholder="Password lama" autocomplete="off" 
                        type="password" name="old_password" v-model="oldPass.value"
                        class="block py-2 px-3 w-full border-b-2 border-gray-400 focus:outline-none bg-gray-100 focus:bg-gray-200"
                        :class="{'border-red-500':oldPass.status}" />
                      <small class="absolute transform -translate-y-1 tracking-wide text-red-500">
                          {{ oldPass.message }}
                      </small>
                    </div>
                </div>

                <button
                  :class="{'hidden':!editMode}"
                  class="w-full bg-gradient-to-r from-lime-600 to-lime-400 active:from-lime-500 active:to-lime-400 text-white py-3 rounded">
                    SIMPAN
                </button>
                <div :class="{'hidden':!editMode}" class="mt-5 mb-2 text-center w-full ">
                  <a 
                    href="" 
                    class="text-gray-600 opacity-80 active:opacity-100 transition-all underline" 
                    @click.prevent="editMode = !editMode">
                      batal
                  </a>
                </div>
            </div>
          </div>

          <!-- Logout -->
          <div class="mt-6 text-center text-lg">
            <a 
              href="" 
              class="text-red-600 opacity-80 active:opacity-100 transition-all" 
              @click.prevent="logout">
                <font-awesome-icon
                  :icon="faSignOutAlt" size="1x"
                  class=""/>
                <span class="ml-1.5 tracking-widest">keluar</span>
            </a>
          </div>
      </Form>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, reactive, computed, defineComponent } from 'vue';
import { IonContent, IonPage, onIonViewWillEnter  } from '@ionic/vue';
import { TokenService }    from '@/services/token.service';
import axios               from 'axios';
import { useStore }        from 'vuex'
import { useRouter }       from 'vue-router';
import xHeader             from "@/components/dashboard.header.vue";
import { profileSchema }   from "@/mixins/validationSchemas.js"
import { Field, Form }     from "vee-validate";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOutAlt, faUserEdit, faSave } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    xHeader,
    FontAwesomeIcon,
    Field,
    Form,
  },
  setup() {
    const store    = useStore();
    const router   = useRouter();
    const editMode = ref(false);
    const emailIsExist    = ref(false);
    const usernameIsExist = ref(false);
    const notelplIsExist  = ref(false);
    const nikIsExist      = ref(false);
    const newPass  = reactive({
      value: "",
      status: false,
      message: ""
    })
    const oldPass  = reactive({
      value: "",
      status: false,
      message: ""
    })

    const dataNasabah = computed(() => {
      return store.state.dataNasabah;
    })

    const tglLahirEditMode = computed(() => {
      const tglLahir = (dataNasabah.value.tgl_lahir != "" && dataNasabah.value.tgl_lahir != undefined) ? dataNasabah.value.tgl_lahir.split('-') : "";
      const newTgl   = (tglLahir.length != 0) ? `${tglLahir[2]}-${tglLahir[1]}-${tglLahir[0]}` : ""
      return newTgl;
    })

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
      else if (event.target.name == 'nik') {
        nikIsExist.value = false;
      }
      else if (event.target.name == 'new_password') {
        newPass.status  = false;
        newPass.message = '';
      }
      else if (event.target.name == 'old_password') {
        oldPass.status  = false;
        oldPass.message = '';
      }
    }

    const doEditProfile = (event) => {
      const formEditProfile  = new FormData();
      const newProfileData   = {};
      emailIsExist.value     = false;
      usernameIsExist.value  = false;
      notelplIsExist.value   = false;
      nikIsExist.value       = false;
      newPass.status  = false;
      newPass.message = '';
      oldPass.status  = false;
      oldPass.message = '';

      for ( const key in event ) {
        if (key == 'tgl_lahir') {
          const tgl = event["tgl_lahir"].split('-');
          formEditProfile.append("tgl_lahir", `${tgl[2]}-${tgl[1]}-${tgl[0]}`);
          newProfileData["tgl_lahir"] = `${tgl[2]}-${tgl[1]}-${tgl[0]}`; 
        } 
        else if (key == 'new_password') {
          if (event["new_password"]) {
            formEditProfile.append("new_password", event["new_password"]);
          }
        } 
        else if (key == 'old_password') {
          if (event["old_password"] !== '') {
            formEditProfile.append("old_password", event["old_password"]);
          }
        }
        else {
          formEditProfile.append(key, event[key]);
          newProfileData[key] = event[key]; 
        }
      }

      newProfileData["id"]  = dataNasabah.value.id; 
      newProfileData["nik"] = dataNasabah.value.nik;

      // -- New Password Validation --
      if (formEditProfile.get('new_password')) {
        const newPassval = formEditProfile.get('new_password');
        let isInvalid = false;

        if (newPassval.length < 8 || newPassval.length > 20) {
          newPass.status  = true;
          newPass.message = 'minimal 8 huruf dan maksimal 20 huruf';
          isInvalid = true;
        }
        if (/\s/.test(newPassval)) {
          newPass.status  = true;
          newPass.message = 'tidak boleh ada spasi';
          isInvalid = true;
        }
        if (event.old_password == undefined || event.old_password == "") {
          oldPass.status  = true;
          oldPass.message = 'password lama harus di isi';
          isInvalid = true;
        }
        if (isInvalid) {
          return 0;
        }
      } 

      store.commit("setShowLoading",{show:true,text:"Please wait"});

      axios
        .put(`${store.state.APIURL}/nasabah/editprofile`,formEditProfile, {
            headers: {
                token: TokenService.getToken()
            }
        })
        .then(() => {
          store.commit("setShowLoading",{show:false,text:""});
          store.commit("setDataNasabah",newProfileData);
          editMode.value = false;
          newPass.value  = '';
          oldPass.value  = '';

          store.commit('setDataAlert',{show:true,type:'success',message:`<b>Success!</b> profile berhasil diubah`});

          setTimeout(() => {
            store.commit('setDataAlert',{show:false,type:'',message:``});
          }, 5000);
        })
        .catch((error) => {
          store.commit("setShowLoading",{show:false,text:""});
          
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
            if (error.response.data.messages.old_password) {
              oldPass.status  = true;
              oldPass.message = error.response.data.messages.old_password;
            }
          }
          // Unauthorize
          else if (error.response.status == 401) {
            if (error.response.data.messages == 'token expired') {
              store.commit("setDataAlert",{show:true,type:'warning',message:'waktu login sudah habis, silahkan login ulang'});
            }

            TokenService.removeToken();
            editMode.value = false;
            router.push("/login");
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

    const logout = () => {
      store.commit("setShowLoading",{show:true,text:"Logout"});

      axios.delete(`${store.state.APIURL}/nasabah/logout`, {
        headers: {
            token: TokenService.getToken()
        }
      })
      .then(() => {
        store.commit("setShowLoading",{show:false,text:""});
        store.commit("setDataNasabah","");
        store.commit("setDataArticles","");
        TokenService.removeToken();
        editMode.value = false;
        router.push('/login');
      })
      .catch(error => {
        store.commit("setShowLoading",{show:false,text:""});
        store.commit("setDataNasabah","");
        store.commit("setDataArticles","");
        TokenService.removeToken();
        editMode.value = false;
        router.push('/login');
      })
    }

    onIonViewWillEnter(() => {
      if (!dataNasabah.value) {
        store.commit("setDataNasabah","");
        store.dispatch("getProfileNasabah");
      }
    })

    return { 
      dataNasabah,
      tglLahirEditMode,
      faSignOutAlt,
      faUserEdit,
      faSave,
      editMode,
      emailIsExist,
      usernameIsExist,
      notelplIsExist,
      nikIsExist,
      newPass,
      oldPass,
      clearErrorExist,
      profileSchema,
      doEditProfile,
      logout
    };
  },
});
</script>

<style scoped>
  
</style>