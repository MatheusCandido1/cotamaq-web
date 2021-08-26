<template>
  <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
          
        <!-- <div class="px-6 py-4 border-b bg-primary-main">
            
          <div class="text-md text-center text-white font-semibold">{{product.description}}</div>
        </div> -->

         <div class="px-6 py-4 border-b bg-primary-main">
            
          <div class="borsder border-red-5s00 md:text-md sm:text-sm flex flex:wrap  text-white font-semibold"><p>{{product.description}}</p></div>
          <div class="text-md bordser border-red-s500 flex justify-end text-white font-semibold"><p>R$ 1.50000</p></div>
        </div>
        <div class="px-2 py-2 flex-grow">
           
          <div class="mt-1 px-2 ">
                
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Revenda:</span> {{product.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Vendedor:</span> {{product.quantity}}</p> 
                </div>
                 <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Quantidade:</span> {{product.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Aceita Similar:</span> {{formatSimillar(product.allow_similar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p><span class="font-bold">Marca:</span> {{!product.brand || product.brand == ''  ? 'Não informado' : product.brand}}</p> 
                </div>
                
          </div>
        </div>

          

        <div v-if="true">
            <div class="border-t-2"></div> 

            <div class=" bg-blue-500 text-white flex justify-center rounded-md py-1  "> 
                <p>Diversos</p>
            </div>      
                    
          

            <div class="flex justify-between px-3 py-2   mb-2 ">              
                 
                 <button class=" w-1/1 px-2  py-2 flex bg-green-500 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                  @click="togglePagesMenu"
                  aria-haspopup="true">
                    <span class="inline-flex items-center">                
                  <span class=" text-xs">Aprovada</span>
                </span>
               
                </button>

                <div class="flex">
                    <button  class="flex items-center ml-2 justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"/>
                    </svg>            
                </button>
                <button  class="flex items-center ml-2 justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>         
                </button>
                <button  class="flex items-center ml-2 justify-between px-2 py-2 bg-primary-lighter text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
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