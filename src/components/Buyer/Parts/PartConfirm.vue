<template>
  <transition name="modal-fade">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-main sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                </h3>
                <div class="mt-2">
                  <h4 class="text-lg font-semibold text-gray-900">Peça: {{selectedPart.description}} </h4>
                  
                  <div class="border-t-2 mt-2"></div>
                  <div class="flex flex-row ">
                      <div class="py-2 flex-grow whitespace-nowrap">
                    <div class="">
                          <div class="flex space-x-2 text-gray-800 text-sm  my-3">
                              <p><span class="font-bold">Cód. da peça:</span> {{selectedPart.part_code}}</p> 
                          </div>
                          <div class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Descrição:</span> {{selectedPart.description}}</p> 
                          </div>
                          <div class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Quantidade:</span> {{selectedPart.quantity}}</p> 
                          </div>
                          <div v-if="categories.length > 0" class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Categoria:</span> {{categories.find(category => category.id == selectedPart.category_id).name}}</p> 
                          </div>
                          
                    </div>
                  </div>
                    <div class="px-2 py-2 flex-grow whitespace-nowrap">
                    <div class="px-2 ">
                          <div class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Aceita Similar:</span> {{formatSimilar(selectedPart.allow_similar)}} </p> 
                          </div>
                          <div class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Marca:</span> {{selectedPart.brand == '' ? 'Não Informado':selectedPart.brand}}</p> 
                          </div>
                          <div class="flex space-x-2 text-gray-800 text-sm my-3">
                              <p><span class="font-bold">Observação:</span> {{selectedPart.observation == '' ? 'Não Informado':selectedPart.observation}}</p> 
                          </div>
                    </div>
                  </div>
                  </div>
                </div>
                <div v-if="selectedEquipment != null">
                  <div class="border-t-2"></div>
                  <div class="flex flex-row">
                      <div class="py-2 flex-grow">
                    <div>
                      <div class="flex space-x-2 text-gray-800 text-sm">
                        <p><span class="font-bold">Equipamento: </span> {{formatEquipment(selectedEquipment)}}</p> 
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="save"
              :disabled="disabled"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enviar Cotação
            </button>
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
import { estimateService } from '../../../services';
import { formatSimilar, formatEquipment } from '@/helpers/string-helper';
export default {
  name: "PartConfirm",
  props: ['part','equipment','categories'],
  data() {
    return {
      selectedPart: JSON.parse(JSON.stringify(this.$props.part)),
      selectedEquipment: JSON.parse(JSON.stringify(this.$props.equipment)),
      disabled: false
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    formatEquipment,
    formatSimilar,
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
    createPart(){
      for(let i=0; i<this.files.length;i++){
        this.form.append('files[]',this.files[i]);
      }

      this.form.append('part_code', this.part.part_code);
      this.form.append('description', this.part.description);
      this.form.append('quantity', this.part.quantity);
      this.form.append('allow_similar', this.part.allow_similar);
      this.form.append('observation', this.part.observation);
      this.form.append('brand', this.part.brand);
      this.form.append('address_id', this.part.address_id);
      this.form.append('category_id', this.part.category_id);

      if(this.equipmentForm == 1) {
        this.form.append('equipment_id', this.equipment.id.id);
      }

      if(this.equipmentForm == 2) {
        this.form.append('equipment_description', this.equipment.description);
        this.form.append('equipment_patrimony', this.equipment.patrimony);
        this.form.append('equipment_model', this.equipment.model);
        this.form.append('equipment_year', this.equipment.year);
        this.form.append('equipment_brand', this.equipment.brand);
      }
      
      estimateService.createEstimate(this.form).then((response) => {
        this.$toast.success(response.success_message, {
        position: "bottom-right",
        pauseOnHover: false,
        showCloseButtonOnHover: true,
        timeout: 2500
      });
        this.close()
        this.$router.push({name: 'estimates'})
      }).catch((error) => {
        console.log(error.response.data)
      })
    }
  },
};
</script>