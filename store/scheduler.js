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
    console.log("allData:::::::")
    console.log(allData)

    await this.$axios.post('/api/plan',allData)
    dispatch('getEventsAction')
  },
  async deleteEventsAction({commit,dispatch},deleteEvent){
    await this.$axios.post('/api/del-plan',deleteEvent)
    dispatch('getEventsAction')
  },

  async updateEventsAction({commit,dispatch},updateEvent){
    console.log("updateEvent:::::::::")
    console.log(updateEvent)
    const startDate = updateEvent.startEndTime[0]
    const endDate = updateEvent.startEndTime[1]
    const updateData = {planId:updateEvent.planId,loginId:updateEvent.loginId,title:updateEvent.title,startDate:startDate,endDate:endDate,label:updateEvent.label,share:updateEvent.share,place:updateEvent.place,body:updateEvent.body}
    console.log("updateData:::::::")
    console.log(updateData)
    await this.$axios.post('/api/update-plan',updateData)
    console.log("updateEventSuccess")
    dispatch('getEventsAction')
  },

}
