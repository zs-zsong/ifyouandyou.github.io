<template>
    <div class="testlist">
        <Header2></Header2>
         <div class="search">
             <img src="../../assets/images/search.png" alt="">
             <input type="text" v-model="inputinfor" @keydown.enter="clicksearch">
             <span @click="clicksearch">搜索</span>
        </div>
        <div class="main">
        <!-- 考试列表 -->
            <ul class="content">
                <li v-for="item in dataList" @click="jumpExam(item)">
                <span class="score">{{item.id}}</span><span class="kind">{{item.examName}}</span><span class="grade">{{item.className}}</span><span class="enter"></span>
                </li>
            </ul>
        </div>
        <div class="page">
            <el-pagination
                layout="prev, pager, next"
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"	
                :total="examList.length">
            </el-pagination>
        </div>
        <p class="footer">
            技术支持：四川元高分网络科技有限公司
        </p>
    </div>
</template>
<script>
import  Header2 from  '@/components/Header2/Header2.vue'
import { getExamList,getLikeExamNameList} from '../../apis/apis'
export default {
    data(){
        return {
            pageSize:10,
            examList:[],//考试列表所有数据
            dataList:[],//考试列表展示信息
            inputinfor:''//输入框信息
        }
    },
    created(){
        this.getExamListData();//考试
    },
    methods:{
        sizeChange(ev){
            console.log(ev)
        },
        currentChange(ev){
            console.log(ev);
            this.dataList = this.examList.slice((ev-1)*this.pageSize,(ev-1)*this.pageSize+this.pageSize);
        },
        jumpExam(ev){
            console.log(ev)
            this.$router.push({
                // 授权后 跳转到封面
                path:'/index/'+ ev.id
            });
        },
        getExamListData(){
            getExamList().then(res => {
                console.log(res);
                this.examList = res.data.list;
                this.dataList = res.data.list.slice(0,this.pageSize);
            })
        },
        clicksearch(){
            // alert(this.inputinfor)
            getLikeExamNameList({
                // pageNum:this.pageNum,
                // searchName:this.searchName
                pageNum:2,
                // searchName:20
                searchName:this.inputinfor
            }).then(res => {
                console.log(res)
                this.dataList = res.data.list;  //  重新复制更新考试信息列表！
           })
        },
        
    },
    components:{
        Header2,
    },
}
</script>
<style lang="less" scope>
body {
    margin: 0;
    padding: 0;
    background: #EBF0F5;
    .testlist{
        .search {
            width: 640px;
            margin: 0 auto;
            height:40px;
            box-sizing: border-box;
            border:1px solid rgba(215,220,224,1);
            border-radius:8px;
            display: flex;
            align-items: center;
            padding-left: 24px;
            margin-top: 24px;
            img {
                width: 17px;
                height: 16px;
            }
            input {
                flex: 1;
                height: 100%;
                border: none;
                outline: none;
                background: none;
            }
            span {
                display: inline-block;
                color: #818D99;
                line-height: 40px;
                font-size:14px;
                border-left: 1px solid #D7DCE0;
                box-sizing: border-box;
                height: 100%;
                padding:0 25px 0 26px;
                cursor: pointer;
            }
        }
        margin:0 auto;
        .main{
            display: flex;
            justify-content: center;
            .content{
                width:640px;
                background:rgba(255,255,255,1);
                border-radius:8px;
                box-sizing: border-box;
                padding-left:24px;
                padding-right: 24px;
                box-sizing: border-box !important;
                min-height: 385px;
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    list-style:none;
                    line-height: 48px;
                    border-bottom: 1px  solid  #EBF0F5;
                    .left,.right {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .score{
                        font-size:16px;
                        font-weight:bold;
                        width: 10%;
                        color:rgba(255,170,0,1);
                    }
                    .kind{
                        width: 65%;
                        font-size:16px;
                        font-weight:400;
                        color:rgba(29,32,35,1);
                    }
                    .grade{
                        width: 25%;
                        // margin-left:322px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(129,141,153,1);
                    }
                    .enter{
                        width:7px;
                        height:16px;
                        // margin-left: 38px;
                        background: url("../../assets/images/icon_enter@2x.png") no-repeat center center;
                        background-size: cover;
                    }
                }
                li:last-child{
                    border-bottom: none
                }
            }       
        }
        .page{
            text-align: center;
        }
        p{
            text-align:center;
            font-size:12px;
            font-weight:400;
            color:rgba(196,200,204,1);   
            margin-bottom: 40px;  
            margin-top: 100px;  
            // background: red;     
        
        }      
    }   
}

</style>
