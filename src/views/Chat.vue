<template>
  <span>
    <loadingComponent v-if="loading"/>
    <HeaderChat />

    <div v-if="screenWidth >= 800" class="flex items-center justify-between base-card shadow-lg rounded-md fixed">
      <MenuChat
        :conversations="conversations"
        :currentConversationId="conversationId"
        :setCurrentConversation="setCurrentConversation"
      />
      <MessageAreaChat
        :currentConversation="currentConversation"
        :editLastMessage="editLastMessage"
      />
    </div>

    <div v-else>
      <ResponsiveMenuChat
        v-if="currentConversation == null"
        :conversations="conversations"
        :currentConversationId="conversationId"
        :setCurrentConversation="setCurrentConversation"
      />
      <ResponsiveMessageAreaChat
        v-else
        :backToConversations="backToConversations"
        :currentConversation="currentConversation"
        :editLastMessage="editLastMessage"
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
import loadingComponent from "../components/Shared/loading";

export default {
  name: "Chat",
  components: {
    MenuChat,
    HeaderChat,
    MessageAreaChat,
    ResponsiveMenuChat,
    ResponsiveMessageAreaChat,
    loadingComponent,
  },
  data() {
    return {
      currentConversation: null,
      loading: false,
      conversations: [],
      screenWidth: screen.width,
      conversationId: this.$route.params.id,
    };
  },
  created() {
    this.getConversation()
  },
  methods: {
    backToConversations(){
      this.currentConversation = null
    },
    async getConversation(){
      this.loading = true
      await chatService.getChat().then((response)=>{
        response.data.forEach((data)=>{
          const conversation = {
            id: data.id,
            user: data.user.name,
            lastMessageDateTime: null,
            lastMessageIsImage: null,
            lastMessage: null,
          }
          this.conversations.push(conversation)
        })
      })
      this.loading = false
    },
    setCurrentConversation(conversation){
      this.currentConversation = conversation
      this.conversationId = conversation.id
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