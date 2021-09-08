<template>
 <transition name="modal-fade">
    <div class="fixed z-20 inset-0 overflow-y-auto">
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
                <span>
        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Dados do Usuário</h2>
            </div>
        </div>

        <form >
             <div class="">
                   <div class="w-full  sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Nome</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder="Ex: Feanando"  v-model="user.name" disabled    type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md px-6 outline-none  border-primary-lighter">
                    </div>  
                                      
                </div>

             </div>

            
        </form>
    </span>



            
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
         
            <button
              type="button"
              :disabled="disabled"
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
  props: ["user"],
  data() {
      return {
          disabled: false
      }
  },
  methods: {
     close() {
      this.$emit("close");
        
    },
  },
};
</script>

<style lang="scss" scoped></style>
