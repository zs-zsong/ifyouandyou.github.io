<template>
    <div class="top">
        <div class="title">
        </div>
        <div class="user_infor"  v-if="userInfo">
            <div class="user">
            </div>
            <div>{{userInfo&&userInfo.userName}}</div>
            <div class="triangle">
            </div>
        </div>
    </div>
</template>
<script>
    import {getInfo} from '@/apis/apis.js'

    export default {
        data() {
            return {
                userInfo: {
                    userName: "",
                },
            }
        },
        created() {
            getInfo().then((res) => {
                console.log(res);
                this.userInfo = res.data;
                //   console.log(this.userName)
            })
        },
        methods: {
            click: function () {
            },
        }
    }
</script>
<style lang="less" scoped>
    .top {
        width: 100%;
        height: 72px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            margin-left: 56px;
            width: 136px;
            height: 48px;
            background: url("../../assets/images/logo@2x.png") no-repeat center center;
            background-size: cover;
        }
        .user_infor {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 56px;
            .user {
                width: 25px;
                height: 25px;
                background: url("../../assets/images/icon_user@2x.png") no-repeat center center;
                background-size: cover;
                margin-right: 7px;
            }
            .triangle {
                width: 18px;
                height: 8px;
                background: url("../../assets/images/triangle@2x.png") no-repeat center center;
                background-size: cover;
                margin-left: 7px;
            }
        }
    }
</style>
