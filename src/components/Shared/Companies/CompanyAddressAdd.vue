<template>
  <transition name="modal-fade">
      <div  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-50  md:h-auto h-screen">
          <!--header-->
          <div class="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-xl font-semibold">
              Dados do endereço 
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto bg-white" >
                <form @submit.prevent="createAddress()">
            <div class="md:flex md:flex-wrap -mx-3">
                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição do endereço</label>
                    <div class="flex">
                    <div  class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @focusout="() => (errors.description = 'OK')"  v-model="address.description" placeholder="" :class="errors.description == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                    <div  v-if="errors.description == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Descrição é obrigatório.</span>
                    </div> 
                </div>

                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                <label for="" class="text-sm font-semibold text-gray-600 px-1">CEP</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask @focusout="() => (errors.zipcode = 'OK')" :mask="['#####-###']"  v-model="address.zipcode" placeholder="" type="text" :class="errors.zipcode == 'ERROR' && address.state == '' ? 'border-red-400':'border-primary-main'" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></the-mask>
                        <button @click.prevent="fillAddress()"  :class="errors.zipcode == 'ERROR' ? 'bg-red-400':'bg-primary-main'" class="font-semibold text-white border-gray-400 w-10 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto"><i class="mdi mdi-home-search-outline"></i></span>
                        </button>
                    </div> 
                    <div  v-if="errors.zipcode == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo CEP é obrigatório.</span>
                    </div> 
                </div>

                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">UF</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <select @focusout="() => (errors.state = 'OK')" v-model="address.state" :class="errors.state == 'ERROR' && address.state == ''  ? 'border-red-400':'border-primary-main'" class="w-full -ml-10 pl-2   px-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                            <option value=""> Selecione....</option>
                            <option  v-for="state in states" :key="state.value" :value="state.value">{{state.name}}</option>
                        </select>                                
                    </div>   
                    <div  v-if="errors.state == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo UF é obrigatório.</span>
                    </div>                       
                </div>
                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Município</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @focusout="() => (errors.city = 'OK')" v-model="address.city" placeholder="" type="text" :class="errors.city == 'ERROR' && address.city == '' ? 'border-red-400':'border-primary-main'" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>  
                    <div  v-if="errors.city == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Município é obrigatório.</span>
                    </div>                        
                </div>
            </div>
                        
            <div class="md:flex md:flex-wrap -mx-3 ">
                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Bairro</label>
                    <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @focusout="() => (errors.neighborhood = 'OK')" v-model="address.neighborhood" :class="errors.neighborhood == 'ERROR' && address.neighborhood == '' ? 'border-red-400':'border-primary-main'" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>  
                    <div  v-if="errors.neighborhood == 'ERROR' && address.neighborhood == '' ">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Bairro é obrigatório.</span>
                    </div>                       
                </div>

                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5 ">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Endereço</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input @focusout="() => (errors.address = 'OK')"  v-model="address.address" type="text" :class="errors.address == 'ERROR' && address.address == '' ? 'border-red-400':'border-primary-main'" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div> 
                    <div  v-if="errors.address == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Endereço é obrigatório.</span>
                    </div>   
                                        
                </div>
                
                <div class="lg:w-1/4 md:w-1/2 w-full px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Número</label>
                        <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                        <input @focusout="() => (errors.number = 'OK')"   v-model="address.number" :class="errors.number == 'ERROR' ? 'border-red-400':'border-primary-main'"  @change="numberless = false" type="text" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 rounded-l border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter px-3 relative">
                        <div class="flex -mr-px">
                            <span :class="errors.number == 'ERROR' ? 'border-red-400':'border-primary-main'" class="flex items-center leading-normal bg-grey-lighter rounded-r border-b-2 shadow-md border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                                <label class="inline-flex items-center">
        <!--                        <input  @focusout="() => (errors.number = 'OK')" v-model="numberless" @change="address.number = null" type="checkbox"  class="form-radio text-green-500">-->
                                <span @click="setSN" class="ml-3 cursor-pointer text-lg">S/N</span>
                            </label> 
                            </span>  
                        </div>	
                        <div  v-if="errors.number == 'ERROR'">
                                <span class="text-xs text-red-400 font-semibold px-1">O campo Número é obrigatório.</span>
                        </div>  
                    </div>    
                </div>


                <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
                
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Complemento</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                            <input v-model="address.complement" placeholder="" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                         
                </div>
            </div>

            <div class="flex justify-end -mx-3">
                <div  class="md:w-1/4 w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1"></label>
                    <div class="flex">
                    <label @click="setMain" class="inline-flex items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="md:h-6 md:w-6  h-10 w-10  " :class="{'text-green-500':address.main}" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>

                        <span  class="ml-3 text-lg">Endereço padrão</span>
                    </label>    
                    </div>                         
                </div>

                <div class="w-1/4 px-3 mb-5">
                    <label for="" class="text-xs font-semibold px-1"></label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <button type="submit"  class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar</span>
                        </button>                         
                    </div>   
                </div>
            </div>
            </form>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-white">
            <button
              type="button"
              @click="close"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bus } from '../../../main';
import { companyService } from '../../../services'
import {TheMask} from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "CompanyAddressAdd",
  components: {
      TheMask
  },
  data() {
      return {
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
            edit: false,
            loader: {
                  loading: false,
                  color: '#0bc95b',
            },
            numberless: null,
            address: {
                description: '',
                zipcode: '',
                state: '',
                city: '',
                neighborhood: '',
                address: '',
                number: '',
                complement: '',
                main: false
            },
            submitStatus: null,
            errors: {
                description: null,
                zipcode: null,
                state: null,
                city: null,
                neighborhood: null,
                address: null,
                number: null,
            },
        }
    },
    created() {
      if(this.selectedAddress.number == ''){
        this.selectedAddress.number = 'Sem Número'
      }
    },
    methods: {
        setSN(){
            if (this.edit) {
                this.selectedAddress.number = 'Sem Número'
            }
        },
        setMain(){
            if (this.edit) {
                this.address.main = !this.address.main
            }
        },
        async fillAddress() {
                if(this.address.zipcode == ''){
                    this.errors.zipcode = 'ERROR'
                } else {
                    const res = await fetch(`https://viacep.com.br/ws/${ this.address.zipcode }/json`);
                    const data = await res.json();

                    if(data.erro) {
                        this.$toast.info('Nenhum endereço foi encontrado, preencha manualmente', {
                            position: "bottom-right",
                            pauseOnHover: false,
                            showCloseButtonOnHover: true,
                            timeout: 2500
                        });
                        this.address.zipcode = ''
                        this.errors.zipcode = 'OK'
                    } else {

                    if(res){
                        this.errors.zipcode = 'OK'
                            if(data.uf != '') {
                                this.address.state = data.uf
                                this.errors.state = 'OK'
                            }

                            if(data.city != '') {
                                this.address.city = data.localidade
                                this.errors.city = 'OK'
                            }

                            if(data.bairro != '') {
                                this.address.neighborhood = data.bairro
                                this.errors.neighborhood = 'OK'
                            }
                                    
                            if(data.logradouro != '') {
                                this.address.address = data.logradouro
                                this.errors.address = 'OK'
                            }
                        }
                    }
                }
            },
            createAddress() {
                    this.$v.$touch()

                    if(this.$v.address.description.$invalid) {
                        this.errors.description = 'ERROR'
                    } 

                    if(this.$v.address.zipcode.$invalid) {
                        this.errors.zipcode = 'ERROR'
                    } 

                    if(this.$v.address.state.$invalid) {
                        this.errors.state = 'ERROR'
                    } 

                    if(this.$v.address.city.$invalid) {
                        this.errors.city = 'ERROR'
                    } 

                    if(this.$v.address.neighborhood.$invalid) {
                        this.errors.neighborhood = 'ERROR'
                    } 
                    
                    if(this.$v.address.address.$invalid) {
                        this.errors.address = 'ERROR'
                    } 
                    if(this.numberless == null || this.address.number == "") {
                        this.errors.number = 'ERROR'
                    } 

                if(this.$v.$anyError == false) {
                    var isNumberless= false
                    if(this.numberless == true) {
                        isNumberless = true
                    }

                    const data = {
                        description: this.address.description,
                        zipcode: this.address.zipcode,
                        state: this.address.state,
                        city: this.address.city,
                        neighborhood: this.address.neighborhood,
                        address: this.address.address,
                        number: isNumberless ? 0:this.address.number,
                        complement: this.address.complement,
                        main: this.address.main
                    }
                    companyService.createAddress(data).then((response) => {
                    this.$toast.success(response.success_message, {
                        position: "bottom-right",
                        pauseOnHover: false,
                        showCloseButtonOnHover: true,
                        timeout: 2500
                    });
                    this.edit = false;
                    this.clearInputs();
                    this.close()
                    bus.$emit('updatedCompanyAddress', true);
                    }).catch((error) => {
                        console.log(error.response.data)
                    })
                }
            },
            clearInputs() {
                this.address = {
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
        validations: {
            address: {
                description: {
                    required
                },
                zipcode: {
                    required
                },
                state: {
                    required
                },
                city: {
                    required
                },
                neighborhood: {
                    required
                },
                address: {
                    required
                },
            }
        }
};
</script>