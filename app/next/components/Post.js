import React from "react";

export const Post = ({post}) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <div>{post.body}</div>
            <a href={`https://jsonplaceholder.typicode.com/users/${post.userId}`}>Author</a>
            ||
            <a href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}>Details</a>
        </div>
    )
}

export default Post;