<template>
    <div class="scan">
        
        <Header2></Header2>
        <div class="main">
        <!-- 考试列表 -->
            <ul class="content">
                <li><span class="score">119</span><span class="kind">语文随堂小测试</span><span class="grade">初2019级23班</span><span class="enter"></span></li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </div>
        <!-- <div class="page">
            <el-pagination
                layout="prev, pager, next"
                :total="100"
                background="false">
            </el-pagination>
        </div> -->
        <p>
            技术支持：四川元高分网络科技有限公司
        </p>
    </div>
    
</template>
<script>
import  Header2 from  '@/components/Header2/Header2.vue'
export default {
  components:{
    Header2,
  },    
}
</script>
<style lang="less" scoped>
body {
    margin: 0;
    padding: 0;
    background: #EBF0F5;
    .scan{
        margin:0 auto;
       
        .main{
            display: flex;
            justify-content: center;
            flex-direction: column;
            .search{ 
                // width:640px;
                width:53%;
                height:40px;
                border-radius:8px;
                background: red;
                margin:24px auto 16px auto;;
            }
            .content{ 
                width:53%;
                box-sizing:border-box;
                background:rgba(255,255,255,1);
                border-radius:8px;
                margin:136px auto; 
                padding-left:24px;
                padding-right: 24px;
                box-sizing: border-box !important;
                li{
                    display: flex;
                    align-items: center;
                    list-style:none;
                    line-height: 48px;
                    border-bottom: 1px  solid  #EBF0F5;
                    .score{
                        font-size:16px;
                        font-weight:bold;
                        width: 10%;
                        // margin-right: 40px;
                        color:rgba(255,170,0,1);
                    }
                    .kind{
                        width: 60%;
                        font-size:16px;
                        font-weight:400;
                        color:rgba(29,32,35,1);
                    }
                    .grade{
                        width: 30%;
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
        p{
            margin-bottom: 38px;
            // background: red;
            margin-top: 100px;
            text-align:center;
            font-size:12px;
            font-weight:400;
            color:rgba(196,200,204,1);
        }        
    }   
}

</style>
