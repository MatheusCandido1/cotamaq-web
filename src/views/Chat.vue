<template>
  <span>
    <HeaderChat />

    <div class="base-card shadow-lg rounded-md fixed">
      <MenuChat :conversations="conversations" />
    </div>
  </span>
</template>

<script>
import MenuChat from "../components/Shared/Chat/MenuChat";
import HeaderChat from "../components/Shared/Chat/HeaderChat";

export default {
  name: "Chat",
  components: {
    MenuChat,
    HeaderChat,
  },
  data() {
    return {
      conversations: [
        { id: 1, user: "Pedroaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", lastMessage: "Ok!", lastMessageDate: '12/08/2021' },
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
      ],
    };
  },
};
</script>

<style scoped>
  .base-card {
    width: calc(100vw - 70px);
    height: calc(100vh - 70px);
    margin-left: 35px;
    margin-top: 35px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
</style>