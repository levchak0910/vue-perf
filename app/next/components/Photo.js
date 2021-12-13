import React from "react";

export const Photo = ({photo}) => {
    return (
        <div>
            <h2>{photo.title}</h2>
            <a href={`https://jsonplaceholder.typicode.com/photo/${photo.id}`}>Details</a>
            ||
            <a href={`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`}>Album</a>
            {/* <img src={photo.url} alt={`url for ${photo.title}`}/>     */}
            {/* <img src={photo.thumbnailUrl} alt={`thumbnailUrl for ${photo.title}`}/>      */}
        </div>
    )
}

export default Photo;