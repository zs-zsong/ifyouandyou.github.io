<template>
  <div class="appoint-view">
    <h5 class="h2"><i>请填写以下预约信息</i></h5>
    <form
      class="input-form"
      @submit.prevent="appointSubmit"
    >
      <div class="basic">
        <div class="input-item">
          <span class="label">房屋地址：</span>
          <div class="input">
            <input
              type="text"
              value=""
              placeholder="请输入房屋地址"
              minlength="2"
              v-model.trim="info.address"
            >
          </div>
        </div>
        <div class="input-item"><span class="label">房屋面积：</span>
          <div class="input">
            <input
              type="number"
              value=""
              placeholder="请输入房屋面积"
              minlength="2"
              v-model.number.trim="info.area"
            >
          </div>
        </div>
        <div class="input-item"><span class="label">客户姓名：</span>
          <div class="input">
            <input
              type="text"
              value=""
              placeholder="请输入客户姓名"
              minlength="2"
              v-model.trim="info.name"
            >
          </div>
        </div>
        <div class="input-item"><span class="label">联系电话：</span>
          <div class="input">
            <input
              type="number"
              value=""
              placeholder="请输入联系电话"
              minlength="8"
              v-model.number.trim="info.phone"
              @change="checkPhone"
            >
          </div>
        </div>
      </div>
      <div class="types">
        <div class="h3" @click="parentUpdateTypes">喜欢的装饰风格：</div>
        <AppointType :types="types" @selectType="selectType" ref="seltype"></AppointType>
      </div>
      <input
        class="submit"
        type="submit"
        value="确认预约"
      >
    </form>
  </div>
</template>

<script>
import AppointType from '@/components/AppointType'
export default {
  name: '',
  data() {
    return {
      info: {
        "address": "",
        "area": "",
        "name": "",
        "phone": "",
        "tp_id": null,
        "tp_name": ""
      },
      types: []
    }
  },
  methods: {
    checkPhone(event) {
      //regEmail=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      //pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      const phone = event.target.value;
      var myreg = /^(((1(3|4|5|7|8)[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (!myreg.test(phone)) {
        this.$loading.show({ toast: "请输入正确的电话号码" })
        this.$nextTick(() => {
          this.$loading.hide()
        })
        return false;
      }
    },
    parentUpdateTypes(){
      const updateTp = [];
      //"父组件给子组件传递事件childUpdateTypes",
      this.$refs.seltype.childUpdateTypes(updateTp);
    },
    selectType(res){
      this.info["tp_id"] = res.id;
      this.info["tp_name"] = res.name;
    },
    appointSubmit(event) {
      let info = this.info;
      if (info.address == "" || info.area == "" || info.name == "" || info.phone == "") {
        this.$loading.show({ toast: "请完善您的信息" })
        this.$nextTick(() => {
          this.$loading.hide()
        })
        return false;
      }
      if (info.tp_name == "") {
        this.$loading.show({ toast: "请选择您喜欢的装修风格" })
        this.$nextTick(() => {
          this.$loading.hide()
        })
        return false;
      }
      this.$loading.show({ loading: "正在提交" })
      this.axios.post('http://localhost:3000/appoints', info).then(res => {
        this.$loading.show({ toast: "提交成功" })
        this.$nextTick(() => {
          this.$loading.hide()
          this.$router.push('/')
        })
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    this.$loading.show({ loading: "加载中" })
    this.axios.get('http://localhost:3000/types').then(res => {
      this.types = res.data;
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
  },
  components: {
    AppointType
  }
}
</script>
<style scoped lang="scss">
html,
body {
  background: #ffffeb;
}
.appoint-view {
  margin: 0 28px;
  font-size: 26px;
  color: #582812;
  .h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    font-size: 30px;
    line-height: 100px;
    i {
      color: #423630;
    }
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
  .basic {
    .input-item {
      overflow: hidden;
      margin-bottom: 20px;
    }
    .label {
      display: block;
      line-height: 60px;
      width: 135px;
      float: left;
    }
    .input {
      margin-left: 145px;
      border: 1px solid #d1b57d;
      background: #fffff0;
      padding: 8px;
    }
    input {
      width: 100%;
      height: 40px;
      background: transparent;
      line-height: 40px;
      font-size: 26px;
      color: #582812;
    }
  }
  
  .submit {
    width: 100%;
    height: 88px;
    margin: 40px 0;
    background: #5a2a14;
    border: 2px solid #582812;
    line-height: 88px;
    border-radius: 12px;
    font-size: 30px;
    color: #fff;
  }
}
</style>
