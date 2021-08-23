<template>
    <div class="flex flex-col">
        <div class="w-full my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex justify-center">
                <div class="py-1">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Nova Proposta
                    </h2>
                </div>

                <div @click="()=>(open = !open)" class="py-1">
                    <button  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                        <svg v-if="open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                        </svg>
                        <svg v-if="!open"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                        </svg>                        
                    </button>
                </div>
            </div>

            <div v-if="open">
            <form>
                <div class="-mx-3 md:flex mb-6">
                     
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ProposalForm',
    data() {
        return {
            open: false,
            estimate: {
                part_code: '',
                description: '',
                allow_similar: '',
                category_id: '',
            },
            proposal: {
                seller_id: '',
                description: '',
                quantity: '',
                value: '',
                subtotal: '',
                total: '',
                pickup: '',
                allow_pickup: '',
                shipping: '',
                allow_shipping: '',
                delivery_time: '',
                validity: '',
                is_simillar: '',
                brand: '',
                observation: '',
                discount: ''
            }
        }
    }

}
</script>

<style>

</style>