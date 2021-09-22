<template>
    <transition name="modal-fade">
        <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-1/2 my-6 mx-auto max-w-6xl">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
                </div>
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 class="text-xl font-semibold">
                        Rastreamento - Pedido #{{order.id}}
                        </h3>
                    </div>
                    <div class="relative p-6 flex-auto">
                        <div class="p-4 mt-4">
                            <div class="container">
                                <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
                                    <OrderTrackingItem :time="order.created_at" status="Compra realizada" />
                                    <OrderTrackingItem v-if="order.pending_at != null" :time="order.pending_at" status="Aguardando comprador" />
                                    <OrderTrackingItem v-if="order.preparing_at != null" :time="order.preparing_at" status="Em preparo" />
                                    <OrderTrackingItem v-if="order.in_transit_at != null" :time="order.in_transit_at" status="Em trânsito" />
                                    <OrderTrackingItem v-if="order.delivered_at != null" :time="order.delivered_at" status="Entregue" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                        type="button"
                        @click="close"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import OrderTrackingItem from './OrderTrackingItem'
export default {
  name: "OrderTracking",
  props: ['order'],
  components: {
      OrderTrackingItem
  },
  destroyed() {
    this.close();
  },
  data() {
      return {
      }
  },
  methods: {
        close() {
        this.$emit("close");
        },
    },
};
</script>