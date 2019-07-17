import httpService from './_httpService'

export default {
  getChatList  () {
    const path = '/chat'
    return httpService({
      method: 'get',
      path
    })
  }
}
