<template>
  <v-main>
    <v-container class="py-3 px-6">
      <div v-if="this.$route.path == '/'">
        <trang-chu />
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import TrangChu from '@/components/Client/TrangChu.vue';

export default {
  name: 'MainView',
  components: { TrangChu }
}
</script>

<style></style>