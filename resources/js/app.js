import './bootstrap';
import { createApp } from 'vue'; // Import createApp from Vue
import axios from 'axios'; // Import axios for making HTTP requests

const app = createApp({}); // Create a new Vue app instance

import ChatMessages from './components/ChatMessages.vue'; // Import ChatMessages component
import ChatForm from './components/ChatForm.vue'; // Import ChatForm component

app.component('chat-messages', ChatMessages); // Register ChatMessages component
app.component('chat-form', ChatForm); // Register ChatForm component



// Vue instance to handle fetching and adding messages
const vm = {
    data() {
        return {
            messages: []
        };
    },
    created() {
        this.fetchMessages();
        // window.Echo.private('chat')
        //     .listen('MessageSent', (e) => {
        //         this.messages.push({
        //             message: e.message.message,
        //             user: e.user
        //         });
        //     });
    },
    methods: {
        fetchMessages() {
            axios.get('/messages')
                .then(response => {
                    this.messages = response.data;
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        },
        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error adding message:', error);
                });
        }
    }
};

app.mixin(vm); // Apply the Vue instance to the app
app.mount('#app'); // Mount the Vue app to #app element