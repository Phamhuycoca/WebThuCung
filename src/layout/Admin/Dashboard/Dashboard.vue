<template>
    <div style="max-height: 100vh;">
        <v-container>
            <v-row>
                <v-col cols="3" style="height: 100%;">
                    <v-row>
                        <v-col>
                            <DonHangView />
                        </v-col>
                        <v-col>
                            <TongThuNuoi />
                        </v-col>
                        <v-col>
                            <TongNguoiDung />
                        </v-col>
                        <v-col>
                            <TongSanPham />
                        </v-col>

                    </v-row>
                </v-col>
                <v-col cols="9" style="height: 100%;">
                    <v-row>
                        <v-col cols="5">
                            <v-card elevation="8" bg-color="white">
                                <v-card-title class="text-center">Thông tin đơn hàng</v-card-title>
                                <v-card-text>
                                    <BieuDo />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="7">
                            <v-card elevation="8" bg-color="white">
                                <v-card-title class="text-center">Doanh thu theo tuần</v-card-title>
                                <v-card-text>
                                    <DoanhThu />
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="height: 100%;">
                    <DonHang/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import DonHangView from '@/layout/Admin/Dashboard/TongDonHangView.vue'
import DonHang from '@/layout/Admin/Dashboard/DonHang.vue'
import BieuDo from '@/layout/Admin/Dashboard/BieuDo.vue'
import DoanhThu from '@/layout/Admin/Dashboard/DoanhThu.vue'
import TongThuNuoi from './TongThuNuoi.vue'
import TongNguoiDung from '@/layout/Admin/Dashboard/TongNguoiDung.vue'
import TongSanPham from '@/layout/Admin/Dashboard/TongSanPham.vue'
export default {
    name: 'DashboardView',
    components: {
        DonHangView,
        DonHang,
        BieuDo,
        DoanhThu,
        TongThuNuoi,
        TongNguoiDung,
        TongSanPham

    }
}
</script>

<style scoped>
.v-card {
    background-color: #f5f5f5;
    border-radius: 4px;
}
</style>