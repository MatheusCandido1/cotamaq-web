<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-1/2 my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Métodos e Condições de Pagamento
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
              <div class="flex w-full -mx-3">
                        <div class="w-1/2 px-3 mb-5  border-r-2 border-primary-main p-2">
                            <p class="text-md font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Métodos de Pagamento </p>
                            <span class="flex justify-center items-center mb-2">
                                <div class="flex flex-wrap gap-2">
                                    <span class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-gray-500 rounded mr-2">Teste</span>                       
                                </div>   
                            </span>
                            <div class="flex items-center justify-center flex-wrap">
                                <label for="" class="text-sm font-semibold text-gray-600 px-1">Selecionado: </label>
                                <span class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">Testeeeee</span>                       
                            </div>  
                        </div>

                        <div class="w-1/2 px-3 mb-5 p-2">
                            <p class="text-md font-semibold text-center text-gray-700 dark:text-gray-200 mb-2">Condições de Pagamento </p>
                            <span class="flex justify-center items-center mb-2">
                                <div class="flex flex-wrap gap-2">
                                    <span class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-gray-500 rounded mr-2">Teste</span>                       
                                </div>  
                            </span>
                            <div class="flex items-center justify-center flex-wrap">
                                <label for="" class="text-sm font-semibold text-gray-600 px-1">Selecionado: </label>
                                <span class="inline-flex items-center justify-center px-2 whitespace-no-wrap py-1 text-xs font-bold leading-none text-white bg-primary-main rounded mr-2">Testeeeee</span>                       
                            </div>  
                        </div>
              </div>
          </div>
          <!--footer-->
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
export default {
  name: "OrderPayments",
  components: {
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