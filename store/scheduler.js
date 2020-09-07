import Vuex from 'vuex'

export const state = () => ({
  events: []

})

export const mutations = {
  updateEvents:function(state,data){
    state.events = data;
  }
}

export const actions = {
  async getEventsAction (context) {
    const payload = await this.$axios.get('/api/plan')
    context.commit('updateEvents', payload.data)
  },
  async getOrgEventsAction (context,orgId) {
    const payload = await this.$axios.post('/api/org-plan/'+orgId)
    context.commit('updateEvents', payload.data)
  },
  async createEventsAction({commit,dispatch},{createEvent,userId}){

    const startDate = createEvent.startEndTime[0]
    const endDate = createEvent.startEndTime[1]

    const allData = {loginId:userId,title:createEvent.title,startDate:startDate,endDate:endDate,label:createEvent.color,share:createEvent.share,place:createEvent.place,body:createEvent.body}

    await this.$axios.post('/api/plan',allData)
    dispatch('getEventsAction')
  },
  async deleteEventsAction({commit,dispatch},deleteEvent){
    await this.$axios.post('/api/del-plan',deleteEvent)
    dispatch('getEventsAction')
  },

  async UpdateEventsAction({commit,dispatch},updateEvent){
    await this.$axios.post('/api/update-plan',updateEvent)
    dispatch('getEventsAction')
  },

}
