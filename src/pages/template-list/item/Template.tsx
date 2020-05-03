import React from 'react';
import classes from './Template.module.css';

type TemplateItemProps = {
    title: string,
    children?: React.ReactNode
    clickHandler?: () => void,
}

export default function TemplateItem(props: TemplateItemProps) {

    const { title } = props;

    return (
        <div
            className={classes.gridItem}
            onClick={props.clickHandler}
        >
            <div className={classes.preview}>
                {props.children}
            </div>
            <div className={classes.title}>
                <span>{title}</span>
            </div>
        </div>
    )
}
