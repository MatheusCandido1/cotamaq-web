<template>
   <span>
   <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
                      <div class="flex -mx-3">
                        <div class="w-4/5 px-3 mb-5">
                            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Consulta de cotações</h2>
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <router-link  :to="{path: '/criar/cotacao'}" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  <span class="justify-center ml-2">Nova Cotação</span>
                                </router-link>  
                                </div>  
                        </div>
                      </div>
              <div class="flex -mx-3">
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Data Início</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="date" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Data Final</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="date" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-sm font-semibold text-gray-600 px-1">Situação</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <select class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lightercursor-pointer">
                                    <option selected>Selecione...</option>
                                    <option value="01">Rascunho</option>
                                    <option value="02">Enviada</option>
                                    <option value="03">Cancelada</option>
                                    <option value="04">Andamento</option>
                                  </select>                            
                              </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button class="w-full flex items-center justify-center bg-white text-gray-600 font-semibold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                  </svg>
                                  <span class="justify-center ml-2">Filtrar</span>
                                </button>                         
                                </div>                         
                        </div>
                        <div class="w-1/5 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1"></label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button class="w-full flex items-center justify-center bg-white text-gray-600 font-semibold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                                  <span class="justify-center ml-2">Limpar</span>
                                </button>                         
                                </div>                         
                        </div>
                    </div>
            </div>

  </span>
</template>
<script>

export default {
    name: 'Proposals',
    components: {
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>

<style>

</style>