<template>
  <transition name="modal-fade">
    <div class="fixed z-30 inset-0 overflow-y-auto ">
      <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 "
      >
        <div aria-hidden="true" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
            aria-hidden="true"
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
        >
        <div
            aria-labelledby="modal-headline"
            aria-modal="true"
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle md:w-2/3 sm:w-full"
            role="dialog"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <div class="sm:flex sm:items-start">

              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                <h3
                    id="modal-headline"
                    class="text-lg leading-6 font-medium text-gray-900"
                >
                  Galeria cotação
                </h3>

                <CoolLightBox :index="index"
                              :items="estimateImages"
                              class="cool-lightbox-z-index"
                              @close="index = null">
                </CoolLightBox>

                <div class="flex flex-wrap justify-start">
                  <img
                      v-for="(image, imageIndex) in estimateImages"
                      :key="imageIndex"
                      :src='image'
                      class="imgPreview m-2 "
                      @click="index = imageIndex"
                  />
                </div>
                <h3
                    id="modal-headline"
                    class="text-lg leading-6 font-medium text-gray-900"
                >
                  Galeria proposta
                </h3>

                <CoolLightBox2 :index="index2"
                               :items="proposalImages"
                               class="cool-lightbox-z-index"
                               @close="index2 = null">
                </CoolLightBox2>

                <div class="flex flex-wrap justify-start">
                  <img
                      v-for="(image,IndexImage) in proposalImages"
                      :key="IndexImage"
                      :src='image'
                      class="imgPreview m-2 "
                      @click="index2 = IndexImage"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

            <button
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                type="button"
                @click="close"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// import { bus } from '../../../main';
import {proposalService} from '../../../services'
import CoolLightBox from 'vue-cool-lightbox'
import CoolLightBox2 from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

import('vue-it-bigger/dist/vue-it-bigger.min.css') // when using webpack
export default {
  components: {
    CoolLightBox,
    CoolLightBox2,
  },
  name: "EstimateDelete",
  props: ['proposal'],
  data() {
    return {
      disabled: false,
      indexEstimate: null,
      indexProposal: null,
      index: null,
      index2: null,
      selectedProposal: JSON.parse(JSON.stringify(this.$props.proposal)),
      estimateImages: [],
      proposalImages: [],
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getImages() {
      proposalService.getImages(this.proposal.id, this.proposal.estimate_id).then((response) => {
        console.log(response)
        this.estimateImages = response.data.imageEstimate
        this.proposalImages = response.data.imageProposal
      })
    }
  },
  created() {
    this.getImages()
  }
};
</script>
<style>
.cool-lightbox {
  z-index: 0 !important;
}
</style>