<template>
    <div class="min-w-screen min-h-screen bg-gradient-to-r from-primary-darker via-primary-main to-primary-lighter flex items-center justify-center px-5 py-5">
        <div class="bg-gray-100 text-gray-500 rounded-xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
            <div class="md:flex w-full">
                <div class="hidden md:block w-1/2 bg-primary-main">
                    <img  class="object-cover h-full w-full " src="../../assets/images/tractor.png" alt="">
                </div>
                <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                    <div class="text-center mb-10">
                        <img class="mb-3 mx-auto" style="height: 50px; width: auto" src="../../assets/images/logo-01.png" alt="">
                    </div>
                    <form @submit.prevent="login">
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-full px-3 mb-2 md:mb-0">
                                <label for="email" class="text-sm font-semibold text-gray-600 px-1">
                                    E-mail
                                </label>
                                <input id="email" @change="() => (errors.user.email = 'OK')" :class="errors.user.email == 'ERROR'? 'border-red-400':'border-primary-main'" v-model="user.email" type="email" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.user.email == 'ERROR'" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo é obrigatório.</span>
                                </div> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-full px-3 mb-2 md:mb-0">
                                <label for="password" class="text-sm font-semibold text-gray-600 px-1">
                                    Senha
                                </label>
                                <input id="password" @change="() => (errors.user.password = 'OK')" :class="errors.user.password == 'ERROR'? 'border-red-400':'border-primary-main'" v-model="user.password" type="password" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.user.password == 'ERROR'" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">O campo é obrigatório.</span>
                                </div> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mt-4">
                            <div class="md:w-full px-3">
                                <button :disabled="loader.loading" type="submit" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Entrar <i class="mdi mdi-login text-lg"></i></span>
                                </button> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mt-4">
                            <div class="md:w-full px-3">
                                <span v-if="loader.loading" class="flex justify-center align-center mb-3">
                                    <bar-loader :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                                </span>
                                <p class="text-sm text-center text-gray-600">Ainda não tem uma conta? <router-link :to="{name: 'register'}">Registre-se. </router-link> </p>
                                <p class="text-sm text-center text-gray-600">Esqueceu sua senha? <router-link :to="{name: 'recoverPassword'}">Recuperar senha!</router-link> </p>
                            </div>
                        </div>
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
            user: {
                email: '',
                password: '',
            },
            errors: {
                user: {
                    email: null,
                    password: null
                }
            },
        }
    },
    methods: {
        login() {
            this.$v.$touch()
                if(this.$v.user.email.$invalid) {
                    this.errors.user.email = 'ERROR'
                } 
                if(this.$v.user.password.$invalid) {
                    this.errors.user.password = 'ERROR'
                } 
                
                if(this.$v.$anyError == false) {
                    this.loader.loading = true;
                    const payload = {
                        email: this.user.email,
                        password: this.user.password
                    };
                    userService.login(payload).then((response) => {
                        this.loader.loading = false;
                        this.$store.commit('STORE_USER', response);
                        this.$router.push('/cotacoes')

                    }).catch((error) => {
                        const err = error.response.data.error
                        this.loader.loading = false;
                        this.$toast.error(err, {
                            position: "bottom-right",
                            pauseOnHover: false,
                            showCloseButtonOnHover: true,
                            timeout: 2500
                        });
                    this.password = '';
                });
            } 
        },
    },
    validations: {
        user: {
            email: {
                required
            },
            password: {
                required
            }
        }
    }
}
</script>