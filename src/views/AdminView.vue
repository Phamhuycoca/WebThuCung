  <template>
    <v-app>
        <Header style="height: 70px;"/>
        <Sidebar/>
      <v-main>
        <v-container class="py-3 px-6">
            <router-view/>
        </v-container>
      </v-main>
    </v-app>

</template>

<script>
import Header from '@/components/Admin/Header.vue';
import Sidebar from '@/components/Admin/Sidebar.vue'
export default {
    components: { Header,Sidebar }
}
</script>

<style>

</style>