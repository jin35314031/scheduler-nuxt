<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
      <!-- 日付を表示 -->
         <p  @click="table1 = true;clickDay(data.day)" style="width:100%">
            <el-button type="" size="mini" circle>
             {{ data.day.split('-').slice(2).join('-') }}
            </el-button>
         </p>
      <!-- イベントを表示 -->
         <span v-for="event in events">
            <el-tag  v-if=" event.private && $moment(date).format('YYYY-MM-DD') >= $moment(event.startDateTime).format('YYYY-MM-DD') && $moment(date).format('YYYY-MM-DD') <= $moment(event.endDateTime).format('YYYY-MM-DD') " v-bind:type="event.color"> {{ event.title }} </el-tag>
         </span>
      <!-- 日程の詳細を表示 -->
        <el-drawer
          :visible.sync="table1"
          direction="ltr"
          :with-header="false"
          size="70%">
           <h2>{{displayDate}}</h2>
            <el-table :data="details">
                <el-table-column property="title" label="Title" width="150"></el-table-column>
                <el-table-column property="startDateTime" label="startTime" width="150"></el-table-column>
                <el-table-column property="endDateTime" label="endTime" width="150"></el-table-column>
                <el-table-column
                      fixed="right"
                      label="Operations"
                      width="120">
                      <template slot-scope="scope">
                        <el-button type="text" size="small">Edit</el-button>
                        <el-button type="text" size="small">Delete</el-button>
                      </template>
                </el-table-column>
            </el-table>
        </el-drawer>

         <!-- <nuxt-link to="/date" >detail</nuxt-link> -->
      </div>
    </el-calendar>

  <!-- 新規作成ボタン -->
    <el-button type="primary" icon="el-icon-edit" @click="table2 = true" circle></el-button>
    <el-drawer
              :visible.sync="table2"
              direction="rtl"
              :with-header="false"
              size="70%">
    <!-- イベント追加 -->
    <h2>Create New Event</h2>
    <el-form ref="form" label-width="140px">
      <el-form-item label="Title">
        <el-input v-model="createEvent.title"></el-input>
      </el-form-item>

      <el-form-item label="Start to End Time">
          <el-date-picker
            v-model="createEvent.startEndTime"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00']"
            format="yyyy/MM/dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
       </el-form-item>

       <el-form-item label="Color">
          <el-select v-model="createEvent.color" placeholder="Select">
           <el-option
              v-for="color in options"
              :key="color.value"
              :label="color.label"
              :value="color.value">
            </el-option>
          </el-select>
       </el-form-item>

    <el-form-item label="Share">
      <el-switch v-model="createEvent.private"></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" v-on:click="$store.dispatch('scheduler/createEventsAction',createEvent)" round>NewEvents</el-button>
    </el-form-item>
   </el-form>
  </el-drawer>

  </div>
</template>

<script>
import moment from 'moment';
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
        table1: false,
        table2: false,
      }
    },
    computed: {
        events() {
          return this.$store.state.scheduler.events;
         },
        details(){
          let eventStartList = this.$store.state.scheduler.events.filter(item => moment(this.displayDate).format('YYYY-MM-DD') >= moment(item.startDateTime).format('YYYY-MM-DD'));
          let eventList = eventStartList.filter(item => moment(this.displayDate).format('YYYY-MM-DD') <= moment(item.endDateTime).format('YYYY-MM-DD'))
          return eventList;
         }
      },
    methods:{
      clickDay(day){
      console.log(day);
      this.displayDate = day
      return null;
    },

  }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
</style>
