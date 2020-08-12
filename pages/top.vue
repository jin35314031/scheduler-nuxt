<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
         <p :class="data.isSelected ? 'is-selected' : ''">
           {{ data.day.split('-').slice(2).join('-') }}{{ data.isSelected ? '✔️' : ''}}
         </p>
         <div v-for="event in events" class="event">
           <p v-if="data.day >= event.start & data.day <= event.end "> {{ event.title }} </p>
         </div>
      </div>
    </el-calendar>


    <label>title</label>
    <input type="text" v-model="createEvent.title"></input>
    <label>startTime</label>
    <input type="date" v-model="createEvent.start"></input>
    <label>endTime</label>
    <input type="date" v-model="createEvent.end"></input>
    <button v-on:click="$store.dispatch('scheduler/createEventsAction',createEvent)">NewEvents</button>
  </div>
</template>

<script>
export default {
  data:function(){
      return {
        createEvent:{
          title:'',
          start:'',
          end:''
        }
      }
    },
    computed: {
        events() {
          return this.$store.state.scheduler.events;
         }
      }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
  div.event{
    background-color:rgb(255,0,0);
  }
</style>
