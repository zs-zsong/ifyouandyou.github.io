<template>
    <div>
        <div v-if="ispop" class="pop_up">
            <div class="content">
                <img class="close"  @click="changePop" src="../../assets/images/normal@2x.png" alt="">
                <div class="tapgroup">
                    <div @click="changeSee(item)" v-for="(item,i) in similarityList"  :class="item.id == similarityId?'tap active':'tap'">
                        练习{{i+1}}
                    </div>
                </div>
                <div v-for="item in similarityList" v-if="similarityId == item.id">
                    <div class="source">
                        <div @click="changSate" class="title">
                            <img v-if="isUnfold" src="../../assets/images/trane_up.png" alt="">
                            <img v-if="!isUnfold" src="../../assets/images/trane_down.png" alt="">
                            <div class="c">
                                <span style="font-weight: bold;">题目来源:</span>
                                {{item.source}}
                            </div>
                        </div>
                        <div v-if="isUnfold" class="img">
                            <img src="../../assets/images/test.png" alt="">
                        </div>
                    </div>

                    <div class="source analysis">
                        <div @click="changSate1" class="title">
                            <img v-if="isUnfoldA" src="../../assets/images/trane_up.png" alt="">
                            <img v-if="!isUnfoldA" src="../../assets/images/trane_down.png" alt="">
                            <div class="c">
                                答案解析
                            </div>
                        </div>
                        <div v-if="isUnfoldA" class="imgs">
                            <div class="c">
                                <div class="btn">答案</div>
                                <div v-html="item.answer2"></div>
                                <!--<img src="../../assets/images/test.png" alt="">-->
                            </div>
                            <div class="c">
                                <div class="btn">分析</div>
                                <div v-html="item.parse"></div>
                                <!--<img src="../../assets/images/test.png" alt="">-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <!-- 上边头部 -->
            <Header :now-data="nowExamData" ></Header>
            <div class="arrow">
                <i class="el-icon-arrow-left" @click="pre"></i>
                <i class="el-icon-arrow-right" @click="next"></i>
            </div>
            <div class="choose">
                <div class="middle_">
                    <img :src="nowExamData&&nowExamData.questionPic[0].url">
                </div>
                <div class="text_" :now-data="nowExamData" v-show="nowExamData.type==1">
                    <p><span>知识点：</span>
                        <a v-for="(item,i) in knowledgePoint" href="#">
                            {{item}}
                            <span v-if="knowledgePoint">|</span>
                        </a>
                    </p>
                    <div v-if="acquaintanceTopicSize != 0"  @click="changePop" class="similarity">相似题练习</div>
                </div>
                <div v-show="nowExamData.type == 1" class="footer_">
                    <el-row>
                        <!-- 饼状图 -->
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <div id="chart" style="height:250px;width:250px;"></div>
                            </div>
                        </el-col>
                        <!-- 表格 -->
                        <el-col :span="11">
                            <ul>
                                <li class="th">
                                    <span>选项</span>
                                    <span>选择率</span>
                                    <span>选择人数</span>
                                </li>
                                <li :class="studentListArr.option==item.option?'active':''" :style="{'color':colorArr[i]}" v-for="(item,i) in selectinfor" @click="changeAnswer(item,index)">
                                    <span>{{item.option}}</span>
                                    <span>{{item.optionRatio}}%</span>
                                    <span>{{item.optionNumber}}</span>
                                </li>
                            </ul>
                        </el-col>
                        <!-- 面板 -->
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <div class="panel" :style="{'height':48*(selectinfor.length+1)+'px'}">
                                    <p>选择<strong>{{studentListArr&&studentListArr.option}}</strong>的人</p>
                                    <div class="name">
                                        <span v-for="(item, i) in studentListArr.nameList">{{item}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="text" :now-data="nowExamData" v-show="nowExamData.type!=1">
                    <p>
                        <span>知识点：</span>
                        <a v-for="(item,i) in knowledgePoint" href="#">
                            {{item}}
                            <span v-if="i != knowledgePoint.length -1">|</span>
                        </a>
                    </p>
                    <div v-if="acquaintanceTopicSize != 0" @click="changePop" class="similarity">相似题练习</div>
                </div>
                <Footer :now-data="nowExamData"  v-show="nowExamData.type!=1"></Footer>
            </div>
        </div>
    </div>
</template>
<script>
    // 统计图
    // 引入头部组件
    import Header from '@/components/header/Header.vue'
    import Footer from '@/components/Footer/Footer.vue'
    import {getQuestionList, getRatio, getSelectRatio,getAcquaintanceTopic} from '../../apis/apis'
    export default {
        data() {
            return {
                type: 1, // 1 2
                examId: '',
                myEchats: '',
                tableData: [],//  统计饼状图
                studentListArr: [],  //最右侧学生
                examListData: [],  //当前所有题块列表，
                nowExamData: '', //当前显示题块
                // index:'',//题块索引
                index:0,//  0 10选择题  19
                // index: 13,//客观题  11  13
                selectinfor: [],//选择题信息
                acquaintanceTopicSize: '',//是否显示相似题
                knowledgePoint: '',//知识点
                similarityList:'',//相似题
                similarityId:'',
                isUnfold: false,
                isUnfoldA: false,
                ispop: false,
                colorArr:['#5CB3FF', '#FF6047', '#FFBFB5', '#FFBFB5','#ffac06']//饼状图颜色
            }
        },
        watch: {
            // 监听
            nowExamData(pre, next) {
                console.log(pre);
                if (pre) {
                    if(pre.type != 1) return;
                    this.getSelectRatio();
                }
            }
        },
        created() {
            // 监听键盘事件
            document.onkeydown=ev=>{
                ev.stopPropagation();
                console.log(ev.keyCode)
                 console.log(this.index)
                let code = ev.keyCode;
                if(code==33 || code==37){
                    if(this.index == 0) {
                        return
                        console.log("第一页")
                    }else {
                        this.index--;
                         this.nowExamData = this.examListData[this.index];
                    }
                } else if (code==39 || code==34){
                    console.log(this.index==this.examListData.length-1)
                    if(this.index == this.examListData.length-1) {
                        return
                        console.log("最后一页")
                    }else {
                         this.index++;
                         this.nowExamData = this.examListData[this.index];
                        
                    }
                }
               
                console.log(this.nowExamData)

            }
            this.examId = this.$route.params.id;
            this.getExmaList();
            console.log(this.examId)
        },
        mounted() {

        },
        methods: {
            pre(){
                if(this.index == 0) {
                    return
                }else {
                    --this.index;
                    this.nowExamData = this.examListData[this.index];
                }
                
            },
            next(){
                 if(this.index == this.examListData.length-1) {
                    return
                }else {
                    ++this.index;
                     this.nowExamData = this.examListData[this.index];
                }
            },
            changeSee(v) {
                console.log(v.id)
                this.similarityId = v.id;
            },
            changSate() {
                // console.log(111);
                this.isUnfold = !this.isUnfold;
            },
            changSate1() {
                this.isUnfoldA = !this.isUnfoldA;
            },
            changePop() {
                console.log(1111);
                this.ispop = !this.ispop;
                if(this.ispop){
                    getAcquaintanceTopic({questionId:this.nowExamData && this.nowExamData.id}).then((res)=>{
                        console.log(res);
                        this.similarityList = res.data;
                        this.similarityId = res.data[0].id;
                    })
                }
            },
            // 统计图饼状图加载数据
            loadChat(data) {
                let dataArr = [];
                this.selectinfor.map(item => {
                    dataArr.push({
                        value: item.optionNumber,
                        name: item.option
                    })
                })
                let option = {
                    tooltip: {
                        show: true
                    },
                    color: this.colorArr,//动态选择颜色
                    label: {normal: {show: true, position: 'innner'}},
                    series: [
                        {
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            data: dataArr,
                            label: {normal: {show: true, position: 'innner'}},
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                let myEchats = this.$echarts.init(document.getElementById("chart"));
                myEchats.setOption(option);
            },
            // 平均分 得分率
            getRatioData() {
                getRatio({
                    examId: this.examId,
                    questionId: this.nowExamData && this.nowExamData.id
                }).then(res => {
                    console.log(res);
                    this.acquaintanceTopicSize = res.data.acquaintanceTopicSize;
                    this.knowledgePoint = res.data.knowledgePoint;
                })
            },
            // 考试列表
            getExmaList() {
                getQuestionList({
                    id: this.examId
                }).then(res => {
                    console.log(res)
                    this.examListData = res.data;
                    this.examListData.map((item) => {
                        item.questionPic = JSON.parse(item.questionPic);
                        return item;
                    });
                    console.log(this.examListData);
                    this.nowExamData = this.examListData[this.index];
                    console.log(this.nowExamData);
                    this.getRatioData();
                })
            },
            // 选择题
            getSelectRatio() {
                getSelectRatio({
                    examId: this.nowExamData.examId,
                    questionId: this.nowExamData.id,
                }).then(res => {
                    console.log(res)
                    this.selectinfor = res.data;
                    this.studentListArr = this.selectinfor[0];
                    this.loadChat();
                })
            },
            changeAnswer(item, index) {
                console.log(item)
                console.log(index)
                this.studentListArr = item;
            },
            // 相似题
            practise(){
                console.log(3333);
                this.$emit('listenToChildEvent');
            }
        },
        components: {
            Header,
            Footer
        }
    }
</script>

<style lang="less">
    body {
        .similarity{
            width:120px;
            height:40px;
            border:2px solid rgba(255,255,255,1);
            border-radius:20px;
            text-align: center;
            line-height: 40px;
            margin-right: 16px;
            color: #fff;
        }
        .pop_up {
            position: absolute;;
            width: 100%;
            height: 100%;
            background: rgba(25, 25, 26, 0.32);
            z-index: 999;
            .close {
                position: absolute;
                right: 8px;
                bottom: 8px;
                font-size: 30px;
            }
            .content {
                height: 93%;
                width: 90%;
                background: #ffffff;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 9999;
                padding: 0 16px 0 16px;
                font-size: 8px;
                .tapgroup {
                    display: flex;
                    .tap {
                        width: 120px;
                        height:48px;
                        line-height: 48px;
                        color: #1D2023;
                        background: red;
                        // background: rgba(215, 220, 224, 1);
                        background: #D7DCE0;
                        text-align: center;
                    }
                    .active {
                        background: rgba(255, 255, 255, 1);
                    }
                }
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
                        padding: 80px 0 80px 0;
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
            }
        }
        margin: 0;
        padding: 0;
        background: #EBF0F5 !important;
        height: 100%;
        .main {
            margin: 0 auto;
            position: relative;
            .arrow{
                width: 100%;
                font-size: 50px;
                display: flex;
                // background: red;
                justify-content: space-between;
                transform:translateY(-25px);
                position: fixed;
                top: 50%;
            }
            .middle_ {
                width: 100%;
                display: flex;
                justify-content: center;
                margin: 15px auto;
                box-sizing: border-box;
                img {
                    min-height: 350px;
                    width: 94%;
                    margin: auto;
                }
                p {
                    .title {
                        font-size: 24px;
                        font-weight: bolder;
                        line-height: 36px;
                    }
                    .con {
                        font-size: 22px;
                        margin-top: 20px;
                    }
                    .type {
                        font-size: 24px;
                        line-height: 36px;
                    }
                }
            }
            .text_ {
                margin: 0 auto;
                width: 94%;
                height: 56px;
                background: #818D99;
                border-radius: 1px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    text-indent: 10px;
                    line-height: 30px;
                    font-size: 8px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    margin: 0;
                    span {
                        font-weight: bolder;
                        color: #FFFFFF;
                        // font-family:MicrosoftYaHei-Bold;
                    }
                    a {
                        text-decoration: none;
                        color: rgba(255, 255, 255, 1);
                        margin: 5px;
                    }
                }
                

            }
            .text {
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
                width: 100%;
                height: 56px;
                line-height: 56px;
                background: #818D99;
                border-radius: 1px;
                position: fixed;
                left: 0;
                bottom: 72px;
                align-items: center;
                p {
                    text-indent: 40px;
                    line-height: 56px;
                    font-size: 8px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    margin: 0;
                    span {
                        font-weight: bolder;
                        color: #FFFFFF;
                        // font-family:MicrosoftYaHei-Bold;
                    }
                    a {
                        text-decoration: none;
                        color: rgba(255, 255, 255, 1);
                        margin: 5px;
                    }
                }
                 .right_btn{
                    button{
                    border:2px solid #FFF;
                        color:#FFF;
                        background:none;
                        width:120px;
                        height:40px;
                        border-radius: 20px;
                        margin-right: 40px;
                        cursor: pointer;
                    }
                }
            }
            .footer_ {
                width: 94%;
                // height: 288px;
                background: #fff;
                margin: 15px auto;
                margin: 0 auto 15px auto;
                padding: 25px;
                box-sizing: border-box;
                ul {
                    padding: 0;
                    margin: 0;
                    // margin: 24px 0px;
                    border: 1px solid #ccc;
                    //  width:480px;/*100%*/
                    width: 100%;
                    // height: 240px;
                    box-sizing: border-box;
                    li {
                        &:nth-child(2) {
                            color: #5CB3FF;;
                        }
                        &:nth-child(3), &:nth-child(4), &:nth-child(5) {
                            color: #FF6047;
                        }
                        position: relative;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        border-bottom: 1px solid #ccc;
                        height: 48px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        &:last-child {
                            border: none;
                        }
                        span {
                            width: 33.333333%;
                        }
                    }
                    .active {
                        background: #D7DCE0;
                        &::after {
                            content: '';
                            width: 0;
                            height: 0;
                            border-top: 6px solid transparent;
                            border-bottom: 6px solid transparent;
                            border-right: 6px solid hsla(8, 100%, 64%, 1);
                            position: absolute;
                            right: -33px;
                        }
                    }
                    .th {
                        background: #f5f5f5;
                        span {
                            text-indent: 60px;
                        }
                    }
                    span {
                        text-indent: 60px;
                    }
                }
                .grid-content {
                    .panel {
                        position: relative;
                        // width:336px; 
                        height: 240px;
                        width:90%;
                        background: rgba(255, 96, 71, 0.15);
                        margin-left: 32px;
                        box-sizing: border-box;
                        padding: 20px;
                        border-left: 4px solid hsla(8, 100%, 64%, 1);
                        border-radius: 4px 0 0 4px;
                        p {
                            // width: 83px;
                            height: 16px;
                            font-size: 16px;
                            // font-family: MicrosoftYaHei;
                            color: rgba(29, 32, 35, 1);
                            margin: 0;
                        }
                        .name {
                            margin-top: 20px;
                            display: flex;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            span {
                                width: 33.3333%;
                                margin-bottom: 20px;
                            }
                        }
                    }
                }
            }

        }
    }
</style>

