<template>
  <div>
    <h2>{{comment.name}}</h2>
    <div v-html="comment.body"></div>
    <p>Author: {{comment.email}}</p>
    <a :href="`https://jsonplaceholder.typicode.com/comments/${comment.id}`">Details</a>
    ||
    <a :href="`https://jsonplaceholder.typicode.com/comments?postId=${comment.postId}`">Comments for post</a>
  </div>
</template>

<script lang="ts">
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
};
</script>


