<template>
   <span>
       <div class="my-6 px-2 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <h2 class="text-3xl font-semibold text-center text-primary-main dark:text-gray-200">
                        Suas Cotações
                    </h2>
                </div>
            </div>

           <div class="flex">
                <div class="w-full px-3 mb-5">
                    <input type="text" @keyup="getSearch" v-model="MySearch"  placeholder="Pesquisar..." class="w-full pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none focus:border-primary-lighter" />
                </div>                
           </div>

            <div class="flex justify-end">
                <div class="w-1/1 px-3 mb-5 ">

                    <label class=" text-sm  font-semibold text-gray-600 px-1">Exibir</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                            <select @change="getParts" v-model="filterDate"  class="w-full bg-none -ml-10 pl-2    px-3 py-2 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  border-primary-lighter">
                                <option value="0" >Apenas desta semana</option>
                                <option value="1" >Hoje</option>
                                <option value="2">Este Mês</option>
                                <option value="3">Ultimo Mês</option>
                                <option value="4">Exibir todas</option>
                            </select>                
                    </div>        
                </div>
            </div>

            <div>                               
                <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
                    <ProductItem v-for="(model, innerIndex) in list"   :key="innerIndex"  :estimate="model" />
                </div>
            </div>

            <div v-for="(day, index) in orderedData" :key="index">
                <p class="ml-3 font-semibold text-black text-md">{{day == today() ? 'Hoje':day}}</p>
                
                <div class="border-t-2"></div>
                <div class="flex ">
                    <div class="w-full lg:px-3 lg:mb-5 xl:px-3 xl:mb-5">
                        <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
                            <ProductItem v-for="(model, innerIndex) in dates(day)" @UpdateProposal="getParts()"   :key="innerIndex"  :estimate="model" />
                        </div>
                    </div>
                </div>
            </div>            
            
        </div>
    </span>
</template>
<script>
import ProductItem from '../../../components/Seller/NewEstimates/ProductItem'
import {estimateService} from '../../../services'
import {bus} from '../../../main';

export default {
  name: 'NewEstimateIndex',
  components: {
    ProductItem
  },
  created() {
    this.getParts();
  },
  updated() {
        bus.$off('updateProposalsBySeller');
        bus.$on('updateProposalsBySeller', (data) => {
            if(data) {
                this.getParts();
            }
        })

        if(this.$store.getters.newEstimate){
          this.getParts();
        }

        bus.$off('updateSellerEstimates');
        bus.$on('updateSellerEstimates', (data) => {
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
            orderedData:[],
            MySearch:'',
            list:[],
            filterDate:0
        }
    },
    methods: {
         getSearch(){
            const list = [];
           if(this.MySearch.length == 0){
               return this.list = []
           }
            this.products.forEach((data) => {       
               
                if(data.brand != null){
                    if (data.brand.toLowerCase().match(this.MySearch.toLowerCase())  ) {
                        if(list.length > 0){
                            if(list[list.length-1].id != data.id){
                                list.push(data);
                            }
                        }else{
                            list.push(data);
                        }
                    }
                }

                if (data.description.toLowerCase().match(this.MySearch.toLowerCase()) ) {
                   if(list.length > 0){
                        if(list[list.length-1].id != data.id){
                            list.push(data);
                        }
                    }else{
                        list.push(data);
                    }
                }

                if (data.category.name.toLowerCase().match(this.MySearch.toLowerCase()) ) {
                    if(list.length > 0){
                        if(list[list.length-1].id != data.id){
                            console.log('naot tem')
                        }
                    }else{
                        list.push(data);
                    }                  
                }
                
            });
            this.list = list;
        },
        today() {
            const current = new Date();
            let date = current.toLocaleDateString('pt-BR');
            return date
        },
        getParts() {
            estimateService.getAvailableEstimates(this.filterDate).then((response) => {
                this.products = response.data.data
                this.orderedData = this.days.sort(function(a, b) {
                      return new Date(...b.split('/')) - new Date(...a.split('/'));
                });
            }).catch((error) => {
                console.log(error.response.data)
            })
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