<template>
  <div class="main pt-3 h-full rounded-l-md border-r border-solid border-gray-500">

    <div class="flex items-center mx-2 mb-3 px-3 py-2 rounded-full border border-solid border-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input class="w-full placeholder-gray-500" v-model="search" placeholder="Pesquise..." />
    </div>

    <p v-if="filteredConversations.length == 0" class="text-center">Nenhuma conversa encontrada...</p>
    <div v-else class="overflow-y-auto div-scroll">
      <span v-for="conversation in filteredConversations" :key="conversation.id">
        <div @click="setCurrentConversation(conversation)" :class="currentConversationId == conversation.id ? 'bg-green-100 hover:none' : 'hover:bg-gray-200'"  class="flex items-center cursor-pointer rounded-md py-2 px-2">
          <div class="flex items-center w-full">
            <div class="h-11 w-14 bg-primary-main flex items-center justify-center rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 w-full">
              <div class="w-full items-center flex justify-between">
                <h5 class="font-bold truncate w-64">{{ conversation.user }}</h5>
                <p class="text-gray-500 text-sm">{{conversation.lastMessageDate}}</p>
              </div>
              <p class="text-gray-500 text-sm truncate w-64">{{ conversation.lastMessage }}</p>
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuChat",
  props: ["conversations", "setCurrentConversation", "currentConversationId"],
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredConversations() {
      return this.$props.conversations.filter((conversation)=>{
        return conversation.user.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
};
</script>

<style scoped>
  .div-scroll {
    height: calc(100vh - 195px);
  }
  .main {
    width: 33%;
    min-width: 33%;
    max-width: 33%;
  }
</style>