export default class Socket {
  constructor (wsUrl, onMessage) {
    this.ws = null
    this.onMessage = onMessage
    this.wsUrl = wsUrl
    this.timerReconnect = null
    this.timerHeart = null
    this.lockReconnect = false
    this.timerCreate = null
    this.timeoutFlag = true
    this.reconectNum = 0
    this.create()
  }

  create () {
    this.timerCreate && clearTimeout(this.timerCreate)
    this.timerCreate = setTimeout(() => {
      if (this.timeoutFlag && this.reconectNum < 3) {
        this.reconectNum++
        this.create()
      }
    }, 3000)

    try {
      this.ws && this.ws.close()
      this.ws = new WebSocket(this.wsUrl)

      this.ws.onopen = () => {
        this.reconectNum = 0
        this.timeoutFlag = false
        this.timerCreate && clearTimeout(this.timerCreate)
        this.timerReconnect && clearTimeout(this.timerReconnect)
        this.heart()
      }
      this.ws.onmessage = this.onMessage
      this.ws.onclose = () => {
        console.log('链接关闭')
        this.timerHeart && clearTimeout(this.timerHeart)
        this.reconnect()
      }
      this.ws.onerror = () => {
        console.log('发生异常了')
        this.timerHeart && clearTimeout(this.timerHeart)
        this.reconnect()
      }
    } catch (e) {
      console.warn(e)
      this.reconnect()
    }
  }

  reconnect () {
    if (this.lockReconnect) {
      return
    }
    this.lockReconnect = true
    this.timerReconnect && clearTimeout(this.timerReconnect)
    this.timerReconnect = setInterval(() => {
      this.create()
      this.lockReconnect = false
    }, 5000)
  }

  heart () {
    this.timerHeart && clearTimeout(this.timerHeart)
    this.timerHeart = setInterval(() => {
      this.ws.send('ok')
    }, 30000)
  }

  close () {
    this.ws && this.ws.close()
  }
}
