<template>
    <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12" max-width="600">
                    <v-toolbar color="green" dark flat>
                        <v-toolbar-title class="text-center">Đăng nhập</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="formData.email" label="Email" outlined required
                                type="email"></v-text-field>
                            <v-text-field v-model="formData.password" label="Password" outlined required
                                type="password"></v-text-field>
                            <v-btn color="green" class="mr-4" :loading="loading"
                                :disabled="loading || !formData.email || !formData.password" type="submit">Đăng nhập</v-btn>
                            <p>Nếu bạn chưa có tài khoản vui lòng <router-link to="/register">Đăng ký</router-link></p>
                        </v-form>
                    </v-card-text>
                    <v-card-text>
                        <router-link class="text-center" to="/forgot">Quên mật khẩu</router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </v-container>
</template>
  
  
  
<script>
import nguoidungApi from '@/service/nguoidungApi';
import Toast from '@/components/Toast.vue';
export default {
    name: 'LoginView',

    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
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
    methods: {
        async login() {
            try {
                this.loading = true;
                const res = await nguoidungApi.Login(this.formData);
                setTimeout(() => {
                    this.email = '';
                    this.password = '';
                    this.loading = false;
                }, 1500);
                this.decodeToken(res.data.token);
                this.$store.dispatch('Login', res.data.token);
                this.AlertSuccess(res.data.message);
                setTimeout(() => {
                    if(res.data.trangthai ==='Người dùng'){
                        this.$router.push('/')
                    }else{
                        this.$router.push('/admin')
                    }
                }, 4000);
            } catch (error) {
                this.loading = false;
                this.AlertError(error.response.data)
            }
        },
        async decodeToken(token) {
            try {
                const res = await nguoidungApi.DeCodeToken(token);
                this.$store.dispatch('DecodeToken', res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error);
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
</style>
  