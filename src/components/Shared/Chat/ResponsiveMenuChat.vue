<template>
  <div class="pt-3 h-full rounded-l-md border-r border-solid border-gray-500">

    <div class="flex items-center mx-2 mb-3 px-3 py-1 rounded-full border border-solid border-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input class="w-full placeholder-gray-500" type="search" v-model="search" placeholder="Pesquise..." />
    </div>

    <p v-if="filteredConversations.length == 0" class="text-center">Nenhuma conversa encontrada...</p>
    <div v-else class="overflow-y-auto">
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
                <h5 class="font-bold truncate w-48">{{ conversation.user }}</h5>
                <p class="text-gray-500 text-sm">{{formatDate(conversation.lastMessageDateTime)}}</p>
              </div>

              <span v-if="conversation.lastMessageIsImage == 1" class="flex items-center justify-between">
                <span class="flex items-center">
                  <p v-if="conversation.userSend == userId" class="text-gray-500 text-sm mr-1">Você: </p>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p  class="text-gray-500 text-sm truncate w-48">Imagem</p>
                </span>
                <div v-if="conversation.notification === 1" class="flex items-center justify-center text-sm h-5 w-5 rounded-full bg-primary-main text-white">!</div>
              </span>

              <span v-else  class="flex items-center justify-between">
                <p class="text-gray-500 text-sm truncate w-48">{{conversation.userSend == userId ? `Você: ${conversation.lastMessage}` : `${conversation.lastMessage || ''}`}}</p>
                <div v-if="conversation.notification === 1" class="flex items-center justify-center text-sm h-5 w-5 rounded-full bg-primary-main text-white">!</div>
              </span>

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
      userId: localStorage.getItem('user_id'),
    };
  },
  computed: {
    filteredConversations() {
      return this.$props.conversations
      .filter((conversation)=>{
        return conversation.user.toLowerCase().match(this.search.toLowerCase())
      })
      .sort(function(a,b){
        return new Date(b.lastMessageDateTime) - new Date(a.lastMessageDateTime);
      });
      
    }
  },
  methods: {
    formatDate(datetime){
      const messageDateTime = new Date(datetime)

      if (!datetime){
        return ''
      }
      else if (messageDateTime.toLocaleDateString('pt-br') === new Date().toLocaleDateString('pt-br')){
        return messageDateTime.toLocaleTimeString('pt-br').substr(0, 5)
      }
      else{
        return messageDateTime.toLocaleDateString('pt-br')
      }
    }
  }
};
</script>

<style scoped>

</style>