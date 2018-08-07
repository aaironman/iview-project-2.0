<template>
    <div id="app">
        <v-table
                :width="1000"
                :columns="columns"
                :table-data="data1"
                :show-vertical-border="false"
                @on-custom-comp="customCompFunc"
                :is-loading="isLoading"
                :row-click="rowClick"
        ></v-table>
        <v-pagination :total="totalNum" :pageIndex="pageNum"></v-pagination>
    </div>
</template>

<script>
    import Vue from 'vue'
    // // 引入样式
    import 'vue-easytable/libs/themes-base/index.css'
    // 导入 table 和 分页组件
    import {VTable, VPagination} from 'vue-easytable'
    import Util from '../libs/util'

    // 注册到全局
    Vue.component(VTable.name, VTable)
    Vue.component(VPagination.name, VPagination)


    export default {
        name: "",
        data() {
            return {
                data1: [],
                isLoading:true,
                imgUrl: '',
                totalNum: 0,
                pageNum: 1,
                search: {},
                columns: [
                    {
                        title: 'id',
                        field: 'userId',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        title: '姓名',
                        field: 'realName',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center'

                    },
                    {
                        title: '城市',
                        field: 'city',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        title: '操作',
                        field: 'avatarUrl',
                        componentName: 'table-operation'
                    }]
            }
        },
        methods:{
            customCompFunc(params){
                console.log('url:' + params.avatarUrl)

            },
            request(){
                this.isLoading = true;
                var url = Util.baseUrl + '/api/girl';
                var params = {
                    page: 1,
                    rows: 10
                }
                var that = this;
                this.$ajax.get(url, {params: params}).then(function (res) {
                    that.isLoading = false
                    console.log(res.data);
                    that.data1 = res.data.data.girls;
                    that.totalNum = res.data.data.total_page;
                    console.log(that.data1)
                }).catch(function (res) {
                    that.isLoading = false
                    console.log(res)
                });
            },
            rowClick(rowIndex, rowData, column){
                console.log('rowIndex:' + rowIndex+"--rowData:" + JSON.stringify(rowData) + "--column:" + JSON.stringify(column));
            }
        },
        created() {
           this.request();
        }
    }

    // 自定义列组件
    Vue.component('table-operation', {
        template: `<div>
             <Button type="primary" shape="circle" icon="ios-search" @click="showPic"></Button>
        </div>`,
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            }
        },
        methods: {
            showPic() {

                // 参数根据业务场景随意构造
                let params = this.rowData;
                this.$emit('on-custom-comp', params);
            }

        }
    })
</script>

<style scoped>

</style>