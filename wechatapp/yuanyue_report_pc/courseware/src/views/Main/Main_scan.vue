<template>
    <div class="scan">
        <Header2></Header2>
        <div class="main">
            <div class="content">
                 <img src="../../assets/images/icon@2x.png" v-if="!imgData"  style="height:106px;width:104px;" alt="">
                 <img   v-else :src="imgData" alt="">
            </div>
              <p class="text">
            请用微信扫码授权
        </p>
        <p class="footer">
            技术支持：四川元高分网络科技有限公司
        </p>
        </div>
         
       
    </div>
</template>
<script>
import axios from 'axios';
import  Header2 from  '@/components/Header2/Header2.vue'
import { getQR,getInfo,getStatus} from '../../apis/apis'
import { clearInterval, setInterval } from 'timers';
let timer;
export default {
    data(){
        return {
            imgData:'',
        }
    },
    created(){
        this.getImg();
        this.checkStatus();
        setTimeout(()=>{
            this.getUserInfo();            
        },3000)
    },
    methods:{
        getUserInfo(){
            getInfo().then(res=>{
                console.log(res)
                sessionStorage.setItem("userInfo",res.data);
            })
        },
        checkStatus(){
            timer&&clearInterval(timer);
            timer = setInterval(()=>{
                getStatus().then(res => {
                    console.log(res)
                    if(res.code==10000) { //授权成功
                        clearInterval(timer);
                        sessionStorage.setItem("login",true);
                        if(res.data){//扫描进来有数据
                            this.$router.push({path:'/index/'+res.data});
                        }else{
                            this.$router.push({path:'/testlistsearch/'});
                        }
                    }
                })
            },2500)
        },
        getImg(){
            // 授权成功后的二维码的保存
            getQR().then((res)=>{
                console.log(res)
                var reader = new FileReader();//新建一个FileReader
                reader.readAsDataURL(res);//读取文件,保存为base64 格式
                reader.onload =  (ev) => { //读取完文件之后会回来这里
                    this.imgData = ev.target.result
                }
            });
            timer&&clearInterval(timer);
            timer= setInterval(()=>{
                getQR().then((res)=>{
                    console.log(res)
                    var reader = new FileReader();//新建一个FileReader
                    reader.readAsDataURL(res);//读取文件,保存为base64 格式
                    reader.onload =  (ev) => { //读取完文件之后会回来这里
                        this.imgData = ev.target.result
                    }
                });
            },20000)
        },
    },
    components:{
        Header2,
    }
}
</script>
<style lang="less">
body{
    margin: 0;
    padding: 0;
    background: #EBF0F5 !important;
    .scan{
        margin:0 auto;
        .main{
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            height: calc(100vh - 72px);
            padding: 250px 0  30px  0;
            // margin-top: 250px;
            .content{
                display: flex;
                justify-content: center;
                // justify-content: flex-end;
                align-items: flex-end;
                width:640px;
                height:200px;
                border-radius:8px;
            }       
        }
        .text{
            text-align:center;
            font-size:12px;
            font-weight:400;
        }
        .footer{
            text-align:center;
            font-size:12px;
            font-weight:400;
            color:rgba(196,200,204,1);         
        }
    }
}
</style>
