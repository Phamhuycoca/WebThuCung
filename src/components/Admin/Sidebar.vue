<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-subheader>Danh mục</v-list-subheader>
            <v-list-item v-for="(item, i) in links" :key="i" :to="item.link" color="primary">
                <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script>
export default {
    name: "SidebarView",
    data() {
        return {
            links: [
                { icon: "mdi-home", text: "Dashboard", link: "/admin/dashboard" },
                { icon: "mdi-paw", text: "Thú nuôi", link: "/admin/thunuoi" },
                { icon: "mdi-microsoft-windows", text: "Sản phẩm", link: "/admin/sanpham" },
                { icon: "mdi-shape-plus", text: "Danh mục", link: "/admin/danhmuc" },
            ],
        };
    },
};
</script>
  
<style scoped>
/* Các quy tắc CSS scoped nếu cần thiết */
</style>
  