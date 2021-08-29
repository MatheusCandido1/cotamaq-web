<template>
   <span>
       <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <h2 class="text-3xl font-semibold text-center text-primary-main dark:text-gray-200">
                        Seus Pedidos
                    </h2>
                </div>
            </div>

            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <input type="text"  placeholder="Pesquisar..." class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none focus:border-primary-lighter" />
                </div>                
            </div>

            <div v-for="(day, index) in orderedData" :key="index">
            <p class="ml-3 font-semibold text-black text-md">{{day == today() ? 'Hoje':day}}</p>
            <div class="border-t-2"></div>
            <div class="flex ">
                <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
                    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
                        <OrderItem v-for="(model, innerIndex) in dates(day)"   :key="innerIndex"  :order="model" />
                    </div>
                </div>
            </div>
        </div> 
        </div>
   </span>
</template>

<script>
import OrderItem from '../../../components/Seller/NewOrders/OrderItem'
import { orderService } from '../../../services'
export default {
    name: 'NewOrdersIndex',
    components: {
        OrderItem
    },
    created() {
        this.getOrders()
    },
    computed: {
        days() {     
            const days = new Set();
            this.orders.forEach((order)=> {              
                days.add(order.created_at)
            })
            return Array.from(days);
        }
    },
    data() {
        return {
            orders: [],
            orderedData: [],
        }
    },
    methods: {
        getOrders() {
            orderService.getOrders().then((response) => {
                this.orders = response.data.data
                this.orderedData = this.days.sort(function(a, b) {
                    return new Date(...b.split('/')) - new Date(...a.split('/'));
                });
            }).catch((error) => {
                console.log(error.response)
            })
        },
        today() {
            const current = new Date();
            let date = current.toLocaleDateString('pt-BR');
            return date
        },
        dates(day) {
            return this.orders
                .filter(order => order.created_at === day)
                 .sort(function(a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                })
                .map(order => order)
        }
    },
}
</script>

<style>

</style>