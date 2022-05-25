#!/usr/bin/env zx

import "zx/globals"

import {getArg} from "../functions/get-cli-arg.mjs"

const characters = require("../db/source/characters.json")
const comments = require("../db/source/comments.json")
const photos = require("../db/source/photos.json")
const posts = require("../db/source/posts.json")

let charactersData, commentsData, photosData, postsData;
 
try {
  charactersData = require("../db/data/characters.json")
} catch (error) {
  charactersData = []
}
try {
  commentsData = require("../db/data/comments.json")
} catch (error) {
  commentsData = []
}
try {
  photosData = require("../db/data/photos.json")
} catch (error) {
  photosData = []
}
try {
  postsData = require("../db/data/posts.json")
} catch (error) {
  postsData = []
}

const size = getArg(["large", "medium", "small"])

const data = {
  characters: [],
  comments: [],
  photos: [],
  posts: [],
}

if (size === "small") {
  data.comments = comments
  data.posts = posts
}

if (size === "medium") {
  data.comments = comments
  data.posts = posts
  data.characters = characters.slice(0, 700)
}

if (size === "large") {
  data.characters = characters
  data.comments = comments
  data.photos = photos
  data.posts = posts
}

if (
  data.characters.length === charactersData.length
  && data.comments.length === commentsData.length
  && data.photos.length === photosData.length
  && data.posts.length === postsData.length
) {
  console.log("NOT_CHANGED")
}
else {
  Object.entries(data).forEach(([file, payload]) => {
    fs.writeFileSync(`db/data/${file}.json`, JSON.stringify(payload, null, 2))
  })
}
