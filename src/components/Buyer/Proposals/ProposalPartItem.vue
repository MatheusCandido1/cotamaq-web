<template>
  <div class="relative bg-white overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
        <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
          <div class="text-md text-center text-white font-semibold">Proposta #{{proposal.id}}</div>
          <div class="bg-white text-black font-semibold text-xs text-md px-2 py-1 rounded-md">R$ 1900,00</div>
        </div>
        <div class="flex flex-row">
            <div class="px-2 py-2 flex-grow">
          <div class="mt-1 px-2">
            <ul class="flex gap-2 justify-start">
                <div class="text-center flex-1 bg-white border-2 border-blue-500 font-semibold text-blue-500 text-xs text-md px-4 py-2 rounded-md mb-2">Entrega Imediata</div>
            </ul>
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p><span class="font-semibold">Preço Unitário: </span>{{proposal.value}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Quantidade: </span>{{proposal.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Frete Entrega: </span>{{proposal.shipping}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Frete Retirada: </span>{{proposal.pickup}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Desconto a vista: </span>{{proposal.discount}}%</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Valor Total: </span>R$ {{proposal.total}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Peça Similar: </span>{{formatSimillar(proposal.is_simillar)}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Marca: </span>{{proposal.brand}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-1">
                     <p><span class="font-semibold">Observação: </span>{{proposal.observation}}</p> 
                </div>
                <button class="flex-1 w-full bg-gray-600 font-semibold text-white text-xs text-md px-4 py-2 rounded-md mb-2">Visualizar Fotos</button>

                <div class="border-t-2"></div>
                 <ul class="flex gap-2 justify-start mt-2">                  
                    <button class="flex-1 bg-primary-main font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2">Comprar</button>
                    <button class="flex-1 bg-red-600 font-semibold text-white text-md text-sm px-4 py-2 rounded-md mb-2">Recusar</button>
                </ul>
                
              </div>
            </div>
          </div>
        </div>
</div>
</template>

<script>
import { formatSimillar } from '@/helpers/string-helper';

export default {
    name: 'ProposalPartItem',
    props: ['proposal'],
    data() {
        return {
        }
    },
    methods: {
      formatSimillar
    }

}
</script>

<style>

</style>