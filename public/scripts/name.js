const vm = new Vue({
    data: {
        nickname: ""
    },

    created: function() {
        console.log('its alive!');
    },
    methods: {
        dispatchName() {
            var nickname = this.nickname;
            if (!this.nickname || this.nickname.length === 0) {
                nickname = "Anonymous";
            }
            document.location.href = "/chat?nickname=" + nickname;
        }
    },

}).$mount("#nickName");