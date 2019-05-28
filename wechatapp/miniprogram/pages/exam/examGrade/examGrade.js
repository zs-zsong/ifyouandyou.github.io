// pages/exam/examGrade/examGrade.js
import {
  getExamInfoByExamid,
  getInfo,
  getExamlist
} from '../../../lib/api';
const app = getApp();
Component({
    properties: {
        type: {
            type: Number,
            value: '',
            observer: function(newVal, oldVal) {
                // 属性值变化时执行
              console.log(newVal, oldVal)
              this.clickAnimation();
              if (newVal == 1) {
                  this.getExam();
                  console.log(app.globalData)
                  if (app.globalData.wechatUserData && !app.globalData.wechatUserData.userPhone) {
                      this.setData({
                          showBind: true
                      })
                  } else {
                      this.setData({ //没有绑定手机号码
                          hasPhone: true
                      })
                  }
                  console.log(this.data)
              }
            }
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        examId: 181,
        examName: '',
        examClass: '',
        subject: '',
        showSearch: true,
        showExam: true,
        showBind: false, //绑定手机号码页面
        studentData: [],
        restStudent: [], //其他学生
        typeBar: 5,
        showBody: false, //显示页面
        hasPhone: false,
        hasExam: false, //是否有完成的考试
        examList: [], //考试列表
        moveData:''
    },
    pageLifetimes: {
      show() {
        //  console.log(' 页面被展示')
        this.getExam();
      }
    },
    ready() {
      
    },
    methods: {
        clickAnimation(){  //下拉箭头动画
          var animation = wx.createAnimation({
            duration: 3000,
            delay: 0,
            timingFunction: "ease",
          });
          animation.translateY(10).step({ duration: 3000 })
          this.setData({ moveData: animation.export() })
        },
        search() {
            this.setData({
                showSearch: false
            });
        },
        cancle() {
            this.setData({
                showSearch: true
            });
        },
        getExamList() {
            getExamInfoByExamid({
                id: this.data.examId
            }).then((res) => {
                console.log(res)
                if (res.code == 10000) {
                    this.setData({
                        studentData: res.data,
                        restStudent: res.data.slice(3)
                    });
                }
            })
        },
        chooseExamItem(el) {
            if (!el) return;
            let data = el;
            if (!el.exam_name) {
                data = el.target.dataset.info;
                this.setData({
                    showExam: true
                })
            }
            console.log(this.data)
            this.setData({
                examName: data.exam_name,
                examClass: data.class_name,
                subject: data.exam_subject,
                examId: data.examId
            }, () => {
                this.getExamList()
            });
        },
        getExam() {
            getExamlist().then((res) => {
                console.log(res)
                if (res.code != 10000) {
                    return
                };
                res.data.map((item) => {
                    console.log(item.old_status == 7);
                    if (item.old_status == 7) {
                        this.setData({ //存在已完成的考试
                            hasExam: true
                        });
                        if (this.data.hasExam && !this.data.hasPhone) { //存在考试没有绑定手机号码
                            this.setData({
                                showBind: true
                            })
                        }
                    }
                });
                this.setData({ //显示页面
                    showBody: true,
                });
                console.log(this.data);
                let data = res.data.filter(item => item.old_status == 7);

                console.log(res.data.length > 0 && !this.data.showBind)
                if (res.data.length > 0 && !this.data.showBind) {
                    this.chooseExamItem(data[0]);
                }
                this.setData({
                    examList: data,
                })
            })
        },
        chooseExam() {
            this.setData({
                showExam: false
            })
        },
        closeExam() {
            this.setData({
                showExam: true
            })
        },
        searchStudent(el) {
            console.log(el);
            console.log(this.data.studentData)
            let type = el.target.dataset.info;
            if (type == 1) {
                this.lsitStudent('A', 1)
            } else if (type == 2) {
                this.lsitStudent('B', 2)
            } else if (type == 3) {
                this.lsitStudent('C', 3)
            } else if (type == 4) {
                this.lsitStudent('D', 4)
            } else if (type == 5) {
                this.lsitStudent('', 5)
            }
        },
        lsitStudent(type, index) {
            let data = this.data.studentData,
                listData = [];
            data.map((item) => {
                console.log(item.grade, type)
                if (item.grade == type) {
                    listData.push(item)
                } else if (!type) {
                    listData.push(item)
                };
            });
            if (!type) {
                listData = listData.slice(3);
            }
            console.log(listData)
            this.setData({
                restStudent: listData,
                showSearch: true,
                typeBar: index
            })
            console.log(this.data)
        },
        publicGrade() {
            wx.navigateTo({
              url: `/pages/wrongTopic/addressList/addressList?examId=${this.data.examId}`
            })

        },
        checkStudent(el) {
            if (!el.currentTarget.dataset.info) {
                return
            }
            console.log(el.currentTarget.dataset.info);
            let studentData = el.currentTarget.dataset.info;
            wx.navigateTo({
              url: `/pages/exam/studentReport/studentReport?type=2&examId=${this.data.examId}&info=${JSON.stringify(studentData)}`,
            })
        },
        onMyEvent(el) { //footer传入事件
            console.log(el.detail.phone)


            this.setData({ //隐藏绑定悬浮框
                showBind: false
            }, () => {
                if (el.detail.phone) {
                    this.getExam();
                    app.globalData.wechatUserData.userPhone = el.detail.phone;
                    this.setData({ //没有绑定手机号码
                        hasPhone: true
                    });
                }
            });
        },
        classReport() {
            wx.navigateTo({
                url: `/pages/score/scoreAnalyze/scoreAnalyze?type=1&examId=${this.data.examId}`
            })
        }
    }
})