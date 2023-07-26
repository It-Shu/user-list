import React from 'react';
import styles from '../components/UserCard/UserCard.module.scss';


export const textHighLighting = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight.trim()})`, 'gi'));
    return <span> {parts.map((part, i) =>
            <span key={i} className={part.toLowerCase() === highlight.trim().toLowerCase() ? styles.highlight : undefined}>
        {part}
        </span>)
    } </span>;
}
