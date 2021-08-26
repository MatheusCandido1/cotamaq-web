<template>
  <span>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      v-if="categoriesModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Olá, {{ user.name }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-700">
                    Está quase tudo pronto para começar a usar a plataforma
                    Cotamaq.
                  </p>
                  <p class="text-sm text-gray-700">
                    Para continuar, escolha uma ou mais categorias de venda.
                  </p>
                </div>
                <div class="mt-2 flex justify-content items-center">
                  <div
                    class="md:w-custom mx-auto py-8 md:flex md:justify-start md:flex-wrap"
                  >
                    <div
                      class="w-32 h-32 mr-4 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
                      tabindex="0"
                      @click="toggleCategories(category.id)"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <div class="flex grid justify-center items-center mb-3">
                        <div class="flex justify-center items-center">
                          <div
                            :class="
                              selectedCategories.includes(category.id)
                                ? 'bg-primary-lighter'
                                : 'bg-gray-400'
                            "
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full sm:mx-0 sm:h-8 sm:w-8"
                          >
                            <i
                              class="mdi mdi-checkbox-multiple-marked text-white text-md"
                            ></i>
                          </div>
                        </div>
                        <h2 class="text-base text-blue-darker my-2">
                          {{ category.name }}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span
            v-if="loader.loading"
            class="flex justify-center align-center mb-3"
          >
            <bar-loader
              :color="loader.color"
              :loading="loader.loading"
              :size="150"
            ></bar-loader>
          </span>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="attachCategories()"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-main text-base font-medium text-white hover:bg-primary-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :style="categoriesModal ? 'pointer-events:none; opacity: 0.6' : ''"
      class="flex h-screen bg-gray-50 dark:bg-gray-900"
      :class="{ 'overflow-hidden': isSideMenuOpen }"
    >
      <!-- Desktop sidebar -->
      <aside
        :style="ModalOpen ? 'pointer-events:none; opacity: 0.6' : ''"
        class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
      >
        <div class="py-4 text-gray-500  dark:text-gray-400">
          <a
            class="text-lg font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            <img
              class="mx-auto h-12 w-auto "
              src="../assets/images/logo-01.png"
              alt=""
            />
          </a>
          <ul class="mt-6">
            <!--<li class="relative px-6 py-3 hover:text-gray-800 " style="cursor: pointer">
              <span
                v-if="getRouteName == 'dashboard'"
                class="absolute inset-y-0 left-0 w-1 bg-primary-main rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <router-link 
                :to="{path: '/'}" v-on:click.native="closePagesMenu" class="inline-flex items-center w-full text-sm font-semibold text-gray-700 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-home-outline  text-2xl"></i><span class="ml-4">Painel</span>
              </router-link>
            </li> -->

            <li
              class="relative px-6 py-3 hover:text-gray-800 "
              style="cursor: pointer"
            >
              <span
                v-if="getRouteName == 'estimates'"
                class="absolute inset-y-0 left-0 w-1 bg-primary-main rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <router-link
                v-on:click.native="closePagesMenu"
                :to="{ path: '/cotacoes' }"
                class="inline-flex items-center w-full text-sm font-semibold text-gray-700 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-file-document-edit text-2xl"></i
                ><span class="ml-4">Cotações</span>
              </router-link>
            </li>

            <li
              class="relative px-6 py-3 hover:text-gray-800 "
              style="cursor: pointer"
            >
              <span
                v-if="getRouteName == 'orders'"
                class="absolute inset-y-0 left-0 w-1 bg-primary-main rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <router-link
                v-on:click.native="closePagesMenu"
                :to="{ path: '/pedidos' }"
                class="inline-flex items-center w-full text-sm font-semibold text-gray-700 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-format-list-numbered  text-2xl"></i
                ><span class="ml-4">Pedidos</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="relative px-6 py-3">
              <span
                v-if="
                  getRouteName == 'payments' ||
                    getRouteName == 'companies' ||
                    getRouteName == 'addresses'
                "
                class="absolute inset-y-0 left-0 w-1 bg-primary-main rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
             <button
                class="inline-flex text-gray-700 items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="togglePagesMenu"
                aria-haspopup="true"
              >
                <span class="inline-flex items-center">
                  <i class="mdi mdi-cog-sync  text-2xl"></i>
                  <span class="ml-4">Configurações</span>
                </span>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <template v-if="isPagesMenuOpen">
                <ul
                  transition:enter="transition-all ease-in-out duration-300"
                  transition:enter-start="opacity-25 max-h-0"
                  transition:enter-end="opacity-100 max-h-xl"
                  transition:leave="transition-all ease-in-out duration-300"
                  transition:leave-start="opacity-100 max-h-xl"
                  transition:leave-end="opacity-0 max-h-0"
                  class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <li
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      v-on:click.native="closePagesMenu"
                      :to="{ path: '/enderecos' }"
                      class="w-full text-gray-600"
                    >
                      Endereços
                    </router-link>
                  </li>
                  <li
                    v-if="user.role === 1"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      :to="{ path: '/pagamentos' }"
                      class="w-full text-gray-600"
                    >
                      Pagamentos
                    </router-link>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      v-on:click.native="closePagesMenu"
                      :to="{ path: '/empresa' }"
                      class="w-full text-gray-600"
                    >
                      Empresa
                    </router-link>
                  </li>

                  <li
                    v-if="user.role === 2"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      :to="{ path: '/equipamentos' }"
                      class="w-full text-gray-600"
                    >
                      Equipamentos
                    </router-link>
                  </li>

                  <li
                    v-if="user.role === 1"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      :to="{ path: '/usuarios' }"
                      class="w-full text-gray-600"
                    >
                      Usuarios
                    </router-link>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </aside>
      <!-- Mobile sidebar -->
      <!-- Backdrop -->
      <div
        v-show="isSideMenuOpen"
        transition:enter="transition ease-in-out duration-150"
        transition:enter-start="opacity-0"
        transition:enter-end="opacity-100"
        transition:leave="transition ease-in-out duration-150"
        transition:leave-start="opacity-100"
        transition:leave-end="opacity-0"
        class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      ></div>
      <aside
        :style="ModalOpen ? 'pointer-events:none; opacity: 0.6' : ''"
        class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
        v-show="isSideMenuOpen"
        transition:enter="transition ease-in-out duration-150"
        transition:enter-start="opacity-0 transform -translate-x-20"
        transition:enter-end="opacity-100"
        transition:leave="transition ease-in-out duration-150"
        transition:leave-start="opacity-100"
        transition:leave-end="opacity-0 transform -translate-x-20"
        @click="closeSideMenu"
        @keydown.escape="closeSideMenu"
      >
        <div class="py-4 text-gray-500 dark:text-gray-400">
          <a
            class="text-lg font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            <img
              class="mx-auto h-12 w-auto "
              src="../assets/images/logo-01.png"
              alt=""
            />
          </a>
          <ul class="mt-6">
            <!--
            <li class="relative px-6 py-3 hover:text-gray-800 " style="cursor: pointer">
              <router-link 
                :to="{path: '/pedidos'}" @click="togglePagesMenu"  class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-home-outline  text-2xl"></i><span class="ml-4">Painel</span>
              </router-link>
            </li> -->

            <li
              class="relative px-6 py-3 hover:text-gray-800 "
              style="cursor: pointer"
            >
              <router-link
                :to="{ path: '/cotacoes' }"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-file-document-edit text-2xl"></i
                ><span class="ml-4">Cotações</span>
              </router-link>
            </li>

            <li
              class="relative px-6 py-3 hover:text-gray-800 "
              style="cursor: pointer"
            >
              <router-link
                :to="{ path: '/pedidos' }"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <i class="mdi mdi-format-list-numbered  text-2xl"></i
                ><span class="ml-4">Pedidos</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="togglePagesMenu"
                aria-haspopup="true"
              >
                <span class="inline-flex items-center">
                  <i class="mdi mdi-cog-sync  text-2xl"></i>
                  <span class="ml-4">Configurações</span>
                </span>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <template v-if="isPagesMenuOpen">
                <ul
                  transition:enter="transition-all ease-in-out duration-300"
                  transition:enter-start="opacity-25 max-h-0"
                  transition:enter-end="opacity-100 max-h-xl"
                  transition:leave="transition-all ease-in-out duration-300"
                  transition:leave-start="opacity-100 max-h-xl"
                  transition:leave-end="opacity-0 max-h-0"
                  class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <li
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link
                      v-on:click.native="closePagesMenu"
                      :to="{ path: '/enderecos' }"
                      class="w-full "
                    >
                      Endereços
                    </router-link>
                  </li>
                  <li
                    v-if="user.role === 1"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link :to="{ path: '/pagamentos' }" class="w-full">
                      Pagamentos
                    </router-link>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link :to="{ path: '/empresa' }" class="w-full">
                      Empresa
                    </router-link>
                  </li>
                  <li
                    v-if="user.role === 2"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link :to="{ path: '/equipamentos' }" class="w-full">
                      Equipamentos
                    </router-link>
                  </li>

                  <li
                    v-if="user.role === 1"
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <router-link :to="{ path: '/usuarios' }" class="w-full">
                      Usuarios
                    </router-link>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </aside>
      <div class="flex flex-col flex-1">
        <header
          :style="ModalOpen ? 'pointer-events:none; opacity: 0.6' : ''"
          class="z-10 py-4 bg-primary-main shadow-md dark:bg-gray-800"
        >
          <div
            class="container flex items-center justify-between h-full px-6 mx-auto text-gray-800 dark:text-purple-300"
          >
            <!-- Mobile hamburger -->
            <button
              class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              @click="toggleSideMenu"
              aria-label="Menu"
            >
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <!-- Search input -->
            <div class="flex justify-center flex-1 lg:mr-32">
              <div
                style="display:none"
                class="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
              >
                <div class="absolute inset-y-0 flex items-center pl-2">
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                  type="text"
                  placeholder="Search for projects"
                  aria-label="Search"
                />
              </div>
            </div>
            <ul class="flex items-center flex-shrink-0 space-x-2">
              <!-- Profile menu -->
              <span class="text-black ">Olá, {{ this.user.name }}</span>
              <li class="relative">
                <button
                  class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                  @click="toggleNotificationMenu"
                  @keydown.escape="closeProfileMenu"
                  aria-label="Account"
                  aria-haspopup="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"  class="text-black object-cover  w-8 h-8 rounded-full " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                  <span v-if="notificationList.length > 0 " class="badge font-bold text-white">{{notificationList.length}}</span>
                </button>
                <template v-if="isNotificationOpen">
                  <ul
                    transition:leave="transition ease-in duration-150"
                    transition:leave-start="opacity-100"
                    transition:leave-end="opacity-0"
                    @click="closeProfileMenu"
                    @keydown.escape="closeProfileMenu"
                    class="absolute right-0 w-72 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                    aria-label="submenu"
                  > 
                 <div v-if="notificationList.length > 0"> 
                    <div  v-for="(data, index) in notificationList" :key="data.id " class="mt-1" >
                     <NotificationPreview v-if="index < 3"    :index="index" :notification="data"
                        @deleteNotification="deleteNotification"
                      />
                  </div>

                 

                 </div>
                  <div v-else class="text-center"> 
                    <p>Sem novas Notificações</p>
                  </div>
                 
                   
                   
                    <div class="flex justify-end ">
                     <button @click="handleNotificationClick">
                      <p class="text-primary-main font-semibold mt-2 text-sm">Ver todas...</p>
                     </button>
                    </div>
                  </ul>
                </template>
               
              </li>
              <li class="relative">
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
                      <a
                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      >
                        <span
                          class="w-full flex justify-center items-center text-white bg-primary-lighter px-4 py-1 text-sm rounded mx-2 font-semibold"
                        >
                          {{ user.company }}</span
                        >
                      </a>
                    </li>
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
                        @click="logout()"
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
                </template>
              </li>
            </ul>
          </div>
        </header>
        <main class="h-full pb-16 overflow-y-auto">
          <!-- Remove everything INSIDE this div to a really blank page -->
          <div class="container px-6 mx-auto grid">
            <router-view :role="this.user.role"></router-view>
          </div>
        </main>
      </div>
    </div>
  </span>
</template>

<script>
import { userService, categoryService } from "../services";
import { BarLoader } from "@saeris/vue-spinners";
import { bus } from "../main";
import NotificationPreview from '../components/Shared/Notification/NotificationPreview'
window.Pusher = require('pusher-js');
import { echoService } from '../services'

export default {
  name: "Layout",
  components: {
    BarLoader,
    NotificationPreview
  },
  data() {
    return {
      loader: {
        loading: false,
        color: "#0bc95b",
      },

      categories: [],
      selectedCategories: [],
      isSideMenuOpen: false,
      isProfileMenuOpen: false,
      isPagesMenuOpen: false,
      categoriesModal: false,
      ModalOpen: false,
      user: {
        role: null,
        first_login: null,
        has_categories: null,
        name: null,
        company: null,
        id:null,
        categories:[],
      },
      notification:false,
      isNotificationOpen:false,
      notificationList:[]
     
    };
  },
  beforeMount() {
    
  },
 async mounted() {
    await this.getUser()
    

          
  },
 async created() {
   echoService.connect()

    bus.$off("ModalOpen");
    bus.$on("ModalOpen", (data) => {
      this.ModalOpen = data;
    });
    window.user = null 
   
    bus.$off("updatedUser");
    bus.$on("updatedUser", (data) => {
      if (data) {
        userService.me().then((response) => {
            const data = response.data.data;
            this.user.company = data.company.fantasy_name;
            this.user.role = data.role_id;
            this.user.first_login = data.first_login;
            this.user.has_categories = data.has_categories;
            this.user.name = data.name;
            this.user.id = 1;
            sessionStorage.setItem('userId', data.id)
            if (
              this.user.first_login == 0 &&
              this.user.role == 1 &&
              this.user.has_categories == 0
            ) {
              this.openCategoriesModal();
              this.getCategories();
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    });

    
  },
  computed: {
    getRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    checkRead(){
      var list = []
    
     this.notificationList.forEach((data, index)=>{
       
       if(index <= 5){
         console.log('antes de delete',this.notificationList)

         console.log('delete',index)

          list.push(data)

         this.notificationList.splice(index, 1)

         console.log('dps que deletou',this.notificationList)
       }
     })
    //  this.notificationList.splice(1,3)
     
     console.log('lista com ',list)


     ///CHAMADA PRO BACK END

    },
    deleteNotification(index){
      this.notificationList.splice(index,1)

      this.isNotificationOpen= false


    },
      async getUser(){

     

        

      await userService.me().then((response) => {
       
        const data = response.data.data;
        this.$store.commit('setNotification', data.notifications)

        this.user.company = data.company.fantasy_name;
        this.user.role = data.role_id;
        this.user.first_login = data.first_login;
        this.user.has_categories = data.has_categories;
        this.user.name = data.name;
        this.user.id = data.id;
        sessionStorage.setItem('userId', data.id)
        sessionStorage.setItem('categories', JSON.stringify(data.categories))




         if(data.categories != null && data.categories.length > 0){
           data.categories.forEach((data)=>{
             window.Echo.private(`category.${data.id}`).listen('.newEstimate', event =>{
              console.log(event)

              this.notificationList.push(event.message)
              console.log(this.notificationList)
              this.notification = true
              this.$toast.success(event.message.notification, {
                  position: "bottom-right",
                  pauseOnHover: false,
                  showCloseButtonOnHover: true,
                  timeout: 3500,
              });

            })
           })
            
        }
        
        if (
          this.user.first_login == 0 &&
          this.user.role == 1 &&
          this.user.has_categories == 0
        ) {
          this.openCategoriesModal();
          this.getCategories();
        }

       
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    },
    toggleNotificationMenu(){
      this.isNotificationOpen = !this.isNotificationOpen
      this.notification = false
      this.isProfileMenuOpen = false
    },
    getCategories() {
      this.loader.loading = true;
      categoryService
        .getCategories()
        .then((response) => {
          this.categories = response.data.data;
          this.loader.loading = false;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    handleNotificationClick() {
      this.isNotificationOpen = false
      this.$router.push({name: 'notifications'})
    },
    toggleCategories(value) {
      if (this.selectedCategories.includes(value)) {
        for (var i = 0; i < this.selectedCategories.length; i++) {
          if (this.selectedCategories[i] === value) {
            this.selectedCategories.splice(i, 1);
          }
        }
      } else {
        this.selectedCategories.push(value);
      }
    },
    openCategoriesModal() {
      this.categoriesModal = true;
    },
    closeCategoriesModal() {
      this.categoriesModal = false;
    },
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
      this.closeSideMenu();
      this.isNotificationOpen = false
    },
    closePagesMenu() {
      this.isPagesMenuOpen = false;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;    },
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen;
    },
    attachCategories() {
      if (this.selectedCategories.length === 0) {
        this.$toast.error("Escolha pelo menos uma categoria!", {
          position: "bottom-right",
          pauseOnHover: false,
          showCloseButtonOnHover: true,
          timeout: 2500,
        });
      } else {
        this.loader.loading = true;
        const payload = this.selectedCategories;
        userService
          .toggleCategories(payload)
          .then((response) => {
            this.$toast.success(response.success_message, {
              position: "bottom-right",
              pauseOnHover: false,
              showCloseButtonOnHover: true,
              timeout: 2500,
            });
            this.loader.loading = false;
            this.closeCategoriesModal();
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
    },

    logout() {
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

<style >
* {
  box-shadow: none;
    border: none;
    -webkit-appearance: none;
	outline: none;
}

*:focus {
  outline: none;
}

.rounded-50{
  border-radius: 50%;
  margin-bottom:  -11px
  
}
.notification {
  box-shadow: 0 0 0 0 #fff;
  transform: scale(1);
  animation: pulse 2s infinite;
}

.badge {
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #000;
  color: #d7e6fd;
  right: 0;
  border-radius: 9999px;
  font-size: 12px;
  min-width: 18px;
  line-height: 18px;
  min-height: 18px;
  text-align: center;
}


@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 #fff;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
