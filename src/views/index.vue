<style scoped lang="less">
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;

    h1 {
        height: 150px;

    img {
        height: 100%;
    }

    }
    h2 {
        color: #666;
        margin-bottom: 200px;

    p {
        margin: 0 0 50px;
    }

    }
    .ivu-row-flex {
        height: 100%;
    }

    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h1>
                <img src="../images/logo.png">
            </h1>
            <h2>
                <p>Welcome to your iView app!</p>
                <Button type="ghost" @click="handleStart">Start iView</Button>
            </h2>
            <Button>Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <br><br>
            <Button type="info">Info</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="error">Error</Button>
            <br><br>
            <Button type="primary" shape="circle" icon="ios-search"></Button>
            <Button type="primary" icon="ios-search">Search</Button>
            <Button type="primary" shape="circle" icon="ios-search">Search</Button>
            <Button type="primary" shape="circle">Circle</Button>
            <br><br>
            <Button shape="circle" icon="ios-search"></Button>
            <Button icon="ios-search">Search</Button>
            <Button shape="circle" icon="ios-search">Search</Button>
            <Button shape="circle" @click="getData">Circle</Button>
            <p>
                <!-- 使用 router-link 组件来导航. -->
                <!-- 通过传入 `to` 属性指定链接. -->
                <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                <router-link to="/list">Go to List</router-link>
            </p>
            <p>
                <!-- 使用 router-link 组件来导航. -->
                <!-- 通过传入 `to` 属性指定链接. -->
                <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                <router-link to="/tablelist">Go to TableList</router-link>
            </p>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Util from '../libs/util.js'
    export default {
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            },
            getData(){

                var that = this;
                this.$ajax.get('/api/api/layout').then(function (res) {
                    that.$Spin.hide()
                    console.log(res.data);
                }).catch(function (res) {
                    that.$Spin.hide()
                    console.log(res)
                });
            }
        }
    }
</script>
