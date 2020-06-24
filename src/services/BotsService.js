import Api from '@/services/Api'

export default {
  index () {
    return Api().get('bots')
  },
  delBot (botId) {
    return Api().delete(`bots/${botId}`)
  },
  editBot (botData) {
    return Api().put(`bots/${botData.id}`, botData)
  },
  crateBot (botData) {
    return Api().post('bots', botData)
  }
}
