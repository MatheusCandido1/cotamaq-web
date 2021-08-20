<template>
    <span>
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Dados do Usuário</h2>
            </div>
        </div>

        <form @submit.prevent="createUser">
             <div class="lg:flex">
                   <div class="lg:w-1/3 md:w-full  sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Nome</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center" ></div>
                        <input placeholder="Ex: Fernando"  v-model="user.name "  @change="() => (errors.user.name = 'OK')" :class="errors.user.name == 'ERROR' ? 'border-red-400':'border-primary-main'"   type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md px-6 outline-none  ">
                    </div> 
                    <div v-if="errors.user.name == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Nome é obrigatório.</span>
                    </div>                       
                </div>

                 <div class="lg:w-1/3 md:w-full  sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Email</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder="Ex: fernando@gmail.com"  v-model="user.email"  @change="() => (errors.user.email = 'OK')" :class="errors.user.email == 'ERROR' ? 'border-red-400':'border-primary-main'"    type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md px-6 outline-none  ">
                    </div>   
                    <div v-if="errors.user.email == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Email é obrigatório.</span>
                    </div>                       
                </div>


                 <div class="lg:w-1/3 md:w-full  sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Senha</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder="Digite sua senha" v-model="user.password"  @change="() => (errors.user.password = 'OK')" :class="errors.user.password == 'ERROR' ? 'border-red-400':'border-primary-main'"    type="password" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md px-6 outline-none ">
                    </div>  
                    <div v-if="errors.user.password == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Senha é obrigatório.</span>
                    </div>                       
                </div>
             </div>

             <div class="flex -mx-3 justify-end">
                <div class="w-1/5 px-3 mb-5 ">
                    <label for="" class="text-sm font-semibold px-1"></label>
                    <div class="flex items-center justify-center">
                        <button :disabled="disabled" type="submit" class="w-full  justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar</span>
                        </button>                         
                    </div>   
                </div>
            </div>

        </form>
    </span>
</template>

<script>
import { companyService} from '../../../services'
import { bus } from '../../../main';
import { required } from 'vuelidate/lib/validators'


    export default {
        data() {
            return {
                user: {
                    name:'',
                    email:'',
                    password:'',
                },
                disabled:false,
                errors:{
                    user:{
                        name:null,
                        email:null,
                        password:null,
                    }
                }
            }
        },
        methods: {
            createUser() {
                this.$v.$touch()
              
                if(this.$v.user.name.$invalid){
                    this.errors.user.name = 'ERROR'                  
                } 
                if(this.$v.user.email.$invalid){
                    this.errors.user.email = 'ERROR'                  
                }
                 if(this.$v.user.password.$invalid){
                    this.errors.user.password = 'ERROR'                  
                }

                if(this.$v.$anyError == false) {
                 companyService.createUser(this.user).then((response)=>{
                   this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                bus.$emit('updatedUser', true);
               })
            }

            
               
            }
        },
        validations: {
            user:{
                name:{
                   required
                },
                email:{
                    required
                },
                password:{
                    required
                }
                  
                  
            }
              
        }
      
    }
</script>

<style lang="scss" scoped>

</style>