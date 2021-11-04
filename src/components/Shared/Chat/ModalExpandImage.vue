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
          class="inline-block align-bottom  text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <svg v-if="screenWidth < 800" @click="close" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>

          <div v-if="screenWidth < 800" class="zoom flex items-center justify-center">
            <img class="w-auto h-auto" :src="image" alt="image" />
          </div>

          <div v-else class="zoom flex items-center justify-center">
            <img v-click-outside="close" class="w-auto h-auto" :src="image" alt="image" />
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import vClickOutside from 'v-click-outside';
export default {
  name: "ModalExpandImage",
  props: ['image'],
  methods: {
    close() {
      this.$emit("close");
    },
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data(){
    return{
      screenWidth: screen.width,
    }
  }
};
</script>
<style scoped>
.zoom{
  overflow: hidden;
}
.zoom img {
  max-width: 100%;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.zoom:hover img{
  -moz-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>