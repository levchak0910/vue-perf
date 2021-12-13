import React from "react";
import {Comment} from "./Comment";
import {Post} from "./Post";
import {Photo} from "./Photo";
import {Character} from "./Character";

export const AppData = ({comments, posts, characters, photos}) => {


        return (
        <div>
            <a href="#comments">Comments</a>
            ||
            <a href="#posts">Post</a>
            ||
            <a href="#photos">Photos</a>
            ||
            <a href="#characters">Characters</a>

            <br/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <br/>

            <h1 id="comments">Comments</h1>
            { comments.map(comment => <Comment key={comment.id} comment={comment}/>) }


            <br/>
            <hr/>
            <hr/>
            <br/>

            <h1 id="posts">Posts</h1>
            { posts.map(post => <Post  key={post.id} post={post} /> )}

            <br/>
            <hr/>
            <hr/>
            <br/>

            <h1 id="photos">Photos</h1>
            { photos.map(photo => <Photo  key={photo.id} photo={photo} /> )}

            <br/>
            <hr/>
            <hr/>
            <br/>

            <h1 id="characters">Characters</h1>
            { characters.map(character => <Character  key={character.id} character={character} /> )}

        </div>
    )
}

export default AppData;