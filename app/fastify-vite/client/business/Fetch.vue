<template>
  <div>
    <br>
    ttfb: {{ ttfb }}
    <br>
    tti: {{ tti }}
    <br>
    <br>
    <br>

    <AppData
      :comments="comments"
      :posts="posts"
      :photos="photos"
      :characters="characters"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import AppData from "./Data.vue";

export default {
  components: {
    AppData,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setup () {
    const comments = ref([]);
    const posts = ref([]);
    const photos = ref([]);
    const characters = ref<any[]>([]);

    const setData = async () => {
      const [c,p,f,u] = await Promise.all([
        import("../../../../db/data/comments.json"),
        import("../../../../db/data/posts.json"),
        import("../../../../db/data/photos.json"),
        import("../../../../db/data/characters.json"),
      ])

      posts.value = p.default;
      comments.value = c.default;
      photos.value = f.default;
      characters.value = u.default;
    };

    const times = ref({});
    if (typeof window === "object") {
      times.value = Object.entries(window.performance.timing.toJSON()).sort((t1, t2) => t1[1] - t2[1]).reduce((o, t, i, a) => ({
        ...o,
        [t[0]]: {
          stamp: t[1],
          prev: t[1] - (a[i - 1]?.[1] ?? 0),
        },
      }), {});
    }

    const ttfb = computed(() => times.value.responseStart?.stamp - times.value.requestStart?.stamp);
    const tti = computed(() => times.value.domInteractive?.stamp - times.value.domLoading?.stamp);

    await setData();
    
    return {
      comments,
      posts,
      photos,
      characters,
      times,
      ttfb,
      tti,
    };
  },
};
</script>
