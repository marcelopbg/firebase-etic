
<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-img
        :src="topic.image"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="350"
      ></v-img>
    </v-row>
    <v-row align="center" justify="center">
      <h2 class="black--text text">{{topic.title}}</h2>
    </v-row>
    <v-row align="center" justify="center">
      <p>{{ topic.description }}</p>
    </v-row>
    <v-row class="customTextArea" align="center" justify="center">
           <v-textarea
            v-model="comment"
            :counter="200"
            name="input-7-1"
            label="Comentar..."
            prepend-icon="mdi-comment"
          ></v-textarea>
    </v-row>
    <v-row  align="center" justify="center">
      <v-list
      width="500">
        <v-list-item>
          <p> <b> Marcelo Guimarães: </b> Achei uma bosta! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae cumque molestias pariatur sed expedita blanditiis iusto ullam amet odio veniam voluptatibus quia aliquid sit, ipsum adipisci voluptates minus cupiditate iure. </p>
        </v-list-item>
        <v-list-item>
          <p> <b> Ana Cláudia: </b> Isso é um teste! </p>
        </v-list-item>
        <v-list-item>
          <p> <b> José Bozano: </b> Achei legal! </p>
        </v-list-item>
        <v-list-item>
          <p> <b> Jéffierson: </b> Achei dukrl, pertinente! </p>
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
</template>
<script>
import Firebase from "firebase";
export default {
  props: {
    id: null
  },
  data: () => ({
    topic: [],
    comment: "",
  }),
  mounted() {
    if (this.id !== null) {
      var topicRef = Firebase.database()
        .ref("topicos/")
        .child(this.id);
      topicRef.once("value", snapshot => {
        this.topic = snapshot.val();
      });
    }
  }
};
</script>

<style>
.customTextArea {
  max-width: 500px; 
  max-height: 50px;
  margin: 0 auto;
  margin-bottom: 150px;
}
</style>