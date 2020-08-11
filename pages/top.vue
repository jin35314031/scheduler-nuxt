<template>
  <div class="container">
    <el-calendar>
      <div
        slot="dateCell"
        slot-scope="{ date,data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
           {{ data.day.split('-').slice(2).join('-') }}{{ data.isSelected ? '✔️' : ''}}
          </p>
          <p v-if="data.day == calendarEvents[0].start">{{calendarEvents[0].title}}</p>

       </div>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      calendarEvents:[
      {
        title:'報告会',
        start:'2020-08-24',
        end:'2020-08-24',
      },
     ]
   }
 }
}
</script>

<style>
  .is-selected {
      color: #1989FA;
    }
</style>
