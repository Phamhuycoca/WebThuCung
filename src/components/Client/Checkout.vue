<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="800">
            <v-card elevation="2">
                <v-card-title style="background-color: #24b429;color: #fff;" class="text-center pa-4">
                    Thông tin thanh toán
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="submitOrder">
                        <v-text-field prepend-icon="mdi-card-account-details-outline" label="Họ và tên" v-model="this.user.hoVaTen"></v-text-field>
                        <v-text-field prepend-icon="mdi-map-marker" label="Đia chỉ" v-model="formData.hoaDonDiaChi"></v-text-field>
                        <v-text-field prepend-icon="mdi-phone-in-talk" label="Số điện thoại" v-model="formData.hoaDonSdt"></v-text-field>
                        <v-text-field prepend-icon="mdi-cash" label="Tổng tiền" v-model="formData.tongTien" readonly></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="submitOrder">Hoàn thành đơn hàng</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="dialog = false">Hủy</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading v-model="dialogloading" />
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </v-row>
</template>

<script>
import { mapState } from 'vuex';
import nguoidungApi from '../../service/nguoidungApi';
import hoadonApi from '@/service/hoadonApi';
import Toast from '../Toast.vue';
import Loading from '../Loading.vue';
export default {
    name: 'CheckoutView',
    props: ['totalCart'],
    data() {
        return {
            dialog: false,
            formData: {
                //hoaDonId: '',
                nguoiDungId: 0,
                tongTien: 0,
                hoaDonDiaChi: '',
                hoaDonSdt: '',
                ngayTao: 'abc',
                trangThai: 0
            },
            user: [],
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            dialogloading: false,

        };
    },
    components: {
        Toast,
        Loading
    },
    computed: {
        ...mapState(['nguoidungId'])
    },
    watch: {
        totalCart: function () {
            this.formData.tongTien = this.totalCart;
            this.getUser();
        },
        user: function () {
            this.formData.nguoiDungId = this.user.nguoiDungId,
                this.formData.hoaDonDiaChi = this.user.diaChi,
                this.formData.hoaDonSdt = this.user.sdt
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
        async getUser() {
            try {
                const res = await nguoidungApi.getById(this.nguoidungId);
                this.user = res.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        openDialog() {
            this.dialog = true;
        },
        async submitOrder() {
            this.dialogloading = true;
            try {
                const res = await hoadonApi.checkOut(this.formData);
                this.AlertSuccess(res.data);
                this.dialogloading = false;
            } catch (error) {
                this.AlertError(error.response.data);
                this.dialogloading = false;
            }
            this.dialog = false;
            this.$emit('close');
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
    },
}
</script>

<style></style>