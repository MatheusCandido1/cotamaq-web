<template>
    <div @click="$emit('click')" class="w-full relative bg-white overflow-hidden rounded-xl my-4 shadow-xl">
        <div class="cursor-pointer flex flex-col p-8 min-h-full bg-primary-main justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="font-semibold text-white mb-2">Nova Cotação</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NewProductItem',
    data() {
        return {
        }
    },
    methods: {
    }

}
</script>

<style>

</style>