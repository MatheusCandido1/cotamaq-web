<template>
  <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
          
        <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
            <div class="text-md text-center text-white font-semibold">{{formatMissingInformation('teste')}}</div>
            <div class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md">{{formatCurrency(200.00)}}</div>

        </div>
        <div class="px-2 py-2 flex-grow">
            <ul class="flex space-x-2 justify-end">
                <li class="bg-blue-400 text-white text-xs text-md px-4 py-1 rounded-md mb-2">{{formatMissingInformation('teste')}} </li>
            </ul>
          <div class="mt-1 px-2 ">
                <div class="flex space-x-2 justify-start text-gray-800 text-sm">
                     <p><span class="w-full bg-primary-main text-sm px-2 py-1 font-medium text-white rounded-md">Pedido #{{formatMissingInformation('1')}}</span></p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{formatMissingInformation('teste')}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Aceita Similar:</span> {{formatMissingInformation('teste')}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{formatMissingInformation('teste')}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-bold">Equipamento:</span> {{formatMissingInformation('teste')}}</p> 
                </div>
          </div>
        </div>
        <div class="border-t-2"></div>
        <div class="flex justify-between px-4 ">
                    <div class="my-2">
                        <div :class="formatStatus(order.status).bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-md dark:text-white">
                            <i class="text-white text-sm mr-2" :class="formatStatus(order.status).icon"> </i>{{formatStatus(order.status).text}}
                        </div>
                    </div>
                    <div class="my-2 ml-2">
                        <div class="flex items-center space-x-1 text-sm">
                            <button class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                    </div>
            </div>
      </div>
    </div>
</template>
<script>

import { formatMissingInformation, formatCurrency } from '@/helpers/string-helper';

export default {
    name: 'OrderItem',
    props: ['order'],
    components:{
    },
    data() {
        return {
           status: [
                {id: 1, bg: 'bg-orange-400', text: 'Pendente', icon: 'mdi mdi-progress-clock'},
                {id: 2, bg: 'bg-blue-500', text: 'Em preparo', icon: 'mdi mdi-package-variant-closed'},
                {id: 3, bg: 'bg-indigo-600', text: 'Em trânsito', icon: 'mdi mdi-truck-fast-outline'},
                {id: 4, bg: 'bg-primary-main', text: 'Entregue', icon: 'mdi mdi-calendar-check-outline'},
            ],
        }
    },
    methods: {
        formatCurrency,
        formatMissingInformation,
        formatStatus(value) {
            let format = this.status.find(status => status.id == value)
            return format
        },
    }

}
</script>

<style>

</style>