<template>
  <div>
    apiLoadingTime: {{ apiLoadingTime }}
    <input
      type="hidden"
      name="api"
      :value="apiLoadingTime"
    >
    <br>
    ttfb: {{ ttfb }}
    <br>
    tti: {{ tti }}
    <br>
    complete: {{ complete }}

    <!-- <pre>
      {{ times }}
    </pre> -->

    <AppData
      :comments="comments"
      :posts="posts"
      :photos="photos"
      :characters="characters"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import fetch from "cross-fetch";
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
    const characters = ref<unknown[]>([]);

    const setData = async () => {
      const [c,p,f,u] = await Promise.all([
        import("../../../../db/comments.json"),
        import("../../../../db/posts.json"),
        import("../../../../db/photos.json"),
        import("../../../../db/characters.json"),
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
    const complete = computed(() => times.value.domComplete?.stamp - times.value.domLoading?.stamp);

    const apiLoadingTime = ref(0);


    onMounted(() => {
      apiLoadingTime.value=999
    })

    const s = Date.now();
    await setData();
    if (typeof window === "undefined") apiLoadingTime.value = Date.now() - s;
    if (typeof window === "object") apiLoadingTime.value = Number(document.querySelector("[name=api]")?.value);

    return {
      comments,
      posts,
      photos,
      characters,
      apiLoadingTime,
      times,
      ttfb,
      tti,
      complete,
    };
  },
};
</script>
