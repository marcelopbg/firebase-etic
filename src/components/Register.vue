<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="black">
              <v-toolbar-title>Cadastrar</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="name"
                  label="Nome"
                  type="text"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="email"
                  label="E-mail"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Senha"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray" v-on:click="register(name, email, password)">Registrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Firebase from "firebase";
export default {
  data: () => ({
    email: "",
    password: "",
    name: ""
  }),
  methods: {
    register(name, email, password) {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          var user = Firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: name,
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() => {
                this.$router.push({name: 'feed'})
            })
            .catch(function(error) {
              alert(error);
            });
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>

<style>
</style>