<template>
  <div class="container-fulid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">CHATROOM</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="'/'">Login<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" :to="'/chat_room'">Chat-Room</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div id="chat_room" class="row">
      <div id="chat_window" class="col-8 d-flex flex-column">
        <label>{{ user }}</label>
        <div id="msg_area" ref="msg_area">
          <template v-for="(m, key) in msgs">
            <div class="card" :key="key" :class="{'self': m.role === 0}">
              <div class="user"><i class="fas fa-user-circle fa-5x user_icon"></i></div>
              <div class="card-body">
                {{ m.content }}
              </div>
            </div>
          </template>
        </div>
        <div id="sendbox" class="input-group py-4 mt-auto">
          <input
          v-model="msg" @keypress.enter="sendMsg"
          type="text" class="form-control" placeholder="type something..."
          aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button @click="sendImage" class="btn btn-outline-secondary" type="button">
              <input class="file_input" type="file">
              <i class="far fa-images"></i>
            </button>
          </div>
          <div class="input-group-append">
            <button @click="sendMsg" class="btn btn-outline-secondary" type="button">Send</button>
          </div>
        </div>
      </div>
      <div id="dashboard" class="col-4">
        <form>
          <div class="form-group">
            <label for="user">Username</label>
            <input @keypress.enter="setUser" v-model.trim="user" class="form-control" id="user" placeholder="Enter username">
          </div>
          <button @click="setUser" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import chatAPI from '@/components/chat.js'

export default {
  name: '',
  data () {
    return {
      user: 'UserName',
      password: '',
      msg: '',
      msgs: [
        {
          role: 1,
          type: 'text',
          content: ''
        }
      ]
    }
  },
  methods: {
    setUser () {
      if (this.user === 'inky') {
        this.role = 0
      } else {
        this.role = 1
      }
    },
    sendMsg () {
      this.msgs.push({
        role: this.role,
        type: 'text',
        content: this.msg
      })
      this.msg = ''
      this.scrollToBottom()
    },
    sendImage (src) {
      this.msgs.push({
        role: this.role,
        type: 'img',
        content: src
      })
      this.scrollToBottom()
    },
    async initMessage () {
      const { getChatList } = chatAPI
      try {
        const res = await getChatList()
        if (res.data.success) {
          this.msgs = res.data.data
        }
      } catch (err) {
        alert(err)
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.msg_area.scrollTop = this.$refs.msg_area.scrollHeight
      })
    }
  },
  mounted () {
    this.setUser()
    this.initMessage()
  }
}
</script>

<style lang='sass'>
  #chat_window
    padding-top: 30px
    padding-left: 30px
    background-color: #eee
    height: 90vh
    #msg_area
      overflow-y: auto
      .card
        flex-direction: row
        text-align: left
        &.self
          text-align: right
          .card-body
            order: 1
          .user
            background-color: black
            order: 2
      .card-body
        order: 2
      .user
        text-align: center;
        height: 100px
        width: 100px
        background-color: red
        order: 1
        .user_icon
          color: white
          height: 100%;
    #sendbox
      .file_input
        cursor: pointer
        left: 0
        width: 100%
        position: absolute
        opacity: 0
  #dashboard
    padding-top: 30px
    padding-right: 30px
</style>
