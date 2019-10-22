<template>
  <v-container class="pa-2" fluid>
    <v-snackbar v-model="mutableSnackbar" color="success" class="mt-6" :cener="true" :top="true">
      Tópico criado com Sucesso
      <v-btn dark text @click="snackbar = false">X</v-btn>
    </v-snackbar>
    <v-row align="center" justify="center" v-if="!cards">
      <span>Não há nenhum tópico cadastrado :(</span>
    </v-row>
    <v-row>
      <v-col v-for="card in cards" v-bind:key="card.key" md="3">
        <a v-on:click="redirectToTopic(card.key)">
          <v-card>
            <v-img
              max-height="300px"
              :lazy-src="card.image"
              :src="card.image"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="fill-height align-end" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <div class="flex-grow-1"></div>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
export default {
  props: ["snackbar"],
  data: function() {
    return {
      cards: [],
      mutableSnackbar: this.snackbar
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      var topicsRef = firebase.database().ref("topicos/");
      topicsRef.on("value", snapshot => {
        this.cards = [];
        var newObj = [];
        var obj = snapshot.toJSON();
        for (var key in obj) {
          var line = obj[key];
          line["key"] = key;
          newObj.push(line);
        }
        this.cards = newObj.reverse();
      });
    },
    redirectToTopic(key) {
      this.$router.push({ name: "Topic", params: { id: key } });
    }
  }
};
</script>
