<template lang="pug">
div(ref="element")
</template>
<script setup lang="ts">
import { EmailAuthProvider, GoogleAuthProvider } from "@firebase/auth";

import "firebaseui/dist/firebaseui.css";

const element = ref<HTMLDivElement>();
onMounted(() => {
  const ui = useUI();
  ui.start(element.value, {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/",
  });
});
</script>
