<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
      <!-- 日付を表示 -->
<!--         <p  @click="table1 = true;clickDay(data.day)" style="width:100%">-->
<!--            <el-button type="" size="mini" circle>-->
<!--             {{ data.day.split('-').slice(2).join('-') }}-->
<!--            </el-button>-->
<!--         </p>-->
        <p  @click="table1 = true;clickDay(data.day)" style="width:100%">
          <el-button type="" size="mini" circle>
            {{ $moment(date).format('DD')}}
          </el-button>
        </p>
    <!-- イベントを表示 -->
         <span v-for="event in events">
<!--           <p  @click="table1 = true;clickDay(date)" style="width:100%">-->
<!--            <el-button type="" size="mini" circle>-->
<!--             {{ $moment(date).format('DD')}}-->
<!--            </el-button>-->
<!--         </p>-->
            <!-- <el-tag  v-if=" $moment(date).format('yyyy-MM-dd') >= $moment(event.startDateTime).format('yyyy-MM-dd') && $moment(date).format('yyyy-MM-dd') <= $moment(event.endDateTime).format('yyyy-MM-dd') " v-bind:type="event.color" size="small"> {{ event.title }} </el-tag> -->
            <template v-if = "$moment(date).format('YYYY-MM-DD') >= $moment(event.startDate).format('YYYY-MM-DD')">
              <template v-if ="$moment(date).format('YYYY-MM-DD') <= $moment(event.endDate).format('YYYY-MM-DD')">
                <el-tag v-bind:type="event.label" size="small">{{ event.title }} </el-tag>
              </template>
            </template>
         </span>
      </div>
    </el-calendar>



  <!-- 日程の詳細を表示 -->
    <el-drawer
       :visible.sync="table1"
       direction="ltr"
       :with-header="false"
       size="80%">
      <h2>{{displayDate}}</h2>
      <el-table :data="details">
          <el-table-column property="title" label="Title" width="200"></el-table-column>
          <el-table-column property="startDate" label="StartTime" width="200px"></el-table-column>
          <el-table-column property="endDate" label="EndTime" width="200px"></el-table-column>
          <el-table-column property="place" label="Place" width="200px"></el-table-column>
          <el-table-column property="body" label="Memo" width="300px"></el-table-column>
          <el-table-column
                fixed="right"
                label="Operations"
                width="100px">
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-on:click="$store.dispatch('scheduler/deleteEventsAction',scope.row)">Delete</el-button>
                </template>
          </el-table-column>
      </el-table>
    </el-drawer>

    <div class="flow">
          <nuxt-link to="/top"><el-avatar icon="el-icon-user-solid"></el-avatar></nuxt-link>
          <nuxt-link to="/share"><el-avatar icon="el-icon-s-cooperation"></el-avatar></nuxt-link>
        <!-- 新規作成ボタン -->
           <el-button type="primary" icon="el-icon-edit" @click="table2 = true" circle></el-button>
    </div>

  <!-- 新規作成フォーム -->
    <el-drawer
              :visible.sync="table2"
              direction="rtl"
              :with-header="false"
              size="70%">
    <!-- イベント追加 -->
    <h2>Create New Event</h2>
    <el-form ref="form" label-width="140px">
      <el-form-item label="Title">
        <el-input v-model="createEvent.title" maxlength='12' placeholder='12文字以内で入力してください'　></el-input>
      </el-form-item>

      <el-form-item label="Start to End Time">
          <el-date-picker
            v-model="createEvent.startEndTime"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
       </el-form-item>

       <el-form-item label="Place">
        <el-input v-model="createEvent.place"></el-input>
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

       <el-form-item label="Memo">
           <el-input type="textarea" v-model="createEvent.body"></el-input>
       </el-form-item>

    <el-form-item label="Share">
      <el-switch v-model="createEvent.share"></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" v-on:click="$store.dispatch('scheduler/createEventsAction',{createEvent:createEvent,userId:user.loginId})" round>NewEvents</el-button>
    </el-form-item>

   </el-form>
  </el-drawer>
    <el-button type="primary" v-on:click="logout" class="button">Logout</el-button>
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
          share:'false',
          place:'',
          body:'',
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
        tempList:[],
      }
    },
    mounted: function () {
            console.log('mount');
            this.$store.dispatch('scheduler/getEventsAction');
          },
    middleware({ store, redirect }) {
      if(!store.$auth.loggedIn) {
        redirect('/login');
      }
    },
    computed: {
        user() {
          return this.$auth.user;
        },
          events() {
          return this.$store.state.scheduler.events;
         },
        details(){
          //let eventStartList = this.$store.state.scheduler.events.filter(item => moment(this.displayDate).format('YYYY-MM-DD') >= moment(item.startDate).format('YYYY-MM-DD'));
          // let eventList = eventStartList.filter(item => moment(this.displayDate).format('YYYY-MM-DD') <= moment(item.endDate).format('YYYY-MM-DD'))
          //
          console.log('this.$store.state.scheduler.events:::::::')
          console.log(this.$store.state.scheduler.events)
          console.log('this.displayDate::::::::::::::::')
          console.log(this.displayDate)
          let array = new Array();
          array = this.$store.state.scheduler.events;
          let eventStartList = this.$store.state.scheduler.events.filter(item => moment(this.displayDate).format('YYYY-MM-DD') >= moment(item.startDate).format('YYYY-MM-DD'));
          //let eventStartList = [this.$store.state.scheduler.events].filter(item => (this.displayDate >= moment(item.startDate).format('YYYY-MM-DD')) && (this.displayDate <= moment(item.endDate).format('YYYY-MM-DD')))
          let eventList = eventStartList.filter(item => moment(this.displayDate).format('YYYY-MM-DD') <= moment(item.endDate).format('YYYY-MM-DD'))
          //array = eventStartList[0];

          ///let eventList = array.filter(item => this.displayDate <= moment(item.endDate).format('YYYY-MM-DD'));
          console.log('eventStartList::::::::::')
          console.log(eventList)
          //array = eventStartList[0];
           console.log('array::::::::::')
           console.log(array)
          return eventList;
         }
      },
    methods:{
      logout() {
        this.$auth.logout();
      },
      clickDay(day){
      console.log(day);
      this.displayDate = moment(day).format('YYYY-MM-DD')
      return null;
    },

  }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
   }
   .flow {
       display: flex;
       justify-content: space-around;
   }
  .button{
    float:right;
    margin-right:30px;
  }
</style>
