<template>
  <div class="home">
    <SwipeView :sliders="sliders"></SwipeView>
    <iframe name="villaIframe" src="http://localhost:8848" style="display: none;"></iframe>
    <IndexMain
      :cultures="indexs.cultures"
      :designers="indexs.designers"
      :others="indexs.others"
    ></IndexMain>
  </div>
</template>

<script>
import SwipeView from '@/components/SwipeView'
import IndexMain from '@/components/IndexMain'
export default {
  name: '',
  data() {
    return {
      sliders: [],
      indexs: {},
    }
  },
  components: {
    SwipeView,
    IndexMain
  },
  methods: {
    initData() {
      this.$loading.show({ loading: "正在提交" })
      this.axios.all([
        this.axios.get('http://localhost:3000/sliders'),
        this.axios.get('http://localhost:3000/indexs')
      ]).then(this.axios.spread((res1, res2) => {
        this.sliders = res1.data;
        this.indexs = res2.data;
        this.$loading.hide();
      })).catch(err => {
        console.log(err);
      });
    },
    fun() {
      Array.prototype.method = function () {
        　　console.log(this.length);
      }
      let arr = [1, 2, 3, 4, 5];
      let obj = {
        a: 1,
        b: 2,
        fun() {
          this.a = 3;
        }
      }
      for (var i in arr) {
        console.log("in:" + i)
      }
      for (var i of arr) {
        console.log("of:" + i)
      }
    },
    postMessage () {
      const iframe = window.frames['villaIframe']
      const datas = {
        username: "http://localhost:8080"
      }
      iframe.contentWindow.postMessage(JSON.stringify(datas), 'http://localhost:8848')
    }
  },
  created() {
    this.initData();
    this.fun();
  },
  mounted() {
    window.addEventListener('message', function(e) {
        console.log(e.data);
    }, true);
  },
}
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  background-size: 22px auto;
}
</style>
