<template lang="pug">
div(v-if="qrs.length")
  .d-flex(v-for="qr of qrs")
    h1.inner
      h1 {{ "7G名無し・名無し" }}
    .inner(v-for="cqr of qr")
      PartsTicket(:qr="cqr")
div(v-else)
  button(@click="start") create
  .d-flex
    .inner
      PartsTicket(:qr="sampleUrl")
</template>

<script setup lang="ts">
import { collection, doc, setDoc } from "@firebase/firestore";
import QRCode from "qrcode";
const sampleUrl = ref("");
QRCode.toDataURL(
  "https://sfqrst.web.app/xxxxxxxxxxxxxxxxxxxx",
  (err, url: string) => {
    err && console.log(err);
    sampleUrl.value = url;
  }
);
const qrs = reactive<string[][]>([]);
const db = useDB();
const start = async () => {
  for (var i = 0; i < 1; i++) {
    qrs[i] = [];
    for (var j = 0; j < 5; j++) {
      const userDoc = doc(collection(db, "user"));
      await setDoc(userDoc, {
        name: null,
        owner: "",
        type: "fromStudent",
        age: null,
        stamps: {},
        temp: null,
      });
      QRCode.toDataURL(
        "https://sfqrst.web.app/" + userDoc.id,
        (err, url: string) => {
          err && console.log(err);
          qrs[i].push(url);
        }
      );
    }
  }
  console.log("generation successful");
};
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
.d-flex > h1 {
  position: relative;
}
.d-flex > h1 > h1 {
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
}
img {
  image-rendering: pixelated;
}
</style>
