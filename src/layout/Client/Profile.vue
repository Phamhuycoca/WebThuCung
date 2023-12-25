<template>
    <div style="height: 100vh;margin-top: 20px;">
        <v-card>
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
                <v-tab :value="1">Thông tin tài khoản</v-tab>
                <v-tab :value="2">Danh sách đơn đặt hàng</v-tab>
            </v-tabs>
            <v-window v-model="tab" style="height: 90vh;">
                <v-window-item :value="1">
                    <v-container fluid>
                        <v-card elevation="2" class="mx-auto" max-width="800" height="450"
                            style="margin-top: 50px;border: 1px solid #333;">
                            <v-card-title primary-title style="background-color: #24b429;color: #fff;" class="text-center pa-4">
                                <div class="text-center">
                                    <h2 class="headline mb-0">Thông tin tài khoản người dùng</h2>
                                    <h3>{{ user.email }}</h3>
                                </div>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <h4>Ảnh đại diện:</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-avatar class="mx-auto">
                                            <v-img :src="user.nguoiDungHinhAnh" alt="Avatar"></v-img>
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>Tên người dùng:</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>{{ user.hoVaTen }}</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>Địa chỉ:</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>{{ user.diaChi }}</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>Số điện thoại:</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>{{ user.sdt }}</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>Trạng thái tài khoản:</h4>
                                    </v-col>
                                    <v-col cols="6">
                                        <h4>{{ user.quyen }}</h4>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="mt-6">
                                <v-btn color="green" @click="edit">Thay đổi thông tin tài khoản</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn @click="dialogEdit=true,current=user" color="primary">Thay đổi mật khẩu</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-container>
                </v-window-item>
                <v-window-item :value="2">
                    <v-row class="mt-8">
                        <v-col>
                            <v-card class="card-container">
                                <v-expansion-panels v-if="this.datas.length > 0">
                                    <v-expansion-panel v-for="(item, index) in displayed" :key="index">
                                        <v-expansion-panel-header @click="toggleExpansion(index)">
                                            <div class="d-flex align-center justify-space-between ma-6">
                                                <div>
                                                    <div>Địa chỉ giao hàng: {{ item.hoaDonDiaChi }}</div>
                                                    <div>Số điện thoại: {{ item.hoaDonSdt }}</div>
                                                    <div>Ngày đặt: {{ item.ngayTao }}</div>
                                                    <div>Tổng tiền: {{ item.tongTien }} VNĐ</div>
                                                    <div v-if="item.trangThai === 0" style="color: red;" >Trạng thái: Đang chờ duyệt...</div>
                                                    <div v-if="item.trangThai === 1" style="color: green;">Trạng thái: Đã duyệt</div>
                                                    <div v-if="item.trangThai === 2" style="color: orange;">Trạng thái: Đang giao</div>
                                                    <div v-if="item.trangThai === 3" style="color: chocolate;">Trạng thái: Đã nhận</div>
                                                </div>
                                            </div>
                                            <div class="ma-6">
                                                <v-btn v-if="item.trangThai === 0" color="red" @click="HuyDon(item.hoaDonId)">Hủy đơn hàng
                                                </v-btn>
                                                <v-btn v-if="item.trangThai === 2" color="red" @click="DaNhan(item.hoaDonId)">Nhận hàng
                                                </v-btn>
                                                <v-btn color="green" @click.stop="viewDetails(item.hoaDonId)">Xem chi
                                                    tiết
                                                </v-btn>
                                            </div>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content v-if="expandedIndex === index">
                                            <v-card>
                                                <v-card-text v-if="chitiets[item.hoaDonId]">
                                                    <v-table>
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center">STT</th>
                                                                <th class="text-center">Hình ảnh</th>
                                                                <th class="text-center">Sản phẩm</th>
                                                                <th class="text-center">Đơn giá</th>
                                                                <th class="text-center">Số lượng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(detail, key) in chitiets[item.hoaDonId]" :key="key">
                                                                <td class="text-center">{{ key+=1 }}</td>
                                                                <td class="text-center">
                                                                    <img :src="detail.sanPhamHinhAnh"
                                                                        style="width:120px;height:80px;" />
                                                                </td>
                                                                <td class="text-center">{{ detail.sanPhamTen }}</td>
                                                                <td class="text-center">{{ detail.sanPhamGia }}</td>
                                                                <td class="text-center">{{ detail.soLuong }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </v-table>
                                                </v-card-text>
                                                <v-card-text v-else>
                                                    <h1>
                                                    Loading ...
                                                    </h1>
                                                </v-card-text>
                                            </v-card>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                                <v-expansion-panels v-else>
                                    Loading ...
                                </v-expansion-panels>
                                <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" class="pa-8"
                                    :length="totalPages" v-model="currentPage"></v-pagination>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-window-item>

            </v-window>
        </v-card>
        <editprofile ref="dialog" :currentData="currentData" @update="getUser" />
        <Loading v-model="dialogloading" />
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
        <DoiMatKhau :current="current" :dialogEdit="dialogEdit" @close="dialogEdit=false"/>

    </div>
</template>

<script>
import DoiMatKhau from '@/layout/Client/DoiMatKhau.vue'
import nguoidungApi from '@/service/nguoidungApi';
import { mapState } from 'vuex';
import Editprofile from './Editprofile.vue';
import hoadonApi from '../../service/hoadonApi';
import Loading from '@/components/Loading.vue';
import Toast from '@/components/Toast.vue';
export default {
    name: 'ProfileView',
    data() {
        return {
            tab: null,
            user: [],
            dialog: false,
            currentData: '',
            image: null,
            currentPage: 1,
            itemsPerPage: 3,
            datas: [],
            expandedIndex: null,
            chitiets: [],
            dialogloading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            current:'',
            dialogEdit:false,
        };
    },
    computed: {
        ...mapState(['nguoidungId']),
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
    watch:{
        showAlert: {
            deep: true,
            handler(newVal) {
                if (!newVal.show) return;
                setTimeout(() => (this.showAlert.show = false), 2000);
            }
        }
    },
    methods: {
        toggleExpansion(index) {
            if (this.expandedIndex === index) {
                this.expandedIndex = null;
            } else {
                this.expandedIndex = index;
            }
        },
        async viewDetails(index) {
            this.dialogloading = true;
            try {
                const res = await hoadonApi.getChiTietById(index);
                const hoaDonIdDetails = res.data;
                if (!this.chitiets[index]) {
                    this.chitiets[index] = hoaDonIdDetails;
                    console.log(this.chitiets[index]);
                } else {
                    this.chitiets[index] = hoaDonIdDetails;
                }
                this.expandedIndex = this.displayed.findIndex((item) => item.hoaDonId === index);
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;

            }
        },
        async getUser() {
            try {
                const res = await nguoidungApi.getById(this.nguoidungId);
                this.user = res.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async getHoaDonById() {
            this.dialogloading = true;
            try {
                const res = await hoadonApi.getById(this.nguoidungId);
                this.datas = res.data;
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;
            }
        },
        async HuyDon(id){
            this.dialogloading=true;
            try{
                const res=await hoadonApi.huyDon(id);
                this.AlertSuccess(res.data);
                this.dialogloading=false;
                this.getHoaDonById();
            }catch(error){
                this.AlertError(error.response.data);
                this.dialogloading = false;
            }
        },
        async DaNhan(id){
            this.dialogloading=true;
            try{
                const res=await hoadonApi.DaNhan(id);
                this.AlertSuccess(res.data);
                this.dialogloading=false;
                this.getHoaDonById();
            }catch(error){
                this.AlertError(error.response.data);
                this.dialogloading = false;
            }
        },
        edit() {
            this.$refs.dialog.openDialog();
            this.currentData = this.user;
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
        this.getUser();
        this.getHoaDonById();
    },
    components: { Editprofile, Loading, Toast,DoiMatKhau }
}
</script>

<style scoped>
.card-container {
  max-height: 640px; 
  overflow-y: auto;
}
</style>