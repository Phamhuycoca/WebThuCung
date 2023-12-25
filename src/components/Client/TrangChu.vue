<template>
    <div style="height: 160vh;">
        <h1 class="text-center">Trang chủ</h1>
        <v-row>
            <v-col cols="12">
               <TrangChuThuCung/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TrangChuSanPham/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import TrangChuThuCung from '@/layout/Client/TrangChuThuCung.vue'
import TrangChuSanPham from '@/layout/Client/TrangChuSanPham.vue'
export default {
    name: 'TrangChu',
    components:{TrangChuThuCung,TrangChuSanPham}
}
</script>

<style></style>