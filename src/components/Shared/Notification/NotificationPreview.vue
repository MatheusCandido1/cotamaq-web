<template>
    <li   class="hover:bg-gray-100 flex border-2 rounded-lg border-primary-main cursor-pointer">
        <div @click="goToNotification" class="inline-flex items-center text-black hover:text-black w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:text-gray-800">
            <span>{{notification.notification}} <span class="text-xs text-primary-main"> {{notification.created_at  | fromNow}}</span></span>
        </div>
    </li>
</template>

<script>
import moment from 'moment'

export default {
    name: 'NotificationPreview',
    props:['notification', 'index'],
    data() {
        return {

        }
    },
    filters: {
        fromNow(date) {
			return moment(date).fromNow();
		}
    },
    methods: {
        goToNotification(){
          this.$emit('deleteNotification', this.index)
          if(this.notification.estimate_id){
          this.$router.push({ name: 'estimates' })
          }else if(this.notification.proposal_id && this.notification.estimate_id){
            this.$router.push({ name: 'ProposalsByEstimate', params:{estimate_id:this.notification.estimate_id} })
          }else if(this.notification.order_id){
              this.$router.push({ name: 'orders' })
          }

        }
    }
}
</script>

<style>

</style>