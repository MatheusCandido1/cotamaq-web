<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Dados do endereço
            </h3>

            <div class="w-1/4 px-3">
                            <div class="flex" >
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                  <button @click="toggleEdit()" class="w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                  <span class="justify-center">{{edit === true ? 'Bloquear edição':'Habilitar Edição'}}</span>
                                </button>  
                                </div>  
                        </div>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="flex -mx-3">
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição do endereço</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit"  v-model="selectedAddress.description"  placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CEP</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask :disabled="!edit" :mask="['#####-###']"  v-model="selectedAddress.zipcode" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></the-mask>
                        <button @focusout="fillAddress()" @click="fillAddress()" :disabled="!edit" class="bg-primary-main font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-home-search-outline"></i></span>
                        </button>
                    </div> 
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">UF</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <select :disabled="!edit" v-model="selectedAddress.state" class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option  v-for="state in states" :key="state.value" :value="state.value">{{state.name}}</option>
                        </select>                                
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Município</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit" v-model="selectedAddress.city" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>
            </div>
            <div class="flex -mx-3">
                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Bairro</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit" v-model="selectedAddress.neighborhood" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>

            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Endereço</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input :disabled="!edit" v-model="selectedAddress.address" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>                         
            </div>
            
            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Número</label>
                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
			<input :disabled="!edit" v-model="address.number" @change="numberless = false" type="text" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter px-3 relative">
			<div class="flex -mr-px">
				<span class="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                    <label class="inline-flex items-center">
                    <input :disabled="!edit"  v-model="numberless" @change="address.number = null" type="checkbox" class="form-radio text-green-500">
                    <span class="ml-3 text-lg">S/N</span>
                </label> 
                </span>
			</div>	
		</div>      
            </div>


            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">Complemento</label>
                <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input :disabled="!edit"  v-model="selectedAddress.complement" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                </div>                         
            </div>
            </div>

            <div class="flex justify-end -mx-3">
            <div class="w-1/4 px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1"></label>
                <div class="flex">
                <label class="inline-flex items-center">
                    <input :disabled="!edit" v-model="selectedAddress.main" type="checkbox" class="form-radio h-6 w-6 text-green-500">
                    <span class="ml-3 text-lg">Endereço padrão</span>
                </label>    
                </div>                         
            </div>

            
        </div>

          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="updateAddress()"
              v-if="edit"
              class="w-full inline-flex bg-primary-main hover:bg-primary-lighter justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:ml-3 sm:w-auto sm:text-sm"
            >
              Atualizar
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { companyService } from '../../../services';
import { bus } from '../../../main'

export default {
  name: "AddressDetails",
  props: ["address","allowEdit"],
  data() {
      return {
          selectedAddress: JSON.parse(JSON.stringify(this.$props.address)),
          numberless: false,
          edit: this.$props.allowEdit,
          states: [
                { value: 'AC', name: 'Acre' },
                { value: 'AL', name: 'Alagoas' },
                { value: 'AP', name: 'Amapá' },
                { value: 'AM', name: 'Amazonas' },
                { value: 'BA', name: 'Bahia' },
                { value: 'CE', name: 'Ceará' },
                { value: 'DF', name: 'Distrito Federal' },
                { value: 'ES', name: 'Espírito Santo' },
                { value: 'GO', name: 'Goías' },
                { value: 'MA', name: 'Maranhão' },
                { value: 'MT', name: 'Mato Grosso' },
                { value: 'MS', name: 'Mato Grosso do Sul' },
                { value: 'MG', name: 'Minas Gerais' },
                { value: 'PA', name: 'Pará' },
                { value: 'PB', name: 'Paraíba' },
                { value: 'PR', name: 'Paraná' },
                { value: 'PE', name: 'Pernambuco' },
                { value: 'PI', name: 'Piauí' },
                { value: 'RJ', name: 'Rio de Janeiro' },
                { value: 'RN', name: 'Rio Grande do Norte' },
                { value: 'RS', name: 'Rio Grande do Sul' },
                { value: 'RO', name: 'Rondônia' },
                { value: 'RR', name: 'Roraíma' },
                { value: 'SC', name: 'Santa Catarina' },
                { value: 'SP', name: 'São Paulo' },
                { value: 'SE', name: 'Sergipe' },
                { value: 'TO', name: 'Tocantins' },
            ],
      }
  },
  created() {
      if(this.selectedAddress.number == ''){
        this.numberless = true
      }
  },
  methods: {
    async fillAddress() {
        const res = await fetch(`https://viacep.com.br/ws/${ this.selectedAddress.zipcode }/json`);
        const data = await res.json();

        if(res){
            this.selectedAddress.state = data.uf
            this.selectedAddress.city = data.localidade

            if(data.bairro != '')
                this.selectedAddress.neighborhood = data.bairro
                        
            if(data.logradouro != '')
                this.selectedAddress.address = data.logradouro
        }
    },
    updateAddress() {
        const data = {
            id: this.selectedAddress.id,
            description: this.selectedAddress.description,
            zipcode: this.selectedAddress.zipcode,
            state: this.selectedAddress.state,
            city: this.selectedAddress.city,
            neighborhood: this.selectedAddress.neighborhood,
            address: this.selectedAddress.address,
            number: this.selectedAddress.number,
            complement: this.selectedAddress.complement,
            main: this.selectedAddress.main
        }
        companyService.updateAddress(data).then((response) => {
            this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500
            });
            this.edit = false;
            this.clearInputs();
                bus.$emit('updatedCompanyAddress', true);
            this.close();
            }).catch((error) => {
                console.log(error.response.data)
            })
    },
    toggleEdit() {
        this.edit = !this.edit
    },
    clearInputs() {
        this.selectedAddress = {
            description: '',
            zipcode: '',
            state: '',
            city: '',
            neighborhood: '',
            address: '',
            number: '',
            complement: '',
            main: false
        }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>