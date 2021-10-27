<template>

  <div v-if="this.$props.currentConversation == null" class="w-full flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <p>Selecione uma conversa...</p>
  </div>

  <span v-else class=" w-full h-full flex flex-col justify-between">
    <div class="flex items-center  px-3 py-4 flex items-center justify-between border-b border-solid border-gray-500">
      <p>{{this.$props.currentConversation.user}}</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </div>

    <div class="bg-blue-500">MESSAGE AREA</div>

    <div class="bg-green-500">INPUTS</div>
  </span>
</template>

<script>
export default {
  name: "MessageAreaChat",
  props: ["currentConversation", "messagesCurrentConversation"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>v