<template>
  <span>
    <HeaderChat />

    <div class="flex items-center justify-between base-card shadow-lg rounded-md fixed">
      <MenuChat :conversations="conversations" :currentConversationId="currentConversation ? currentConversation.id : null" :setCurrentConversation="setCurrentConversation" />
      <MessageAreaChat :currentConversation="currentConversation" :messagesCurrentConversation="messagesCurrentConversation" :deleteConversation="deleteConversation" />
    </div>
  </span>
</template>

<script>
import MenuChat from "../components/Shared/Chat/MenuChat";
import HeaderChat from "../components/Shared/Chat/HeaderChat";
import MessageAreaChat from "../components/Shared/Chat/MessageAreaChat";

export default {
  name: "Chat",
  components: {
    MenuChat,
    HeaderChat,
    MessageAreaChat,
  },
  data() {
    return {
      messagesCurrentConversation: [],
      currentConversation: null,
      conversations: [],
    };
  },
  created() {
    this.conversations = [
      { id: 1, user: "Nicholas", lastMessage: "Olá Nicholas!", lastMessageDateTime: '10-25-2021 14:00:25' },
      { id: 2, user: "Thalita", lastMessage: "Olá Thalita!", lastMessageDateTime: '10-28-2021 14:00:21' },
      { id: 3, user: "Pedro", lastMessage: "Olá!", lastMessageDateTime: '10-28-2021 14:00:00' },
    ]
    this.messagesCurrentConversation = [
      { id: 1, conversationId: 1, value: 'Olá Nicholas!', userId: '1', datetime: '10-25-2021 14:00:25' },
      { id: 2, conversationId: 2, value: 'Olá Thalita!', userId: '1', datetime: '10-28-2021 14:00:21' },
      { id: 3, conversationId: 3, value: 'Olá Pedro!', userId: '1', datetime: '10-28-2021 14:00:00' },
      { id: 4, conversationId: 3, value: 'Olá!', userId: '2', datetime: '10-28-2021 14:00:02' },
    ]
  },
  methods: {
    setCurrentConversation(conversation){
      this.currentConversation = conversation
    },
    deleteConversation(id){
      this.conversations = this.conversations.filter(
        (e) => e.id !== id
      );
      this.currentConversation = null
      this.$toast.success('Conversa excluída com sucesso!', {
        position: "bottom-right",
        pauseOnHover: false,
        showCloseButtonOnHover: true,
        timeout: 2500,
      });
    }
  }
};
</script>

<style scoped>
  .base-card {
    width: calc(100vw - 70px);
    height: calc(100vh - 125px);
    margin-left: 35px;
    margin-top: 35px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
</style>