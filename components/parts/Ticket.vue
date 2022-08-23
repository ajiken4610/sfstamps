<template lang="pug">
.wrapper
  UiCard
    UiCardContent
      .card-content
        img(:src="qr")
        h2 サレ祭チケット
        .text-muted 生徒チケット
</template>

<script setup lang="ts">
defineProps<{ qr: string }>();
</script>

<style lang="scss">
.wrapper,
.wrapper > *,
.wrapper > * > * {
  height: 100%;
}
.card-content {
  padding: 1rem;
}
.card-content > img {
  float: right;
}
.text-muted {
  color: #888;
}
</style>
