import Vuex from 'vuex'

export const state = () => ({
  events: [
    {
      title:'報告会',
      startDateTime:'2020-08-22 14:00',
      endDateTime:'2020-08-28 00:00',
      color:'success',
      share:false,
      place:'第一会議室',
      memo:'レポート提出'
    },
    {
      title:'出勤日',
      startDateTime:'2020-08-14 08:00',
      endDateTime:'2020-08-16 18:00',
      color:'warning',
      share:true,
      place:'オフィス',
      memo:'８時半出勤'
    }
  ]
})

export const mutations = {
  updateEvents:function(state,data){
    console.log('mutation')
    state.events.push(data)
  }
}

export const actions = {
  createEventsAction(context,createEvent){
    console.log(createEvent)
    const startDateTime = createEvent.startEndTime[0]
    const endDateTime = createEvent.startEndTime[1]
    console.log(startDateTime)
    const allData = {title:createEvent.title,startDateTime:createEvent.startEndTime[0],endDateTime:createEvent.startEndTime[1],color:createEvent.color,share:createEvent.share,place:createEvent.place,memo:createEvent.memo}
    context.commit('updateEvents',allData)
    console.log('action')
  },
  deleteEventsAction(context,deleteEvent){
    console.log(deleteEvent)
  }
}
