<template lang="pug">
div
  .d-flex(v-for="qr of qrs")
    .inner(v-for="cqr of qr")
      PartsTicket(:qr="cqr")
</template>

<script setup lang="ts">
import QRCode from "qrcode";
const qrs = reactive<string[][]>([]);
for (var i = 0; i < 5; i++) {
  qrs[i] = [];
  for (var j = 0; j < 6; j++) {
    QRCode.toDataURL(
      Math.random().toString(36).substring(2),
      (err, url: string) => {
        err && console.log(err);
        qrs[i].push(url);
      }
    );
  }
}
</script>

<style scoped lang="scss">
.d-flex {
  display: flex;
  flex-wrap: wrap;
  break-after: page;
}
.d-flex > * {
  height: 33vh;
  width: 50%;
}
</style>
