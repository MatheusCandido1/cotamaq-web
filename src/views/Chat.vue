<template>
  <span>
    <HeaderChat />

    <div class="flex items-center justify-between base-card shadow-lg rounded-md fixed">
      <MenuChat
        :conversations="conversations"
        :currentConversationId="currentConversation ? currentConversation.id : null"
        :setCurrentConversation="setCurrentConversation"
      />
      <MessageAreaChat
        :currentConversation="currentConversation"
        :messagesCurrentConversation="messagesCurrentConversation"
        :deleteConversation="deleteConversation"
        :editLastMessage="editLastMessage"
        :userId="userId"
      />
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
      userId: this.$route.params.id,
    };
  },
  created() {
    this.validUserId()
    this.createConversation()
  },
  methods: {
    validUserId(){
      if(this.$route.params.id != localStorage.getItem('user_id')){
        this.$router.push({name: 'NotFound'})
      }
    },
    createConversation(){
      const userReceiver = this.$route.params.userReceiver

      if (userReceiver){
        const i = this.conversations.findIndex((obj => obj.id == userReceiver.id));

        if(i == -1){
          const conversation = {
            id: userReceiver.id,
            user: userReceiver.name,
            lastMessageDateTime: null,
            lastMessageIsImage: null,
            lastMessage: null,
          }
          this.conversations.push(conversation)
          this.currentConversation = conversation
        }
      }
    },
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
    },
    editLastMessage(id, data){ 
      const i = this.conversations.findIndex((obj => obj.id == id));

      this.conversations[i].lastMessageDateTime = data.datetime
      this.conversations[i].lastMessageIsImage = data.lastMessageIsImage
      this.conversations[i].lastMessage = data.lastMessage
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