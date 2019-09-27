<template>
  <v-container class="pa-2" fluid>
    <v-row align="center" justify="center" v-if="!cards">
      <span>Não há nenhum tópico cadastrado :(</span>
    </v-row>
    <v-row>
      <v-col v-for="card in cards" v-bind:key="card.key" md="3">
        <v-card>
          <v-img
            max-height="300px"
            :src="card.img"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    cards: []
  }),
  mounted() {
    firebase.database().ref("newRef/").push({'dalton': 'cesar', 'teste': 'teste'});
    var topicsRef = firebase.database().ref("topicos/");
    topicsRef
    .on("value", (snapshot) => {
      this.cards = []
      snapshot.forEach((child) => {
        var key = child.key;
        var childData = child.val();
        childData['key'] = key;
        childData['img'] = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
        this.cards.push(childData);
      });
    });
  }
};
</script>
