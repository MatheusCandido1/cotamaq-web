<template>
  <div class="relative bg-white   overflow-hidden rounded-xl w-64 my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
          
        <div class="px-6 py-4 border-b bg-primary-main">
            
          <div class="text-md text-center text-white font-semibold">{{formatEquipment(product.equipment)}}</div>
        </div>
        <div class="px-2 py-2 flex-grow">
            <ul class="flex space-x-2 justify-end">
                <li class="bg-blue-400 text-white text-xs text-md px-4 py-1 rounded-md">{{product.category.name}} </li>
            </ul>
          <div class="mt-1 px-2 ">
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p>Quantidade: {{product.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Aceita Similar: {{formatSimillar(product.allow_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Marca: {{product.brand}}</p> 
                </div>
          </div>
        </div>
        <div class="border-t-2"></div>
         <div class="flex justify-between px-4 ">
                    <div class="my-2">
                        <p class="font-semibold text-base mb-2">Propostas</p>
                    </div>
                    <div class="my-2">
                        <span class="badge mb-3 bg-primary-main rounded-lg px-2 py-1 text-center object-right-top text-white text-sm mr-1 font-bold">0</span>
                    </div>
                </div>
                
        <div class="border-t-2"></div>
        <div class="flex justify-between px-4 ">
                    <div class="my-2">
                        <div :class="formatStatus(product.status).bg" class="w-full text-sm px-2 py-1 font-semibold text-white rounded-lg dark:text-white">
                            {{formatStatus(product.status).text}}
                        </div>
                    </div>
                    <div class="my-2 ml-2">
                        <div class="flex items-center space-x-1 text-sm">
                            <button class="flex items-center justify-between px-2 py-2 bg-blue-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button class="flex items-center justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                                </svg>
                            </button>
                            <button class="flex items-center justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <button class="flex items-center justify-between px-2 py-2 bg-yellow-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
      </div>
    </div>
</template>

<script>
import { formatEquipment, formatSimillar } from '@/helpers/string-helper';

export default {
    name: 'ProductItem',
    props: ['product'],
    data() {
        return {
            status: [
                {id: 1, bg: 'bg-orange-400', text: 'Rascunho'}
            ],
        }
    },
    methods: {
        formatEquipment,
        formatSimillar,
        formatStatus(value) {
            let format = this.status.find(status => status.id == value)
            return format
        }
    }

}
</script>

<style>

</style>