<template>

  <div v-if="this.$props.currentConversation == null" class="w-full flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <p>Selecione uma conversa...</p>
  </div>

  <span v-else class="w-full h-full flex flex-col justify-between">
    <div class="flex items-center  px-3 py-2 flex items-center justify-between border-b border-solid border-gray-500">
      <p class="truncate w-96">{{this.$props.currentConversation.user}}</p>
      <span>
        <button type="button" class="focus:outline-none" @click="toggleMenuOptions">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        <template v-if="isVisibleMenuOptions">
        <div  v-click-outside="closeMenuOptions">
        <ul
          transition:leave="transition ease-in duration-150"
          transition:leave-start="opacity-100"
          transition:leave-end="opacity-0"
          @click="closeMenuOptions"
          @keydown.escape="closeMenuOptions"
          class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
          aria-label="submenu"
        >
          <li class="flex cursor-pointer" @click="deleteConversation()">
            <div class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span class="ml-2 text-red-500">Excluir conversa</span>
            </div>
          </li>
        </ul>
        </div>
      </template>
    </span>
    </div>

    <div class="overflow-y-auto flex flex-col div-scroll h-full px-3 pt-3 bg-gray-200">
      <div v-for="message in messagesCurrentConversation" :key="message.id">
        <div
          :class="message.userId == userId ? 'bg-green-300 float-right justify-end' : 'float-left bg-white justify-start'"
          class="rounded-md break-all flex-col mb-2 max-min-width w-auto flex py-1 px-2"
        >
          <p>{{message.value}}</p>
          <p class="flex justify-end text-gray-700 text-xs">{{getHour(message.datetime)}}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="rounded-br-md bg-gray-200 flex items-center justify-between px-3 py-3">
      <input v-model="message" maxlength="255" class="input-send placeholder-gray-500 rounded-full border border-solid border-gray-500 px-3 py-1" placeholder="Digite sua mensagem..." />

      <span class="buttons flex items-center justify-evenly">
        <input id="fileInput" type="file" class="hidden" />
        <button type="button" v-tooltip="{ content: 'Escolher arquivo' }" onclick="document.getElementById('fileInput').click()" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main hover:h-7 hover:w-7 hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        
        <button type="submit" :disabled="message == ''" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="message == '' ? 'text-gray-500' : 'text-primary-main hover:h-7 hover:w-7 hover:opacity-60'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </span>
    </form>

  </span>
</template>

<script>
import vClickOutside from 'v-click-outside';
export default {
  name: "MessageAreaChat",
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: ["currentConversation", "messagesCurrentConversation"],
  data() {
    return {
      isVisibleMenuOptions: false,
      message: '',
      userId: '1',
    };
  },
  methods: {
    toggleMenuOptions(){
      this.isVisibleMenuOptions = !this.isVisibleMenuOptions
    },
    closeMenuOptions(){
      this.isVisibleMenuOptions = false
    },
    deleteConversation(){
      //alert(this.$props.currentConversation.id)
      this.$toast.success('Conversa excluída com sucesso!', {
        position: "bottom-right",
        pauseOnHover: false,
        showCloseButtonOnHover: true,
        timeout: 2500,
      });
    },
    sendMessage() {
      alert(this.message)
      this.message = ''
    },
    getHour(datetime){
      return datetime.slice(datetime.length - 5);
    }
  },
};
</script>

<style scoped>
.input-send{
  width: 88%;
}
.buttons{
  width: 12%
}
.div-scroll {
  height: calc(100vh - 195px);
}
.max-min-width{
  max-width: 26rem;
  min-width: 6rem;
}
</style>v