<template>
<div>
  <div class="flex flex-col">
    <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex justify-center" >
        <div class="py-1">
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Visualizar Propostas
          </h2>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div class="py-1">
         <span class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded cursor-pointer">Balde de graxa tilub 10kg<i class="mdi mdi-file-search ml-2"></i></span>
        </div>
        <div class="py-1">
          <span class="items-center justify-center px-2 py-1 text-md font-bold text-white bg-primary-main rounded  cursor-pointer">Detalhes do Equipamento<i class="mdi mdi-file-search ml-2"></i></span>
        </div>
      </div>
      <div class="flex flex-row justify-between mb-2 items-center">
        <div>
          <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Propostas
          </h2>
        </div>
        <div class="">
          <div class="flex">
              <select class="w-full  pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lightercursor-pointer">
                <option selected value="0">Exibir todas...</option>
              </select>                            
            </div> 
        </div>
      </div>
      <div class="border-t-2"></div>

      <div class="flex">
        <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
          <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
            <ProposalPartItem v-for="proposal in proposals" :key="proposal.id"  :proposal="proposal" />
          </div>
        </div>
      </div>
    </div>
  </div>   
</div> 
</template>

<script>
import ProposalPartItem from '../Proposals/ProposalPartItem'
export default {
    name: 'PartProposals',
    components: {
      ProposalPartItem
    },
    data() {
        return {
          proposals: [
            {id: 1, value: 20.00, quantity: 3, shipping: 10, pickup: 20, discount: 1, total: 20, is_simillar: 1, brand: 'teste', observation: '...'},
            {id: 2, value: 20.00, quantity: 3, shipping: 10, pickup: 20, discount: 2, total: 20, is_simillar: 1, brand: 'teste', observation: '...'},
            {id: 3, value: 20.00, quantity: 3, shipping: 10, pickup: 20, discount: 3, total: 20, is_simillar: 1, brand: 'teste', observation: '...'},
            {id: 4, value: 20.00, quantity: 3, shipping: 10, pickup: 20, discount: 4, total: 20, is_simillar: 1, brand: 'teste', observation: '...'},

          ] 
        }
    },
}
</script>

<style>

</style>