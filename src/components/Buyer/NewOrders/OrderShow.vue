<template>
  <div class="flex flex-col">
    <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex flex-row justify-between">
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Pedido #1 <span class="bg-primary-main w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">Entrega</span>
          </h2>
        </div>
        <div class="py-1 flex whitespace-nowrap	">
          <div :class="formatStatus(order.status).bg" class="text-center w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">
            <span class="justify-center"><i :class="formatStatus(order.status).icon" class="text-white mr-1"></i>{{formatStatus(order.status).text}}</span>
          </div> 
          <div class=" bg-gray-600 text-center w-full text-sm px-2 py-1 pointer-events-none font-semibold text-white rounded-md dark:text-white ml-2">
            <span class="justify-center"><i class="mdi mdi-printer text-white mr-1"></i>Imprimir</span>
          </div> 
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>

export default {
    name: 'OrderShow',
    components: {
    },
    created() {
    },
    data() {
        return {
          order: {
            id: 1,
            status: 1,
          },
          status: [
            {id: 1, bg: 'bg-orange-400', text: 'Pendente', icon: 'mdi mdi-progress-clock'},
            {id: 2, bg: 'bg-blue-500', text: 'Em preparo', icon: 'mdi mdi-package-variant-closed'},
            {id: 3, bg: 'bg-indigo-600', text: 'Em trânsito', icon: 'mdi mdi-truck-fast-outline'},
            {id: 4, bg: 'bg-primary-main', text: 'Entregue', icon: 'mdi mdi-calendar-check-outline'},
          ],
        }
    },
    methods: {
      formatStatus(value) {
        let format = this.status.find(status => status.id == value)
        return format
      },
    }
    
}
</script>
<style>

</style>