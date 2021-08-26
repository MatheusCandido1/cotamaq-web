<template>
  <div class="flex ">
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
                  <i class="mdi mdi-email text-xl"></i> 
                    <span class="ml-1">Notificações não lidas</span>
                    <span class="ml-1 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-primary-main rounded-full">{{notificationNotRead.length}}</span>

                </div>
                <div :class="option == 2 ? 'border-primary-main text-primary-main': 'border-gray-200 text-gray-800 hover:text-black'" @click="changeOption(2)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none   tracking-wider rounded-t">
                  <i class="mdi mdi-email-open-outline text-xl"></i> <span class="ml-1">Todas notificações</span>
                </div>
              </div>
            </div>
          </section>
          <div class="flex  text-center w-full">
            <div v-if="option == 1" class=" w-full"> 
              <div class="   justify-start">
                <NotificationItem  v-for="(notification, index) in notificationNotRead" :key="notification.id"
                 :index="index" :notification="notification" @markAsRead="MarkAsReadClick" />

              </div>
            </div>
            <div v-if="option == 2" class=" w-full"> 
              <div class="  justify-start">
                <NotificationItem v-for="(notification,index) in notificationList" :key="notification.id" 
                :index="index" :notification="notification" @markAsNotRead="markAsNotRead" />
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
        notificationsList: this.$store.getters.notificationList,
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
    computed:{
      notificationList(){
        return this.$store.getters.notificationList
      },
      notificationNotRead(){
        return this.$store.getters.notificationNotRead
      }
    },
    methods: {
      markAsNotRead(notification){
        console.log(notification)
        this.notificationNotRead.push(notification)
      },
      MarkAsReadClick(index, notification){
        var list = []
        
        console.warn(this.notificationsList)

        this.notificationList.forEach((data)=>{         

          if(data.id == notification.id){
            list.push({
              id: data.id,
              notification: data.notification,
              read: 1,
              read_at: data.read_at,
              estimate_id: data.estimate_id,
              proposal_id: data.proposal_id,
              order_id: data.order_id,
              user_id: data.user_id,
              created_at: data.created_at,
              updated_at: data.updated_at
            })
          }else{
             list.push(data)
          }
         
        })
        // this.notificationsList = list
              this.$store.commit('setNotificationList', list)

        console.log(this.notificationsList)
         
       
        this.notificationNotRead.splice(index,1)

      },
      changeOption(value) {
        this.option = value
      },
      formatItem(value) {
        let format = this.formats.find(status => status.id == value)
        return format
      },
      getNotifications(){
        console.log(this.notificationsList)
        this.notificationsList.forEach((data)=>{
          
          if(data.read == 0){
            this.notificationsNotRead.push(data)
          }

        })
        console.log(this.notificationsNotRead)
      }
    },
    mounted(){
      console.log(this.notificationsList)
    }
    
    
        
  }
</script>
<style>
  .badge {
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #000;
    color: #d7e6fd;
    right: 0;
    border-radius: 9999px;
    font-size: 12px;
    min-width: 18px;
    line-height: 18px;
    min-height: 18px;
    text-align: center;
  }
</style>