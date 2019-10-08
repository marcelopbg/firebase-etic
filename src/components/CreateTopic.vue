<template>
  <v-container>
    <h3 class="indigo--text text--darken-2">Criar discussão</h3>
    <v-form>
      <v-container class="justify-center">
        <v-row>
          <v-text-field v-model="title" :counter="50" :rules="titleRules" label="Título" required></v-text-field>
        </v-row>
        <v-row>
          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="200"
            name="input-7-1"
            label="Descrição"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Selecione uma imagem de fundo"
            prepend-icon="mdi-camera"
            label="Imagem"
            v-on:change="onFilePicked"
          ></v-file-input>
        </v-row>
        <v-row>
          <v-btn class="ma-2" tile color="indigo" dark v-on:click="sendFile()">Salvar</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase";
// import { log } from 'util';

export default {
  data: () => ({
    title: "",
    image: "",
    fileName: "",
    titleRules: [
      v => !!v || "Título deve ser preenchido",
      v => (v && v.length <= 50) || "Título deve conter no máximo 50 caractéres"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Descrição deve ser preenchida",
      v =>
        (v && v.length <= 200) ||
        "Descrição deve conter no máximo 200 caractéres"
    ]
  }),
  methods: {
    sendFile() {
      try {
        const filename = this.fileName;
        let randomString = Math.random()
          .toString(36)
          .substring(5);
        const ext = filename.slice(filename.lastIndexOf("."));
        firebase
          .storage()
          .ref("home/" + randomString + ext)
          .put(this.image)
          .then(response => {
            firebase
              .storage()
              .ref("home/")
              .child(response.ref.name)
              .getDownloadURL()
              .then(url => {
                this.sendShitToFb(url);
              });
          });
      } catch (e) {
        return e;
      }
    },
    sendShitToFb(url) {
      try {
        const response = firebase
          .database()
          .ref("topicos/")
          .push({
            title: this.title,
            description: this.description,
            image: url,
            timestamp: new Date().getTime()
          });
        this.snackbar = true;
        this.$router.push({name: 'feed', params: {snackbar: true}})
        return response;
      } catch (e) {
        return e;
      }
    },

    onFilePicked(event) {
      const file = event;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      this.image = file;
      this.fileName = file.name;
    }
  }
};
</script>
