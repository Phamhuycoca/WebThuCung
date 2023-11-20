<template>
  <div>
    <v-app>
      <Header />
      <Navbar />
     <Main/>
    </v-app>
  </div>
</template>
  

<script>
import Header from '@/components/Client/Header.vue';
import Navbar from '@/components/Client/Navbar.vue'
import Main from '@/layout/Client/Main.vue';
export default {
  name: 'HomeView',
  components: { Header, Navbar, Main }
};
</script>
