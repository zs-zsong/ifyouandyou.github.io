<template>
 <ul class="type">
          <li
            v-for="tp in types"
            :key="tp.id"
            :class="tp.sel?'cur':''"
            @click="seleteType(tp)"
          ><a href="javascript:;">{{tp.name}}</a></li>
        </ul>
</template>

<script>
 export default {
   name: '',
   props: ["types"],
   data () {
     return {

     }
   },
   methods: {
       seleteType(obj) {
        this.types.forEach(ele => {
            ele.sel = false;
        });
        obj.sel = true;
        this.$emit('selectType',{id: obj.id,name: obj.name})
       },
       childUpdateTypes(res){
           console.log("子组件接收来自父组件的事件parentUpdateTypes",res)
       }
   },
   components: {

   }
 }
</script>
<style scoped lang="scss">
.types {
    overflow: hidden;
    .h3 {
      margin-top: 20px;
      font-size: 26px;
    }
    li {
      width: 33.33%;
      float: left;
    }
    a {
      background-color: #fffff0;
      margin-right: 20px;
      margin-top: 20px;
      line-height: 60px;
      padding: 10px;
      color: #582812;
      text-align: center;
      position: relative;
      &,
      &::before,
      &::after {
        display: block;
        border-radius: 5px;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #d1b57d;
      }
    }
    li.cur {
      a {
        background-color: #d1b57d;
        background-image: url("~@/../static/img/icon_bj3.png");
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 30px auto;
      }
      a::before,
      a::after {
        border-color: #d1b57d;
      }
    }
  }
 
</style>
