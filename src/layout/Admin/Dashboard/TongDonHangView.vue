<template>
     <v-card bg-color="white" height="80px" width="240" elevation="4">
        <v-row>
            <v-col cols="4" class="text-center justify-center">
                <v-icon class="ma-6" color="primary">
                    mdi-cart
                </v-icon>
            </v-col>
            <v-col cols="8">
                <p style="font-weight: bold;" class="mt-3 ma-0 text-orange">Tổng đơn hàng</p>
                <span style="font-weight: bold;" class="ml-1 text-black">{{ this.data.tongDonhang }} đơn hàng</span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import dashboardApi from '@/service/dashboardApi';

export default {
name:'DonHangView',
data() {
        return {
            data: {}
        }
    },
    methods: {
        async getThongKe() {
            const res = await dashboardApi.getThongKe();
            this.data = res.data;
        }
    },
    created() {
        this.getThongKe();
    }
}
</script>

<style>

</style>