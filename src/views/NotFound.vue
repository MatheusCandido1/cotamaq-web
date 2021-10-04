<template>
    <span>
        <div class="flex flex-col items-center justify-center w-screen h-screen">
            <h2 class="text-7xl text-primary-main font-bold mb-4">404</h2>
            <h5 class="text-3xl text-gray-500">Página não encontrada!</h5>
            <button
              type="button"
              @click="goBack()"
              class="mt-6 bg-primary-main hover:bg-primary-lighterw-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Voltar
            </button>
        </div>
    </span>
</template>

<script>
export default {
    name: 'NotFound',

    methods: {
        goBack(){
            this.$router.push({name: 'estimates'})
        }
    }
}
</script>

<style>

</style>