<template>
<span>
    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <equipment-form></equipment-form>
    </div>
        
    <div class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" >
        <equipment-grid></equipment-grid>
    </div>
</span>
</template>

<script>
import EquipmentForm from '../components/Buyer/Equipments/EquipmentForm';
import EquipmentGrid from '../components/Buyer/Equipments/EquipmentGrid';

export default {
    name: 'Equipments',
    props: ['role'],
    components: {
        EquipmentForm,
        EquipmentGrid
    },
    mounted() {
        if(this.role === 1) {
            this.$router.go(-1);
        }
    },
    data() {
        return {
        }
    },
}
</script>

<style>

</style>