<template lang="pug">
div(v-if="!initialized")
  input(v-model="id")
  button(@click="init") init
div(v-else)
  img.qr(:src="qr")
  .d-1.text-center.mb スタンプラリー
  h1.text-center チケット管理サイトの右上
    UiIcon.d-2 qr_code
    | より
    br
    | 読み込んでください。
</template>
<script setup lang="ts">
import QRCode from "qrcode";
const initialized = ref(false);
const id = ref("");
const qr = ref("");
const init = () => {
  initialized.value = true;
  console.log("'" + id.value + "'");
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
.d-1 {
  font-size: 10vmin;
}
.d-2 {
  font-size: 2rem;
}
.text-center {
  text-align: center;
}
.mb {
  margin-bottom: 1rem;
}
</style>
