<template>
  <div class="nav">
    <div class="navlist">
      <ul>
        <li class="navli">
          <router-link to="/home">
            <span class="iconfont home"></span>
            <p>首页</p>
          </router-link>
        </li>
        <li class="navli">
          <router-link to="/appoint">
            <span class="iconfont time"></span>
            <p>设计预约</p>
          </router-link>
        </li>
        <li class="navli">
          <router-link to="/cases">
            <span class="iconfont hot"></span>
            <p>案例展示</p>
          </router-link>
        </li>
        <li class="navli">
          <router-link to="/shopcart">
            <span class="iconfont hot"></span>
            <p>购物车</p>
          </router-link>
        </li>
        <li class="navli">
          <router-link to="/contact">
            <span class="iconfont location"></span>
            <p>联系我们</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  text-align: center;
  font-size: 20px;
  .navlist {
    min-width: 300px;
    background: #d1b57d;
    border-top: 1px solid #582812;
    overflow: hidden;
  }
  .navli {
    width: 20%;
    float: left;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: block;
      color: #fff;
      .iconfont{font-size: 44px;}
      .home:before {content: "\e6b8";}
      .time:before {content: "\e65f";}
      .hot:before {content: "\e758";}
      .location:before {content: "\e651";}
      &.router-link-active{
          color: #582812;
          .home:before {content: "\e6bb";}
          .time:before {content: "\e65e";}
          .hot:before {content: "\e757";}
          .location:before {content: "\e650";}
      }
    }
    img {
      height: 44px;
      margin-bottom: 10px;
    }
  }
}
</style>
