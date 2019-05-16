<template>
  <div class="wall-content" v-lazy-container="{ selector: 'img', error: '', loading: '' }">
    <div class="wall-item" v-for="item in items" :key="item.id">
      <div class="img"><img v-lazy="item.src" alt="item.title" /></div>
      <div class="title">{{item.title?item.title:'图片介绍'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
       "id": this.$route.params.id,
      "items": []
    }
  },
  methods: {
      getDatas(){
        this.$loading.show({ loading: "加载中" })
        this.axios.get('http://localhost:3000/caseitem').then(res => {
            this.items = res.data;
            this.$loading.hide();
        }).catch(err => {
            console.log(err);
        });
      }
  },
  created(){
      this.getDatas();
  }
}
</script>

<style scoped lang="scss">
.wall-content {
  padding: 24px;
  position: relative;
  overflow: hidden;
  column-gap: 12px;
  column-count: 2;
  .wall-item {
    padding: 9px;
    break-inside: avoid-page;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-bottom: 12px;
    img{
        width: 100%;
    }
    .title{text-align: center;margin-top: 10px;font-size: 26px;}
  }
}
</style>
