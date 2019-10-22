<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="black">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <span>Codepen</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="email"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray" v-on:click="login">Login</v-btn>
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
  methods: {
    login: function(e) {
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "feed" });
        })
        .catch(err => {
          alert(err.message);
        });
      e.preventDefault();
    }
  },
    data: () => ({
    email: "",
    password: "",
  }),
};
</script>

<style>
</style>