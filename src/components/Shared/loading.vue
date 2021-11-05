<template>
  <div
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center  bgT items-center flex  "
  >
<!--    <img class="spiner" src="../assets/images/Gears.gif">-->
    <ScalingSquaresSpinner
      class="spiner"
      :animation-duration="1250"
      :size="100"
      color="#2bcb6f"
    />
  </div>
</template>

<script>
// import { FlowerSpinner } from 'epic-spinners'
import { ScalingSquaresSpinner } from "epic-spinners";
// import { OrbitSpinner } from 'epic-spinners'
import { bus } from "../main";
export default {
  components: { ScalingSquaresSpinner },
  created() {
    bus.$emit("ModalOpen", true);
  },
  destroyed() {
    bus.$emit("ModalOpen", false);
  },
};
</script>

<style scoped>
.bgT {
  background-color: rgba(255, 255, 255, 0.7);
  /*background-color: rgba(255, 255, 255, 1);*/
}
/*.spiner{*/
/*  margin-left: 35%;*/
/*  margin-top: 20%;*/
/*}*/
</style>