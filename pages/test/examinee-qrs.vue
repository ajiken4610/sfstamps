<template lang="pug">
div(v-if="qrs.length")
  .d-flex(v-for="(qr,index) of qrs")
    template(v-if="qr.length")
      h1.inner
        h1 {{ names[index] }}
      .inner(v-for="cqr of qr")
        PartsTicket(:qr="cqr", :owner="names[index]")
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
  "https://sfqrco.web.app/00000000000000000000",
  (err, url: string) => {
    err && console.log(err);
    sampleUrl.value = url;
  }
);
const rawData =
  //
  ``;
// const rawData = ",,教職員,5\n".repeat(100);
const dataRows = rawData.split("\n");
const names: string[] = reactive([]);

const qrs = reactive<string[][]>([]);
const db = useDB();
const start = async () => {
  const result = [];
  for (var i = 0; i < dataRows.length; i++) {
    const currentRow = dataRows[i].split(",");
    if (currentRow.length >= 4) {
      // console.log(currentRow);
      qrs[i] = [];
      const email = currentRow[0];
      const childCount = parseInt(currentRow[1]);
      const parentCount = parseInt(currentRow[2]);
      const name0 = currentRow[3];
      const name1 = currentRow[4];
      const name = name0 + name1;
      names.push(name0 + name1);
      const childTickets = [];
      const parentTickets = [];
      for (var j = 0; j < childCount; j++) {
        const userDoc = doc(collection(db, "user"));
        await setDoc(userDoc, {
          name: name,
          owner: "sf",
          type: "examinee",
          age: null,
          stamps: {},
          temp: null,
          used: null,
          reuseable: null,
          arriveSchedule: "pm18",
          isArriveScheduleConstraint: true,
          giftReceived: false,
        });
        childTickets.push(userDoc.id);
        QRCode.toDataURL(
          "https://sfqrco.web.app/" + userDoc.id,
          (err, url: string) => {
            err && console.log(err);
            qrs[i].push(url);
          }
        );
      }
      for (var j = 0; j < parentCount; j++) {
        const userDoc = doc(collection(db, "user"));
        await setDoc(userDoc, {
          name: name + "の保護者様",
          owner: "sf",
          type: "examinee",
          age: null,
          stamps: {},
          temp: null,
          used: null,
          reuseable: null,
          arriveSchedule: "pm18",
          isArriveScheduleConstraint: true,
          giftReceived: false,
        });
        parentTickets.push(userDoc.id);
        QRCode.toDataURL(
          "https://sfqrco.web.app/" + userDoc.id,
          (err, url: string) => {
            err && console.log(err);
            qrs[i].push(url);
          }
        );
      }
      console.log(childTickets.join("-") + "_" + parentTickets.join("-"));
      result.push(
        [
          email,
          name0,
          name1,
          name,
          childTickets.join("-") + "_" + parentTickets.join("-"),
        ].join(",")
      );
    }
  }
  console.log(result.join("\n"));
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
