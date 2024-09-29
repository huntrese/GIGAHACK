<template>
  <div :class="{ dark: isDarkMode }" class="flex flex-col h-screen">
    <header v-if="!isAuthPage" class="bg-white dark:bg-gray-800 shadow-md p-4">
      <div class="flex items-center justify-between">
        <div class="flex flex-row items-center">
          <img src="../../assets/STARNET.png" alt="logo" class="h-16 dark:bg-slate-50 p-2 rounded-lg" />
        </div>
        <div class="flex items-center space-x-4">
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <span class="mr-2 text-gray-900 dark:text-gray-100">{{
                isDarkMode ? "Light Mode" : "Dark Mode"
              }}</span>
              <input
                type="checkbox"
                @change="toggleDarkMode"
                class="hidden"
                :checked="isDarkMode"
              />
              <span
                class="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1"
              >
                <span
                  class="w-4 h-4 bg-white rounded-full shadow transform transition-transform"
                  :class="isDarkMode ? 'translate-x-6' : 'translate-x-0'"
                ></span>
              </span>
            </label>
          </div>
          <button
            @click="goToAuth"
            class="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div v-if="!isAuthPage" class="flex flex-1 h-0">
      <!-- Left Menu -->
      <div class="hidden md:flex w-1/10 bg-gray-200 text-black dark:bg-gray-800 dark:text-white p-4 overflow-y-auto">
        <div class="flex flex-col items-start mb-10"> 
          <div class="flex flex-row items-center mb-6"> 
            <img src="../../assets/clients.png" alt="clients" class="h-12 dark:invert" /> 
            <h1 class="text-xl font-bold">Chat</h1>
          </div>
          <ul>
            <li class="mb-5">Home</li>
            <li class="mb-5">About</li>
            <li class="mb-5">Contacts</li>
          </ul>
        </div>
      </div>
      
      <!-- Center -->
      <div class="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      </div>
      
      <!-- Chat Area -->
      <div class="w-full md:w-1/3 bg-gray-200 text-black dark:bg-gray-800 dark:text-white p-2 overflow-y-auto">
        <ChatComponent />
      </div>
    </div>

    <!-- Footer -->
    <footer
      v-if="!isAuthPage"
      class="bg-gray-200 dark:bg-gray-800 p-4 text-center"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        © {{ new Date().getFullYear() }} Hackathon. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script>
import ChatComponent from "../../../src/components/chat/ChatComponent.vue";
import ControllerFlow from "../flow/ControllerFlow.vue";

export default {
  name: "App",
  components: {
  ChatComponent,
  ControllerFlow,
},

  data() {
    return {
      isDarkMode: false,
      isLoggedIn: true,
    };
  },
  computed: {
    isAuthPage() {
      return this.$route.path === "/auth";
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    async goToAuth() {
      this.isLoggedIn = false; 
      this.$router.push("/auth"); 
    },
  },
};
</script>
