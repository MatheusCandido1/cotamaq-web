<template>
  <div  class=" flex  flex-wrap justify-start" >
    <div class="m-2  " v-for="(image,index) in files" :key="image.ids">
      <dir class="">
        <button  @click.prevent="openImageDeleteModal(image, index)"   class="relative delete    mr-1 px-1 py-1 bg-red-500 text-sm font-medium   text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <img class="preview"  :src="image.image_path" >
      </dir>
    </div>
    <ImageDelete v-if="modal.image" :index="index" :image="image" @close="closeImageDeleteModal" @save="deleteImage(index,image)" />
  </div>

</template>

<script>
import { bus } from '../../../main';
import {estimateService} from "../../../services";
import ImageDelete from './ImageDelete'
export default {
  props:['files'],
  components: {
    ImageDelete
  },
  data() {
    return {
      index: null,
      image: null,
      modal: {
        image: false,
      }
    }
  },
  methods: {
    openImageDeleteModal(image, index) {
      this.image = image
      this.index = index
      this.modal.image = true;
      bus.$emit("ModalOpen", true);
    },
    closeImageDeleteModal() {
      this.modal.image = false;
      bus.$emit("ModalOpen", false);
    },
    deleteImage(index, image){
      console.log(image)
      this.files.splice(index,1)

      estimateService.deleteImage(image.id).then((response)=>{
        console.log(response)
        this.$toast.success(response.success_message, {
          position: "bottom-right",
          pauseOnHover: false,
          showCloseButtonOnHover: true,
          timeout: 2500
        });

      })
      this.closeImageDeleteModal()
    },
  },

}
</script>

<style lang="scss" scoped>
.preview {
  width: 120px;
  height: 120px;
  border-radius: 10px;
}
.delete{
  z-index: 11;
  top: 22px;
  right: 10px;
}

@media(max-width: 768px){
  .preview{
    width: 80px;
    height: 90px;
  }
}
@media(max-width: 425px){
  .preview{
    width: 80px;
    height: 90px;
  }

}
</style>