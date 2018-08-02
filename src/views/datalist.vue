<style scoped>
    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#000', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <!--<Table :columns="columns1" :data="data1"></Table>-->
                    <filter-table
                            :columns="columns1"
                            :data="data1"
                            :search="search"
                            @load="loadData"
                    >

                    </filter-table>
                    <Page :total="totalNum" :current="pageNum" show-total @on-change="getData"/>
                    <Modal v-model="showModel"
                           footer-hide
                    >
                        <img v-bind:src="imgUrl" width="100%" height="100%">
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Util from '../libs/util'
    import FilterTable from '../components/FilterTable'


    const city = [{
        value: '北京市',
            name: '北京市'
    },
    {
        value: '上海市',
            name: '上海市'
    },
    {
        value: '武汉市',
            name: '武汉市'
    },
    {
        value: '杭州市',
            name: '杭州市'
    },
    {
        value: '广州市',
            name: '广州市'
    },
    {
        value: '天津市',
            name: '天津市'
    },
    {
        value: '南京市',
            name: '南京市'
    },
    {
        value: '深圳市',
            name: '深圳市'
    },
    {
        value: '扬州市',
            name: '扬州市'
    },
    {
        value: '成都市',
            name: '成都市'
    },
    {
        value: '长沙市',
            name: '长沙市'
    },
    {
        value: '',
            name: '全部'
    }]

    export default {
        components: {FilterTable},

        data() {
            return {
                isCollapsed: false,
                showModel: false,
                imgUrl: '',
                totalNum: 0,
                pageNum:1,
                search:{},
                columns1: [
                    {
                        title: 'id',
                        key: 'userId'
                    },
                    {
                        title: '姓名',
                        key: 'realName',
                        filter:{
                            type: 'Input'
                        }
                    },
                    {
                        title: '城市',
                        key: 'city',
                        filter:{
                            type: 'Select',
                            option:city
                        }
                    },
                    {
                        title: '头像',
                        key: 'avatarUrl'
                    },
                    {
                        title: '操作',
                        key: 'avatarUrl',
                        render: (h, params) => {
                            var that = this
                            return h('div', [h('Button', {
                                props: {
                                    type: 'primary',
                                    shape: 'circle',
                                    icon: 'ios-search',
                                },
                                on: {
                                    click: function () {
                                        that.showModel = true
                                        that.imgUrl =Util.baseUrl + '/static/' + that.data1[params.index].avatarUrl
                                        console.log('value:' + that.data1[params.index].avatarUrl)
                                    }
                                }
                            }, '查看')]);
                        }
                    }
                ],
                data1: []
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            getData: function (pagenum) {
                console.log('pagenum:' + pagenum);
                var url = Util.baseUrl + '/api/girl';
                this.pageNum = pagenum
                // var params = {
                //     page: this.pageNum,
                //     rows: 10
                // }
                this.search.page = this.pageNum
                this.search.rows = 10
                var that = this;
                this.$ajax.get(url, {params: this.search}).then(function (res) {
                    console.log(res.data);
                    that.data1 = res.data.data.girls;
                    that.totalNum = res.data.data.total_page;
                    console.log(that.data1)
                }).catch(function (res) {
                    console.log(res)
                })
            },
            loadData() {
                var url = Util.baseUrl + '/api/girl';
                this.pageNum = 1
                this.search.page = this.pageNum
                console.log('loadData:'+ JSON.stringify(this.search))
                var that = this;
                this.$ajax.get(url, {params: this.search}).then(function (res) {
                    console.log(res.data);
                    that.data1 = res.data.data.girls;
                    that.totalNum = res.data.data.total_page;
                    console.log(that.data1)
                }).catch(function (res) {
                    console.log(res)
                })
            }
        },
        created() {
            var url = Util.baseUrl + '/api/girl';
            var params = {
                page: 1,
                rows: 10
            }
            var that = this;
            this.$ajax.get(url, {params: params}).then(function (res) {
                console.log(res.data);
                that.data1 = res.data.data.girls;
                that.totalNum = res.data.data.total_page;
                console.log(that.data1)
            }).catch(function (res) {
                console.log(res)
            })
        }
    }
</script>
