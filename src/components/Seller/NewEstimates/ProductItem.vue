<template>
  <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
          
        <div class="px-6 py-4 border-b bg-primary-main">
            
          <div class="text-md text-center text-white font-semibold">{{product.description}}</div>
        </div>
        <div class="px-2 py-2 flex-grow">
           
          <div class="mt-1 px-2 ">
                
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{product.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Aceita Similar:</span> {{formatSimillar(product.allow_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{!product.brand || product.brand == ''  ? 'Não informado' : product.brand}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-bold">Equipamento:</span> {{product.equipment == null ? 'Não informado': formatEquipment(product.equipment)}}</p> 
                </div>
          </div>
        </div>

        <div v-show="false">
            <div class="border-t-2"></div>       
                    
            <div class="flex justify-between px-4 p-2">

                <button class=" w-5/12 px-1 py-1 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Recusar
                </button>
                <button class=" w-5/12 px-1 py-1 bg-green-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Cotar
                </button>                
                    
            </div>
        </div>

        <div v-if="false">
            <div class="border-t-2"></div>       
                    
            <div class="flex justify-between px-3 p-1 align-middle">
                
                <div class="flex  text-gray-800 text-sm mt-2">
                     <p><span class="font-bold">Propostas enviadas</span> </p> 
                </div>
               
                <button class="flex items-center  justify-between px-2 py-2 bg-red-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    <p>3</p>
                </button>                
                    
            </div>

            <div class="flex px-3   mb-2 ">              
                 
                 <button class=" w-5/12 px-1 py-1 bg-green-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Aprovada
                </button>

                <button  class="flex items-center ml-2 justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                    </svg>            
                </button>

            </div>
            
        </div>

        <div v-if="false">
            <div class="border-t-2"></div>

            <div class=" flex justify-center">           
                <button class=" p-1  mt-2 bg-red-500 w-4/5 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Rejeitada por você !
                </button>           
            </div>

            <div class=" flex justify-center">           
                <button class="px-1 py-1 bg-blue-500 m-2 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray">
                    Reabrir
                </button>           
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
    components:{
    },
    data() {
        return {
           
           
        }
    },
    methods: {
        formatEquipment,
        formatSimillar,
        formatStatus(value) {
            let format = this.status.find(status => status.id == value)
            return format
        },
       
    },
    created(){
       
       
    }

}
</script>

<style>

</style>