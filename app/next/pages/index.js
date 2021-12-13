import {useEffect, useState} from "react";
import { AppData } from "../components/AppData";

export default function Home({comments, posts, photos, characters}) {
    /*
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [photos, setPhotos] = useState([])
    const [characters, setCharasters] = useState([])
     */
    const [times, setTimes] = useState({});
    const [apiLoadingTime, setApiLoadingTime] = useState(0);

    useEffect( () => {
    if (typeof window === "object") {
        setTimes(Object.entries(window.performance.timing.toJSON()).sort((t1, t2) => t1[1] - t2[1]).reduce((o, t, i, a) => ({
            ...o,
            [t[0]]: {
                stamp: t[1],
                prev: t[1] - (a[i - 1]?.[1] ?? 0),
            },
        }), {}));
    }}, []);

/*


    if(typeof window === "object") {
        window.times = times
    }
 */
    const ttfb = times.responseStart?.stamp - times.requestStart?.stamp;
    const tti = times.domInteractive?.stamp - times.domLoading?.stamp;
    const complete = times.domComplete?.stamp - times.domLoading?.stamp;


/*
    useEffect( async () => {
        const s = Date.now();
        // await setData();
        if (typeof window === "undefined") {
            setApiLoadingTime(Date.now() - s);
        }
        if (typeof window === "object") {
            setApiLoadingTime(Number(document.querySelector("[name=api]")?.value));
        }
    }, [])

 */

   return (

            <div>
                apiLoadingTime: {apiLoadingTime}
                <input
                    type="hidden"
                    name="api"
                    value={apiLoadingTime}
                />
                <br/>
                ttfb: {ttfb}
                <br/>
                tti: {tti}
                <br/>
                complete: {complete}

                <AppData
                    comments={comments}
                    posts={posts}
                    photos={photos}
                    characters={characters}
                />
            </div>
    )
}


export const getServerSideProps = async () => {

    const setData = async () => {
        const [c,p,f,u] = await Promise.all([
            import("../../../db/comments.json"),
            import("../../../db/posts.json"),
            import("../../../db/photos.json"),
            import("../../../db/characters.json"),
        ])
        return [c.default, p.default, f.default, u.default]
    }

    const [comments, posts, photos, characters] = await setData();
    return {
        props: {
            comments,
            posts,
            photos,
            characters,
        },
    };
}
