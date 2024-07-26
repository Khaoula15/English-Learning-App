<template>
  <div class="chatbot-popup" :class="{ 'is-open': isOpen }">
    <div class="chatbot-header" @click="toggleChat">
      <span>{{ $t("chatbot.title") }}</span>
      <button class="close-btn" v-if="isOpen" @click.stop="closeChat">×</button>
    </div>
    <div class="chatbot-body" v-if="isOpen">
      <div class="messages" ref="messagesContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="message.type"
        >
          {{ message.text }}
        </div>
      </div>
      <div class="input-area">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          :placeholder="$t('chatbot.inputPlaceholder')"
        />
        <button @click="sendMessage">{{ $t("chatbot.send") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ChatbotPopup',
  setup() {
    const { t, locale } = useI18n();
    const isOpen = ref(false);
    const messages = ref([]);
    const userInput = ref('');
    const messagesContainer = ref(null);

    const toggleChat = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value && messages.value.length === 0) {
        addMessage('bot', t('chatbot.welcome'));
      }
    };

    const closeChat = () => {
      isOpen.value = false;
    };

    const addMessage = (type, text) => {
      messages.value.push({ type, text });
      scrollToBottom();
    };

    const sendMessage = () => {
      if (userInput.value.trim() === '') return;
      addMessage('user', userInput.value);
      processUserMessage(userInput.value);
      userInput.value = '';
    };

    const processUserMessage = (message) => {
      const lowercaseMessage = message.toLowerCase();
      if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
        addMessage('bot', t('chatbot.greeting'));
      } else if (lowercaseMessage.includes('lesson') || lowercaseMessage.includes('lessons')) {
        addMessage('bot', t('chatbot.lessonInfo'));
      } else if (lowercaseMessage.includes('register') || lowercaseMessage.includes('sign up')) {
        addMessage('bot', t('chatbot.registerInfo'));
      } else if (lowercaseMessage.includes('login') || lowercaseMessage.includes('sign in')) {
        addMessage('bot', t('chatbot.loginInfo'));
      } else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('support')) {
        addMessage('bot', t('chatbot.helpInfo'));
      } else if (lowercaseMessage.includes('about') || lowercaseMessage.includes('info')) {
        addMessage('bot', t('chatbot.aboutInfo'));
      } else {
        addMessage('bot', t('chatbot.defaultResponse'));
      }
    };

    const scrollToBottom = () => {
      setTimeout(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      }, 0);
    };

    watch(locale, () => {
      messages.value = [];
      if (isOpen.value) {
        addMessage('bot', t('chatbot.welcome'));
      }
    });

    return {
      isOpen,
      messages,
      userInput,
      messagesContainer,
      toggleChat,
      closeChat,
      sendMessage
    };
  }
}
</script>

<style scoped>
.chatbot-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.chatbot-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.close-btn {
  float: right;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chatbot-body {
  height: 300px;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.user,
.bot {
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 80%;
}

.user {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.bot {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.input-area {
  display: flex;
  padding: 10px;
}

input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
