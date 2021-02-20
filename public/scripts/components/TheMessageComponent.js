export default {
    props: ['msg', 'socketid'],

    template: `
    <div class="background">
        <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h4>{{msg.message.name}}</h4>
        <p>{{msg.message.content}}</p>
        
        
        
        </article>
        </div>
        `,
    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    },
    //method: {
    //joinServer: function() {
    //this.socket.on('loggIn', data => {
    //this.messages = data.messages;
    //this.users = data.users;
    //this.socket.emit('newuser', this.username);
    //});
    // }
    ////},
    // mounted: function() {
    //  this.username = prompt("What is your username?", "Anonymous")
    //// }
}