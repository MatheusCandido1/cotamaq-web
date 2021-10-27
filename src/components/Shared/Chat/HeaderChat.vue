<template>
  <header class="bg-primary-main h-14 flex items-center justify-between px-3">
    <button class="flex items-center" type="button" @click="goBack()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Voltar
    </button>

    <span class="z-50">
    <button
      class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
      @click="toggleProfileMenu"
      @keydown.escape="closeProfileMenu"
      aria-label="Account"
      aria-haspopup="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="text-black object-cover w-8 h-8 rounded-full " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <template v-if="isProfileMenuOpen">
      <div  v-click-outside="closeProfileMenu">
      <ul
        transition:leave="transition ease-in duration-150"
        transition:leave-start="opacity-100"
        transition:leave-end="opacity-0"
        @click="closeProfileMenu"
        @keydown.escape="closeProfileMenu"
        class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
        aria-label="submenu"
      >
        <li class="flex">
          <router-link
            :to="{ path: '/perfil' }"
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="#"
          >
            <svg
              class="w-4 h-4 mr-3"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>Perfil</span>
          </router-link>
        </li>

        <li class="flex">
          <a
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            @click="handleLogout()"
            style="cursor: pointer"
          >
            <svg
              class="w-4 h-4 mr-3"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
            <span class="">Sair</span>
          </a>
        </li>
      </ul>
      </div>
    </template>
    </span>
  </header>
</template>

<script>
import vClickOutside from 'v-click-outside';
import {userService} from '../../../services';

export default {
  name: "HeaderChat",
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      isProfileMenuOpen: false,
    };
  },
  methods: {
    logout() {
      alert("Teste");
    },
    goBack() {
      this.$router.back()
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    handleLogout() {
      userService
        .logout()
        .then(() => {
          sessionStorage.removeItem("user");
          location.reload(true);
        })
        .catch((e) => console.log(e.response));
    },
  },
};
</script>

<style scoped>
</style>v