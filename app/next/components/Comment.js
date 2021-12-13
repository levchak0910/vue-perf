import React from "react";


export const Comment = ({comment}) => {
    return (
        <div>
            <h2>{comment.name}</h2>
            <div>{comment.body}</div>
            <p>Author: {comment.email}</p>
            <a href={`https://jsonplaceholder.typicode.com/comments/${comment.id}`}>Details</a>
            ||
            <a href={`https://jsonplaceholder.typicode.com/comments?postId=${comment.postId}`}>Comments for post</a>
        </div>
    )
}

export default Comment;