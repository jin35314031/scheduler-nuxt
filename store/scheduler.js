import Vuex from 'vuex'

export const state = () => ({
  events: ''
    // {
    //   title:'報告会',
    //   startDateTime:'2020-08-22 14:00',
    //   endDateTime:'2020-08-28 00:00',
    //   color:'success',
    //   share:false,
    //   place:'第一会議室',
    //   memo:'レポート提出'
    // },
    // {
    //   title:'出勤日',
    //   startDateTime:'2020-08-14 08:00',
    //   endDateTime:'2020-08-16 18:00',
    //   color:'warning',
    //   share:true,
    //   place:'オフィス',
    //   memo:'８時半出勤'
    // }
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
  async createEventsAction({commit,dispatch},{createEvent,userId}){
    console.log('createEvent:::::::')
    console.log(createEvent)
    console.log('userId:::::::')
    console.log(userId)
    const startDate = createEvent.startEndTime[0]
    const endDate = createEvent.startEndTime[1]
    console.log(startDate)
    const allData = {loginId:userId,title:createEvent.title,startDate:startDate,endDate:endDate,label:createEvent.color,share:createEvent.share,place:createEvent.place,body:createEvent.body}
    console.log(allData)
    await this.$axios.post('/api/plan',allData)
    dispatch('getEventsAction')
  },
  deleteEventsAction(context,deleteEvent){
    console.log(deleteEvent)
  },

}
