<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="514">
            <v-card elevation="2">
                <v-card-title>
                    <h2>Thông tin thanh toán</h2>
                </v-card-title>
                <v-card-text>
                    <!-- Form nhập thông tin thanh toán -->
                    <v-form @submit.prevent="submitOrder">
                        <!-- Các trường thông tin thanh toán -->
                        <v-text-field label="Họ và tên"></v-text-field>
                        <v-text-field label="Email"></v-text-field>
                        <!-- Thêm các trường thông tin thanh toán khác tại đây -->

                        <!-- Nút hoàn thành đơn hàng -->
                        <v-btn color="primary" @click="submitOrder">Hoàn thành đơn hàng</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'CheckoutView',
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        Ok() {
            this.$emit("checkout")
            this.dialog = false;
        }

    }
}
</script>

<style></style>