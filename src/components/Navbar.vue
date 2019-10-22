<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/">
              <v-list-item-title>Home</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-library-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/topic/create">
              <v-list-item-title>Novo Tópico</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/login">
              <v-list-item-title>Login</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/register">
              <v-list-item-title>Cadastrar</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content class="link">
            <v-list-item-title v-on:click="logout()">Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>e-tic App</v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>
<script>
import Firebase from "firebase";

export default {
  data: () => ({
    isLoggedIn: false,
    currentUser: [],
    drawer: false
  }),
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = Firebase.auth().currentUser;
      } else {
        this.isLoggedIn = false;
        this.currentUser = []
      }
    
    });
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
            this.$router.push({name: 'Login'})
        });
    }
  }
};
</script>