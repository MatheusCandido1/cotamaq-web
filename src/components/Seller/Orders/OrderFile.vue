<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Anexar Nota Fiscal - Pedido #{{selectedOrder.id}}
            <bar-loader class="mt-3" :color="loader.color" :loading="loader.loading" :size="150"></bar-loader>
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                <form @submit="submitPdf" enctype="multipart/form-data">
                 <section class="h-full overflow-auto w-full h-full flex flex-col">
                 <label for="pdf" class="text-sm font-semibold text-center text-gray-600 px-1 mb-2">Nota Fiscal (PDF)
            <header class="border-dashed border-2 border-gray-400 py-8 flex flex-col justify-center items-center">
               <div class="cursor-pointer mx-auto mb-2 bg-primary-lighter flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
            <i class="mdi mdi-file-pdf text-white text-3xl"></i>
          </div>
              <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Arraste e solte seu arquivo aqui ou <span class="font-bold"> Clique para escolher o arquivo</span></span>
              </p>
              <input @change="onChangePdf" id="pdf" name="pdf" type="file" class="hidden" />
            </header>
            </label>
            <span class="flex items-center justify-center text-primary-main mb-1" v-if="filename.pdf">{{filename.pdf}}</span>
            <div class="relative pt-1" v-if="progress.pdf > 1 && progress.pdf <= 100">
  <div class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary-main">
        Enviando
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-primary-main">
        {{progress.pdf}}%
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
    <div aria-valuemin="0" aria-valuemax="100" :aria-valuenow="progress.pdf" :style="{width: progress.pdf + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-darker"></div>
  </div>
</div>
            <div class="flex justify-center mb-2" v-if="errors.pdf">
                    <span class="text-xs text-red-500 font-semibold px-1 text-center">O arquivo deve ser do formato PDF.</span>
                </div>  
            <button v-if="files.pdf" :disabled="disabled" type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2">Enviar</button>
            
          </section>  
                </form>  
                 <div  v-if="newOrder.pdf" class="p-6">
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Nota Fiscal (PDF)</h1>
            <p class="leading-relaxed mb-3">Você já anexou uma Nota Fiscal (PDF). Caso enviei um novo arquivo, o arquivo atual será <span class="text-red-500 font-semibold">excluido e substituído.</span></p>
            <div class="flex items-center flex-wrap ">
              <i class="mdi mdi-file-pdf text-primary-main mr-1"></i>
              <a :href="newOrder.pdf_path" target="_blank" class="text-primary-main inline-flex items-center md:mb-2 lg:mb-0">Ver Nota Fiscal (PDF)
              </a>
            </div>
                  </div>
                </div>


                <div class="w-1/3 px-3 mb-5">
                <form @submit="submitXml" enctype="multipart/form-data">
                 <section class="h-full overflow-auto w-full h-full flex flex-col">
                 <label for="xml" class="text-sm font-semibold text-center text-gray-600 px-1 mb-2">Nota Fiscal (XML)
            <header class="border-dashed border-2 border-gray-400 py-8 flex flex-col justify-center items-center">
               <div class="cursor-pointer mx-auto mb-2 bg-primary-lighter flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
            <i class="mdi mdi-xml text-white text-3xl"></i>
          </div>
              <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Arraste e solte seu arquivo aqui ou <span class="font-bold"> Clique para escolher o arquivo</span></span>
              </p>
              <input @change="onChangeXml" id="xml" name="xml" type="file" class="hidden" />
            </header>
            </label>
             <span class="flex items-center justify-center text-primary-main mb-1" v-if="filename.xml">{{filename.xml}}</span>
            <div class="relative pt-1" v-if="progress.xml > 1 && progress.xml <= 100">
  <div class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary-main">
        Enviando
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-primary-main">
        {{progress.xml}}%
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
    <div aria-valuemin="0" aria-valuemax="100" :aria-valuenow="progress.xml" :style="{width: progress.xml + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-darker"></div>
  </div>
</div>
            
                <div class="flex justify-center mb-2" v-if="errors.xml">
                    <span class="text-xs text-red-500 font-semibold px-1 text-center">O arquivo deve ser do formato XML.</span>
                </div>  
            <button v-if="files.xml" :disabled="disabled" type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2">Enviar</button>
            
          </section>  
                </form>  
                 <div  v-if="newOrder.xml" class="p-6">
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Nota Fiscal (XML)</h1>
            <p class="leading-relaxed mb-3">Você já anexou uma Nota Fiscal (XML). Caso enviei um novo arquivo, o arquivo atual será <span class="text-red-500 font-semibold">excluido e substituído.</span></p>
            <div class="flex items-center flex-wrap ">
              <i class="mdi mdi-xml text-primary-main mr-1"></i>
              <a :href="newOrder.xml_path" target="_blank" class="text-primary-main inline-flex items-center md:mb-2 lg:mb-0">Ver Nota Fiscal (XML)
              </a>
            </div>
                  </div>
                </div>
 <div class="w-1/3 px-3 mb-5">
                <form @submit="submitBillet" enctype="multipart/form-data">
                 <section class="h-full overflow-auto w-full h-full flex flex-col">
                 <label for="billet" class="text-sm font-semibold text-center text-gray-600 px-1 mb-2">Boleto Bancário
            <header class="border-dashed border-2 border-gray-400 py-8 flex flex-col justify-center items-center">
               <div class="cursor-pointer mx-auto mb-2 bg-primary-lighter flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full sm:mx-0 sm:h-16 sm:w-16">
            <i class="mdi mdi-barcode-scan text-white text-3xl"></i>
          </div>
              <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Arraste e solte seu arquivo aqui ou <span class="font-bold"> Clique para escolher o arquivo</span></span>
              </p>
              <input @change="onChangeBillet" id="billet" name="billet" type="file" class="hidden" />
            </header>
            </label>
            <span class="flex items-center justify-center text-primary-main mb-1" v-if="filename.billet">{{filename.billet}}</span>
            <div class="relative pt-1" v-if="progress.billet > 1 && progress.billet <= 100">
  <div  class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary-main">
        Enviando
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-primary-main">
        {{progress.billet}}%
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
    <div aria-valuemin="0" aria-valuemax="100" :aria-valuenow="progress.billet" :style="{width: progress.billet + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-darker"></div>
  </div>
</div>
            
                <div class="flex justify-center mb-2" v-if="errors.billet">
                    <span class="text-xs text-red-500 font-semibold px-1 text-center">O arquivo deve ser do formato PDF.</span>
                </div>  
            <button v-if="files.billet" :disabled="disabled" type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2">Enviar</button>
            
          </section>  
                </form>  
                 <div  v-if="newOrder.billet" class="p-6">
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Boleto Bancário</h1>
            <p class="leading-relaxed mb-3">Você já anexou um Boleto Bancário. Caso enviei um novo arquivo, o arquivo atual será <span class="text-red-500 font-semibold">excluido e substituído.</span></p>
            <div class="flex items-center flex-wrap ">
              <i class="mdi mdi-barcode-scan text-primary-main mr-1"></i>
              <a :href="newOrder.billet_path" target="_blank" class="text-primary-main inline-flex items-center md:mb-2 lg:mb-0">Ver Boleto Bancário
              </a>
            </div>
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
import { bus } from '../../../main';
import { orderService } from '../../../services';


export default {
  name: "OrderFile",
  props: ['order'],
  components: {
  },
  data() {
      return {
        disabled: false,
        selectedOrder: JSON.parse(JSON.stringify(this.$props.order)),
        progress: {
          xml: 0,
          pdf: 0,
          billet: 0,
        },
        errors: {
          xml: null,
          pdf: null,
          billet: null,
        },
        files: {
          pdf: null,
          billet: null,
          xml: null
        },
        filename: {
          pdf: null,
          billet: null,
          xml: null
        },
        newOrder: {},
        loader: {
          loading: false,
          color: '#0bc95b',
        },
      }
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.loader.loading = true
      orderService.getOrderBySeller(this.selectedOrder.id).then((response) => {
        const res = response.data.data
        this.newOrder = res.order
        
        this.loader.loading = false
      }).catch((error) => {
        console.log(error.response.data)
        this.loader.loading = false
      })
    },
    close() {
      this.files.pdf = null
      this.files.xml = null
      this.files.billet = null
      this.$emit("close");
    },
    onChangePdf(event) {
      this.files.pdf = event.target.files[0];
      this.filename.pdf = event.target.files[0].name;
    },
    submitPdf(event) {
      this.progress.pdf = 0
      event.preventDefault();
      this.disabled = true
      let data = new FormData();
      data.append('pdf', this.files.pdf);
      orderService.updatePdf(data, this.selectedOrder.id, event => {
            this.progress.pdf = Math.round((100* event.loaded) / event.total)
      }).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            bus.$emit('updatedOrders', true);
            this.disabled = false
            this.getOrder();
            this.files.pdf = ''
            this.progress.pdf = 0
            this.filename.pdf = ''
        }).catch((error) => {
            console.log(error.response.data)
            this.errors.pdf = error.response.data.message
            this.disabled = false
            this.getOrder();
            this.files.pdf = ''
            this.progress.pdf = 0
            this.filename.pdf = ''
        })

    },
    onChangeXml(event) {
      this.files.xml = event.target.files[0];
      this.filename.xml = event.target.files[0].name;
    },
    submitXml(event) {
      event.preventDefault();
      this.disabled = true
      let data = new FormData();
      data.append('xml', this.files.xml);
      orderService.updateXml(data, this.selectedOrder.id, event => {
            this.progress.xml = Math.round((100* event.loaded) / event.total)
      }).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            bus.$emit('updatedOrders', true);
            this.disabled = false
            this.getOrder();
            this.files.xml = ''
            this.progress.xml = 0
            this.filename.xml = ''
        }).catch((error) => {
            console.log(error.response.data)
            this.errors.xml = error.response.data.message
            this.disabled = false
            this.getOrder();
            this.files.xml = ''
            this.progress.xml = 0
            this.filename.xml = ''
        })

    },
    onChangeBillet(event) {
      this.files.billet = event.target.files[0];
      this.filename.billet = event.target.files[0].name;
    },
    submitBillet(event) {
      event.preventDefault();
      this.disabled = true
      let data = new FormData();
      data.append('billet', this.files.billet);
      orderService.updateBillet(data, this.selectedOrder.id, event => {
            this.progress.billet = Math.round((100* event.loaded) / event.total)
      }).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            bus.$emit('updatedOrders', true);
            this.disabled = false
            this.getOrder();
            this.files.billet = ''
            this.progress.billet = 0
            this.filename.billet = ''
        }).catch((error) => {
            console.log(error.response.data)
            this.errors.billet = error.response.data.message
            this.disabled = false
            this.getOrder();
            this.files.billet = ''
            this.progress.billet = 0
            this.filename.billet = ''
        })

    }
  },
};
</script>