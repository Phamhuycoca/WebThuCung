<template>
    <div style="margin: 20px;">
        <h3>Danh sách sản phẩm</h3>
        <v-row>
            <v-col v-for="(item, index) in displayed" :key="index" cols="4" class="mt-8">
                <div style="border: 1px solid #333; background: #f4eeee;">
                    <v-card class="mx-auto pa-1 m-5" color="grey-lighten-4" max-width="600" v-bind="props">
                        <v-img :aspect-ratio="16 / 9" cover :src="item.sanPhamHinhAnh">
                        </v-img>
                        <v-card-text class="text-center">Sản phẩm: {{ item.sanPhamTen }}</v-card-text>
                        <v-card-item>Giá sản phẩm: {{ item.sanPhamGia }} VND</v-card-item>
                    </v-card>
                    <v-card-actions>
                        <v-btn @click="addToCart(item)" color="primary" dark>Thêm vào giỏ hàng</v-btn>
                        <v-btn @click="viewDetails(item)" color="secondary" dark>Xem chi tiết</v-btn>
                    </v-card-actions>
                </div>
            </v-col>
        </v-row>
        <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" class="pa-8" :length="totalPages"
            v-model="currentPage"></v-pagination>
        <Loading v-model="dialogloading" />
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </div>
</template>
  
<script>
import Toast from '@/components/Toast.vue';
import Loading from '@/components/Loading.vue';
import giohangApi from '@/service/giohangApi';
import sanphamApi from '@/service/sanphamApi';
import { mapGetters } from 'vuex';
export default {
    name: 'SanPham',
    data() {
        return {
            sanphams: [],
            cart: {
                sanPhamId: '',
                soluong: '',
                nguoidungId: '',
                sanPhamGia: ''
            },
            dialogloading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            currentPage: 1,
            itemsPerPage: 3,
        };
    },
    watch: {
        showAlert: {
            deep: true,
            handler(newVal) {
                if (!newVal.show) return;
                setTimeout(() => (this.showAlert.show = false), 2000);
            }
        }
    },
    components: {
        Loading,
        Toast
    },
    computed: {
        ...mapGetters(['getNguoiDungId']),
        displayed() {
            if (this.sanphams && this.sanphams.length > 0) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.sanphams.slice(startIndex, endIndex);
            } else {
                return [];
            }
        },
        totalPages() {
            return Math.ceil(this.sanphams.length / this.itemsPerPage);
        }
    },
    methods: {
        async addToCart(item) {
            this.dialogloading = true;
            try {
                console.log(item);
                this.cart.sanPhamId = item.sanPhamId;
                this.cart.soluong = 1;
                this.cart.nguoidungId = this.getNguoiDungId;
                this.cart.sanPhamGia = item.sanPhamGia;
                console.log(this.cart);
                const res = await giohangApi.addItem(this.cart);
                console.log(res);
                this.dialogloading = false;
                this.AlertSuccess(res.data);
                // this.getAllCart();
            } catch (error) {
                console.log(error.response.data);
                this.AlertError('Vui lòng đăng nhập');  
                this.dialogloading = false;
            }
        },
        async getAllSanPham() {
            this.dialogloading = true;
            try {
                const res = await sanphamApi.getAll();
                this.sanphams = res.data
                console.log(res.data);
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;
            }
        },
        // async getAllCart() {
        //     try {
        //         const res = await giohangApi.getAllCarts();
        //         this.$store.dispatch('getTotal',res.data)
        //         console.log(res.data);
        //         //this.$store.dispatch('getListCarts',res.data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        viewDetails(item) {
            this.$router.push('/chitiet/' + item.sanPhamId);
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
        this.getAllSanPham();
        // this.getAllCart();
    }
};
</script>
  
<style scoped></style>
  