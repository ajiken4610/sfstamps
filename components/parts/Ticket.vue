<template lang="pug">
.wrapper
  UiCard
    UiCardContent
      .card-content
        .float-end
          img(:src="qr")
          .d-flex
            .m-auto.text-muted.text-small
              b QRより入力を
                br
                | お願いします
                br
                | ＞来場日
                br
                | ＞当日の体温
        h2 2022年度
          br
          | サレジオ祭
        b.text-muted 一般入場チケット
        b.bottom.text-muted {{ (owner || "7G名無し・名無し") + "からの招待" }}
</template>

<script setup lang="ts">
defineProps<{ qr: string; owner?: string }>();
</script>

<style lang="scss">
.d-flex {
  display: flex;
}
.m-auto {
  margin: auto;
}
h2 {
  color: white;
}
.wrapper,
.wrapper > *,
.wrapper > * > * {
  height: 100%;
}
.card-content {
  margin: 1rem;

  height: 100%;
  position: relative;
}
.card-content img {
  border-radius: 5px;
}
.card-content > .float-end {
  float: right;
}
.card-content > .bottom {
  position: absolute;
  bottom: 0;
  right: 0;
}
.text-muted {
  color: rgb(255, 255, 255);
  filter: drop-shadow(0 0 5px rgb(0, 0, 0));
}
.wrapper > * > * {
  background-size: cover;
  background-image: url("/0020-4k.png") !important;
  // background-image: url("/nasutanowa.png") !important;
}
.text-small {
  font-size: 0.9rem;
}
</style>
