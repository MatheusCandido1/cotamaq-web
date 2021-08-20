<template>
  <span>
    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <UserForm></UserForm>
    </div>
    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <UserGRid></UserGRid>
    </div>
  </span>
</template>

<script>
import  UserForm from '../../components/Shared/User/Userform.vue'
import  UserGRid from '../../components/Shared/User/UserGrid.vue'
    export default {
        components:{
            UserForm,
            UserGRid
        }
        
    }
</script>

<style lang="scss" scoped>

</style>