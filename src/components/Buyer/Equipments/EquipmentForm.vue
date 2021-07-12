<template>
    <span>
        <div class="flex -mx-3">
            <div class="w-4/5 px-3 mb-5">
                <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Dados do Equipamento</h2>
            </div>
        </div>
        <form @submit.prevent="createEquipment()">
            <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Descrição</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder="Ex: Trator"  v-model="equipment.description"  @change="() => (errors.description = 'OK')" :class="errors.description == 'ERROR' ? 'border-red-400':'border-primary-main'" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>  
                    <div v-if="errors.description == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Descrição é obrigatório.</span>
                    </div>                       
                </div>
                <div class="w-1/2 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Patrimônio</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input v-model="equipment.patrimony" type="text" class="w-full -ml-10 pl-2 pr-3 py-2 border-primary-main rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                       
                </div>
            </div>
            <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Modelo</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder=" "  v-model="equipment.model"   type="text" class="w-full -ml-10 pl-2 pr-3 py-2 border-primary-main rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                      
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Marca</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input placeholder=" "  v-model="equipment.brand"   type="text" class="w-full -ml-10 pl-2 pr-3 py-2 border-primary-main rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter">
                    </div>                      
                </div>

                <div class="w-1/3 px-3 mb-5">
                    <label for="" class="text-sm font-semibold text-gray-600 px-1">Ano</label>
                    <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <the-mask @change.native="() => (errors.year = 'OK')" :class="errors.year == 'ERROR' ? 'border-red-400':'border-primary-main'" v-model="equipment.year" mask="####" class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"></the-mask>
                    </div>   
                    <div v-if="errors.year == 'ERROR'">
                        <span class="text-xs text-red-400 font-semibold px-1">O campo Ano não é válido.</span>
                    </div>                        
                </div>
            </div>
            <div class="flex -mx-3 justify-end">
                <div class="w-1/3 px-3 mb-5 ">
                    <label for="" class="text-sm font-semibold px-1"></label>
                    <div class="flex items-center justify-center">
                        <button :disabled="disabled" type="submit" class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span class="justify-center">Salvar</span>
                        </button>                         
                    </div>   
                </div>
            </div>
        </form>
    </span>
</template>

<script>
import { equipmentService } from '../../../services';
import { bus } from '../../../main';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'EquipmentForm',
    components: {
    },
    data() {
        return {
            edit: false,
            equipment: {
                description: '',
                patrimony: '',
                model: '',
                year: '',
                brand: '',
            },
            disabled: false,
            loader: {
                  loading: false,
                  color: '#0bc95b',
            },
            errors: {
                description: null,
                year: null
            },
        }
    },
    created() {
    },
    methods: {
        createEquipment() {
            this.$v.$touch()
            if(this.$v.equipment.description.$invalid) {
                this.errors.description = 'ERROR'
            } 
            if(this.equipment.year != null && this.equipment.year != '') {
                var now = new Date()
                if(this.equipment.year >= now.getFullYear() || this.equipment.year < 1900)
                {
                    this.errors.year = 'ERROR'
                }
            } 
            if(this.$v.$anyError == false && this.errors.year != "ERROR") {
                this.disabled = true
            const data = {
                description: this.equipment.description,
                patrimony: this.equipment.patrimony,
                model: this.equipment.model,
                brand: this.equipment.brand,
                year: this.equipment.year,
            }

                equipmentService.createEquipment(data).then((response) => {
                this.$toast.success(response.success_message, {
                    position: "bottom-right",
                    pauseOnHover: false,
                    showCloseButtonOnHover: true,
                    timeout: 2500
                });
                this.disabled = false;
                this.clearInputs();
                bus.$emit('updatedEquipment', true);
                }).catch((error) => {
                this.disabled = false;
                    console.log(error.response.data)
                })
                }
            },
            clearInputs() {
                this.equipment.description = '';
                this.equipment.patrimony = '';
                this.equipment.model = '';
                this.equipment.brand = '';
                this.equipment.year = '';
            }
    },
    validations: {
        equipment: {
            description: {
                required
            }
        }
    }
}
</script>

<style>

</style>