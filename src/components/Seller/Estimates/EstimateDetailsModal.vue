<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Dados da Cotação
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
            <div class="w-1/3 px-3 mb-5">
                <label for="" class="flex text-xs font-semibold px-1 justify-start ">Entrega</label>
                <div v-if="estimate.delivery == 3" class="flex justify-start space-x-4 mt-3">
                    <div>
                        <input disabled  v-model="estimate.delivery" value="3" class="hidden" id="delivery_3" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_3">
                            <span  class="whitespace-nowrap flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-information text-white-900 text-lg mr-1 ml-1"></i>Não Disponivel</span>
                        </label>
                    </div>
                </div>
                <div v-else class="flex justify-start space-x-4 mt-3">
                    <div>
                        <input  disabled v-model="estimate.delivery" value="1" class="hidden" id="delivery_1" type="radio" name="delivery">
                        <label class="flex h-9 p-1 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_1">
                            <span class="whitespace-nowrap flex items-center justify-center text-gray-900 text-sm font-semibold mr-1"><i class="mdi mdi-truck-fast-outline text-gray-900 text-lg mr-1 ml-1"></i>Envio </span>
                        </label>
                    </div>
                    <div>
                        <input disabled   v-model="estimate.delivery" value="2" class="hidden" id="delivery_2" type="radio" name="delivery">
                        <label class="flex h-9 p-2 border-2 border-gray-400 cursor-pointer rounded-md justify-items-center align-items-center"  for="delivery_2">
                            <span  class="whitespace-nowrap flex items-center justify-center text-gray-900  text-sm font-semibold mr-1"><i class="mdi mdi-package-variant-closed text-gray-900 text-lg mr-1 ml-1"></i>Retirada </span>
                        </label>
                    </div>
                </div>
            </div>   
            </div>

            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Equipamento</label>
                    <div class="flex">
                    <div class="w-full flex items-center justify-center rounded border-b-2 border-primary-main rounded  shadow-md py-2 px-6 inline-flex items-center">
                            <span  class="justify-center whitespace-nowrap">{{estimate.equipment}}</span>
                        </div>                      
                </div>
                </div>
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Modelo</label>
                    <div class="flex">
                     <div class="w-full flex items-center justify-center rounded border-b-2 border-primary-main rounded  shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center whitespace-nowrap">{{estimate.model ? estimate.model:'Não Informado'}}</span>
                        </div>                          
                </div>
                </div>
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                   <div class="w-full flex items-center justify-center rounded border-b-2 border-primary-main rounded  shadow-md py-2 px-6 inline-flex items-center">
                            <span  class="justify-center whitespace-nowrap">{{estimate.brand ? estimate.brand:'Não Informado'}}</span>
                        </div>  
                    </div>                         
                </div>
            </div>

            <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Ano</label>
                    <div class="flex">
                    <div class="w-full flex items-center justify-center rounded border-b-2 border-primary-main  rounded  shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center whitespace-nowrap">{{estimate.year ? estimate.year:'Não Informado'}}</span>
                        </div>                      
                </div>
                </div>
                <div class="w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">CEP</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask v-if="estimate.address.zipcode" :mask="['#####-###']" class="w-full text-center -ml-12 pl-2 pr-3 py-2 rounded-l border-b-2 border-primary-main shadow-md  py-2 px-6 outline-none bg-white focus:border-primary-lighter" disabled type="text" v-model="estimate.address.zipcode"></the-mask>
                </div>
                </div>
            </div>


        
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
  name: "EstimateDetailsModal",
  props: ["estimate"],
  components: {
  },
  data() {
      return {
            selectedEstimate: JSON.parse(JSON.stringify(this.$props.estimate)),
            edit: false
      }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>