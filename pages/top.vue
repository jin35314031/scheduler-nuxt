<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
      <!-- 日付を表示 -->
         <p :class="data.isSelected ? 'is-selected' : ''">
            <el-button @click="table = true;clickDay(data.day)" type="" size="mini" circle>
             {{ data.day.split('-').slice(2).join('-') }}
            </el-button>
            {{ data.isSelected ? '✔️' : ''}}
         </p>
      <!-- イベントを表示 -->
         <span v-for="event in events">
           <el-tag  v-if="data.day >= event.start & data.day <= event.end " v-bind:type="event.color"> {{ event.title }} </el-tag>
         </span>
      <!-- 日程の詳細を表示 -->
        <el-drawer
          :visible.sync="table"
          direction="ltr"
          :with-header="false"
          size="50%">

          <h2>{{clickDay}}</h2>
          <el-timeline>
             <el-timeline-item placement="top" timestamp="00:00" >
                <el-card>
                  {{$store.state.scheduler.events}}
                </el-card>
             </el-timeline-item>
          </el-timeline>
        </el-drawer>

         <!-- <nuxt-link to="/date" >detail</nuxt-link> -->
      </div>
    </el-calendar>


  <!-- イベント追加 -->
    <label>title</label>
    <input type="text" v-model="createEvent.title"></input>
    <label>startTime</label>
    <input type="date" v-model="createEvent.start"></input>
    <label>endTime</label>
    <input type="date" v-model="createEvent.end"></input>
    <label>color</label>
    <el-select v-model="createEvent.color" placeholder="Select">
        <el-option
          v-for="color in options"
          :key="color.value"
          :label="color.label"
          :value="color.value">
        </el-option>
      </el-select>
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
        },
        options: [{
                  value: '',
                  label: 'blue'
                }, {
                  value: 'success',
                  label: 'green'
                }, {
                  value: 'info',
                  label: 'black'
                }, {
                  value: 'warning',
                  label: 'orange'
                }, {
                  value: 'danger',
                  label: 'red'
                }],
        table: false,
        dialog: false,
        loading: false,
      }
    },
    computed: {
        events() {
          return this.$store.state.scheduler.events;
         }
      },
    methods:{
      clickDay:async function(day){
      console.log(day);
      let clickDay = day
      return clickDay;
    }
   }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
</style>
