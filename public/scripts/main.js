import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired')

    // load the socket libery and make a connection
    const socket = io();

    // messenger service event handling -> incoming from the manager
    function setUserId({ sID }, message) {
        //incoming connected event with data

        vm.socketID = sID;
    }

    function appendMessage(msg) {
        vm.messages.push(msg);
    }
    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive!');
        },
        methods: {
            dispatchMessage() {

                socket.emit('chatMessage', { content: this.message, name: this.nickname || "Anonymous" });
                this.message = "";
            }
        },
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);

})();