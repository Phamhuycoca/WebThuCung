<template>
    <v-footer class="text-center d-flex flex-column" style="background-color: #f6edd9;">
        <div>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
        </div>

        <div class="pt-0">
          Website bán thú cưng - Địa chỉ: Số 1 phố xốm, phũ lãm - Hà Đông
        </div>

        <v-divider></v-divider>

        <div>
            {{ new Date().getFullYear() }} — <strong>Phạm Khắc Huy</strong>
        </div>
    </v-footer>
</template>
<script>
export default {
    name:'FooterView',
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>