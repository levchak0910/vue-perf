import React from "react";
import styles from "../styles/character.module.css"

export const Character = ({character}) => {
    return (
        <article>
            <h2>{ character.first_name } {character.last_name}</h2>
            <div className={styles.flex}>
            #{character.id}
            <div className={styles.description}>
                <p className={styles.p}><span className={styles.bold}>Gender:</span> { character.gender }</p>
                <dd>Email: <code>{ character.email }</code></dd>
                <p><span className={styles.bold}>A:</span> { character.a }</p>
                {/* <img src={character.a} alt={character.b}> */}
                { Object.keys(character).map(key => <p key={key}>{key}: {character[key]}</p>) } 
            </div>
            </div>
        </article>
    )
}

export default Character;