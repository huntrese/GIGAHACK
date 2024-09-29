<template>
  <div class="flex flex-col h-full max-h-screen">
    <div ref="chatContainer" class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4 overflow-x-hidden">
      <div v-for="(message, index) in visibleMessages" :key="index">
        <BotMessage v-if="message.sender === 'bot'" :message="message" />
        <UserMessage v-if="message.sender === 'user'" :message="message" />
      </div>
    </div>

    <MessageInput :modelValue="newMessage" 
                  @update:modelValue="newMessage = $event" 
                  @send-message="sendMessage" 
                  @file-upload="handleFileUpload" />
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import axios from 'axios';
import { marked } from 'marked';
import BotMessage from '@/components/chat/BotMessage.vue';
import UserMessage from '@/components/chat/UserMessage.vue';
import MessageInput from '@/components/chat/MessageInput.vue';

const apiUrl = 'http://localhost:5000';

export default {
  components: {
    BotMessage,
    UserMessage,
    MessageInput
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      selectedFile: null,
      threadId: null,
      hasUserSentMessage: false
    };
  },
  computed: {
    visibleMessages() {
      if (!this.hasUserSentMessage) {
        return [];
      }
      return this.messages;
    }
  },
  methods: {
    async initializeConversation() {
      try {

        
        
      } catch (error) {
        console.error('Error initializing campaign:', error);
      }
    },
    
    async sendMessage() {
      if (this.newMessage.trim()) {
        const userMessage = {
          sender: 'user',
          content: marked(this.newMessage.trim()),
        };

        this.messages.push(userMessage);
        this.newMessage = '';
        this.hasUserSentMessage = true;
        this.scrollToBottom();

        try {
          const response = await axios.post(`${apiUrl}/process`, {
            message: userMessage.content
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log(response.data);
          if (response.data && response.data.answer) {
            this.messages.push({
              sender: 'bot',
              content: marked(response.data.answer),
            });
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }

        this.scrollToBottom();
      }
    },
    
    handleFileUpload(file) {
      this.selectedFile = file;
      // Handle file upload logic here
    },
    
    scrollToBottom() {
      nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }
  },
  mounted() {
    const userMessage = {
          sender: 'bot',
          content: "Buna ziua! Cu ce va pot ajuta?",
        };

    this.messages.push(userMessage);
    this.hasUserSentMessage = true;


    this.initializeConversation();
    this.scrollToBottom();
    
  }
};
</script>
