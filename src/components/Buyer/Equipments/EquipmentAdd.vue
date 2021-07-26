<template>
  <transition name="modal-fade">
    <div
      class="
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
        flex
      "
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
        </div>
        <!--content-->
        <div
          class="
            border-0
            rounded-lg
            shadow-lg
            relative
            flex flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
          "
        >
          <!--header-->
          <form @submit.prevent="createEquipment">
            <div
              class="
                flex
                items-center
                justify-between
                p-5
                border-b border-solid border-blueGray-200
                rounded-t
              "
            >
              <h3 class="text-xl font-semibold">Dados do Equipamento</h3>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
              <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-sm font-semibold text-gray-600 px-1"
                    >Descrição</label
                  >
                  <div class="flex">
                    <div
                      class="
                        w-10
                        z-10
                        pl-1
                        text-center
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                      "
                    ></div>
                    <input
                      placeholder="Ex: Trator"
                      v-model="equipment.description"
                      @change="() => (errors.description = 'OK')"
                      :class="
                        errors.description == 'ERROR'
                          ? 'border-red-400'
                          : 'border-primary-main'
                      "
                      type="text"
                      class="
                        w-full
                        -ml-10
                        pl-2
                        pr-3
                        py-2
                        rounded
                        border-b-2
                        shadow-md
                        py-2
                        px-6
                        outline-none
                        focus:border-primary-lighter
                      "
                    />
                  </div>
                  <div v-if="errors.description == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1"
                      >O campo Descrição é obrigatório.</span
                    >
                  </div>
                </div>
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-sm font-semibold text-gray-600 px-1"
                    >Patrimônio</label
                  >
                  <div class="flex">
                    <div
                      class="
                        w-10
                        z-10
                        pl-1
                        text-center
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                      "
                    ></div>
                    <input
                      v-model="equipment.patrimony"
                      type="text"
                      class="
                        w-full
                        -ml-10
                        pl-2
                        pr-3
                        py-2
                        border-primary-main
                        rounded
                        border-b-2
                        shadow-md
                        py-2
                        px-6
                        outline-none
                        focus:border-primary-lighter
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-1/3 px-3 mb-5">
                  <label for="" class="text-sm font-semibold text-gray-600 px-1"
                    >Modelo</label
                  >
                  <div class="flex">
                    <div
                      class="
                        w-10
                        z-10
                        pl-1
                        text-center
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                      "
                    ></div>
                    <input
                      placeholder=" "
                      v-model="equipment.model"
                      type="text"
                      class="
                        w-full
                        -ml-10
                        pl-2
                        pr-3
                        py-2
                        border-primary-main
                        rounded
                        border-b-2
                        shadow-md
                        py-2
                        px-6
                        outline-none
                        focus:border-primary-lighter
                      "
                    />
                  </div>
                </div>

                <div class="w-1/3 px-3 mb-5">
                  <label for="" class="text-sm font-semibold text-gray-600 px-1"
                    >Marca</label
                  >
                  <div class="flex">
                    <div
                      class="
                        w-10
                        z-10
                        pl-1
                        text-center
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                      "
                    ></div>
                    <input
                      placeholder=" "
                      v-model="equipment.brand"
                      type="text"
                      class="
                        w-full
                        -ml-10
                        pl-2
                        pr-3
                        py-2
                        border-primary-main
                        rounded
                        border-b-2
                        shadow-md
                        py-2
                        px-6
                        outline-none
                        focus:border-primary-lighter
                      "
                    />
                  </div>
                </div>

                <div class="w-1/3 px-3 mb-5">
                  <label for="" class="text-sm font-semibold text-gray-600 px-1"
                    >Ano</label
                  >
                  <div class="flex">
                    <div
                      class="
                        w-10
                        z-10
                        pl-1
                        text-center
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                      "
                    ></div>
                    <the-mask
                      @change.native="() => (errors.year = 'OK')"
                      :class="
                        errors.year == 'ERROR'
                          ? 'border-red-400'
                          : 'border-primary-main'
                      "
                      v-model="equipment.year"
                      mask="####"
                      class="
                        w-full
                        -ml-10
                        pl-2
                        pr-3
                        py-2
                        rounded
                        border-b-2
                        shadow-md
                        py-2
                        px-6
                        outline-none
                        focus:border-primary-lighter
                      "
                    ></the-mask>
                  </div>
                  <div v-if="errors.year == 'ERROR'">
                    <span class="text-xs text-red-400 font-semibold px-1"
                      >O campo Ano não é válido.</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--footer-->
            <div
              class="
                flex
                items-center
                justify-end
                p-6
                border-t border-solid border-blueGray-200
                rounded-b
              "
            >
              <button
                type="button"
                @click="close"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-primary-main
                  sm:mt-0
                  sm:ml-3
                  sm:w-auto
                  sm:text-sm
                "
              >
                Cancelar
              </button>
              <button
                :disabled="disabled"
                type="submit"
                class="
                  w-full
                  bg-primary-main
                  hover:bg-primary-lighter
                  inline-flex
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  text-base
                  font-medium
                  text-white
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-primary-main
                  sm:ml-3
                  sm:w-auto
                  sm:text-sm
                "
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bus } from "../../../main";
import { equipmentService } from "../../../services";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EquipmentAdd",
  props: ["origin"],
  components: {},
  data() {
    return {
      disabled: false,
      source: this.$props.origin,
      equipment: {
        description: "",
        patrimony: "",
        model: "",
        year: "",
        brand: "",
      },
      errors: {
        description: null,
        year: null,
      },
    };
  },
  methods: {
    createEquipment() {
      this.$v.$touch();
      if (this.$v.equipment.description.$invalid) {
        this.errors.description = "ERROR";
      }

      if (this.equipment.year != null && this.equipment.year != "") {
        var now = new Date();
        if (
          this.equipment.year >= now.getFullYear() ||
          this.equipment.year < 1900
        ) {
          this.errors.year = "ERROR";
        }
      }

      if (this.$v.$anyError == false && this.errors.year != "ERROR") {
        this.disabled = true;
        const data = {
          description: this.equipment.description,
          patrimony: this.equipment.patrimony,
          model: this.equipment.model,
          brand: this.equipment.brand,
          year: this.equipment.year,
        };

        equipmentService
          .createEquipment(data)
          .then((response) => {
            this.$toast.success(response.success_message, {
              position: "bottom-right",
              pauseOnHover: false,
              showCloseButtonOnHover: true,
              timeout: 2500,
            });
            this.disabled = false;
            this.clearInputs();
            this.close();
            if (this.source == "create") {
              bus.$emit("updatedEstimateEquipmentCreate", true);
            } else {
              bus.$emit("updatedEstimateEquipmentUpdate", true);
            }
          })
          .catch((error) => {
            this.disabled = false;
            console.log(error.response.data);
          });
      }
    },
    clearInputs() {
      this.equipment.description = "";
      this.equipment.patrimony = "";
      this.equipment.model = "";
      this.equipment.brand = "";
      this.equipment.year = "";
    },
    close() {
      this.$emit("close");
    },
  },
  validations: {
    equipment: {
      description: {
        required,
      },
    },
  },
};
</script>