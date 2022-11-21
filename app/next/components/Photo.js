import React from "react";

export const Photo = ({photo}) => {
    return (
        <div>
            <h2>{photo.title}</h2>
            <a href={`https://jsonplaceholder.typicode.com/photo/${photo.id}`}>Details</a>
            ||
            <a href={`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`}>Album</a>
        </div>
    )
}

export default Photo;