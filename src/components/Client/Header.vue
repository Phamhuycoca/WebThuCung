<template>
    <div>
        <v-app-bar color="#f6edd9" prominent height="300px" class="full-width">
            <v-toolbar-title>
                <div class="header-img">
                    <v-img :width="80" style="margin: 5px;border-radius: 2px;" cover
                        src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1696400425/v987-11a_napqfd.jpg"></v-img>
                    <v-spacer></v-spacer>
                    <router-link to="/" class="custom-link" style="font-size: 15px;">Website cửa hàng bán thú
                        cưng</router-link>
                    <v-spacer></v-spacer>
                    <router-link to="/thunuoi" class="custom-link" style="font-size: 15px;">Thú cưng</router-link>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <router-link to="/sanpham" class="custom-link" style="font-size: 15px;">Sản phẩm</router-link>
                </div>
            </v-toolbar-title>
            <div v-if="getisAuthenticated">
                <v-btn class="text-none" stacked @click="Cart">
                    <v-badge :content="0" color="error">
                        <v-icon>mdi-cart</v-icon>
                    </v-badge>
                </v-btn>
            </div>
            <div v-else>
                <v-btn class="text-none" stacked>
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </div>
            <div>
                <div v-if="getisAuthenticated">
                    <v-menu v-model="menu" :close-on-content-click="false" right>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-if="!userInfo.nguoiDungHinhAnh" icon v-bind="props">
                                <v-icon>mdi-account</v-icon> <!-- Hiển thị biểu tượng mặc định nếu không có hình ảnh -->
                            </v-list-item>
                            <v-list-item v-else icon v-bind="props" :prepend-avatar="userInfo.nguoiDungHinhAnh">
                                <!-- Hiển thị hình ảnh đại diện nếu có -->
                                <v-img :src="userInfo.nguoiDungHinhAnh"></v-img>
                            </v-list-item>
                        </template>


                        <v-card min-width="200">
                            <v-list style="cursor: pointer;">
                                <v-list-item :prepend-avatar="userInfo.avatar" :title="userInfo.hoVaTen"
                                    :subtitle="userInfo.email"></v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-item prepend-icon="mdi-information" title="Thông tin cá nhân" to="/profile"
                                    value="Thông tin cá nhân"></v-list-item>
                                <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Logout"
                                    @click="confirmLogout"></v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>
                <div v-else>
                    <v-btn variant="text" icon @click="Login">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-app-bar>
        <ConfirmLogout ref="dialog" @logout="Logout" />
        <!-- <v-navigation-drawer v-model="cartDrawer" location="right" temporary width="450">
            <Cart style="margin-top: 80px;" v-model="cartDrawer"/>
        </v-navigation-drawer> -->
        <Cart style="z-index: 1000;" :cartDrawer="cartDrawer" @close="cartDrawer = false" />

    </div>
</template>
      
        
<script>
import Cart from '@/layout/Client/Cart.vue';
import ConfirmLogout from '../ConfirmLogout.vue';
import { mapGetters, mapState } from 'vuex';
import nguoidungApi from '../../service/nguoidungApi';
export default {
    name: "HeaderComponent",
    data() {
        return {
            dialog: false,
            cartDrawer: false,
            menu: false,
            userInfo: []
        };
    },
    computed: {
        ...mapGetters(['getisAuthenticated']),
        ...mapState(['nguoidungId'])
    },
    methods: {
        Logout() {
            this.$store.dispatch('Logout')
            this.$router.push('/')

        },
        Cart() {
            this.cartDrawer = !this.cartDrawer;
        },
        confirmLogout() {
            this.$refs.dialog.openDialog();
        },
        Login() {
            this.$router.push('/login')
        },
        async getUser() {
            try {
                const res = await nguoidungApi.getById(this.nguoidungId);
                this.userInfo = res.data;
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
    },
    components: {
        ConfirmLogout,
        Cart
    },
    created() {
        this.getUser();
    }
};
</script>
<style scoped>
.header-img {
    display: flex;
    justify-items: center;
    align-items: center;
    height: 80px;
    width: 80px;
    padding: 10px;
}

.header-img img {
    border-radius: 5px;
}

.custom-link {
    color: #333;
    font-weight: 400;
    text-decoration: none;
    margin-left: 20px;
}

p {
    cursor: pointer;
    color: #333;
    font-weight: 400;
    text-decoration: none;
    margin-left: 20px;
}

p:hover {
    color: #cc571d;
}

.custom-link:hover {
    color: #cc571d;
}

.badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 4px 8px;
    font-size: 12px;
}

a {
    text-decoration: none;
}

.full-width {
    width: 100%;
}

.v-list {
    padding: 0;
    margin: 0;
}

.v-list-item:hover {
    background: #ccc;
}

.v-list-item-title:hover {
    color: #cc571d;
}
</style>
        