import Vuex from 'vuex'
import moment from "moment";

export const state = () => ({
  events:
    [{
      title:'報告会',
      startDate:'2000-01-01 14:00',
      endDate:'2000-01-01 14:00',
      color:'success',
      share:false,
      place:'home',
      memo:'memo'
    },
    {
      title:'報告会',
      startDate:'2000-01-02 14:00',
      endDate:'2000-01-02 14:00',
      color:'success',
      share:false,
      place:'home',
      memo:'memo'
    }]
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

export const getters = {
  getTest: (state) => (displayDate) => {
    let events = state.events
    console.log('発火:::::'+ displayDate)

    let tempData = new Array();

    for( let i=0; i<events.length; i++) {

      let formatStartDate = moment(events[i].startDate).format('YYYY-MM-DD')
      let formatEndDate = moment(events[i].endDate).format('YYYY-MM-DD')

      let StartSameOrBefore = moment(formatStartDate).isSameOrBefore(moment(displayDate))
      console.log('StartSameOrBefore::::::' + StartSameOrBefore)
      let EndSameOrAfter = moment(formatEndDate).isSameOrAfter(moment(displayDate))
      console.log('EndSameOrAfter::::::' + EndSameOrAfter)

      if (StartSameOrBefore && EndSameOrAfter) {
        tempData.push(events[i])
      }
    }
    console.log('終了:::::')
    console.log(tempData)
    return  tempData
  }
}
