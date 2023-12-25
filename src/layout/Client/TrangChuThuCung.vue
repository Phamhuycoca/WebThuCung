<template>
    <div style="margin: 20px;">
    <h3>Thú cưng</h3>
        <v-row>
            <v-col v-for="(item, index) in displayed" :key="index" cols="4" class="mt-8">
                <div style="border: 1px solid #333; background: #f4eeee;">
                    <v-card class="mx-auto pa-1 m-5" color="grey-lighten-4" max-width="600" v-bind="props">
                        <v-img :aspect-ratio="16 / 9" cover :src="item.thuNuoiHinhAnh">
                        </v-img>
                    </v-card>
                    <v-card-text class="text-center">Tên thú cưng: {{ item.thuNuoiTen }}</v-card-text>
                    <v-card-actions>
                        <v-btn to="/chitiet" color="secondary" dark>Xem chi tiết</v-btn>
                    </v-card-actions>
                </div>
            </v-col>
        </v-row>
        <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" class="pa-8" :length="totalPages"
            v-model="currentPage"></v-pagination>
        <Loading v-model="dialogloading" />
    </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
import thunuoiApi from '../../service/thunuoiApi';

export default {
    name: 'ThuNuoiView',
    data() {
        return {
            dialogloading: false,
            thunuois: [],
            currentPage: 1,
            itemsPerPage: 3,

        }
    },
    computed: {
        displayed() {
            if (this.thunuois && this.thunuois.length > 0) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.thunuois.slice(startIndex, endIndex);
            } else {
                return [];
            }
        },
        totalPages() {
            return Math.ceil(this.thunuois.length / this.itemsPerPage);
        }
    },
    components: {
        Loading
    },
    methods: {
        async getAllThuNuoi() {
            try {
                const res = await thunuoiApi.getAll();
                this.thunuois = res.data;
            } catch (error) {
                this.dialogloading = false;
                console.log(error);
            }
        }
    },
    created() {
        this.getAllThuNuoi();
    }
}
</script>

<style></style>