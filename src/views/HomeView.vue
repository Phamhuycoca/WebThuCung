<template>
  <div>
    <v-app>
      <Header />
      <Navbar />
     <Main/>
     <Footer/>
    </v-app>
  </div>
</template>
  

<script>
import Footer from '@/components/Client/Footer.vue';
import Header from '@/components/Client/Header.vue';
import Navbar from '@/components/Client/Navbar.vue'
import Main from '@/layout/Client/Main.vue';
export default {
  name: 'HomeView',
  components: { Header, Navbar, Main, Footer }
};
</script>
