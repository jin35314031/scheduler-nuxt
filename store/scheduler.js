import Vuex from 'vuex'

export const state = () => ({
  events: [
    {
      title:'報告会',
      start:'2020-08-24',
      end:'2020-08-28',
      color:'success',
      private:true
    },
    {
      title:'出勤日',
      startDateTime:'2020-08-14 06:00',
      endDateTime:'2020-08-14 18:00',
      color:'warning',
      private:false
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
    const allData = {title:createEvent.title,startDateTime:createEvent.startEndTime[0],endDateTime:createEvent.startEndTime[1],color:createEvent.color,private:createEvent.color}
    context.commit('updateEvents',allData)
    console.log('action')
  }
}
