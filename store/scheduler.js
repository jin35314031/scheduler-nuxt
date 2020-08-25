import Vuex from 'vuex'

export const state = () => ({
  events: []

})

export const mutations = {
  updateEvents:function(state,data){
    console.log('mutation')
    state.events = data;
    console.log('state.events::::::')
    console.log(state.events)
  }
}

export const actions = {
  async getEventsAction (context) {
    const payload = await this.$axios.get('/api/plan')
    console.log(payload.data)
    context.commit('updateEvents', payload.data)
  },
  async getOrgEventsAction (context,orgId) {
    console.log('orgId:::::::')
    console.log(orgId)
    const payload = await this.$axios.post('/api/org-plan/'+orgId)
    context.commit('updateEvents', payload.data)
  },
  async createEventsAction({commit,dispatch},{createEvent,userId}){
    console.log('createEvent:::::::')
    console.log(createEvent)
    const startDate = createEvent.startEndTime[0]
    const endDate = createEvent.startEndTime[1]
    console.log(startDate)
    console.log('endDate::::::::')
    console.log(endDate)
    const allData = {loginId:userId,title:createEvent.title,startDate:startDate,endDate:endDate,label:createEvent.color,share:createEvent.share,place:createEvent.place,body:createEvent.body}
    console.log(allData)
    await this.$axios.post('/api/plan',allData)
    dispatch('getEventsAction')
  },
  async deleteEventsAction({commit,dispatch},deleteEvent){
    console.log('deleteEvent:::::::')
    console.log(deleteEvent)
    await this.$axios.post('/api/del-plan',deleteEvent)
    dispatch('getEventsAction')
  },

}
