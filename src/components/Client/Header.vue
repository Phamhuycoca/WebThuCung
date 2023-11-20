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
                    <router-link to="/" class="custom-link" style="font-size: 15px;">Thú cưng</router-link>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <router-link to="/sanpham" class="custom-link" style="font-size: 15px;">Sản phẩm</router-link>
                </div>
            </v-toolbar-title>
            <div v-if="getisAuthenticated">
                <v-btn class="text-none" stacked @click="Cart">
                    <v-badge :content="getTotalCart" color="error">
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
                            <v-list-item icon v-bind="props" :prepend-avatar="userInfo.avatar"></v-list-item>
                        </template>

                        <v-card min-width="200">
                            <v-list style="cursor: pointer;">
                                <v-list-item :prepend-avatar="userInfo.avatar" :title="userInfo.name"
                                    :subtitle="userInfo.email"></v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-item prepend-icon="mdi-information" title="Thông tin cá nhân"
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
        <Cart style="margin-top: 80px;" v-model="cartDrawer"/>

    </div>
</template>
      
        
<script>
import Cart from '@/layout/Client/Cart.vue';
import ConfirmLogout from '../ConfirmLogout.vue';
import { mapGetters } from 'vuex';
export default {
    name: "HeaderComponent",
    data() {
        return {
            dialog: false,
            cartDrawer: false,
            menu: false,
            userInfo: {
                avatar: "https://firebasestorage.googleapis.com/v0/b/thitracnghiem-830f0.appspot.com/o/category/1695722799093?alt=media&token=96ae3867-23e5-4a52-86c9-8de03bd1ba53",
                name: "Phạm Khắc Huy",
                email: "Phamkhachuy240702@gmail.com"
            },
        };
    },
    computed: {
        ...mapGetters(['getisAuthenticated', 'getTotalCart'])
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
        }
    },
    components: {
        ConfirmLogout,
        Cart
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
        