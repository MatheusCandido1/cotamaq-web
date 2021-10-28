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
      { id: 1, user: "Pedroaaaaaiiiiiiiiiiiiiicgdcdhcvhdgcvhdgcvdgcvdgcvgdvcdcdcddcdcdcgdvcgdvgcvdgcvdgvcgdvcgdvdgcvdgvcgdvcgdvcdiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", lastMessage: "Ok!", lastMessageDate: '12/08/2021' },
      { id: 2, user: "Nicholas aaaaaa aaaaaa aaaaaaa aaaaaaaaaaaas de de de", lastMessage: "Combinado!", lastMessageDate: '15/08/2021' },
      { id: 3, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 4, user: "Ana", lastMessage: "Tudo bem, não tem problemas. rfr frfrf rfrfrf rfrfrf rfrfrf rfrfrfr fr", lastMessageDate: '24/11/2021' },
      { id: 5, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 6, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 7, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 8, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 9, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 10, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 11, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 12, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 13, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 14, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 15, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 16, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
      { id: 17, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
    ]
    this.messagesCurrentConversation = [
      { id: 1, value: 'Olá', userId: '1', datetime: '12/05/2021 14:17' },
      { id: 2, value: 'Tudo bem?', userId: '1', datetime: '12/05/2021 14:17' },
      { id: 3, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 4, value: 'Tudo ótimo!', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 5, value: 'dbehbdjehdejdbhebdjehdbhebdjhebdjhebdjehbdjehbdjhebdjhbejhdbjehdb', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 6, value: 'dckmd ckmdc kdmc kdmc dmcdmc kdmc dm cdjjuih dgtedgted ededed edededed edededed edededede dededed edededede dededed ededede', userId: '1', datetime: '12/05/2021 14:17' },
      { id: 7, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 8, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 9, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 10, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 11, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
      { id: 12, value: 'Opa', userId: '2', datetime: '12/05/2021 14:17' },
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