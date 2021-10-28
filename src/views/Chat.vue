<template>
  <span>
    <HeaderChat />

    <div class="flex items-center justify-between base-card shadow-lg rounded-md fixed">
      <MenuChat :conversations="conversations" :currentConversationId="currentConversation ? currentConversation.id : null" :setCurrentConversation="setCurrentConversation" />
      <MessageAreaChat :currentConversation="currentConversation" :messagesCurrentConversation="messagesCurrentConversation" />
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
      { id: 1, user: "41", lastMessage: "Ok!", lastMessageDateTime: '10-09-2021 14:00:25' },
      { id: 2, user: "11", lastMessage: "Combinado!", lastMessageDateTime: '10-09-2021 14:00:05' },
      { id: 3, user: "34", lastMessage: "Certo!", lastMessageDateTime: '10-09-2021 14:00:45' },
    ]
    this.messagesCurrentConversation = [
      { id: 1, value: 'ta ai?', userId: '1', datetime: '10-01-2021 14:00:25' },
      { id: 2, value: 'Quando puder me responda', userId: '1', datetime: '10-01-2021 14:00:21' },
      { id: 3, value: 'ola desculpa a demora', userId: '1', datetime: '10-01-2021 14:00:00' },
    ]
  },
  methods: {
    setCurrentConversation(conversation){
      this.currentConversation = conversation
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