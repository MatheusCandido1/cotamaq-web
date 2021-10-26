<template>
  <div>
    <MenuChat :conversations="conversations" />
  </div>
</template>

<script>
import MenuChat from "../components/Shared/Chat/MenuChat";

export default {
  name: "Chat",
  components: {
    MenuChat,
  },
  data() {
    return {
      conversations: [
        { id: 1, user: "Pedroaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", lastMessage: "Ok!", lastMessageDate: '12/08/2021' },
        { id: 2, user: "Nicholas aaaaaa aaaaaa aaaaaaa aaaaaaaaaaaas", lastMessage: "Combinado!", lastMessageDate: '15/08/2021' },
        { id: 3, user: "Thalita", lastMessage: "Certo!", lastMessageDate: '02/09/2021' },
        { id: 4, user: "Ana", lastMessage: "Tudo bem, não tem problemas.", lastMessageDate: '24/11/2021' },
      ],
    };
  },
};
</script>

<style>
</style>