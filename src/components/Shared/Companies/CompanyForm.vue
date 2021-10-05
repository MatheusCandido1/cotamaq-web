<template>
  <div>
    <div
      class="my-6 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <form id="form" @submit.prevent="updateCompany">
        <div class="flex -mx-3">
          <div class="w-4/5 px-3 mb-5">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Seus Dados
            </h2>
            <bar-loader
              class="mt-3"
              :color="loader.color"
              :loading="loader.loading"
              :size="150"
            ></bar-loader>
          </div>
          <div class="w-1/5 px-3 mb-5">
            <label for="" class="text-xs font-semibold px-1"></label>
            <div class="flex" v-if="!edit">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <button
                @click="enableEdit()"
                class="md:w-full -ml-10 pl-2 pr-3 py-2  flex items-center justify-center bg-primary-main text-white font-semibold rounded border-b-2 border-primary-main  hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              >
                <span class="justify-center">Editar</span>
              </button>
            </div>
          </div>
        </div>
        <div class="md:flex -mx-3">
          <div class="w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >Nome do Titular ou Nome Fantasia</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <input
                :class="
                  errors.fantasy_name == 'ERROR'
                    ? 'border-red-400'
                    : 'border-primary-main'
                "
                @change="() => (errors.fantasy_name = 'OK')"
                :disabled="!edit"
                v-model="company.fantasy_name"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              />
            </div>
            <div v-if="errors.fantasy_name == 'ERROR'">
              <span class="text-xs text-red-400 font-semibold px-1"
                >O campo Nome do Titular ou Nome Fantasia é obrigatório.</span
              >
            </div>
          </div>
        </div>
        <div class="md:flex  md:flex-wrap -mx-3">
          <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >Nome ou Razão Social</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <input
                :class="
                  errors.company_name == 'ERROR'
                    ? 'border-red-400'
                    : 'border-primary-main'
                "
                @change="() => (errors.company_name = 'OK')"
                :disabled="!edit"
                v-model="company.company_name"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              />
            </div>
            <div v-if="errors.company_name == 'ERROR'">
              <span class="text-xs text-red-400 font-semibold px-1"
                >O campo Nome ou Razão Social é obrigatório.</span
              >
            </div>
          </div>
          <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >CPF/CNPJ</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <the-mask
                @change.native="() => (errors.cnpj = 'OK')"
                :mask="['###.###.###-##', '##.###.###/####-##']"
                :disabled="!edit"
                :class="
                  errors.cnpj == 'ERROR'
                    ? 'border-red-400'
                    : 'border-primary-main'
                "
                v-model="company.cnpj"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              ></the-mask>
            </div>
            <div v-if="errors.cnpj == 'ERROR'">
              <span class="text-xs text-red-400 font-semibold px-1"
                >O campo CNPJ é obrigatório.</span
              >
            </div>
          </div>
          <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >Inscrição Estadual</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <input
                :disabled="!edit"
                :class="!edit ? 'text-gray-500' : 'text-black'"
                v-model="company.state_vat"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              />
            </div>
          </div>
          <div class="lg:w-1/4 md:w-1/2 sm:w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >Inscrição Municipal</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <input
                :disabled="!edit"
                :class="!edit ? 'text-gray-500' : 'text-black'"
                v-model="company.city_vat"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 border-primary-main shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-3">
          <div class="md:w-1/2 w-full px-3 mb-5">
            <label for="" class="text-sm font-semibold text-gray-600 px-1"
              >Fone/Fax</label
            >
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <the-mask
                :class="
                  errors.phone == 'ERROR'
                    ? 'border-red-400'
                    : 'border-primary-main'
                "
                @change.native="() => (errors.phone = 'OK')"
                :mask="['(##) ####-####', '(##) #####-####']"
                :disabled="!edit"
                v-model="company.phone"
                placeholder=""
                type="text"
                class="w-full -ml-10 pl-2 pr-3 py-2 rounded border-b-2 shadow-md py-2 px-6 outline-none  focus:border-primary-lighter"
              ></the-mask>
            </div>
            <div v-if="errors.phone == 'ERROR'">
              <span class="text-xs text-red-400 font-semibold px-1"
                >O campo Fone/Fax é obrigatório.</span
              >
            </div>
          </div>
        </div>
        <div class="flex justify-end -mx-3 -ml-10 pl-2 pr-3 py-2 " v-if="edit">
          <div class="w-1/6 mb-5">
            <label for="" class="text-xs font-semibold px-1"></label>
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <button
                type="submit"
                class="w-full flex items-center justify-center bg-primary-main text-white font-semibold rounded hover:bg-primary-darker hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              >
                <span class="justify-center">Salvar</span>
              </button>
            </div>
          </div>

          <div class="w-1/6 mb-5">
            <label for="" class="text-xs font-semibold px-1"></label>
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              ></div>
              <button
                @click="disableEdit()"
                class="w-full flex items-center justify-center bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              >
                <span class="justify-center">Voltar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
import { companyService } from "../../../services";
import { TheMask } from "vue-the-mask";
import { BarLoader } from "@saeris/vue-spinners";
import { required } from "vuelidate/lib/validators";
import { isValidCPF, isValidCNPJ } from "../../../helpers/validations";
export default {
  name: "CompanyForm",
  components: {
    TheMask,
    BarLoader,
  },
  data() {
    return {
      edit: false,
      loader: {
        loading: false,
        color: "#0bc95b",
      },
      errors: {
        fantasy_name: null,
        company_name: null,
        cnpj: null,
        phone: null,
      },
      company: {
        fantasy_name: "",
        company_name: "",
        cnpj: "",
        state_vat: "",
        city_vat: "",
        email: "",
        phone: "",
      },
      alert: false,
    };
  },
  mounted() {
    this.getCompany();
  },
  updated() {
    bus.$off("updatedCompanyAddress");
    bus.$on("updatedCompanyAddress", (data) => {
      if (data) {
        this.getCompanyAddresses();
      }
    });
  },
  methods: {
    getCompany() {
      this.loader.loading = true;
      companyService
        .getCompanies()
        .then((response) => {
          this.company = response.data.data.company;
          this.loader.loading = false;
        })
        .catch((error) => {
          console.log(error.response.data);
          this.loader.loading = false;
        });
    },
    updateCompany() {
      this.$v.$touch();
      if (this.$v.company.fantasy_name.$invalid) {
        this.errors.fantasy_name = "ERROR";
      }
      if (this.$v.company.company_name.$invalid) {
        this.errors.company_name = "ERROR";
      }
      if (this.$v.company.cnpj.$invalid) {
        this.errors.cnpj = "ERROR";
      }
      if (this.$v.company.phone.$invalid) {
        this.errors.phone = "ERROR";
      }
      if (this.$v.$anyError == false) {
        if (
          !this.company.cnpj ||
          (this.company.cnpj.length !== 14 && this.company.cnpj.length !== 11)
        ) {
          this.$toast.error("Preencha o campo de CPF/CNPJ corretamente!", {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500,
          });
        } else if (
          this.company.cnpj.length === 11 &&
          isValidCPF(this.company.cnpj) === false
        ) {
          this.$toast.error("CPF inválido!", {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500,
          });
        } else if (
          this.company.cnpj.length === 14 &&
          isValidCNPJ(this.company.cnpj) === false
        ) {
          this.$toast.error("CNPJ inválido!", {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500,
          });
        } else if (
          this.company.phone.length !== 10 &&
          this.company.phone.length !== 11
        ) {
          this.$toast.error("Telefone inválido!", {
            position: "bottom-right",
            pauseOnHover: false,
            showCloseButtonOnHover: true,
            timeout: 2500,
          });
        } else {
          const data = {
            fantasy_name: this.company.fantasy_name,
            company_name: this.company.company_name,
            cnpj: this.company.cnpj,
            state_vat: this.company.state_vat,
            city_vat: this.company.city_vat,
            email: this.company.email,
            phone: this.company.phone,
          };
          companyService
            .updateCompany(data)
            .then((response) => {
              this.$toast.success(response.success_message, {
                position: "bottom-right",
                pauseOnHover: false,
                showCloseButtonOnHover: true,
                timeout: 2500,
              });
              this.disableEdit();
              bus.$emit("updatedUser", true);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }
      } else {
        document.getElementById("form").scrollIntoView();
        this.$toast.error("Preencha corretamente todos os campos", {
          position: "bottom-right",
          pauseOnHover: false,
          showCloseButtonOnHover: true,
          timeout: 2500,
        });
      }
    },
    enableEdit() {
      this.edit = true;
    },
    disableEdit() {
      this.edit = false;
    },
  },
  validations: {
    company: {
      fantasy_name: {
        required,
      },
      company_name: {
        required,
      },
      cnpj: {
        required,
      },
      phone: {
        required,
      },
    },
  },
};
</script>

<style></style>