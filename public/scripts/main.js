import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired')

    var url = window.location.search;
    url = url.replace("?", '');
    var nickname
    if (url.length > 10) {
        nickname = url.substring(9);

    } else {
        nickname = "Anonymous"
    }

    // load the socket libery and make a connection
    const socket = io();

    // messenger service event handling -> incoming from the manager
    function setUserId({ sID }, message) {
        //incoming connected event with data
        socket.emit('newNickname', { nickname: nickname })
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
                console.log(this);
                socket.emit('chatMessage', { content: this.message, name: nickname || "Anonymous" });
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