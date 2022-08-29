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
const rawData =
  //
  ``;
const dataRows = rawData.split("\n");

const qrs = reactive<string[][]>([]);
const db = useDB();
const start = async () => {
  for (var i = 0; i < dataRows.length; i++) {
    qrs[i] = [];
    const currentRow = dataRows[i].split(",");
    const count = parseInt(currentRow[0]);
    const name = currentRow[1];
    for (var j = 0; j < count; j++) {
      const userDoc = doc(collection(db, "user"));
      await setDoc(userDoc, {
        name: name + "の招待",
        owner: name,
        type: "fromStudent",
        age: null,
        stamps: {},
        temp: null,
        used: null,
        reuseable: null,
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
  height: calc(33vh - 1rem);
  width: calc(50% - 1rem);
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
.inner {
  padding: 0.5rem;
}
img {
  image-rendering: pixelated;
}
</style>
