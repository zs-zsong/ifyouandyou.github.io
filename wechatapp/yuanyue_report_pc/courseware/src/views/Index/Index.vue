<template>
    <div class="index">
        <div class="left_text">
            <div class="text">
                <h4>{{examInfo.examName}}</h4>
                <div class="title">
                    <h3>{{examInfo.examSubject}}&emsp;评卷课件</h3>
                    <div class="back"></div>
                </div>
                <h5>{{examInfo.className}}级{{examInfo.examTime}} &emsp;</h5>
            </div>
        </div>
        <a @click="click" class="right_btn"></a>
    </div>
</template>
<script>
    import {
        getExamInfo
    } from '../../apis/apis'

    export default {
        data() {
            return {
                exmaId: '',
                examInfo: {
                    className: "",
                    examName: "",
                    examSubject: "",
                    examTime: ""
                }
            }
        },
        props: {
            type: {
                default: 1
            },
            isShow: {
                default: true
            }
        },
        created() {
            // 获取封面信息
            this.exmaId = this.$route.params.id;
            console.log(this.$route.params);
            this.getInfomation();
        },
        methods: {
            getInfomation() {
                getExamInfo({
                    id: this.exmaId
                }).then(res => {
                    console.log(res)
                    this.examInfo = res.data;
                })
            },
            click: function () {
                // alert('111');
                this.$router.push({
                    path: '/choose/' + this.exmaId//进入到选择题页面
                })
            }

        }
    }
</script>
<style lang="less">
    // @import '../../assets/css/index.css'
    body {
        margin: 0;
        padding: 0;
        /* 加载背景图 */
        background: url("../../assets/images/background@2x.png") no-repeat;
        /* 背景图垂直、水平均居中 */
        background-position: center center;
        /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
        background-attachment: fixed;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        /* 设置背景颜色，背景图加载过程中会显示背景色 */
        height: 100%;
        .index {
            height: 100%;
            width: 100%;
            color: #fff;
            position: fixed;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left_text {
                height: 100%;
                // height: 80%;
                width: 80%;
                background: url("../../assets/images/border@2x.png") no-repeat left center;
                display: flex;
                align-items: center;
                .title {
                    position: relative;
                }
                h3 {
                    font-size: 64px;
                    font-weight: bold;
                    margin: 50px 0 150px 120px;
                    position: relative;
                    z-index: 2;
                }
                h4 {
                    font-size: 40px;
                    margin-left: 100px;
                }
                h5 {
                    font-size: 24px;
                    margin-left: 100px;
                }
            }
            .back {
                width: 180px;
                height: 96px;
                background: #FFA310;
                /* opacity:0.24; */
                border-radius: 0px 48px 48px 0px;
                position: absolute;
                top: -4px;
                left: 100px;
                z-index: 1;
            }
            .right_btn {
                margin-right: 40px;
                width: 171px;
                height: 171px;
                background: url("../../assets/images/page@2x.png") no-repeat;
                background: url("../../assets/images/page@2x.png") no-repeat;
            }
        }
    }

</style>
  






