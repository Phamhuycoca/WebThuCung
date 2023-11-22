<template>
     <v-card bg-color="white" height="80px" width="200" elevation="4">
        <v-row>
            <v-col cols="4" class="text-center justify-center">
                <v-icon class="ma-6" color="primary">
                    mdi-cart
                </v-icon>
            </v-col>
            <v-col cols="8">
                <p style="font-weight: bold;" class="mt-3 ma-0 text-orange">Tổng đơn hàng</p>
                <span style="font-weight: bold;" class="ml-1 text-black">0 đơn hàng</span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
name:'DonHangView'
}
</script>

<style>

</style>