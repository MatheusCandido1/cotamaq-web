<template>
   <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
     <div class="text-center mb-4">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-2">Em construção!</h1>
      <div class="flex justify-center h-40 ">
        <lottie-animation :loop="true" ref="anim" :animationData="require('@/assets/images/work.json')"/>
      </div>
      <p class="text-base leading-relaxed text-gray-500s">Estamos construindo um painel interativo para que sua experiência na plataforma <span class="font-bold text-primary-main">COTAMAQ</span> seja ainda mais incrível.</p>
    </div>
<section  style="pointer-events:none; opacity: 0.6; display: none" class="text-gray-600 body-font">
  <div class="container px-5 py-10 mx-auto">
    <div class="text-center mb-5">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Página Inicial</h1>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Acompanhe suas cotações e pedidos em nosso painel.</p>
      <div class="flex mt-6 justify-center">
        <div class="w-16 h-1 rounded-full bg-primary-main inline-flex"></div>
      </div>
    </div>
  </div>
</section>
<section class="text-gray-600 body-font "  >
  <div class="container px-5  mx-auto flex flex-wrap flex-col">
    <div class="flex mx-auto flex-wrap mb-5">
      <div :class="option == 1 ? 'border-primary-main text-primary-main': 'border-gray-200 text-gray-800 hover:text-black'" @click="changeOption(1)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none   tracking-wider rounded-t">
        <i class="mdi mdi-file-document-edit text-xl"></i> <span class="ml-1">Cotações</span>
      </div>
      <div :class="option == 2 ? 'border-primary-main text-primary-main': 'border-gray-200 text-gray-800 hover:text-black'" @click="changeOption(2)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none   tracking-wider rounded-t">
        <i class="mdi mdi-format-list-numbered text-xl"></i> <span class="ml-1">Pedidos</span>
      </div>
    </div>
    
  </div>

  <div class="flex flex-col text-center w-full">
      <div style="pointer-events:none; opacity: 0.6" v-if="option == 1" class=""> 
         <div class="flex-grow">
            <div class="flex -m-4 text-center">
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-orange-400 px-4 py-6 rounded-lg">
          <i class="mdi mdi-progress-clock text-5xl text-orange-400"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Pendentes</p>
        </div>
      </div>
       <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-blue-500 px-4 py-6 rounded-lg">
          <i class="mdi mdi-email-send text-5xl text-blue-500"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Enviadas</p>
        </div>
      </div>
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-yellow-500 px-4 py-6 rounded-lg">
          <i class="mdi mdi-gesture-double-tap text-5xl text-yellow-500"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Em andamento</p>
        </div>
      </div>
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-primary-main px-4 py-6 rounded-lg">
          <i class="mdi mdi-checkbox-marked-outline text-5xl text-primary-main"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Aprovadas</p>
        </div>
      </div>
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 w-full border-red-500 px-4 py-6 rounded-lg">
          <i class="mdi mdi-close-circle-outline text-5xl text-red-500"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="whitespace-nowrap title-font font-medium text-gray-900">Canceladas</p>
        </div>
      </div>
            </div>
        </div>
      </div>

      <div style="pointer-events:none; opacity: 0.6" v-if="option == 2" class=""> 
        <div class="flex-grow">
            <div class="flex -m-4 text-center">
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-orange-400 px-4 py-6 rounded-lg">
          <i class="mdi mdi-progress-clock text-5xl text-orange-400"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Pendentes</p>
        </div>
      </div>
       <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 border-blue-400  px-4 py-6 rounded-lg">
          <i class="mdi mdi-package-variant-closed text-5xl text-blue-400"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="title-font font-medium text-gray-900">Em preparo</p>
        </div>
      </div>
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 w-full border-indigo-600 px-4 py-6 rounded-lg">
          <i class="mdi mdi-truck-fast-outline text-5xl text-indigo-600"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="whitespace-nowrap title-font font-medium text-gray-900">Em trânsito</p>
        </div>
      </div>
      <div class="p-4 md:w-full sm:w-full w-full">
        <div class="border-2 w-full border-primary-main px-4 py-6 rounded-lg">
          <i class="mdi mdi-calendar-check-outline text-5xl text-primary-main"></i>
          <h2 class="title-font font-medium text-3xl text-gray-900">0</h2>
          <p class="whitespace-nowrap title-font font-medium text-gray-900">Entregue</p>
        </div>
      </div>
            </div>
        </div>
      </div>
     
    </div>
</section>
   </div>
</template>

<script>
import LottieAnimation from 'lottie-web-vue'
export default {
  components: {
    LottieAnimation
  },
  data() {
    return {
      option: 1,
      lottiePath: require("../assets/images/work.json" )

    }
  },
  methods: {
    changeOption(value) {
      this.option = value
    }
  }
}
</script>

<style>

</style>