<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        v-for="(slide,index) in sliders"
        :key="index"
        class="swiper-slide"
      >
        <img :src="slide" class="swiper-img" alt="banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
import 'swiper/dist/css/swiper.css';
export default {
  name: '',
  props:{
          sliders: {
              type: Array
          }
  },
  data() {
    return {

    }
  },
  mounted() {
      this.$nextTick(function(){
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            observer: true,
            observeParents: true
            })
      })
    
  }
}
</script>

<style scoped lang="scss">
.swiper-container{
    background: #fff;
    .swiper-img{
        width: 100%;
    }
}
</style>
