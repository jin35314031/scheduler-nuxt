<template>
  <div class="container">
    <el-calendar>
      <div
       slot="dateCell"
       slot-scope="{ date,data }">
        <!-- 日付を表示 -->
         <p :class="data.isSelected ? 'is-selected' : ''">
          <!-- {{ data.day.split('-').slice(2).join('-') }} -->
          <el-button @click="drawer = true" type="" size="mini" circle>
            {{ data.day.split('-').slice(2).join('-') }}
          </el-button>
         </p>
        <!-- イベントを表示 -->
         <span v-for="event in events">
           <el-tag  v-if="data.day >= event.start & data.day <= event.end " v-bind:type="event.color"> {{ event.title}} </el-tag>
         </span>
        <!-- 日程の詳細を表示 -->
        <!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16px" icon="el-icon-check" size="mini" circle> -->
        <!-- </el-button> -->
         <el-drawer
           title="I'm outer Drawer"
           :visible.sync="drawer"
           size="50%">
           <div>
            <el-button @click="innerDrawer = true">Click me!</el-button>
            <el-drawer
              title="I'm inner Drawer"
              :append-to-body="true"
              :before-close="handleClose"
              :visible.sync="innerDrawer">
              <p>_(:зゝ∠)_</p>
            </el-drawer>
           </div>
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
        drawer: false,
        innerDrawer: false,
      }
    },
    computed: {
        events() {
          return this.$store.state.scheduler.events;
         }
      },
    methods: {
          handleClose(done) {
            this.$confirm('You still have unsaved data, proceed?')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          }
        }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
</style>
