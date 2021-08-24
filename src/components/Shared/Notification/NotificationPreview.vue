<template>
    <li class="hover:bg-gray-100 flex border-2 rounded-lg border-primary-main">
        <router-link
            :to="{ path: '/perfil' }"
            class="inline-flex items-center text-gray-700 hover:text-black w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:text-gray-800"
        >
            <span>Você recebeu uma nova Cotação, responda agora e saia na frente dos concorrentes!</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'NotificationPreview',
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>

</style>