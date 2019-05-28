<template>
    <div class="footer">
        <div class="layer-wrapper" v-show="isLayer">
            <div class="layer" @click="closeLayer"></div>
        </div>
        <div class="bottom-wrapper">
            <div class="left">
                <p>答题情况</p>
                <ul class="btn-wrapper">
                    <div class="info-wrapper" style="" v-show="isLayer">
                        <div class="left-layer">
                            <div style="color: #1D2023;padding: 12px 0 0 14px;font-weight:400;">
                                {{type ==1?'满分':
                                    type ==2?'丢分':
                                        type ==3?'零分':'收藏'
                                }}学生名单
                            </div>
                            <div class="search">
                                <p>
                                    <img src="../../assets/images/search.png" alt="" @click="clicksearchstudent">
                                    <input type="text" v-model="inputinforstu" placeholder="搜索学生">
                                </p>
                            </div>
                            <div class="top">
                                <span>姓名</span>
                                <span>得分</span>
                            </div>
                            <div class="item" :class="item.studentId==chooseData.studentId?'active':''" v-for="(item,i) in studentinfor" @click="showImg(item)">
                                <span>{{item.studentName}}</span>
                                <span>{{item.score}}</span>
                            </div>
                        </div>
                        <img class="close"  @click="close" src="../../assets/images/normal@2x.png" alt="">
                        <div  class="right-layer">
                                <div v-if="chooseData"  class="source">
                                    <div @click="changSate" class="title">
                                        <img v-if="isUnfold" src="../../assets/images/trane_up.png" alt="">
                                        <img v-if="!isUnfold" src="../../assets/images/trane_down.png" alt="">
                                        <div class="c">
                                            <span style="font-weight: bold;">学生答案</span>
                                        </div>
                                    </div>
                                    <div v-if="isUnfold" class="img">
                                        <img style="width: 100%;height: 80px;" :src="chooseData.answerPostion" alt="">
                                    </div>
                                </div>

                                <div v-if="chooseData"  class="source">
                                    <div @click="changSate1" class="title">
                                        <img v-if="isUnfoldA" src="../../assets/images/trane_up.png" alt="">
                                        <img v-if="!isUnfoldA" src="../../assets/images/trane_down.png" alt="">
                                        <div class="c">
                                            <span style="font-weight: bold;">参考答案</span>
                                        </div>
                                    </div>
                                    <div v-if="isUnfoldA" class="img">
                                        <img src="../../assets/images/test.png" alt="">
                                    </div>
                                </div>
                            </div>
                    </div>
                    <li :class="type==1?'active-1':''" @click="showLayer(1)">
                        <span>{{sujectiveinfor.fullMark||0}}人</span><span>满分</span></li>
                    <li :class="type==2?'active-1':''" @click="showLayer(2)">
                        <span>{{sujectiveinfor.dropPoints||0}}人</span><span>丢分</span></li>
                    <li :class="type==3?'active-1':''" @click="showLayer(3)">
                        <span>{{sujectiveinfor.noMarks||0}}人</span><span>零分</span></li>
                    <li :class="type==4?'active-1':''" @click="showLayer(4)">
                        <span>{{sujectiveinfor.collect||0}}人</span><span>收藏</span></li>
                </ul>
            </div>
            <!-- 小图标 -->
            <div class="right">
                <div class="hight_score">
                    <p>班级最高分<span class="hight_number">{{sujectiveinfor.topScore||0}}</span></p>
                </div>
                <div class="lower_score">
                    <p>班级最低分<span class="lower_number">{{sujectiveinfor.lowScore||0}}</span></p>

                </div>
                <div class="totall_score">
                    <p>题目总分<span class="totall_number">{{sujectiveinfor.standardScore||0}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入头部组件
    import Header from '@/components/header/Header.vue'
    import {
        getSectionInfo, getQuestionList, getSubjective
    } from '../../apis/apis'

    export default {
        data() {
            return {
                examId:'',
                questionId:'',
                num: 10,
                type: 1,
                isLayer: false,
                studentinfor: [],
                sujectiveinfor: {
                    dropPoints: '',//丢分人数
                    topScore: '',
                    noMarks: '',
                    standardScore: '',
                    lowScore: '',
                    collect: '',//被收藏的评卷人数
                    fullMark: '',//满分人数
                },
                chooseData: '',
                inputinforstu: '',//输入框信息
                inputlist: '',//学生输入搜索信息
                isUnfold:false,
                isUnfoldA:false,
                
            }
        },
        props: {
            nowData: {
                // 对象或数组默认值必须从一个工厂函数获取
                // default: ''
            }
        },
        watch: {
            nowData: {
                handler(newName, oldName) {
                    console.log(newName);
                    if (newName&&newName.type != 1) {
                        this.getSubjective();
                    }
                },
                immediate: true
            },
        },
        methods: {
            close(){
                this.isLayer=!this.isLayer;
            },
            changSate() {
                // console.log(111);
                this.isUnfold = !this.isUnfold;
            },
            changSate1() {
                this.isUnfoldA = !this.isUnfoldA;
            },
            showLayer(type) {
                this.type = type;
                this.isLayer = true;
                // let params ={
                //     examId:this.nowData.examId,
                //     questionId:this.nowData.id,
                //     sectionType:type //区间类型:1满分,2丢分,3零分,4收藏
                // }
                let params = {
                    examId: this.nowData.examId,
                    questionId: this.nowData.id,
                    sectionType: type //区间类型:1满分,2丢分,3零分,4收藏
                }
                // 区间信息
                getSectionInfo(params).then(res => {
                    console.log(res)
                    this.studentinfor = res.data;
                    // this.studentinfor.map((item) => {
                    //     item.answerPostion = JSON.parse(item.answerPostion);
                    //     return item;
                    // })
                    this.chooseData = this.studentinfor[0];
                    console.log(this.chooseData)
                })
            },
            // 主观题
            getSubjective() {
                getSubjective({
                    examId: this.nowData.examId,
                    questionId: this.nowData.id,

                }).then(res => {
                    console.log(res)
                    this.sujectiveinfor = res.data;
                })
            },
            closeLayer() {
                this.isLayer = false;
            },
            showImg(data) {
                console.log(data);
                this.chooseData = data
            },
            // 搜索学生
            clicksearchstudent() {
                // alert(this.inputinforstu)
                // item.studentName = this.inputinforstu
                console.log(this.inputinforstu);
                let params = {
                    examId: this.nowData.examId,
                    questionId: this.nowData.id,
                    sectionType: this.type //区间类型:1满分,2丢分,3零分,4收藏
                };
                let arr = [];
                getSectionInfo(params).then(res => {
                    console.log(res)
                    if(this.inputinforstu){
                        for(var i=0;i<res.data.length;i++) {
                            if(this.inputinforstu == res.data[i].studentName){
                                arr.push(res.data[i]);
                            }
                        }
                        this.studentinfor = arr;
                    }else {
                        this.studentinfor = res.data;
                    }

                    //  item.studentName = this.inputinforstu
                    // this.studentinfor.map((item)=>{

                    //     return item;
                    // })


                })

            }
        },
        mounted() {
        },
    }
</script>
<style lang="less" scoped>
    .source {
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(215, 220, 224, 1);
        margin-top: 12px;
        padding: 4px 0px 4px 0px;
        .title {
            display: flex;
            height: 20px;
            align-items: center;
            img {
                width: 4px;
                height: 3px;
                padding-right: 10px;
                padding-left: 8px;
            }
        }
        .img {
            border-top: 1px solid rgba(215, 220, 224, 1);
            padding: 60px 8px 60px 8px;
            text-align: center;
        }
        .imgs {
            border-top: 1px solid rgba(215, 220, 224, 1);
            .c {
                display: flex;
                margin-top: 15px;
                .btn {
                    width: 40px;
                    height: 16px;
                    text-align: center;
                    line-height: 16px;
                    background: linear-gradient(90deg, rgba(255, 170, 0, 1) 0%, rgba(255, 203, 82, 1) 100%);
                    border-radius: 1px;
                    margin-left: 8px;
                    margin-right: 8px;
                    color: #ffffff;
                }

            }
        }
    }
    .bottom-wrapper {
        width: 100%;
        // min-width: 600px;
        display: flex;
        justify-content: space-between;
        z-index: 99;
        padding: 0px 25px;
        box-sizing: border-box;
        background-color: #fff;
    }

    .layer-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        .layer {
            height: 100%;
            width: 100%;
            z-index: -1;
            background: rgba(25, 25, 26, .32);
        }
    }

    .info-wrapper {
        height: 80vh;
        width: 90%;
        position: absolute;
        bottom: 14vh;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .right-layer {
            display: flex;
            flex-direction: column;
            padding: 8px;
            box-sizing: border-box;
            /*justify-content: center;*/
            /*align-items: center;*/
            height: 100%;
            flex: 1;
            background: #EBF0F5;

            /*img {*/
            /*    display: inline-block;*/
            /*    width: 90%;*/
            /*    height: 300px;*/
            /*    //小弹框背景*/
            /*    background: #fff;*/
            /*}*/
        }
        .close{
            position: absolute;
            right: 8px;
            bottom: 8px;
            // background: red;
        }

        .left-layer {
            flex: 0 0 173px;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            // align-items: center;
            // justify-content: center;
            .top, .item {
                padding: 0 24px;
                box-sizing: border-box;
                height: 48px;
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                align-items: center;

            }

            .search {
                // position: relative;
                width: 142px;
                height: 40px;
                background: rgba(235, 240, 245, 1);
                margin: 16px;
                border-radius: 2px;
                display: flex;
                // justify-content: center;
                align-items: center;

                p {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img {
                        position: absolute;
                        left: 0;
                        top: 0px;
                        width: 20px;
                        background-size: cover;
                        margin-left: 16px;
                    }

                    input {
                        background: rgba(235, 240, 245, 1);
                        border: none;
                        outline: none;
                        width: 100px;
                        text-indent: 40px;
                        margin-left: 20px;
                        color: rgba(203, 203, 204, 1);
                    }

                }
            }

            .item {
                color: #1D2023;
            }

            .cheack {
                background: rgba(92, 179, 255, 1);
                cursor: pointer;
            }

            .top {
                border-bottom: 1px solid #E1E3E6;
                box-sizing: border-box;
                color: rgba(129, 141, 153, 1);
            }
        }
    }

    .footer {
        width: 100%;
        height: 72px;
        background-color: #fff;
        margin: 0 auto;
        box-sizing: border-box;
        position: fixed;
        /* position: relative; */
        bottom: 0;
        z-index: 99;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // .close{
        //     background: red;

        // }

        .right {
            height: 72px;
            z-index: 9;
            background-color: #fff;
            display: flex;
            text-align: center;

            div {
                margin-left: 63px;

                p {
                    margin: 0;
                    padding: 0;

                    .hight_number, .lower_number, .totall_number {
                        color: rgba(92, 179, 255, 1);
                        font-size: 24px;
                        margin: 13px 0 10px 0;
                        line-height: 72px;
                        margin-left: 7px;
                    }
                }
            }
        }

        .left {
            height: 72x;
            z-index: 9;
            background-color: #fff;
            display: flex;
            align-items: center;

            p {
                width: 80px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(29, 32, 35, 1);
                line-height: 21px;
                margin-right: 31px;

            }

            ul {
                margin: 0;
                display: flex;
                list-style: none;
                border: 2px solid rgba(92, 179, 255, 1);
                padding: 0;
                height: 64px;
                box-sizing: border-box;

                .active-1 {
                    background-color: rgba(92, 179, 255, 1);
                    color: #fff;
                    cursor: pointer;

                    &::before {
                        position: absolute;
                        content: '';
                        bottom: 12.3vh;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 0;
                        height: 0;
                        border-left: 12px solid transparent;
                        border-right: 12px solid transparent;
                        border-top: 12px solid #fff;
                    }
                }

                li {
                    width: 100px;
                    text-align: center;
                    border-right: 2px solid rgba(92, 179, 255, 1);
                    height: 60px;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: 9px 0;
                    position: relative;

                    &:last-child {
                        border: none;
                    }
                }
            }
        }
    }

</style>


