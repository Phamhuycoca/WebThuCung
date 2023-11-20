<template>
    <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12" max-width="600">
                    <v-toolbar color="green" dark flat>
                        <v-toolbar-title class="text-center">Quên mật khẩu</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="recoverPassword">
                            <v-text-field v-model="email" label="Email" outlined required :rules="[emailRule]"
                                type="email"></v-text-field>
                            <v-btn color="green" class="mr-4" :loading="loading" :disabled="loading || !email"
                                type="submit">Gửi yêu cầu</v-btn>
                            <p>Nhớ mật khẩu? <router-link to="/login">Đăng nhập</router-link></p>
                        </v-form>
                    </v-card-text>
                    <v-snackbar v-model="errorSnackbar" color="error" :style="snackbarStyle">
                        {{ errorText }}
                        <v-btn text @click="errorSnackbar = false">Close</v-btn>
                    </v-snackbar>
                </v-card>
            </v-col>
        </v-row>
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </v-container>
</template>
  
<script>
import Toast from '@/components/Toast.vue';
import nguoidungApi from '@/service/nguoidungApi';
export default {
    name: 'ForgotView',
    data() {
        return {
            email: '',
            loading: false,
            errorSnackbar: false,
            errorText: '',
            emailRule: [
                (value) => !!value || 'Email is required.',
                (value) => /.+@.+\..+/.test(value) || 'Email must be valid.',
            ],
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
        };
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
    methods: {
        async recoverPassword() {
            try {
                this.loading = true;
                const res = await nguoidungApi.Forgot(this.email);
                console.log(res.data);
                setTimeout(() => {
                    if (!this.validateEmail(this.email)) {
                        this.errorText = 'Email không đúng định dạng.';
                        this.errorSnackbar = true;
                    } 
                    this.email = '';
                    this.loading = false;
                }, 1500);
                this.showAlert(res.data);
            } catch (error) {
                this.loading = false;
                console.log(error);
                this.AlertError(error)
            }
        },
        validateEmail(value) {
            return /.+@.+\..+/.test(value);
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
};
</script>
  
<style scoped>
/* Align paragraph and button on the same row */
.v-btn,
p {
    display: inline-block;
    vertical-align: middle;
}
</style>
  