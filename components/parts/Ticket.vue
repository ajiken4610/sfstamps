<template lang="pug">
.wrapper
  UiCard
    UiCardContent
      .card-content
        .float-end
          img(:src="qr")
          .text-muted 来場当日に上のQRを
            br
            | 読み込んで情報を
            br
            | 登録してください
        h2 2022年度
          br
          | サレジオ祭
        .text-muted 一般入場チケット
        .bottom.text-muted {{ owner || "7G名無し・名無しからの招待" }}
</template>

<script setup lang="ts">
defineProps<{ qr: string; owner?: string }>();
</script>

<style lang="scss">
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
</style>
