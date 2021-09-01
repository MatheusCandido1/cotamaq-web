<template>
    <div>
        <form @submit.prevent="confirmAccount">
            <button type="submit" class="block w-full max-w-xs mx-auto bg-primary-main hover:bg-primary-lighter focus:bg-primary-lighter text-white rounded-lg px-3 py-3 font-semibold">Atualizar senha <i class="mdi mdi-lock text-lg"></i></button>
        </form>
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
        beforeCreate(){
            userService.confirmEmail(this.$route.query.token).then((response)=>{
                if(response.success_message){

                     this.$toast.success(response.success_message, {
                            position: "bottom-right",
                            pauseOnHover: false,
                            showCloseButtonOnHover: true,
                            timeout: 2500
                    });

                    this.$router.push('/entrar')

                }
            })
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