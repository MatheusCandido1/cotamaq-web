<template>
    <div class="bg-white w-full mx-auto my-4 border border-grey-light">
        <div class="flex pt-4 px-4">
            <div class="px-2 pt-2 flex-grow">
                <div class="flex flex-row justify-between">
                    <span class="text-black no-underline font-medium">{{getAction()}} #{{notification.estimate_id}}</span>
                    <span :class="formatItem().bg" class="text-white text-sm font-semibold text-md px-4 py-1 rounded-md mb-2">{{formatItem().text}}</span>
                </div>
                <header>
                    <div class="text-xs text-grey flex items-center my-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="h-4 w-4 mr-1 feather feather-calendar">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{{currentNotification.created_at}}</span>
                    </div>
                </header>
                <article class="py-4 text-grey-darkest text-left">
                {{currentNotification.notification}}
                </article>
                <footer class="border-t border-grey-lighter text-sm flex">
                    <button @click="handleMarkAsReadClick" class="block no-underline text-sm text-black flex px-4 py-2 items-center hover:bg-grey-lighter">
                        <span><i class="text-md mr-1" :class="currentNotification.read ? 'mdi mdi-email-open-outline' : 'mdi mdi-email'"></i>{{currentNotification.read ? 'Marcar como não lida':'Marcar como  lida'}}</span>
                    </button>
                    <button class="block no-underline text-black flex px-4 py-2 items-center hover:bg-grey-lighter">
                        <span><i class="text-md mdi mdi-open-in-new mr-1"></i>Ver {{getAction()}}</span>
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: ['notification','index'],
    data() {
        return {
            currentNotification: JSON.parse(JSON.stringify(this.$props.notification)),
            formats: [
                {id: 1, bg: 'bg-primary-main', text: 'Cotações'},
                {id: 2, bg: 'bg-orange-500', text: 'Propostas'},
                {id: 3, bg: 'bg-indigo-500', text: 'Pedidos'}
            ],
        }
    },
    methods: {
        handleMarkAsReadClick(){
            if(this.currentNotification.read == 1){
                this.currentNotification.read = 0
                this.$emit('markAsNotRead', this.notification)

            this.$toast.success('Foi marcado como  desligo', {
                  position: "bottom-right",
                  pauseOnHover: false,
                  showCloseButtonOnHover: true,
                  timeout: 3500,
              });
            } else {
<<<<<<< HEAD
                this.currentNotification.read = 1               
=======
                this.currentNotification.read = 1
               
>>>>>>> e575c20 (make-system-notification)
                
                this.$emit('markAsRead',this.index, this.notification)

                // this.$emit('markAsRead', this.index)
                this.$toast.success('Foi marcado como lido', {
                  position: "bottom-right",
                  pauseOnHover: false,
                  showCloseButtonOnHover: true,
                  timeout: 3500,
              });


            }

            
        },
        getFormatId() {
            if(this.currentNotification.estimate_id != null) {
                return 1
            }

            if(this.currentNotification.proposal_id != null) {
                return 2
            }

            if(this.currentNotification.order_id != null) {
                return 3
            }
        },
        getAction() {
            if(this.currentNotification.estimate_id != null) {
                return 'Cotação'
            }

            if(this.currentNotification.proposal_id != null) {
                return 'Proposta'
            }

            if(this.currentNotification.order_id != null) {
                return 'Pedido'
            }
        },
        formatItem() {
            let format = this.formats.find(status => status.id == this.getFormatId())
            return format
        }
    }
}
</script>

<style>

</style>