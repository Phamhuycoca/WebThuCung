<template>
    <v-card elevation="8" bg-color="white" height="900" class="mt-4">
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
            <v-tab :value="1">Danh sách đơn hàng</v-tab>
            <v-tab :value="2">Đơn hàng đã duyệt</v-tab>
            <v-tab :value="3">Đơn hàng đang giao</v-tab>
            <v-tab :value="4">Đơn hàng đã giao</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item :value="1">
                <v-container fluid>
                    <DonHangChuaDuyet />
                </v-container>
            </v-window-item>
            <v-window-item :value="2">
                <v-container fluid>
                    <Donhangdaduyet/>
                </v-container>
            </v-window-item>
            <v-window-item :value="3">
                <v-container fluid>
                    <Donhangdangiao/>
                </v-container>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import DonHangChuaDuyet from '@/layout/Admin/DonHang/DonHangChuaDuyet.vue'
import Donhangdaduyet from '@/layout/Admin/DonHang/DonHangDaDuyet.vue'
import Donhangdangiao from '@/layout/Admin/DonHang/DonHangDangGiao.vue'
export default {
    name: 'DonHang',
    data() {
        return {
            tab: null,
        }
    },
    components:{
        DonHangChuaDuyet,Donhangdaduyet,Donhangdangiao
    }
}
</script>

<style></style>