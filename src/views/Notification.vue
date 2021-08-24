<template>
  <div class="flex flex-col">
      <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div class="flex justify-center">
              <div class="py-1">
                  <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                    Notificações
                  </h2>
              </div>
          </div>
          
          <div class="flex flex-row justify-center gap-2">
            <button  v-for="index in 3" :key="index" :class="formatItem(index).bg" class="text-white text-sm font-semibold text-md px-4 py-1 rounded-md mb-2">{{formatItem(index).text}}</button>
           </div>

           <section class="text-gray-600 body-font">
            <div class="container  mx-auto flex flex-wrap flex-col">
              <div class="flex mx-auto flex-wrap ">
                <div :class="option == 1 ? 'border-primary-main text-primary-main': 'border-gray-200 text-gray-800 hover:text-black'" @click="changeOption(1)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none   tracking-wider rounded-t">
                  <i class="mdi mdi-email text-xl"></i> <span class="ml-1">Notificações não lidas</span>
                </div>
                <div :class="option == 2 ? 'border-primary-main text-primary-main': 'border-gray-200 text-gray-800 hover:text-black'" @click="changeOption(2)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none   tracking-wider rounded-t">
                  <i class="mdi mdi-email-open-outline text-xl"></i> <span class="ml-1">Todas notificações</span>
                </div>
              </div>
            </div>
          </section>
          <div class="flex flex-col text-center w-full">
            <div v-if="option == 1" class=""> 
              <div class="flex justify-start">
                <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
              </div>
            </div>
            <div v-if="option == 2" class=""> 
              <div class="flex justify-start">
                <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
              </div>
            </div>
          </div>
          
      </div>
  </div>
</template>
<script>
import NotificationItem from '../components/Shared/Notification/NotificationItem'
  export default {
    name:"Notification",
    components: {
      NotificationItem
    },
    data() {
      return {
        option: 1,
        notifications: [
          {id: 1, notification: 'Você recebeu uma nova Cotação, responda agora e saia na frente dos concorrentes!', read: 1, read_at: '24/08/2021', estimate_id: 1, proposal_id: null, order_id: null, created_at: '25/08/2021 - 10:11'}
        ],
        formats: [
          {id: 1, bg: 'bg-primary-main', text: 'Cotações'},
          {id: 2, bg: 'bg-orange-500', text: 'Propostas'},
          {id: 3, bg: 'bg-indigo-500', text: 'Pedidos'}
        ],
      }
    },
    methods: {
      changeOption(value) {
        this.option = value
      },
      formatItem(value) {
        let format = this.formats.find(status => status.id == value)
        return format
      }
    }
        
  }
</script>
<style lang="scss" scoped>

</style>