<template>
  <div v-if="this.$props.currentConversation == null" class="w-full flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary-main" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
    </svg>
    <p>Selecione uma conversa...</p>
  </div>

  <span v-else class="w-full h-full flex flex-col justify-between">
    <loadingComponent v-if="loading"/>
    <div class="flex items-center  px-3 py-2 flex items-center justify-between border-b border-solid border-gray-500">
      <p class="truncate w-96">{{ this.$props.currentConversation.user }}</p>
    </div>

    <div ref="messagesContainer" class="overflow-y-auto flex flex-col div-scroll h-full px-3 pt-3 bg-gray-200">
      <div v-for="(message, index) in filteredMessages" :key="message.id">
        <div v-if="isNewDay(index)" class=" mt-4 mb-6 flex items-center justify-center">
          <div class="bg-blue-300 px-2 pb-1 rounded-md">
            <span class="text-gray-700 text-xs">{{ formatDate(message.datetime) }}</span>
          </div>
        </div>
        <div
            :class="message.userId == userId ? 'bg-green-300 float-right justify-end' : 'float-left bg-white justify-start'"
            class="rounded-md break-all flex-col mb-2 max-min-width w-auto flex py-1 px-2"
        >
          <img @click="openModalExpandImage(message.value)" v-if="message.isImage == 1"
               class="w-auto h-auto max-min-width-height mb-1 cursor-pointer" :src="message.value" alt="image"/>
          <p v-else>{{ message.value }}</p>
          <p class="flex justify-end text-gray-700 text-xs">{{ getHour(message.datetime) }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="rounded-br-md bg-gray-200 flex items-center justify-between px-3 py-3">
      <input v-model="message" maxlength="255"
             class="input-send placeholder-gray-500 rounded-full border border-solid border-gray-500 px-3 py-1"
             placeholder="Digite sua mensagem..."/>

      <span class="buttons flex items-center justify-evenly">
        <input id="fileInput" type="file" class="hidden" multiple accept="image/*" @change="onFileChange"/>
        <button type="button" v-tooltip="{ content: 'Escolher imagem' }"
                onclick="document.getElementById('fileInput').click()" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-main hover:h-7 hover:w-7 hover:opacity-60"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </button>
        
        <button type="submit" :disabled="message == ''" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
               :class="message == '' ? 'text-gray-500' : 'text-primary-main hover:h-7 hover:w-7 hover:opacity-60'"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </span>
    </form>

    <modal-handle-files
        v-if="isVisibleModalHandleFiles"
        :files="files"
        :cleanFiles="cleanFiles"
        :sendFiles="sendFiles"
        @close="closeModalHandleFiles">
    </modal-handle-files>

    <modal-expand-image
        v-if="isVisibleModalExpandImage"
        :image="expandImage"
        @close="closeModalExpandImage">
    </modal-expand-image>

  </span>
</template>

<script>
import vClickOutside from 'v-click-outside';
import ModalHandleFiles from './ModalHandleFiles';
import ModalExpandImage from './ModalExpandImage'
import {chatService} from "../../../services";
import loadingComponent from "../loading";

export default {
  name: "MessageAreaChat",
  components: {
    ModalHandleFiles,
    ModalExpandImage,
    loadingComponent,
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: [
    "currentConversation",
    "editLastMessage",
    "messagesCurrentConversation"
  ],
  data() {
    return {
      loading: false,
      message: '',
      userId: localStorage.getItem('user_id'),
      isVisibleModalHandleFiles: false,
      files: [],
      isVisibleModalExpandImage: false,
      expandImage: null,
    };
  },
  computed: {
    filteredMessages() {
      const messages = this.$props.messagesCurrentConversation.filter(item => item.conversationId == this.$props.currentConversation.id)
      this.$nextTick(() => this.scrollToEnd());

      return messages.slice().sort(function (a, b) {
        return new Date(a.datetime) - new Date(b.datetime);
      });
    }
  },
  methods: {
    
    scrollToEnd() {
      const content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight
    },
    sendMessage() {
      const current = new Date()
      const date = current.toLocaleDateString('en-US')
      const time = current.toLocaleTimeString('pt-BR')
      const datetime = `${date} ${time}`
      const data = {
        datetime: datetime,
        lastMessage: this.message,
        lastMessageIsImage: null,
      }

      this.$props.messagesCurrentConversation.push({
        id: Math.random(),
        conversationId: this.$props.currentConversation.id,
        value: this.message,
        userId: this.userId,
        datetime: datetime
      });

      const message = {
        chat_id: this.$props.currentConversation.id,
        text: this.message
      }
      chatService.newMessage(message)

      this.$props.editLastMessage(this.$props.currentConversation.id, data)
      this.message = ''
    },
    getHour(datetime) {
      const time = new Date(datetime).toLocaleTimeString('pt-br')
      return time.slice(0, -3)
    },
    formatDate(datetime) {
      if (new Date(datetime).toLocaleDateString('pt-br') === new Date().toLocaleDateString('pt-br')) {
        return 'Hoje'
      }
      return new Date(datetime).toLocaleDateString('pt-br')
    },
    isNewDay(index) {
      const date = new Date(this.filteredMessages[index]?.datetime).toLocaleDateString('pt-br')
      const lastMessageDate = new Date(this.filteredMessages[index - 1]?.datetime).toLocaleDateString('pt-br')

      if (index == -1 || index == 0) {
        return true
      } else if (lastMessageDate === date) {
        return false
      } else {
        return true
      }
    },
    closeModalHandleFiles() {
      this.isVisibleModalHandleFiles = false
    },
    onFileChange(e) {
      let uploadedFiles = e.target.files;

      if (uploadedFiles.length > 4) {
        this.$toast.error('Máximo de 4 imagens por vez!', {
          position: "bottom-right",
          pauseOnHover: false,
          showCloseButtonOnHover: true,
          timeout: 2500,
        });
      } else if (uploadedFiles.length > 0) {
        for (var x = 0; x < uploadedFiles.length; x++) {
          this.files.push(uploadedFiles[x]);
        }
        this.isVisibleModalHandleFiles = true
      }
    },
    cleanFiles() {
      this.files = []
    },
    sendFiles(files) {
      const current = new Date()
      const date = current.toLocaleDateString('en-US')
      const time = current.toLocaleTimeString('pt-BR')
      const datetime = `${date} ${time}`
      const data = {
        datetime: datetime,
        lastMessageIsImage: 1,
        lastMessage: null,
      }

      files.forEach((item) => {
        this.$props.messagesCurrentConversation.push({
          id: Math.random(),
          conversationId: this.$props.currentConversation.id,
          value: item,
          isImage: 1,
          userId: this.userId,
          datetime: datetime
        });
      })

      this.$props.editLastMessage(this.$props.currentConversation.id, data)
      this.cleanFiles()
    },
    openModalExpandImage(image) {
      this.expandImage = image
      this.isVisibleModalExpandImage = true
    },
    closeModalExpandImage() {
      this.expandImage = null
      this.isVisibleModalExpandImage = false
    }
  },
};
</script>

<style scoped>
.input-send {
  width: 88%;
}

.buttons {
  width: 12%
}

.div-scroll {
  height: calc(100vh - 195px);
}

.max-min-width {
  max-width: 26rem;
  min-width: 6rem;
}

.max-min-width-height {
  max-width: 26rem;
  min-width: 6rem;
  min-height: 6rem;
  max-height: 26rem;
}
</style>