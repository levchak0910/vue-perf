import {useEffect, useState} from "react";
import { AppData } from "../components/AppData";

export default function Home({comments, posts, photos, characters}) {
    const [times, setTimes] = useState({});

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

    const ttfb = times.responseStart?.stamp - times.requestStart?.stamp;
    const tti = times.domInteractive?.stamp - times.domLoading?.stamp;

   return (

            <div>
                ttfb: {ttfb}
                <br/>
                tti: {tti}
                <br/>
                <br/>
                <br/>

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
            import("../../../db/data/comments.json"),
            import("../../../db/data/posts.json"),
            import("../../../db/data/photos.json"),
            import("../../../db/data/characters.json"),
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
