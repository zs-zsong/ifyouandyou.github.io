// pages/components/mytree/mytree.js
import {
  updateStructer
} from '../../../lib/api';
Component({
  properties: {
    model: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        this.setData({
          isBranch: Boolean(newVal.childList && newVal.childList.length),
        });
      }
    },
    modelScore: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(newVal)
        this.setData({
          scoreList: newVal
        })
      }
    }
  },

  data: {
    // borderType: 0,  //0 1 2 3
    // borderCLass:'tree-wrapper',  
    scoreList:{},
    open: false,
    isBranch: false,
  },

  methods: {
    toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },

    tapItem: function (e) {
      this.triggerEvent('tapitem', { itemid: 1 }, { bubbles: true, composed: true });
    },
    modify(el) {
      console.log(el);
      this.setData({
        'model.score': el.detail.value
      });
      this.triggerEvent('inputChange', { data: this.data.model }, { bubbles: true, composed: true });
      if (!el.detail.value) {
        wx.showToast({
          title: '输入不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      let type = el.currentTarget.dataset.info, params = {};
      if (type == 3) { // 1 改考试名字 2 更改年级和班级，3 改题号，4 改分数 5 改答案
        console.log(el.currentTarget.dataset)
        params = {
          id: el.currentTarget.dataset.item.id,
          type: 3,
          questionNum: el.detail.value
        }
      } else if (type == 4) {
        params = {
          id: el.currentTarget.dataset.item.id,
          type: 4,
          score: el.detail.value
        }
      } else if (type == 5) {
        params = {
          id: '',
          type: 5,
          answer: el.detail.value
        }
      } else if (type == 6) {  //总分识别
        params = {
          id: this.data.id,
          type: 4,
          score: el.detail.value
        };
        this.setData({
          score: el.detail.value
        });
      };
      console.log(JSON.stringify(params))
      updateStructer(JSON.stringify(params)).then((res) => {
        console.log(JSON.stringify(res));
        this.tapItem();
      }).catch((error) => {
        console.log('[error]', JSON.stringify(error))
      })
    }
  },

  ready: function (e) {
    this.setData({
      isBranch: Boolean(this.data.model.childList && this.data.model.childList.length),
    });
    // console.log(this.data);
  },
})