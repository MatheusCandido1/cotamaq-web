<template>
  <span>
    <HeaderChat />

    <div v-if="screenWidth >= 800" class="flex items-center justify-between base-card shadow-lg rounded-md fixed">
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

    <div v-else>
      <ResponsiveMenuChat
        v-if="currentConversation == null"
        :conversations="conversations"
        :currentConversationId="currentConversation ? currentConversation.id : null"
        :setCurrentConversation="setCurrentConversation"
      />
      <ResponsiveMessageAreaChat
        v-else
        :backToConversations="backToConversations"
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
import ResponsiveMenuChat from "../components/Shared/Chat/ResponsiveMenuChat";
import ResponsiveMessageAreaChat from "../components/Shared/Chat/ResponsiveMessageAreaChat";
import {chatService} from "../services";

export default {
  name: "Chat",
  components: {
    MenuChat,
    HeaderChat,
    MessageAreaChat,
    ResponsiveMenuChat,
    ResponsiveMessageAreaChat,
  },
  data() {
    return {
      messagesCurrentConversation: [],
      currentConversation: null,
      conversations: [],
      userId: this.$route.params.id,
      screenWidth: screen.width,
    };
  },
  created() {
    this.validUserId()
    this.createConversation()
  },
  methods: {
    backToConversations(){
      this.currentConversation = null
    },
    validUserId(){

    },
    createConversation(){
      const userReceiver = this.$route.params.userReceiver
      chatService.getChat().then((response)=>{
        response.data.forEach((data)=>{
          var conversation = {
            id: data.id,
            user: data.user.name,
            lastMessageDateTime: null,
            lastMessageIsImage: null,
            lastMessage: null,
          }
          this.conversations.push(conversation)

        })
      })


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
      console.warn(this.currentConversation)
      this.$router.push({
        name: "chat",
        params: { id: conversation.id },
      });
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