<template>
   <span>
       <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <h2 class="text-3xl font-semibold text-center text-primary-main dark:text-gray-200">
                        Suas Pedidos
                    </h2>
                </div>
            </div>

            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <input type="text" placeholder="Pesquisar..." class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none focus:border-primary-lighter" />
                </div>
            </div>
                       
            <div v-for="(day, index) in orderedData" :key="index">
                <p class="ml-3 font-semibold text-black text-md">{{day == today() ? 'Hoje':day}}</p>
                
                <div class="border-t-2"></div>
                <div class="flex ">
                    <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
                        <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
                            <ProductItem v-for="(model, innerIndex) in dates(day)"   :key="innerIndex"  :product="model" />
                        </div>
                    </div>
                </div>
            </div>            
            
        </div>
    </span>
</template>
<script>

import ProductItem from '../../../components/Seller/NewOrders/ProductItem'
import { bus } from '../../../main';
export default {
    name: 'NewEstimateIndex',
    components: {
        ProductItem,
        
    },
    created() {
        this.getParts();
    },
    updated() {
        bus.$off('updateParts');
        bus.$on('updateParts', (data) => {
            if(data) {
                this.getParts();
            }
        })
    },
    computed: {
        days() {              
            
            const days = new Set();
            this.products.forEach((product )=> {              
                days.add(product.created_at)
            })
           
            return Array.from(days);
        }
    },
    data() {
        return {
            products:[],
            orderedData:[]
        }
    },
    methods: {
        today() {
            const current = new Date();
            let date = current.toLocaleDateString('pt-BR');
            return date
        },
        getParts() {
        },
        handleNewPartClick() {
            this.$router.push({name: 'partAdd'})
        },
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