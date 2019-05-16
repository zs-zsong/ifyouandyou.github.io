<template>
  <div class="contact-view">
    <div class="h2"><i>重庆名墅设计机构</i></div>
    <div class="message">
      <p>联系人：{{contacts.user}}</p>
      <p>服务热线：{{contacts.phone}}</p>
      <p>联系地址：{{contacts.address}}</p>
      <p>公司网址：<a href="">{{contacts.site}}</a></p>
      <p>扫描下方二维码关注名墅公众微信号：</p>
      <img
        class="qrcode"
        :src="contacts.qrcode"
      >
    </div>
    <input
      class="submit"
      type="submit"
      value="查看地图"
    >
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      "contacts": {}
    }
  },
  created() {
    this.$loading.show({ loading: "加载中" })
    this.axios.get('http://localhost:3000/contacts').then(res => {
      this.contacts = res.data;
      this.$loading.hide();
    }).catch(err => {
      console.log(err);
    });
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#ffffeb')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style scoped lang="scss">
.contact-view {
  padding: 28px;
  font-size: 26px;
  &,
  a {
    color: #582812;
  }
  .h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 70px;
    padding: 20px;
    font-size: 30px;
    &::before,
    &::after {
      content: "";
      display: block;
      height: 22px;
      width: 79px;
      margin: 0 10px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% auto;
    }
    &::before {
      background-image: url("~@/../static/img/icon_bj21.png");
    }
    &::after {
      background-image: url("~@/../static/img/icon_bj22.png");
    }
  }
  .message {
    border: 1px solid #d1b57d;
    padding: 20px;
    border-radius: 12px;
    line-height: 40px;
    p {
      padding: 8px 0;
    }
    .qrcode {
      display: block;
      margin: 24px auto;
      padding: 12px;
      background: #d1b57d;
      width: 260px;
      height: 260px;
    }
  }
  .submit {
    width: 100%;
    height: 88px;
    margin: 80px 0 40px;
    background: #5a2a14;
    border: 2px solid #582812;
    line-height: 88px;
    border-radius: 12px;
    font-size: 30px;
    color: #fff;
  }
}

</style>
