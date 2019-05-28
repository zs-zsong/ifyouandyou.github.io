<template>
    <div class="notest">
        <Header2></Header2>
        <div class="main">
            <div class="content">
            </div>
        </div>
         <p class="text">
            尚无可用课件，请在手机端完成考试
        </p>
        <p class="footer">
            技术支持：四川元高分网络科技有限公司
        </p>
        <!-- <Footer2></Footer2> -->
      

    </div>
</template>
<script>
import  Header2 from  '@/components/Header2/Header2.vue'
export default {
  components:{
    Header2,
  }
}
</script>
<style lang="less" scoped>
body {
    margin: 0;
    padding: 0;
    background: #EBF0F5;
    .notest{
        margin:0 auto;
        .main{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 250px 590px  30px  590px;
            .content{
                width:640px;
                height:200px;
                background: url("../../assets/images/icon@2x.png") no-repeat center center;
                border-radius:8px;
            }       
        }
        .text{
            text-align:center;
            font-size:12px;
            font-weight:400;
            margin-bottom: 270px;
        }
        .footer{
             text-align:center;
            font-size:12px;
            font-weight:400;
            color:rgba(196,200,204,1);   
            margin-bottom: 40px;         
        
        }
    }


    
}

</style>
