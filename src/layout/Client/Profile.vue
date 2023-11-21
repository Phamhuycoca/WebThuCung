<template>
    <div style="margin: 20px;height: 80vh;">
        <v-card elevation="2" class="mx-auto" max-width="800" height="450" style="margin-top: 50px;">
            <v-card-title primary-title>
                <div class="text-center">
                    <h2 class="headline mb-0">Thông tin tài khoản người dùng</h2>
                    <h3>{{ user.email }}</h3>
                </div>
                <v-avatar class="mx-auto">
                    <v-img :src="user.nguoiDungHinhAnh" alt="Avatar"></v-img>
                </v-avatar>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <h4>Tên người dùng:</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>{{ user.hoVaTen }}</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>Địa chỉ:</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>{{ user.diaChi }}</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>Số điện thoại:</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>{{ user.sdt }}</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>Trạng thái tài khoản:</h4>
                    </v-col>
                    <v-col cols="6">
                        <h4>{{ user.quyen }}</h4>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="mt-6">
                <v-btn color="red">Thay đổi thông tin tài khoản</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red">Thay đổi mật khẩu</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import nguoidungApi from '@/service/nguoidungApi';
import { mapState } from 'vuex';
export default {
    name: 'ProfileView',
    data() {
        return {
            user: [],
            userName: "Phạm Khắc Huy", // Thay đổi thành tên người dùng thực tế
            userData: {
                name: "Phạm Khắc Huy", // Thêm các thông tin người dùng khác tương tự ở đây
            },
        };
    },
    computed: {
        ...mapState(['nguoidungId'])
    },
    methods: {
        async getUser() {
            try {
                const res = await nguoidungApi.getById(this.nguoidungId);
                this.user = res.data;
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.getUser();
    }
}
</script>

<style></style>