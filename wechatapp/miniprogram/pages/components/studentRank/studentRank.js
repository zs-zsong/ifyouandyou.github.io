
import {
  getAdvance
} from '../../../lib/api';
Component({
  data: {
    type:1,
    showData:[],
    showMore:false,
    nextMore:false
  },
  properties: {
    examId: {
      type: Number,
      value: '787',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(newVal)
      }
    }
  },
  ready(){
    this.getListData();
  },
  methods: {
    getListData(){
      getAdvance({
        id:this.data.examId,
        type:this.data.type
      }).then(res=>{
        console.log(res)
        this.setData({
          showData:res.data
        })
      })
    },
    showPre(){
      this.setData({
        preMore: true
      })
    },
    showNext() {
      this.setData({
        nextMore: true
      })
    },
    changeBar(el){
      this.setData({
        type: el.currentTarget.dataset.info
      },()=>{
        this.getListData()
      })
    },



    getStudentByScoreRange:function(type){
      var result = [];
      // let rankAllData = this.props['data-info'].getExamInfoByExamid;
      console.log(this.data.chatStudentData)
      for (var i = 0; i < this.data.chatStudentData.length; i++) {
        var curdata = this.data.chatStudentData[i];
        if(curdata.grade == type ){
          result.push({
            name:curdata.studentName,
            score:curdata.score,
            rank:curdata.rank,
          });
        }
      }
      console.log(result)
      return result;
    },
    splitStudent(el){
      console.log(el)
      console.log(this)
      let type = el.target&&el.target.dataset.info*1||el;
      // console.log(this.props)
      // let dataGrade = this.props['data-grade'];
      // let maxScore = 150;
      // if(dataGrade.grade.indexOf("小") > -1){
      //   maxScore = 100;
      // }
      let data;
      // console.log(type)
      switch(type){
        case 1:
          data = this.getStudentByScoreRange('A')
          break;
        case 2:
        console.log(1221)
          data = this.getStudentByScoreRange('B')
          break;
        case 3:
          data = this.getStudentByScoreRange('C');
          break;
        case 4:
          data = this.getStudentByScoreRange('D');
          break;
        default:
          break;
      }
      this.setData({
        type:type,
        showData:data
      })
      console.log(this.data)
    }
  },
});
