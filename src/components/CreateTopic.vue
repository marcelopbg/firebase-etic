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
         <input
            class="form-control"
            type="file"
            ref="fileInput"
            style
            accept="image/*"
            @change="onFilePicked"
          >
        <v-row>
          <v-btn class="ma-2" tile color="indigo" dark v-on:click="sendShitToFb()">Salvar</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase";

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
    sendShitToFb() {
      try {
        const response = firebase
          .database()
          .ref("topicos/")
          .push({ title: this.title, description: this.description, timestamp: new Date().getTime() });
        alert(response);
      } catch (e) {
        return e;
      }
    },
      onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid field!");
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.fileName = files[0].name;
    },
  }
};
</script>
