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
                <form @submit.prevent="confirmAccount">
                    <div class="flex flex-col justify-center items-center">
                        <p class="text-black font-semibold text-lg dark:text-gray-300">
                            Seja bem vindo(a) ao COTAMAQ!
                        </p>

                        <p class="text-gray-700 dark:text-gray-300 mt-2">
                        Viemos para mudar o cenário e a forma como são feitas as cotações de peças no agronegócio, focando na agilidade, praticidade e economia para o produtor, bem como, organização e oportunidades de atingir novos clientes para o vendedor.
                        </p>
                    </div>
                    <button type="submit" class="mt-3 block w-full max-w-xs mx-auto bg-primary-main hover:bg-primary-lighter focus:bg-primary-lighter text-white rounded-lg px-3 py-3 font-semibold">Entrar <i class="mdi mdi-login text-lg"></i></button>
                           
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { userService } from '../../services';
    export default {
        created() {
            this.token = this.$route?.query?.token || '';
        },
        beforeRouteEnter(to, from, next) {
            if(!to?.query?.token) {
                next({name: 'login'});
            }
            next();
        },
        methods: {
            confirmAccount() {
                const payload = {
                    token: this.token,
                }; 
                userService.confirmEmail(payload).then((response) => {
                    this.$toast.success(response.success_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 3500
                    });
                    this.$router.push({name: 'login'})

                }).catch((error) => {
                    this.$toast.error(error.response.data.error_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 2500
                    });
                    this.$router.push({name: 'login'})
                });

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>