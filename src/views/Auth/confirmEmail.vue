<template>
    <div>
        
    </div>
</template>

<script>
import {userService} from '../../services';
    export default {
        beforeCreate(){
            console.log(this.$route.query.token)
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
        }
    }
</script>

<style lang="scss" scoped>

</style>