<template>
  <article>
    <h2>{{ character.first_name }} {{ character.last_name }}</h2>
    <div class="flex">
      #{{ character.id }}
      <div class="description">
        <p><span class="bold">Gender:</span> {{ character.gender }}</p>
        <dd>Email: <code>{{ character.email }}</code></dd>
        <p><span class="bold">A:</span> {{ character.a }}</p>
        <!-- <img :src="character.a" :alt="character.b"> -->
        <p v-for="key in Object.keys(character)">
          {{ key }}: {{ character[key] }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    character: Object,
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
}

.bold {
  font-weight: bold;
}

.description {
  padding-left: 10px;
  font-size: 18px;
  text-align: left;
}

.flex {
  display: flex;
  max-width: 960px;
  margin: 0 auto;
}

.image {
  max-width: 300px;
}
</style>
