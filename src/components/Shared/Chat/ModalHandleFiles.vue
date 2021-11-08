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
          <div class="flex py-3 pl-6">
            <div class="mr-8" v-for="(url, index) in urlImages" :key="index">
              <img class="h-24 w-24 rounded-t-md"  :src="url" >
              <button @click.prevent="removeImage(index)"   class="relative delete w-full flex items-center justify-center px-1 py-1 bg-red-500 text-sm font-medium   text-white rounded-b-md dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

           <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="handleSend"
              class="mb-3 md:mb-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirmar
            </button>

            <input id="addFileInput" type="file" class="hidden" accept="image/*" @change="addFiles" />
            <button
              type="button"
              onclick="document.getElementById('addFileInput').click()"
              v-if="listFiles.length < 4"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Adicionar mais
            </button>

            <button
              type="button"
              @click="close()"
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
import {chatService} from "../../../services";

export default {
  name: "ModalHandleFiles",
  props: ['files', 'cleanFiles','sendFiles','conversationId'],
  data() {
    return {
      listFiles: this.$props.files,
      form: new FormData,
      urlImages: [],
    }
  },
  created(){
    this.readFiles()
  },
  methods: {
    handleSend(){
      this.close()
      this.$props.sendFiles(this.urlImages)


      this.listFiles.forEach((file) => {
        this.form.append('files[]', file)
      })

      this.form.append('chat_id',this.$props.conversationId)


      chatService.sendImage(this.form)
    },
    close() {
      this.$props.cleanFiles()
      this.$emit("close");
    },
    readFiles(){
      for (let i = 0; i < this.listFiles.length; i++) {
        const file = this.listFiles[i];
        this.urlImages.push(URL.createObjectURL(file));
      }
    },
    addFiles(e) {
      let uploadedFiles = e.target.files;

      for(var x = 0; x < uploadedFiles.length;x++){
        this.listFiles.push(uploadedFiles[x]);
        this.urlImages.push(URL.createObjectURL(uploadedFiles[x]))
      }
    },
    removeImage(key) {
      if(this.listFiles.length == 1){
        this.listFiles.splice(key, 1);
        this.urlImages.splice(key, 1);
        this.close()
      }
      else{
        this.listFiles.splice(key, 1);
        this.urlImages.splice(key, 1);
      }
    },
  },
};
</script>