<template>
  <section class="index-main">
    <template>
      <h3 class="h2">企业文化</h3>
      <div
        class="list-item"
        v-for="cul in cultures"
        :key="cul.title"
      >
        <h5 class="h3"><i>{{cul.title}}</i></h5>
        <div class="text">
          <p>{{cul.subst}}</p>
        </div>
        <div v-if="cul.imgsrc" class="img"><img v-lazy="cul.imgsrc"></div>
      </div>
    </template>
    <template>
      <h3 class="h2">设计师团队</h3>
      <div
        class="list-item"
        v-for="des in designers"
        :key="des.title"
      >
        <h5 class="h3"><i>{{des.title}}</i></h5>
        <div v-if="des.imgsrc" class="img"><img v-lazy="des.imgsrc"></div>
        <div class="text">
          <p>{{des.subst}}</p>
        </div>
      </div>
    </template>
    <template>
      <h3 class="h2">一群大象</h3>
      <div
        class="list-item"
        v-for="oth in others"
        :key="oth.title"
      >
        <h5 class="h3"><i>{{oth.title}}</i></h5>
        <div v-if="oth.imgsrc" class="img"><img v-lazy="oth.imgsrc"></div>
        <div class="text">
          <p>{{oth.subst}}</p>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
export default {
  name: '',
  props: {
    cultures: {
      type: Array
    },
    designers: {
      type: Array
    },
    others: {
      type: Array
    }
  },
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.index-main {
  padding: 30px;
  margin: 0 20px;
  color: #582812;
  line-height: 40px;
  font-size: 26px;
  .h2,
  .h3 {
    text-align: center;
    line-height: 64px;
    font-size: 30px;
    color: #582812;
  }
  .h2 {
    font-size: 34px;
    background: url("~@/../static/img/icon_bj1.png") center center no-repeat;
    background-size: auto 64px;
    margin-top: 24px;
    color: #d1b57d;
  }
  .h3 {
    margin: 16px 0 12px;
    color: #423630;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before,&::after{content: '';
        display: block;
        height: 22px;
        width: 79px;
        margin: 0 10px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% auto;
    }
    &::before{
        background-image: url("~@/../static/img/icon_bj21.png");
    }
    &::after{
        background-image: url("~@/../static/img/icon_bj22.png");
    }
  }
  .text {
    text-indent: 44px;
  }
  .img {
    
    img {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
