<template>
  <div>
    <Suspense>
      <AppFetch />
    </Suspense>
  </div>
</template>

<script lang="ts">
import AppFetch from "./business/Fetch.vue";

export default {
  components: {
    AppFetch,
  },
};
</script>
