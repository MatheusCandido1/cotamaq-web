<template>
   <span>
       <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                        Cotações
                    </h2>
                </div>
            </div>

            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <input type="text" placeholder="Pesquisar..." class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none focus:border-primary-lighter" />
                </div>
            </div>
                       
            <div v-for="(day, index) in orderedData" :key="index">
                <p class="ml-3 font-semibold text-black text-md">{{ day == '2021-02-10' ? 'Hoje': day}}</p>
                
                <div class="border-t-2"></div>
                <div class="flex ">
                    <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
                        <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4">
                            <ProductItem v-for="(model, innerIndex) in dates(day)" :key="innerIndex"  :product="model" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>
<script>
import ProductItem from '../../../components/Buyer/NewEstimates/ProductItem'
export default {
    name: 'NewEstimateIndex',
    components: {
        ProductItem
    },
    created() {
        this.orderedData = this.days.sort((a, b) => new Date(b) - new Date(a))
    },
    computed: {
        days() {
            const days = new Set();
            this.products.forEach(product => days.add(product.created_at))
            return Array.from(days); 
        }
    },
    data() {
        return {
            currentDate: null,
            products:[
                {id: 1, equipment: 'Teste', quantity: 4, allow_similar: 'Não', brand: 'SKR', proposals: 0, created_at: '2021-02-08'},
                {id: 2, equipment: 'Teste4', quantity: 2, allow_similar: 'Não', brand: 'SKR', proposals: 4, created_at: '2021-02-08'},
                {id: 3, equipment: 'Teste5', quantity: 3, allow_similar: 'Não', brand: 'SKR', proposals: 5, created_at: '2021-02-09'},
                {id: 4, equipment: 'Teste6', quantity: 3, allow_similar: 'Não', brand: 'SKR', proposals: 0, created_at: '2021-02-09'},
                {id: 5, equipment: 'Teste7', quantity: 4, allow_similar: 'Não', brand: 'SKR', proposals: 5, created_at: '2021-02-10'},
                {id: 6, equipment: '34342', quantity: 2, allow_similar: 'Não', brand: 'SKR', proposals: 0, created_at: '2021-02-10'},
                {id: 7, equipment: '342', quantity: 1, allow_similar: 'Não', brand: 'SKR', proposals: 3, created_at: '2021-02-08'},
                {id: 8, equipment: 'sdffds', quantity: 1, allow_similar: 'Não', brand: 'SKR', proposals: 0, created_at: '2021-02-08'},
            ],
            orderedData:[]
        }
    },
    methods: {
        dates(day) {
            return this.products
                .filter(product => product.created_at === day)
                 .sort(function(a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                })
                .map(product => product)

        }
    }
}
</script>

<style>

</style>