<template>
    <v-navigation-drawer v-model="cartDrawer" location="right" temporary width="450">

        <v-container>
            <div v-if="this.cartItems.length > 0">
                <h2 class="text-center" style="margin-top: 4 0px;">Giỏ hàng</h2>
                <div style="margin-top: 20px;">
                    <v-list>
                        <v-row v-for="(item, index) in cartItems" :key="index">
                            <v-col cols="3">
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-img :src="item.sanPhamHinhAnh" max-width="60" max-height="60"></v-img>
                                    </v-list-item-avatar>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.sanPhamTen }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ item.donGia }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-btn color="orange-lighten-2" variant="text" @click="giam(item)">-</v-btn>
                                    <span>{{ item.soLuong }}</span>
                                    <v-btn color="orange-lighten-2" variant="text" @click="tang(item)">+</v-btn>
                                </v-list-item>
                            </v-col>

                            <v-col cols="3">
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-btn icon @click="removeFromCart(item)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-list>

                    <v-row class="mt-4">
                        <v-col cols="8">
                            <v-divider></v-divider>
                        </v-col>
                        <!-- <v-col cols="4">
                    <div class="text-right">
                        <h4>Tổng tiền: {{ calculateTotal() }}</h4>
                        <v-btn color="green" @click="checkout">Checkout</v-btn>
                    </div>
                </v-col> -->
                    </v-row>
                </div>
            </div>
            <div v-else>
                <h2 class="text-center" style="margin-top: 4 0px;">Danh sách trống</h2>
            </div>
        </v-container>
    </v-navigation-drawer>
</template>
  
<script>
import giohangApi from '../../service/giohangApi';
import { mapGetters } from 'vuex';
export default {
    name: 'CartView',
    data() {
        return {
            cartItems: [],
        };
    },
    computed:{
        ...mapGetters(['getCart'])
    },
    methods: {
        getCarts() {
            this.cartItems=JSON.parse(this.getCart);
            this.getAllCart();
        },
        async getAllCart() {
            try {
                const res = await giohangApi.getAllCarts();
                this.$store.dispatch('getListCarts', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        tang(item) {
            item.soLuong += 1;
            this.TangGiam({ sanPhamId: item.sanPhamId, soLuong: item.soLuong });
        },
        giam(item) {
            if (item.soLuong > 0) {
                item.soLuong -= 1;
                this.TangGiam({ sanPhamId: item.sanPhamId, soLuong: item.soLuong });
            }
        },
        async TangGiam(data) {
            try {
                const res = await giohangApi.tanggiamCart(data);
                console.log(res.data);
                this.getAllCart();
                this.getCarts();
            } catch (error) {
                console.log(error.response.data);
            }
        },
        async removeFromCart(item) {
            try {
                const res = await giohangApi.removeCart(item.sanPhamId);
                console.log(res.data);
                this.getAllCart();
            } catch (error) {
                console.log(error);
            }
        },
        // calculateTotal() {
        //     return this.cartItems.reduce((acc, item) => {
        //         const gia = parseFloat(item.donGia.replace('$', ''));
        //         return acc + gia;
        //     }, 0).toFixed(2);
        // },
        checkout() {
            console.log('Checkout clicked');
        },
    },
    created() {
        this.getAllCart();
        this.getCarts();
    }
};
</script>
  
<style scoped></style>
  