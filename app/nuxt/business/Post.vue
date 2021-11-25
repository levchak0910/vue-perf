<template>
  <div>
    <h2>{{post.title}}</h2>
    <div v-html="post.body"></div>
    <a :href="`https://jsonplaceholder.typicode.com/users/${post.userId}`">Author</a>
    ||
    <a :href="`https://jsonplaceholder.typicode.com/posts/${post.id}`">Details</a>
  </div>
</template>

<script lang="ts">
export default {
  name: "Post",
  props: {
    post: Object
  },
};
</script>


