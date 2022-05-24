<template>
  <div>
    <a href="#comments">Comments</a>
    ||
    <a href="#posts">Post</a>
    ||
    <a href="#photos">Photos</a>
    ||
    <a href="#characters">Characters</a>

    <br>
    <hr>
    <hr>
    <hr>
    <hr>
    <br>

    <h1 id="comments">Comments</h1>
    <AComment
      v-for="comment in comments"
      :comment="comment"
    />

    <br>
    <hr>
    <hr>
    <br>

    <h1 id="posts">Posts</h1>
    <APost
      v-for="post in posts"
      :post="post"
    />
    
    <br>
    <hr>
    <hr>
    <br>

    <h1 id="photos">Photos</h1>
    <APhoto
      v-for="photo in photos"
      :photo="photo"
    />

    <br>
    <hr>
    <hr>
    <br>

    <h1 id="characters">Characters</h1>
    <ACharacter
      v-for="char in characters"
      :character="char"
    />
  </div>
</template>


<script lang="ts">
import AComment from "./Comment.vue"
import APost from "./Post.vue"
import APhoto from "./Photo.vue"
import ACharacter from "./Char.vue"

export default {
  components: {
    AComment,
    APost,
    APhoto,
    ACharacter,
  },
  props: {
    comments: Array,
    posts: Array,
    photos: Array,
    characters: Array,
  },
}
</script>

