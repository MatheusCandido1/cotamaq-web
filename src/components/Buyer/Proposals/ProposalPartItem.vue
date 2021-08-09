<template>
  <div class="relative bg-white   overflow-hidden rounded-xl w-full my-4 shadow-xl">
      <div class="flex flex-col min-h-full">
        <div class="px-6 py-4 border-b bg-primary-main flex flex-row justify-between">
          <div class="text-md text-center text-white font-semibold">Proposta #{{proposal.id}}</div>
          <div class="bg-secondary-main text-white font-semibold text-xs text-md px-4 py-1 rounded-md">Prazo: Imediato</div>
        </div>
        <div class="flex flex-row">
            <div class="px-2 py-2 flex-grow">
          <div class="mt-1 px-2">
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p>Preço Unitário: R$ 40,00</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-3">
                     <p>Subtotal: R$ 160,00</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm  my-3">
                     <p>Frete: R$ 20,00</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Total: R$ 180,00</p> 
                </div>
          </div>
        </div>
            <div class="px-2 py-2 flex-grow">
          <div class="mt-1 px-2 ">
                <div class="flex space-x-2 text-gray-800 text-sm">
                     <p>Prazo: Imediato</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Subtotal: R$ 40,00</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Quantidade: {{proposal.quantity}}</p> 
                </div>
                <div class="flex space-x-2 text-gray-800 text-sm my-3">
                     <p>Total: R$ 160,00</p> 
                </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'ProposalPartItem',
    props: ['proposal'],
    data() {
        return {
        }
    },
    methods: {
    }

}
</script>

<style>

</style>