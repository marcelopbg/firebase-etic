<template>
  <v-app id="inspire">
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="black" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: "App",
  components: { Navbar },
};
</script>
<style>
.link {
  color: #ee44aa;
  cursor: Pointer;
  text-decoration: underline;
}
</style>
