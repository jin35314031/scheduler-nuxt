import Vuex from 'vuex'

export const state = () => ({
  events: [
    {
      title:'報告会',
      start:'2020-08-24',
      end:'2020-08-28',
    },
    {
      title:'出勤日',
      start:'2020-08-14',
      end:'2020-08-14'
    }
  ]
})

export const mutations = {
  updateEvents:function(state,data){
    console.log('mutation')
    state.events = data
  }
}

export const actions = {

  createEventsAction(context,createEvent){
    console.log(createEvent)
    context.commit('updateEvents',createEvent)
    console.log('action')
  }
}
