<template>
    <li   class="hover:bg-gray-100 flex border-2 rounded-lg border-primary-main cursor-pointer">
        <div @click="goNotificaiton"
            
            class="inline-flex items-center text-gray-700 hover:text-black w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:text-gray-800"
        >
            <span>{{notification.notification}}</span>
        </div>
    </li>
</template>

<script>

export default {
    name: 'NotificationPreview',
    props:['notification', 'index'],
    data() {
        return {

        }
    },
    methods: {
        goNotificaiton(){
            console.log('lick')
          this.$emit('deleteNotification', this.index)
          this.$router.push({ name: 'partDetails', params:{id:this.notification.id} })

        }
    }
}
</script>

<style>

</style>