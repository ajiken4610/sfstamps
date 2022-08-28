<template lang="pug">
div(v-if="!initialized")
  input(v-model="id")
  button(@click="init") init
div(v-else)
  img.qr(:src="qr")
</template>
<script setup lang="ts">
import QRCode from "qrcode";
const initialized = ref(false);
const id = ref("");
const qr = ref("");
const init = () => {
  initialized.value = true;
  QRCode.toDataURL(
    "https://sfqrst.web.app/stamp/" + id.value,
    (err, url: string) => {
      err && console.log(err);
      qr.value = url;
    }
  );
};
</script>

<style scoped lang="scss">
.qr {
  width: 100vw;
  height: 100vw;
  image-rendering: pixelated;
}
</style>
