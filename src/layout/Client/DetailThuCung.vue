<template>
    <div class="chitiet">
        <v-container>
            <v-card style="border: 1px solid #ccc; height: 500px;">
                <v-card-title class="text-center">Chi tiết sản phẩm</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-img height="400" :src="datas.sanPhamHinhAnh" aspect-ratio="2.5" cover></v-img>
                            </v-col>
                            <v-col cols="6">
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Tên sản phẩm:</v-list-item-title>
                                            <v-list-item-subtitle>{{ datas.sanPhamTen }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Giá:</v-list-item-title>
                                            <v-list-item-subtitle>{{ datas.sanPhamGia }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-divider></v-divider>
                                    <v-list-item style="margin: 20px;">
                                        <v-list-item-content>
                                            <v-btn @click="addToCart" color="green">Thêm giỏ hàng</v-btn>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
            <Loading v-model="dialogloading" />
            <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
                :icon="showAlert.icon" />
        </v-container>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Toast from '@/components/Toast.vue';
import thunuoiApi from '../../service/thunuoiApi';
export default {
    name: 'DetailView',
    data() {
        return {
            datas: [],
            formData: {
                cartItemId: 0,
                nguoiDungId: 0,
                sanPhamGia: 0,
                sanPhamId: 0,
                soLuong: 1
            },
            dialogloading: false,
        }
    },
    components: {
        Loading,
        Toast
    },
    methods: {
        async getById(id) {
            this.dialogloading = true;
            try {
                const res = await thunuoiApi.getById(id);
                console.log(res.data);
                this.datas = res.data;
                this.dialogloading = false;
            } catch (error) {
                console.log(error);
                this.dialogloading = false;

            }
        },
    },
    mounted() {
        const id = this.$route.params.id;
        this.getById(id);
    }

}
</script>

<style></style>