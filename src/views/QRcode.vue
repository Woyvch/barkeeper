<template>
  <div class="qrcode">
    <v-container>
      <h1>QR-code aanmaken</h1>
      <v-row>
        <v-col cols="4">
          <div>
            <v-text-field label="Tafelnummer" v-model="text"></v-text-field>
            <v-btn color="primary" text @click="make">Genereer</v-btn>
            <v-btn color="primary" text @click="download">Download</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>
            <ejs-qrcodegenerator
              id="qrcode"
              ref="barcodeControl"
              :width="width"
              :height="height"
              :displayText="displaytext"
              :value="value"
              :mode="mode"
            ></ejs-qrcodegenerator>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'qrcodePage',
  data() {
    return {
      width: '200px',
      height: '200px',
      displaytext: { text: 'Barkeeper' },
      mode: 'SVG',
      text: '',
      url: 'https://barkeeper.vercel.app/barkeeper/',
      value: '',
    };
  },
  methods: {
    make() {
      this.value = `${this.url}${this.text}`;
      this.displaytext.text = this.text;
    },
    download() {
      let barcodeInstance;
      let barcodeObj = document.getElementById('qrcode');
      barcodeInstance = barcodeObj.ej2_instances[0];
      let filename = 'Tafelnummer ' + this.text;
      barcodeInstance.exportImage(filename, 'PNG');
    },
  },
};
</script>

<style lang="scss" scoped></style>
