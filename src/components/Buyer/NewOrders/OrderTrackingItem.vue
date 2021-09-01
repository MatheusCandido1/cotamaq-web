<template>
  <div class="flex md:contents">
    <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
      <div class="h-full w-6 flex items-center justify-center">
        <div class="h-full w-1 bg-green-500 pointer-events-none"></div>
      </div>
      <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
        <i class="mdi mdi-check-circle text-white"></i>
      </div>
    </div>
    <div class="bg-green-500 h-20 pl-4 pt-2 col-start-4 col-end-12  rounded-xl my-2  mr-auto shadow-md w-full">
      <h3 class="font-semibold text-lg mb-1">Package Booked</h3>
        <p class="leading-tight text-justify w-full">
          21 July 2021, 04:30 PM
        </p>
      </div>
    </div>
</template>

<script>
export default {
    name: 'OrderTrackingItem',
    props: ['order'],
    data() {
        return {
            status: [
              {id: 1, text: '', bg: ''},
              {id: 2, text: '', bg: ''},
              {id: 3, text: '', bg: ''},
              {id: 4, text: '', bg: ''},
            ]
        }
    }
}
</script>

<style>

</style>