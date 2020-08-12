<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
         <p :class="data.isSelected ? 'is-selected' : ''">
           {{ data.day.split('-').slice(2).join('-') }}{{ data.isSelected ? '✔️' : ''}}
         </p>
         <span v-for="event in events">
           <el-tag  v-if="data.day >= event.start & data.day <= event.end " v-bind:type="event.color"> {{ event.title}} </el-tag>
         </span>
      </div>
    </el-calendar>

    <label>title</label>
    <input type="text" v-model="createEvent.title"></input>
    <label>startTime</label>
    <input type="date" v-model="createEvent.start"></input>
    <label>endTime</label>
    <input type="date" v-model="createEvent.end"></input>
    <el-button type="info" v-on:click="$store.dispatch('scheduler/createEventsAction',createEvent)">NewEvents</el-button>
  </div>
</template>


<script>
export default {
  data:function(){
      return {
        createEvent:{
          title:'',
          start:'',
          end:'',
          color:''
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
</style>
