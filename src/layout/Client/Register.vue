<template>
    <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12" max-width="600">
                    <v-toolbar color="green" dark flat>
                        <v-toolbar-title class="text-center">Đăng ký</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="signup">
                            <v-text-field v-model="formData.hoVaTen" label="Họ và tên" outlined required></v-text-field>
                            <v-text-field v-model="formData.email" label="Email" outlined required
                                type="email"></v-text-field>
                            <v-text-field v-model="formData.password" label="Password" outlined required
                                type="password"></v-text-field>
                            <v-btn color="green" class="mr-4" :loading="loading"
                                :disabled="loading || !formData.hoVaTen || !formData.email || !formData.password"
                                type="submit">Đăng ký</v-btn>
                            <p>Nếu bạn đã có tài khoản, vui lòng <router-link to="/login">Đăng nhập</router-link></p>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
        <v-snackbar v-model="errorSnackbar" color="success" :style="snackbarStyle">
            {{ errorText }}
            <div class="snackbar-buttons">
                <v-btn text to="/login">Đăng nhập</v-btn>
                <v-btn text @click="errorSnackbar = false">Đóng</v-btn>
            </div>
        </v-snackbar>
    </v-container>
</template>
  
<script>
import nguoidungApi from '@/service/nguoidungApi';
import Toast from '@/components/Toast.vue';
export default {
    name: 'RegisterView',
    data() {
        return {
            formData: {
                hoVaTen: '',
                email: '',
                password: '',
                quyen: 'Người dùng'
            },
            errorSnackbar: false,
            errorText: '',
            loading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
        };
    },
    components: {
        Toast
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
    computed: {
        snackbarStyle() {
            return {
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '50px',
            };
        },
    },
    methods: {
        async signup() {
            try {
                this.loading = true;
                const res = await nguoidungApi.Register(this.formData)
                setTimeout(() => {
                    this.name = '';
                    this.email = '';
                    this.password = '';
                    this.loading = false;
                }, 1500);
                this.AlertSuccess(res.data);
                this.errorText = 'Vui lòng đăng nhập lại';
                this.errorSnackbar = true;
            } catch (error) {
                this.loading = false;
                console.log(error.response);
                this.AlertError(error.response.data);
            }
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
    }
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.v-btn,
p {
    display: inline-block;
    vertical-align: middle;
}

.snackbar-buttons {
    display: flex;
    font-size: 24px;
    justify-content: space-between;
}
</style>
  