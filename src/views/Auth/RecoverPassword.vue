<template>

<div class="min-w-screen min-h-screen bg-gradient-to-r from-primary-darker via-primary-main to-primary-lighter flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
        <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-primary-main">
                <img  class="object-cover h-full w-full " src="../../assets/images/tractor.png" alt="">
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div class="text-center mb-10">
                    <img class="mb-3 mx-auto" style="height: 90px; width: auto" src="../../assets/images/logo-01.png" alt="">
                </div>
                <form @submit.prevent="recoverPassword">
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">E-mail</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i  :class="errors.email == 'ERROR'? 'text-red-300':''" class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input @focus="() => (errors.email = 'OK')" :class="errors.email == 'ERROR'? 'border-red-300':''" v-model="email" type="email" class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none  focus:border-primary-lighter">
                        </div>
                            <div  v-if="errors.email == 'ERROR'">
                                <span class="text-xs text-red-300 font-semibold px-1">O campo e-mail é obrigatório.</span>
                            </div>                            
                        </div>

                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button :disabled="loader.loading" type="submit" class="block w-full max-w-xs mx-auto bg-primary-main hover:bg-primary-lighter focus:bg-primary-lighter text-white rounded-lg px-3 py-3 font-semibold">Recuperar senha <i class="mdi mdi-lock text-lg"></i></button>
                        </div>
                    </div>
                    <span v-if="loader.loading" class="flex justify-center align-center mb-3">
                        <bar-loader :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                    </span>
                    <p class="text-sm text-center text-gray-600">Já tem uma conta? <router-link :to="{name: 'login'}">Entrar </router-link> </p>

                    <p class="text-sm text-center text-gray-600">Ainda não tem uma conta? <router-link :to="{name: 'register'}">Registre-se. </router-link> </p>
                </form>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { userService } from '../../services'
import { BarLoader } from '@saeris/vue-spinners'
import { required } from 'vuelidate/lib/validators'

export default {

    name: 'Login',
    components: {
        BarLoader
    },
    data() {
        return {
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            email: null,
            errors: {
                email: null
            },
        }
    },
    methods: {
        recoverPassword() {
            this.$v.$touch()
                if(this.$v.email.$invalid) {
                    this.errors.email = 'ERROR'
                } 
                else {
                this.loader.loading = true;

                const payload = {
                    email: this.email,
                }; 

                userService.recoverPassword(payload).then((response) => {
                    this.loader.loading = false;
                    this.$toast.success(response.success_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 3500
                    });
                    this.email = '';

                }).catch(() => {
                    this.loader.loading = false;
                    this.$toast.error('E-mail não encontrado em nossa base de dados', {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 2500
                    });
                    this.email = '';
                    
                });


            } 
        },
    },
    validations: {
        email: {
            required
        },
    }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')

</style>