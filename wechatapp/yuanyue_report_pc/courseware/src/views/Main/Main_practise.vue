<template>
<div class="practise">
     <Header></Header>
    <div class="layer-wrapper" v-show="layer">
         <div class="content">
            <div class="top">
                <div class="top_left">
                    <span class="active">练习1</span>
                    <span>练习2</span>
                    <span>练习3</span>
                </div>
                <div class="top_right">
                    <span @click="clickclose">X</span>
                </div>

            </div>
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <span>题目来源:</span><span>湖南</span>
                    </template>
                    <div class="">
                        <slot>
                            <div class=""> ewdscca  </div>  
                        </slot>
                        图片
                    </div>
                   
                </el-collapse-item>
                
                
                 <el-collapse-item>
                    <template slot="title">
                        答案解析
                    </template>
                    <div class="">
                        图片
                    </div>
                </el-collapse-item>
            </el-collapse>
         </div>
         <!-- 蒙版效果 -->
         <div class="layer"></div>
    </div>
</div>
    
</template>
<script>
// 引入头部组件
import  Header from  '@/components/header/Header.vue'
export default {
    data () {
        return {
            layer:true
        }
    },
    components:{
        Header,
    },
    methods: {
        clickclose(){
            this.layer=false;
        }
    }
}
</script>

<style lang="less">
body {
    margin: 0;
    padding: 0;
    background: #EBF0F5;
    .practise{
        width: 100%;
        height: 100%;
        .layer-wrapper {
            height: 100%;
            width: 100%; 
            z-index: 13;
            position: fixed;
            left:0;
            top:0;
            .content{
                width:1200px;
                height: 768px;
                background: #fff;
                position:absolute;
                top:16px;
                left:50%;
                z-index:15;
                transform:translateX(-600px);
               
                .top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .top_left{
                    display: flex;
                        span{
                            width:120px;
                            height:48px;
                            line-height: 48px;
                            text-align: center;
                            background:rgba(215,220,224,1);
                        }
                        .active{
                            background:#FFFFFF
                        }
                    }
                    .top_right{
                        span{
                            padding: 16px;
                            width:16px;
                            height:17px;
                            color: #C4C8CC;
                            cursor: pointer;

                        }
                    }
                }
               
            }
            .layer{
                width: 100%;
                height: 100%;
                background: #000;
                 top:0px;
                left:0px;
                z-index:14;
                opacity:0.6;
            }
        }

    }
   
}
</style>

