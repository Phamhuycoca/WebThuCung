<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['getsessionStorage'])
  },
  created() {
    this.getsessionStorage();
  }
}
</script>
