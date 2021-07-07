<template>
    <span>
        <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
            <div class="flex justify-between">
                <div class="w-4/6 mb-5">
                    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Perfil</h2>
                </div>

                <!-- <div  v-if="$props.role === 1" class="w-1/6 mb-5 mr-3">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button class="w-full pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white hover:bg-primary-darker font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="justify-center ml-2">Alterar Categorias</span>
                    </button>  
                </div> -->
                <div :class="$props.role === 1 ? 'w-2/6':'w-1/6'" class="mb-5">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button  @click="openChangePasswordModal" class="w-full  pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white hover:bg-primary-darker font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="justify-center ml-2">Trocar Senha</span>
                    </button>  
                </div>
            </div>

        <form @submit.prevent="updateUser">
        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Nome de usuário</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input  @change="() => (errors.name = 'OK')" :class="errors.name == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="user.name" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>   
                
                <div v-if="errors.name == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo Nome de usuário é obrigatório.</span>
                </div>                        
            </div>
        </div>
        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">E-mail</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input  @change="() => (errors.email = 'OK')" :class="errors.email == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="user.email" type="email" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>  

                <div v-if="errors.email == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1">O campo E-mail é obrigatório.</span>
                </div>                       
            </div>
        </div>
        <div class="flex justify-end">
        <div class="w-1/6 mb-5">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <button  type="submit" class="w-full  pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white hover:bg-primary-darker font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="justify-center ml-2">Salvar</span>
                    </button>  
                </div>
        </div>

        </form>
        </div>

        <change-password-modal
            v-if="isChangePasswordModalVisible"
            @close="closeChangePasswordModal"
        >
        </change-password-modal>
        
    </span>
</template>

<script>
import { bus } from '../main';
import { userService } from '../services';
import ChangePasswordModal from '../components/Shared/User/ChangePasswordModal';
export default {
    name: 'Profile',
    props: ['role'],
    components: {
        ChangePasswordModal
    },
    data() {
        return {
            isChangePasswordModalVisible: false,
            user: {
                name: '',
                email: '',
            },
            errors: {
                name: null,
                email: null,
            }
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        getUser() {
            userService.me().then((response) => {
            const data = response.data.data
            this.user = data
            }).catch((error) => {
                console.log(error.response.data)
            })
        },
        updateUser() {
        if(this.user.name == null || this.user.name == '') {
            this.errors.name = 'ERROR'
        }

        if(this.user.email == null || this.user.email == '') {
            this.errors.email = 'ERROR'
        }

        if(this.errors.name != 'ERROR' && this.errors.email != 'ERROR') {
            const data = {
                name: this.user.name,
                email: this.user.email,
            }
            userService.updateUser(data).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                
                bus.$emit('updatedUser', true);
                }).catch((error) => {
                this.$toast.error(error.response.data.error_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                })
        }
        },
        
        openChangePasswordModal() {
            bus.$emit('ModalOpen', true);
            this.isChangePasswordModalVisible = true;
        },
        closeChangePasswordModal() {
            this.isChangePasswordModalVisible = false;
            bus.$emit('ModalOpen', false);
        },
    }
}
</script>

<style>

</style>