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
        :messages="messages"
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
        :messages="messages"
      />
    </div>

    <modal-audio-options
      v-if="isVisibleModalAudioOptions"
      :allowSound="allowSound"
      @close="closeModalAudioOptions">
    </modal-audio-options>
  </span>
</template>

<script>
import MenuChat from "../components/Shared/Chat/MenuChat";
import HeaderChat from "../components/Shared/Chat/HeaderChat";
import MessageAreaChat from "../components/Shared/Chat/MessageAreaChat";
import ResponsiveMenuChat from "../components/Shared/Chat/ResponsiveMenuChat";
import ResponsiveMessageAreaChat from "../components/Shared/Chat/ResponsiveMessageAreaChat";
import ModalAudioOptions from "../components/Shared/Chat/ModalAudioOptions";
import {chatService, echoService} from "../services";
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
    ModalAudioOptions,
  },
  data() {
    return {
      isAudioSound: false,
      isVisibleModalAudioOptions: true,
      currentConversation: null,
      loading: false,
      conversations: [],
      screenWidth: screen.width,
      conversationId: this.$route.params.id,
      messages: [],
      chatID:0
    };
  },
  created() {
    echoService.connect()
  },
  mounted() {
    this.getConversations()
  },
  methods: {
    async loadMessages(id) {
      this.loadMessageWS(id)
      await chatService.loadMessage(id).then(async(response)=>{
        await response.data.forEach((data)=>{
          this.messages.push({
            id: data.id,
            conversationId: data.chat_id,
            value: data.text,
            image:data.image,
            userId: data.user_id,
            datetime: data.created_at
          });
        })
        const lastItem = this.messages[this.messages.length - 1]
        const data = {
          lastMessage: lastItem?.value,
          lastMessageIsImage: lastItem?.image ? 1 : 0,
          datetime: lastItem?.datetime,
          userSend: lastItem?.userId,
        }
        this.editLastMessage(id, data)
      })
    },
    loadMessageWS(){

      window.Echo.private(`user.${localStorage.getItem('user_id')}`).listen('.newMessage', event =>{

        this.messages.push({
          id: event.message.id,
          conversationId: event.message.chat_id,
          value: event.message.text,
          image:event.message.image,
          userId: event.message.user_id,
          datetime: event.message.created_at
        });

        const data = {
          lastMessage: event.message.text,
          lastMessageIsImage: event.message.image ? 1 : 0,
          datetime: event.message.created_at,
          userSend: event.message.user_id,
        }
        this.editLastMessage(event.message.chat_id, data)

        if(this.isAudioSound && this.conversationId !== event.message.chat_id){
          var audio = new Audio(require('../assets/notification.wav'));
          audio.play();
        }
      })
    },
    backToConversations(){
      this.currentConversation = null
    },
    async getConversations(){
      this.loading = true
      const user_id = localStorage.getItem('user_id')
      await chatService.getChat().then((response)=>{
        let conversation = null
        response.data.forEach(async(data)=>{
          if(data.auth.id == user_id){
            conversation = {
              id: data.id,
              user: data.notification.name,
              lastMessageDateTime: null,
              lastMessageIsImage: null,
              lastMessage: null,
            }

          }else{
            conversation = {
              id: data.id,
              user: data.auth.name,
              lastMessageDateTime: null,
              lastMessageIsImage: null,
              lastMessage: null,
            }
          }

          this.conversations.push(conversation)
          this.chatID = conversation?.id
          await this.loadMessages(conversation?.id)

          if (data.id == this.conversationId) {
            this.setCurrentConversation(conversation)
          }
        })
      })
      setTimeout(() => this.loading = false, 1000);
    },
    setCurrentConversation(conversation){
      if (this.currentConversation?.id != conversation.id){
        this.currentConversation = conversation
        this.conversationId = conversation.id

        const i = this.conversations.findIndex((obj => obj.id == conversation.id));
        this.conversations[i].notification = 0
      }
    },
    editLastMessage(id, data){ 
      const i = this.conversations.findIndex((obj => obj.id == id));

      this.conversations[i].lastMessageDateTime = data.datetime
      this.conversations[i].lastMessageIsImage = data.lastMessageIsImage
      this.conversations[i].lastMessage = data.lastMessage
      this.conversations[i].userSend = data.userSend

      if (id != this.currentConversation?.id){
        this.conversations[i].notification = 1
      }
    },
    closeModalAudioOptions(){
      this.isVisibleModalAudioOptions = false
    },
    allowSound(){
      this.isAudioSound = true
      this.isVisibleModalAudioOptions =  false
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