<template>
    <div>
        <v-row class="mt-3">
            <v-icon>mdi-home</v-icon>
            <h3 class="ml-2">Danh sách sản phẩm</h3>
            <v-spacer></v-spacer>
            <v-btn icon color="green" @click="dialog = true, currentData = ''">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-row>
        <div v-if="datas.length > 0">
            <v-row class="mt-8">
                <v-col>
                    <v-card>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Hình ảnh</th>
                                    <th class="text-center">Sản phẩm</th>
                                    <th class="text-center">Giá bán</th>
                                    <th class="text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in displayed " :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">
                                        <img :src="item.sanPhamHinhAnh" style="width:120px;height:80px;" />
                                    </td>
                                    <td class="text-center">{{ item.sanPhamTen }}</td>
                                    <td class="text-center">{{ item.sanPhamGia }}</td>
                                    <td class="text-center">
                                        <v-btn icon color="green" size="small" @click="dialog = true,
                                            currentData = item">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon color="red" size="small" @click="Confirm(item.sanPhamId)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" class="pa-8" :length="totalPages"
                            v-model="currentPage"></v-pagination>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row class="mt-8">
                <h1>Loading...</h1>
            </v-row>
        </div>
        <Action :dialog="dialog" @close="dialog = false" @updateData="getAll" :currentData="currentData" />
        <Confirm ref="dialog" :obj="objId" @deleteData="deleteData" />
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
        <Loading v-model="dialogloading" />
    </div>
</template>
  

<script>
import Action from '@/layout/Admin/Sanpham/Action.vue'
import Confirm from '@/components/Confirm.vue'
import Toast from '@/components/Toast.vue'
import Loading from '@/components/Loading.vue'
import sanphamApi from '@/service/sanphamApi'

export default {
    name: 'DanhMuc',
    data() {
        return {
            datas: [],
            dialog: false,
            currentData: '',
            objId: '',
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            dialogloading: false,
            currentPage: 1,
            itemsPerPage: 5,
        }
    },
    components: {
        Action,
        Confirm,
        Toast,
        Loading
    },
    watch: {
        showAlert: {
            deep: true,
            handler(newVal) {
                if (!newVal.show) return;
                setTimeout(() => (this.showAlert.show = false), 2000);
            }
        }
    },
    computed: {
        displayed() {
            if (this.datas && this.datas.length > 0) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.datas.slice(startIndex, endIndex);
            } else {
                return [];
            }
        },
        totalPages() {
            return Math.ceil(this.datas.length / this.itemsPerPage);
        }
    },
    methods: {
        async getAll() {
            try {
                this.dialogloading = true;
                const res = await sanphamApi.getAll();
                this.datas = res.data;
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;
            }
        },
        Confirm(id) {
            this.objId = id,
                this.$refs.dialog.openDialog();
        },
        async deleteData(id) {
            try {
                this.dialogloading = true;
                const res = await sanphamApi.deleteData(id);
                console.log(res.data);
                this.dialogloading = false;
                this.getAll();
                this.AlertSuccess('Xóa thành công');
            } catch (error) {
                console.log(error);
                this.dialogloading = false;
                this.AlertError('Thao tác không thể thực hiện');
            }
        },
        AlertSuccess(content) {
            this.showAlert.show = true;
            this.showAlert.icon = "$success";
            this.showAlert.content = content;
            this.showAlert.color = "success";
        },
        AlertError(content) {
            this.showAlert.show = true;
            this.showAlert.content = content;
            this.showAlert.icon = "$error";
            this.showAlert.color = "error";
        }
    },
    created() {
        this.getAll();
    }
}
</script>

<style></style>