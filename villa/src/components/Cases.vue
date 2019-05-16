<template>
     <div class="case-view">
            <ul>
                <li v-for="cas in cases" :key="cas.id"><router-link :to="'/case/'+cas.id">
                    <div class="img"><img :src="cas.imgsrc"></div>
                    <p>{{cas.name}}</p>
                </router-link> </li>
            </ul>
        </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {
         "cases": []
     }
   },
   created() {
    this.$loading.show({ loading: "加载中" })
    this.axios.get('http://localhost:3000/cases').then(res => {
      this.cases = res.data;
      this.$loading.hide();
    }).catch(err => {
      console.log(err);
    });
  }
 }
</script>

<style scoped lang="scss">
.case-view{
    font-size: 26px;
    text-align: center;
    overflow: hidden;
    li{
        padding: 15px 0 0;
        float: left;
        width: 50%;
        border-bottom: 1px solid #d1b57d;
        &:nth-child(odd){padding-left: 16px;}
        &:nth-child(even){padding-right: 16px;}
    }
    a{
        display: block;
        margin: 15px 12px 0;
        color: #582812;
    }
    .img{
        height: 220px;
    }
    p{
        line-height: 45px;
        padding: 10px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
}
</style>
