<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
      <!-- 日付を表示 -->
         <p :class="data.isSelected ? 'is-selected' : ''" @click="table = true;clickDay(data.day)" style="width:100%">
            <el-button  type="" size="mini" circle>
             {{ data.day.split('-').slice(2).join('-') }}
            </el-button>
         </p>
      <!-- イベントを表示 -->
         <span v-for="event in events">
            <el-tag  v-if=" event.private && data.day >= event.start && data.day <= event.end " v-bind:type="event.color"> {{ event.title }} </el-tag>
         </span>
      <!-- 日程の詳細を表示 -->
        <el-drawer
          :visible.sync="table"
          direction="ltr"
          :with-header="false"
          size="50%">

          <h2>{{displayDate}}</h2>
          <el-timeline v-for="event in events" :key="event.title">
             <el-timeline-item placement="top" timestamp=　"event.startTime.toString()" v-if=" displayDate >= event.start && displayDate <= event.end" >
                <el-card >
               　　{{event.startTime}}
                  {{event.title}}
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

    <span class="demonstration">Start to End Time</span>
        <el-date-picker
          v-model="createEvent.startEndTime"
          type="datetimerange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-time="['12:00:00']"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>

   <label>color</label>
    <el-select v-model="createEvent.color" placeholder="Select">
        <el-option
          v-for="color in options"
          :key="color.value"
          :label="color.label"
          :value="color.value">
        </el-option>
      </el-select>
    <label>share</label>
    <el-switch v-model="createEvent.private"></el-switch>
    <el-button type="info" v-on:click="$store.dispatch('scheduler/createEventsAction',createEvent)">NewEvents</el-button>
    {{createEvent.startEndTime}}
  </div>
</template>

<script>
export default {
  data:function(){
      return {
        createEvent:{
          title:'',
          startEndTime:[],
          color:'',
          private:'false'
        },
        displayDate: '',
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
        pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
        },
        table: false,

      }
    },
    computed: {
        events() {
          return this.$store.state.scheduler.events;
         }
      },
    methods:{
      clickDay(day){
      console.log(day);
      this.displayDate = day
      return null;
    }
   }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
</style>
