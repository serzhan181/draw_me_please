export class Chat {
  constructor(authorName, socket, id) {
    this.chatEl = document.getElementById('chat-in')
    this.authorName = authorName
    this.socket = socket
    this.id = id

    this._listen()
  }

  _listen() {
    const input = document.getElementById('chat-input')

    const submitBtn = document.getElementById('chat-submit')

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      if (input.value.length > 1) {
        this.addMessage(this.authorName, input.value)
        input.value = ''
      }
    })
  }

  addMessage(authorName, body) {
    this.socket.send(
      JSON.stringify({
        method: 'message',
        id: this.id,
        message: {
          authorName,
          body,
        },
      })
    )
  }

  static staticAddMessage(chatEl, authorName, body) {
    const message = document.createElement('div')
    message.innerHTML = `
    <div class="block has-background-light m-0">
      <span class="tag is-dark mr-1">${authorName}:</span>
      <span class="is-size-6">${body}</span>
    </div>
    `

    chatEl.appendChild(message)
  }

  static greetings(chatEl, username) {
    const message = document.createElement('div')
    message.innerHTML = `
    <div class="block has-background-light m-0">
      <span class="tag is-info">User ${username} connected.</span>
    </div>
    `

    chatEl.appendChild(message)
  }
}
