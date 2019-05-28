<template>
    <div class="scan">
        <Header2></Header2>
        <div class="main"  @click="click">
            <div class="content">
            </div>
        </div>
        <img :src="imgData" alt="">
         <p class="text">
            授权成功
        </p>
        <p class="footer">
            技术支持：四川元高分网络科技有限公司
        </p>
        <!-- <Footer2></Footer2> -->
      

    </div>
</template>
<script>
import  Header2 from  '@/components/Header2/Header2.vue'
import { getQR } from '@/apis/apis.js'
export default {
    data(){
        return{
            imgData:''
        }
    },
  components:{
    Header2,
  },
  created(){
      getQR().then((res)=>{
          console.log(res)
          this.imgData = res;
      })
  },
  methods:{
            click:function(){
            // this.$router.push({path:'/testlist'})
        },
    }
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
            align-items: center;
            justify-content: center;
            margin: 250px 590px  30px  590px;
            .content{
                 width:104px;
                height:104px;
                background: url("../../assets/images/iconsucces.png") no-repeat center center;
                border-radius:8px;
                background-size:cover
            }       
        }
        .text{
            text-align: center;
            font-weight:400;
            color:rgba(29,32,35,1);
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
