<template>
<div class="min-w-screen min-h-screen bg-gradient-to-r from-primary-darker via-primary-main to-primary-lighter flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
        <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-primary-main">
                <img  class="object-cover h-full w-full " src="../../assets/images/tractor.png" alt="">
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
             <div class="text-center mb-10">
                    <img class="mb-3 mx-auto" style="height: 50px; width: auto" src="../../assets/images/logo-01.png" alt="">
                </div>
                <form @submit.prevent="register">
                    <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label for=""  class="text-xs font-semibold px-1">Razão social</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.company_name ? 'text-red-300':''" class="mdi mdi-information-outline text-gray-400 text-lg"></i></div>
                                <input v-model="company_name" type="text" :class="errors.company_name ? 'border-red-300':''" class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter" >
                            </div>
                            <div  v-if="errors.company_name">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.company_name[0] }}</span>
                            </div> 
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">CPF/CNPJ</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.cnpj ? 'text-red-300':''"  class="mdi mdi-badge-account-horizontal text-gray-400 text-lg"></i></div>
                                <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" v-model="cnpj" type="text" :class="errors.cnpj ? 'border-red-300':''"  class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter" ></the-mask>
                            </div>
                            <div  v-if="errors.cnpj">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.cnpj[0] }}</span>
                            </div> 
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Nome de Usuário</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.name ? 'text-red-300':''" class="mdi mdi-account text-gray-400 text-lg"></i></div>
                                <input v-model="name" type="text" :class="errors.name ? 'border-red-300':''" class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter">
                            </div>
                            <div  v-if="errors.name">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.name[0] }}</span>
                            </div>
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">E-mail</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.email ? 'text-red-300':''" class="mdi mdi-email text-gray-400 text-lg"></i></div>
                                <input v-model="email" type="email" :class="errors.name ? 'border-red-300':''" class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter" >
                            </div>
                            <div  v-if="errors.email">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.email[0] }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex -mx-3">
                       
                        <div class="w-full px-3 mb-5">
                            <label for="" class="flex text-xs font-semibold px-1 justify-center ">Qual seu papel?</label>
                            <div class="flex justify-center space-x-4 mt-3">

                                <div>
			<input v-model="role" value="2" class="hidden" id="radio_1" type="radio" name="role">
			<label :class="errors.role_id ? 'border-red-300':''" class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="radio_1">
                <span class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-currency-usd text-gray-900 text-lg mr-1 ml-1"></i>Comprador </span>

			</label>
		</div>
        <div>
			<input v-model="role" value="1" class="hidden" id="radio_2" type="radio" name="role">
			<label :class="errors.role_id ? 'border-red-300':''" class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="radio_2">
				<span  class="flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i :class="errors.role_id ? 'border-red-300':''" class="mdi mdi-wallet-travel text-gray-900 text-lg mr-1 ml-1"></i>Vendedor </span>
			</label>
		</div>
                            </div>
                            <div class="flex justify-center mt-3"  v-if="errors.role_id">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.role_id[0] }}</span>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="flex -mx-3">
                    <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Senha</label>
                            <div class="flex">
                                <div :class="errors.password ? 'text-red-300':''" class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.password ? 'text-red-300':''" class="mdi mdi-lock text-gray-400 text-lg"></i></div>
                                <input v-model="password" type="password" :class="errors.password ? 'border-red-300':''" class="w-full  h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter" >
                            </div>
                            <div  v-if="errors.password">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.password[0] }}</span>
                            </div>
                        </div>
                        </div>

                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Confirmação de senha</label>
                            <div class="flex">
                                <div :class="errors.password ? 'text-red-300':''" class="w-10  z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i :class="errors.password ? 'text-red-300':''" class="mdi mdi-lock-check text-gray-400 text-lg"></i></div>
                                <input v-model="password_confirmation" type="password" :class="errors.password ? 'border-red-300':''" class="w-full h-9 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-lighter" >
                            </div>
                            <div  v-if="errors.password">
                                <span class="text-xs text-red-300 font-semibold px-1">{{  errors.password[0] }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button :disabled="loader.loading" type="submit" class="flex w-full h-10 max-w-xs mx-auto bg-primary-main hover:bg-primary-lighter items-center justify-center focus:bg-primary-lighter text-white rounded-lg px-3 py-3 font-semibold">Enviar <i class="mdi mdi-login text-lg"></i></button>
                        </div>
                    </div>
                    <span v-if="loader.loading" class="flex justify-center align-center mb-3">
                        <bar-loader :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                    </span>
                    <p class="text-sm text-center text-gray-600">Já tem uma conta? <router-link :to="{name: 'login'}">Entrar </router-link> </p>
                    
                    <p class="text-sm text-center text-gray-600">Esqueceu sua senha? <router-link :to="{name: 'recoverPassword'}">Recuperar senha!</router-link> </p>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>  
import { userService } from '../../services'
import { BarLoader } from '@saeris/vue-spinners'
import {TheMask} from 'vue-the-mask'

export default {
    name: 'register',
    components: {
        BarLoader,
        TheMask
    },
    data() {
        return {
            loader: {
                loading: false,
                color: '#0bc95b',
            },
            company_name: null,
            cnpj: null,
            name: null,
            email: null,
            role: null,
            password: null,
            password_confirmation: null,
            errors: {}
        }
    },
    methods: {
        register() {
            this.loader.loading = true;
            const payload = {
                company_name: this.company_name,
                cnpj: this.cnpj,
                name: this.name,
                email: this.email,
                role_id: this.role,
                password: this.password,
                password_confirmation: this.password_confirmation,
            };
            userService.register(payload).then((response) => {
                    this.loader.loading = false;
                    this.$store.commit('user/STORE_USER', response);
                    this.$router.push('/')

                }).catch((error) => {
                    this.errors = error.response.data
                    this.loader.loading = false;
                    this.password_confirmation = '',
                    this.password = ''
                });
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css');
/* The styling below is custom in that we require the :checked Pseudo class, which Tailwind doesn't offer out of the box. However the styling (border color and box shadow) the below applies is native Tailwind. */
input:checked + label {
	border-color: #0bc95b;
    background-color: #2ECC71;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}   
</style>