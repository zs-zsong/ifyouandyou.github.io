<template>
<div class="top_">
        <!-- <div class="title">
            <p class="subject">题号：<span class="number">{{nowData.question}}</span>、<span class="type">{{nowData.type==1?'选择题':'客观题'}}</span></p>
            <div class="back"></div>
            <div class="score">
                <div class="average">
                    <p>班级平均得分</p>
                    <p class="ave_number"> {{ chooseInfo.classRatio}}</p>
                </div>
                <div class="rate">
                    <p>得分率</p>
                    <p class="rate_number"> {{ chooseInfo.avg}}</p>
                </div>
            </div>
        </div>
        <div v-if="nowData.acquaintanceTopicSize != 0" class="right_btn">
            <button @click="practise">相似题练习</button>
        </div> -->
        <div class="title">
            <p>题号：<span class="number">{{nowData.question}}</span>、<span class="type">{{nowData.type==1?'选择题':'客观题'}}</span></p>
            <div class="back"></div>
        </div>
        <div class="score">
            <div class="average">
                <p>班级平均得分<span class="ave_number">{{ chooseInfo.classRatio}}</span></p>
            </div>
            <div class="rate">
                <p>得分率<span class="rate_number">{{ chooseInfo.avg}}</span></p>
            </div>
        </div>
</div>
    
</template>
<script>
// 引入api接口
import {getQuestionList,getRatio} from '../../apis/apis'
export default {
    data(){
        return {
            exmaId:'',
            chooseInfo:{
                classRatio: "",
                avg: "",
            },
        }
    },
    props: {
        nowData: {
            // 对象或数组默认值必须从一个工厂函数获取
            // default: ''
        },
    },
    created () {
        this.examId = this.$route.params.id;
        console.log(this.nowData)
    },
    watch:{
        nowData(pre,next){
            console.log('header');
            console.log(pre);
            if(pre) {
                this.getRatioData(pre.examId,pre.id)
            }
        }
    },
    mounted() {

    },
    methods:{
        getRatioData(examId,questionId){
            getRatio({
                examId:examId,
                questionId:questionId
            }).then(res => {
                console.log(res)
                if(res.data){
                    this.chooseInfo=res.data;
                }
            })
        },
        getExmaList(){  
            getQuestionList({
                id:this.examId
            }).then(res => {
                console.log(res)
                this.chooseInfo = res.data;
                this.chooseInfo.map((item)=>{
                    return item;
                })
                this.nowExamData = this.chooseInfo[this.index];
                console.log(this.nowExamData);
                this.getRatioData();
            })
        },
        // 相似题
        // practise(){
        //     console.log(3333);
        //     this.$emit('listenToChildEvent');
        // }
    },
}
</script>
<style lang="less" scoped>
// .top_{
//     width: 100%;
//     background: #fff;
//     display:flex;
//     justify-content: space-between;
//     align-items: center;
//     .title{
//         position: relative;
//         display: flex;
//         align-items: center;
//         height: 72px;
//          .back{
//             width:213px;
//             height:72px;
//             background:linear-gradient(90deg,rgba(255,170,0,1) 0%,rgba(255,203,82,1) 100%);
//             border-radius:0px 44px 44px 0px;
//             position: absolute;
//             top:0;
//             left:0;
//             z-index: 1;
//             background: linear-gradient(to right, #FFAA00 , #FFCB52);
//         }
//         .subject{
//             position: relative;
//             z-index: 2;
//             text-indent: 20px;
//             margin:0;
//             color:rgba(255,255,255,1);
//             font-weight:400;
//             .number{
//                 font-size: 20px;
//                 font-weight: bolder;
//             }
//         }
//         .score{
//             display:flex;
//             align-items: center;
//             margin-left: 60px;
//             .rate,.average{  
//                     font-size: 16px;
//                     display:flex;
//                     justify-content: flex-start;
//                     align-items:center;
//                     margin-left: 40px;
//                     font-weight: 400px;
//                     .ave_number,.rate_number{
//                         font-weight: bolder;
//                         font-size: 25px;
//                         font-weight: bolder;
//                         color: #00bbdd;
//                         text-indent: 10px;
//                     }
//             }
//         }
//     }
//     .right_btn{
//         button{
//            border:2px solid rgba(92,179,255,1);
//             color:#00bbdd;
//             background: #fff;
//             width:120px;
//             height:40px;
//             border-radius: 20px;
//             margin-right: 40px;
//             cursor: pointer;

//         }
//     }
   

// }
.top_{
    width: 100%;
    height: 72px;
    background: #fff;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .title{
        position: relative;
        display: flex;
        align-items: center;
         .back{
            width:213px;
            height:72px;
            background:linear-gradient(90deg,rgba(255,170,0,1) 0%,rgba(255,203,82,1) 100%);
            border-radius:0px 44px 44px 0px;
            position: absolute;
            // top:0;
            // left:0;
            z-index: 1;
            background: linear-gradient(to right, #FFAA00 , #FFCB52);
        }
        p{
            position: relative;
            z-index: 2;
            text-indent: 40px;
            margin:0;
            color:rgba(255,255,255,1);
            font-weight:400;
            height: 36px;
            line-height: 36px;
        }
        
    }
    .score{
            display:flex;
            align-items: center;
            margin-left: 36px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(29,32,35,1);
            line-height:21px;
            .rate,.average{  
                    margin:0 40px;
                    font-size: 16px;
                    .ave_number,.rate_number{
                        font-weight: bolder;
                        font-size: 24px;
                        color:#00bbdd;
                        text-align: center;
                        margin-bottom: 8px;
                        margin-left: 8px;
                    }
            }
    }

}
</style>
