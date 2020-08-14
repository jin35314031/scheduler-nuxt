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

    <label>startTime</label>
    <el-date-picker
          v-model="createEvent.start"
          type="date"
          placeholder="Pick a day"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd">
    </el-date-picker>

    <el-time-select
      v-model="createEvent.startTime"
      :picker-options="{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }"
      placeholder="Select time">
    </el-time-select>

    <label>endTime</label>
    <el-date-picker
              v-model="createEvent.end"
              type="date"
              placeholder="Pick a day"
              format="yyyy/MM/dd"
              value-format="yyyy-MM-dd">
        </el-date-picker>

        <el-time-select
          v-model="createEvent.endTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:30'
          }"
          placeholder="Select time">
        </el-time-select>

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
  </div>
</template>

<script>
export default {
  data:function(){
      return {
        createEvent:{
          title:'',
          start:'',
          startTime:'',
          end:'',
          endTime:'',
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
