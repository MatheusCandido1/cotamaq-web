<template>
  <transition name="modal-fade">
    <div
        class="overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl ">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div
            class="border-0   rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none md:h-auto h-screen ">
          <!--header-->
          <div class="md:flex mt-3 items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl  font-semibold">
              Visualizar Anexos - Pedido #{{ selectedOrder.id }}
            </h3>
            <h3 class="text-xl mt-2 font-semibold">
              Cotação #{{ selectedOrder.proposal.estimate_id }}
            </h3>
          </div>
          <!--body-->
          <div class="relative bg-white p-6 flex-auto">
            <div class="md:flex justify-center items-center bg-white">
              <a :href="selectedOrder.pdf_path" style="text-decoration: inherit; color: inherit" target="blank">
                <div :class="selectedOrder.pdf ? 'cursor-pointer':''"
                     class="md:w-60 w-full  h-50 mr-4 bg-white rounded-lg shadow-md p-6  mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                     tabindex="0">
                  <div class="flex grid justify-center items-center mb-3">
                    <div class="flex justify-center items-center">
                      <div :class="selectedOrder.pdf ? 'bg-primary-lighter':'bg-gray-400'"
                           class="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
                        <i class="mdi mdi-file-pdf-outline text-white text-3xl"></i>
                      </div>
                    </div>
                    <h2 class="text-base text-center text-blue-darker my-2">Nota Fiscal (PDF)</h2>
                    <p class="text-sm text-center text-gray-700">
                      {{ selectedOrder.pdf ? 'Clique para fazer download!' : 'Não disponível' }}</p>
                  </div>
                </div>
              </a>

              <a :href="selectedOrder.xml_path" style="text-decoration: inherit; color: inherit" target="blank">
                <div :class="selectedOrder.xml ? 'cursor-pointer':''"
                     class="md:w-60 w-full h-50 mr-4 bg-white rounded-lg shadow-md p-6  mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                     tabindex="0">
                  <div class="flex grid justify-center items-center mb-3">
                    <div class="flex justify-center items-center">
                      <div :class="selectedOrder.xml ? 'bg-primary-lighter':'bg-gray-400'"
                           class="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
                        <i class="mdi mdi-xml text-white text-3xl"></i>
                      </div>
                    </div>
                    <h2 class="text-base text-center text-blue-darker my-2">Nota Fiscal (XML)</h2>
                    <p class="text-sm text-center text-gray-700">
                      {{ selectedOrder.xml ? 'Clique para fazer download!' : 'Não disponível' }}</p>
                  </div>
                </div>
              </a>

              <a :href="selectedOrder.billet_path" style="text-decoration: inherit; color: inherit" target="blank">
                <div :class="selectedOrder.billet ? 'cursor-pointer':''"
                     class="md:w-60 w-full h-50 mr-4 bg-white rounded-lg shadow-md p-6  mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                     tabindex="0">
                  <div class="flex grid justify-center items-center mb-3">
                    <div class="flex justify-center items-center">
                      <div :class="selectedOrder.billet ? 'bg-primary-lighter':'bg-gray-400'"
                           class="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
                        <i class="mdi mdi-barcode-scan text-white text-3xl"></i>
                      </div>
                    </div>
                    <h2 class="text-base text-center text-blue-darker my-2">Boleto</h2>
                    <p class="text-sm text-center text-gray-700">
                      {{ selectedOrder.billet ? 'Clique para fazer download!' : 'Não disponível' }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <!--footer-->
          <div class="flex bg-white items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                type="button"
                @click="close"
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
  name: "OrderFile",
  props: ['order'],
  components: {
  },
  data() {
      return {
        selectedOrder: JSON.parse(JSON.stringify(this.$props.order)),
      }
  },
  created() {
  },
  destroyed() {
      this.close()
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>