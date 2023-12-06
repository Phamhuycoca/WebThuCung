<template>
    <div>
        <div v-if="datas.length > 0">
            <v-table height="700px">
                <thead>
                    <tr>
                        <th class="text-center">
                            <v-checkbox color="primary" v-model="duyettatca" @change="selectAll"
                                label="tất cả"></v-checkbox>
                        </th>
                        <th class="text-center">
                            STT
                        </th>
                        <th class="text-center">
                            Người đặt
                        </th>
                        <th class="text-center">
                            Địa chỉ nhận hàng
                        </th>
                        <th class="text-center">
                            Số điện thoại
                        </th>
                        <th class="text-center">
                            Ngày đặt
                        </th>
                        <th class="text-center">
                            Tổng tiền
                        </th>
                        <th class="text-center">
                            Tùy chọn
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in displayed" :key="index">
                        <td class="text-center">
                            <v-checkbox color="primary" v-model="item.trangThai"></v-checkbox>
                        </td>
                        <td class="text-center">{{ index+=1 }}</td>
                        <td class="text-center">{{ item.nguoiDung }}</td>
                        <td class="text-center">{{ item.hoaDonDiaChi }}</td>
                        <td class="text-center">{{ item.hoaDonSdt }}</td>
                        <td class="text-center">{{ item.ngayTao }}</td>
                        <td class="text-center">{{ item.tongTien }} VNĐ</td>
                        <td class="text-center">
                            <span class="underline-text">Xem chi tiết</span>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :length="totalPages"
                v-model="currentPage"></v-pagination>

        </div>
        <div v-else>
            <v-card-title class="text-center" style="height: 400px;">
                Danh sách trống...
            </v-card-title>
        </div>
        <Loading v-model="dialogloading" />
        <Toast class="mt-10" style="z-index: 2000;" v-model="showAlert.show" :content="showAlert.content"
            :color="showAlert.color" :icon="showAlert.icon" />
    </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
import hoadonApi from '../../../service/hoadonApi';
import Toast from '@/components/Toast.vue';
export default {
    name: 'DonDangDaDuyet',
    data() {
        return {
            datas: [],
            duyettatca: false,
            dialogloading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            currentPage: 1,
            itemsPerPage: 10,
        }
    },
    components: {
        Toast,
        Loading
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
    watch: {
        duyettatca: function (newValue) {
            this.datas.forEach(item => {
                item.trangThai = newValue;
            });
        },
        showAlert: {
            deep: true,
            handler(newVal) {
                if (!newVal.show) return;
                setTimeout(() => (this.showAlert.show = false), 2000);
            }
        }
    },
    methods: {
        async getDonHangDangGiao() {
            this.dialogloading = true;
            try {
                const res = await hoadonApi.getDonHangDangGiao();
                this.datas = res.data;
                console.log(this.datas);
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;

            }
        },
        selectAll() {
            this.datas.forEach(item => {
                item.trangThai = this.duyettatca;
            });
        },
        async DuyetDon() {
            this.dialogloading = true;
            try {
                const selectedItems = this.datas.filter(item => item.trangThai === true);
                selectedItems.forEach(item => {
                    item.trangThai = 2;
                });
                if (selectedItems.length > 0) {
                    const res = await hoadonApi.duyetDonHang(selectedItems);
                    console.log(selectedItems);
                    this.duyettatca = false;
                    this.AlertSuccess(res.data);
                    this.dialogloading = false;
                    this.getHoaDonDaDuyet();
                } else {
                    this.AlertError('Vui lòng chọn thông tin');
                    this.dialogloading = false;
                }
            } catch (error) {
                console.log(error);
                this.dialogloading = false;
                this.AlertError('Lỗi không thể thao tác');
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
        this.getDonHangDangGiao();
    }
}
</script>
<style scoped>
.v-checkbox {
    margin-bottom: 10px;
    height: 40px;
    width: 90px;
}

.underline-text {
    cursor: pointer;
}

.underline-text:hover {
    text-decoration: underline;
    color: red;
}
</style>