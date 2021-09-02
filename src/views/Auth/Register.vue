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
                    <form @submit.prevent="register">
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="company_name" class="text-sm font-semibold text-gray-600 px-1">
                                    Razão Social
                                </label>
                                <input  @change="() => (errors.company_name = null)" :class="errors.company_name && errors.company_name[0] ? 'border-red-400':'border-primary-main'" id="company_name" v-model="company_name"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.company_name" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.company_name[0]}}</span>
                                </div> 
                            </div>
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="part_code" class="text-sm font-semibold text-gray-600 px-1">
                                    CPF/CNPJ
                                </label>
                                <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" v-model="cnpj" type="text"  @change="() => (errors.cnpj = null)" :class="errors.cnpj && errors.cnpj[0] ? 'border-red-400':'border-primary-main'"  class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter" ></the-mask>
                                <div v-if="errors.cnpj" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.cnpj[0]}}</span>
                                </div> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="name" class="text-sm font-semibold text-gray-600 px-1">
                                    Nome de Usuário
                                </label>
                                <input @change="() => (errors.name = null)" :class="errors.name && errors.name[0] ? 'border-red-400':'border-primary-main'" id="name" v-model="name"  placeholder="" type="text" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.name" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.name[0]}}</span>
                                </div> 
                            </div>
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="email" class="text-sm font-semibold text-gray-600 px-1">
                                    E-mail
                                </label>
                                <input @change="() => (errors.email = null)" :class="errors.email && errors.email[0] ? 'border-red-400':'border-primary-main'" id="email" v-model="email"  placeholder="" type="email" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.email" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.email[0]}}</span>
                                </div> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mb-6">
                            <div class="w-full px-3 mb-5">
                                <label for="" class="flex text-sm font-semibold text-gray-600 px-1 justify-center ">Qual seu papel?</label>
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
                                <div v-if="errors.role_id" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.role_id[0]}}</span>
                                </div> 
                            </div>
                        </div>

                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="password" class="text-sm font-semibold text-gray-600 px-1">
                                    Senha
                                </label>
                                <input @change="() => (errors.password = null)" :class="errors.password && errors.password[0] ? 'border-red-400':'border-primary-main'" id="password" v-model="password"  placeholder="" type="password" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.password" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.password[0]}}</span>
                                </div> 
                            </div>
                            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
                                <label for="password" class="text-sm font-semibold text-gray-600 px-1">
                                    Confirmação de Senha
                                </label>
                                <input @change="() => (errors.password = null)" :class="errors.password && errors.password[0] ? 'border-red-400':'border-primary-main'" id="password_confirmation" v-model="password_confirmation"  placeholder="" type="password" class="w-full pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                                <div v-if="errors.password" class="flex justify-center align-items">
                                    <span class="text-xs text-red-400 font-semibold px-1 mt-1">{{errors.password[0]}}</span>
                                </div> 
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mt-4">
                            <div class="md:w-full px-3">
                                <button :disabled="loader.loading" type="submit" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="justify-center">Criar Conta <i class="mdi mdi-login text-lg"></i></span>
                                </button> 
                            </div>
                        </div>

                        <div class="-mx-3 md:flex mt-4">
                            <div class="md:w-full px-3">
                                <span v-if="loader.loading" class="flex justify-center align-center mb-3">
                                    <bar-loader :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
                                </span>
                                <p class="text-sm text-center text-gray-600">Já tem uma conta? <router-link :to="{name: 'login'}">Entrar </router-link> </p>
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
                    this.$router.push('/entrar')
                   this.$toast.success(response.success_message, {
                            position: "bottom-right",
                            showCloseButtonOnHover: true,
                            timeout: false
                        });

                }).catch((error) => {
                    this.errors = error.response.data
                    console.log(error.response.data)
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