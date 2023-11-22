<template>
    <v-navigation-drawer v-model="dialogAction" location="right" temporary width="450">
        <v-container>
            <div v-if="this.cartItems.length > 0">
                <h2 class="text-center" style="margin-top: 40px;">Giỏ hàng</h2>
                <div style="margin-top: 20px;">
                    <v-list>
                        <v-row v-for="(item, index) in displayed" :key="index">
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
                        <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" class="pa-4" :length="totalPages"
                            v-model="currentPage" :total-visible="1"></v-pagination>
                    </v-list>

                    <v-row class="mt-4">
                        <v-col cols="8">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col cols="4">
                            <div class="text-right">
                                <h4>Tổng tiền: {{ calculateTotal() }}</h4>
                                <v-btn color="green" @click="checkOut">Checkout</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <div v-else>
                <h2 class="text-center" style="margin-top: 40px;">Danh sách trống</h2>
            </div>
        </v-container>
        
        <checkout ref="dialog" :totalCart="total" @close="getAllCart"/>
    </v-navigation-drawer>
</template>

<script>
import checkout from '@/components/Client/Checkout.vue'
import giohangApi from '../../service/giohangApi';
import { mapGetters } from 'vuex';
export default {
    name: 'CartView',
    data() {
        return {
            cartItems: [],
            total: 0,
            currentPage: 1,
            itemsPerPage: 4,
            dialog: false,
            checkout:false
        };
    },
    props: ['cartDrawer'],
    computed: {
        ...mapGetters(['getNguoiDungId']),
        dialogAction: {
            get() {
                this.getAllCart();
                return this.cartDrawer;
            },
            set(value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        },
        displayed() {
            if (this.cartItems && this.cartItems.length > 0) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.cartItems.slice(startIndex, endIndex);
            }
            else {
                return [];
            }
        },
        totalPages() {
            return Math.ceil(this.cartItems.length / this.itemsPerPage);
        }
    },
    methods: {
        async getAllCart() {
            try {
                const res = await giohangApi.getById(this.getNguoiDungId);
                console.log('cảt');
                this.$store.dispatch('getTotal',res.data)
                this.cartItems = res.data;
            }
            catch (error) {
                console.log(error);
            }
        }, tang(item) {
            item.soLuong += 1;
            item.nguoidungId = this.getNguoiDungId;
            item.sanPhamGia = item.donGia;
            this.TangGiam(item);
        },
        giam(item) {
            if (item.soLuong > 0) {
                item.soLuong -= 1;
                item.nguoidungId = this.getNguoiDungId;
                item.sanPhamGia = item.donGia;
                this.TangGiam(item);
            }
        },
        async TangGiam(data) {
            try {
                const res = await giohangApi.tanggiamCart(data);
                console.log(res.data);
                this.getAllCart();
            }
            catch (error) {
                console.log(error.response.data);
            }
        },
        async removeFromCart(item) {
            try {
                const res = await giohangApi.removeCart(item.cartItemId);
                console.log(res.data);
                this.getAllCart();
            }
            catch (error) {
                console.log(error);
            }
        },
        calculateTotal() {
            this.total = 0;
            this.cartItems.forEach(item => {
                if (typeof item.donGia === 'number') {
                    this.total += item.donGia;
                }
                else if (typeof item.donGia === 'string') {
                    const gia = parseFloat(item.donGia.replace('$', ''));
                    this.total += isNaN(gia) ? 0 : gia;
                }
            });
            return this.total.toFixed(2);
        },
        checkOut() {
            this.$refs.dialog.openDialog();
        }
    },
    created() {
        this.getAllCart();
    },
    components: { checkout}
}
</script>

<style></style>