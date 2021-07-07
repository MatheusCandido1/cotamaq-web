<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <form @submit.prevent="updatePassword">
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Alterar senha
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Senha atual</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @change="() => (errors.current_password = 'OK')" :class="errors.current_password == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="user.current_password"  placeholder="" type="password" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>   
                     <div v-if="errors.current_password == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Senha Atual é obrigatório.</span>
                    </div>                         
                </div>
            </div>

             <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Nova senha</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @change="() => (errors.password = 'OK')" :class="errors.password == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="user.password"  placeholder="" type="password" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>    
                     <div v-if="errors.password == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Nova Senha é obrigatório.</span>
                    </div>                        
                </div>
            </div>

             <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Confirmação da nova senha</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @change="() => (errors.password_confirmation = 'OK')" :class="errors.password_confirmation == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="user.password_confirmation"  placeholder="" type="password" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>
                    <div v-if="errors.password_confirmation == 'ERROR'">
                      <span class="text-xs text-red-400 font-semibold px-1">O campo Confirmação da nova senha é obrigatório.</span>
                    </div>                           
                </div>
            </div>

          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="disabled"
              class="w-full bg-primary-main hover:bg-primary-lighter inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salvar
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { userService } from '../../../services'
export default {
  name: "ChangePasswordModal",
  components: {
  },
  data() {
      return {
            disabled: false,
            user: {
                current_password: '',
                password: '',
                password_confirmation: '',
            },
            errors: {
              current_password: null,
              password: null,
              password_confirmation: null,
            }
      }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updatePassword() {
        if(this.user.current_password == null || this.user.current_password == '') {
            this.errors.current_password = 'ERROR'
        }

        if(this.user.password == null || this.user.password == '') {
            this.errors.password = 'ERROR'
        }

        if(this.user.password_confirmation == null || this.user.password_confirmation == '') {
            this.errors.password_confirmation = 'ERROR'
        }

        if(this.errors.password_confirmation != 'ERROR' && this.errors.password != 'ERROR' && this.errors.current_password != 'ERROR') {
            this.disabled = true
            const data = {
                current_password: this.user.current_password,
                new_password: this.user.password,
                new_confirmation_password: this.user.password_confirmation
            }
            userService.changePassword(data).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.close();
                this.disabled = false
                }).catch((error) => {
                this.$toast.error(error.response.data.error_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.disabled = false
                })
        }
    }
  },
};
</script>